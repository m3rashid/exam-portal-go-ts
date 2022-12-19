import React from "react";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

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

const AllCourses: React.FC<IProps> = () => {
  const openCreateCourseModal = () => {};

  return (
    <>
      <Button
        type="primary"
        onClick={openCreateCourseModal}
        icon={<PlusCircleOutlined />}
      >
        Create Course
      </Button>

      <Table style={{ marginTop: 20 }} columns={columns} />
    </>
  );
};

export default AllCourses;
