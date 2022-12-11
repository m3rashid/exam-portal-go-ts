import {
  ConfigProvider,
  Layout,
  Menu,
  theme as antdTheme,
  Typography,
} from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { FC, PropsWithChildren, useEffect } from "react";

import theme from "./theme";
import { uiState } from "../atoms/ui";
import { authState } from "../atoms/auth";
import { getItems, openToAllItems } from "./sidebarItems";
import { localStorageKeys } from "./localStorage";
import { useNavigate } from "react-router-dom";

interface IProps extends PropsWithChildren {}

const RootWrapper: FC<IProps> = ({ children }) => {
  const { userType } = useRecoilValue(authState);
  const [ui, setUi] = useRecoilState(uiState);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.localStorage.setItem(localStorageKeys.ui, JSON.stringify(ui));
    }, 0);

    return () => clearTimeout(timeout);
  }, [ui]);

  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();
  const sidebarItems = getItems(navigate, userType);

  const greyBackgroundColor = "#f5f5f5";

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ width: "100%", height: "100vh" }}>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={!ui.sidebarOpen}
          style={{
            background: colorBgContainer,
            height: "100%",
            display: "flex",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              width: "100%",
              cursor: "pointer",
              background: greyBackgroundColor,
              marginBottom: 10,
              borderBottomRightRadius: 8,
            }}
            onClick={() =>
              setUi((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
            }
          >
            <MenuUnfoldOutlined style={{ fontSize: 24, margin: "auto" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: greyBackgroundColor,
              height: "calc(100% - 75px)",
              width: ui.sidebarOpen ? 190 : 70,
              borderTopRightRadius: 8,
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={sidebarItems}
              style={{ border: 0, background: greyBackgroundColor }}
            />

            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={openToAllItems(navigate)}
              style={{ border: 0, background: greyBackgroundColor }}
            />
          </div>
        </Layout.Sider>
        <Layout style={{ background: colorBgContainer }}>
          <Layout.Header
            style={{
              padding: 0,
              background: greyBackgroundColor,
              borderBottomLeftRadius: 8,
            }}
          >
            <Typography.Title
              level={3}
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                marginLeft: 16,
              }}
            >
              Exam Portal
            </Typography.Title>
          </Layout.Header>
          <div
            style={{
              margin: 1,
              background: greyBackgroundColor,
              height: "100%",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginRight: 12,
              marginTop: 10,
            }}
          >
            <Layout.Content
              style={{
                margin: "24px 16px",
                padding: 12,
                borderRadius: 8,
                background: colorBgContainer,
                overflowY: "auto",
                minHeight: "calc(100vh - 124px)",
              }}
            >
              {children}
            </Layout.Content>
          </div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default RootWrapper;
