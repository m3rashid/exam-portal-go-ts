import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import React from "react";
import { Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface DataType {}

const columns: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Credits", dataIndex: "credits", key: "credits" },
  {
    title: "Actions",
    key: "actions",
    render: () => {
      return (
        <>
          <Link to="/">
            <InfoCircleOutlined />
          </Link>
          <Link to="/">
            <DeleteOutlined />
          </Link>
        </>
      );
    },
  },
];

interface IProps {}

const AllTrainers: React.FC<IProps> = () => {
  const openCreateTrainerModal = () => {};

  return (
    <>
      <Button
        type="primary"
        onClick={openCreateTrainerModal}
        icon={<PlusCircleOutlined />}
      >
        Create Trainer
      </Button>

      <Table style={{ marginTop: 20 }} columns={columns} />
    </>
  );
};

export default AllTrainers;
