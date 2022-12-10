package email

import (
	"log"
	"net"
	"strings"
)

type CheckDomainResult struct {
	hasMX       bool
	hasSPF      bool
	hasDmarc    bool
	spfRecord   string
	dmarcRecord string
}

func CheckDomain(domain string) (CheckDomainResult, bool, error) {
	var result CheckDomainResult

	mxRecords, err := net.LookupMX(domain)
	if err != nil {
		log.Printf("Error: %v \n", err)
		return result, false, err
	}

	if len(mxRecords) > 0 {
		result.hasMX = true
	}

	txtRecords, err := net.LookupTXT(domain)
	if err != nil {
		log.Printf("Error: %v \n", err)
		return result, false, err
	}

	for _, record := range txtRecords {
		if strings.HasPrefix(record, "v=spf1") {
			result.hasSPF = true
			result.spfRecord = record
			break
		}
	}

	dmarcRecords, err := net.LookupTXT("_dmarc" + domain)
	if err != nil {
		log.Printf("Error: %v \n", err)
		return result, false, err
	}

	for _, record := range dmarcRecords {
		if strings.HasPrefix(record, "v=DMARC1") {
			result.hasDmarc = true
			result.dmarcRecord = record
			break
		}
	}

	return result, result.hasMX && result.hasSPF && result.hasDmarc, nil
}
