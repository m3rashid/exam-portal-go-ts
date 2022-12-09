import { useRecoilValue } from "recoil";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { FC, PropsWithChildren, useState } from "react";
import { ConfigProvider, Layout, Menu, theme as antdTheme } from "antd";

import theme from "./theme";
import { authState } from "../atoms/auth";
import { getItems } from "./sidebarItems";

interface IProps extends PropsWithChildren {}

const RootWrapper: FC<IProps> = ({ children }) => {
  const { userType } = useRecoilValue(authState);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();
  const sidebarItems = getItems(userType);

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ width: "100%", height: "100vh", overflow: "auto" }}>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: colorBgContainer, height: "100%" }}
        >
          <MenuUnfoldOutlined
            onClick={() => setCollapsed((p) => !p)}
            style={{ fontSize: 24, padding: 20 }}
          />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarItems}
          />
        </Layout.Sider>
        <Layout className="site-layout">
          <Layout.Header
            style={{ padding: 0, background: colorBgContainer }}
          ></Layout.Header>
          <Layout.Content
            style={{
              margin: "24px 16px",
              padding: 12,
              borderRadius: 8,
              background: colorBgContainer,
            }}
          >
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default RootWrapper;
