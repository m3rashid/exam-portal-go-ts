import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { FC, PropsWithChildren, useEffect } from "react";
import { ConfigProvider, Layout, Menu, theme as antdTheme } from "antd";

import theme from "./theme";
import { uiState } from "../atoms/ui";
import { authState } from "../atoms/auth";
import { getItems } from "./sidebarItems";
import { localStorageKeys } from "./localStorage";

interface IProps extends PropsWithChildren {}

const RootWrapper: FC<IProps> = ({ children }) => {
  const { userType } = useRecoilValue(authState);
  const [ui, setUi] = useRecoilState(uiState);

  useEffect(() => {
    window.localStorage.setItem(localStorageKeys.ui, JSON.stringify(ui));
  }, [ui]);

  const {
    token: { colorBgContainer },
  } = antdTheme.useToken();
  const sidebarItems = getItems(userType);

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
          }}
        >
          <MenuUnfoldOutlined
            onClick={() =>
              setUi((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
            }
            style={{ fontSize: 24, padding: 20 }}
          />

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarItems}
            style={{
              background: "#f5f5f5",
              height: "calc(100% - 64px)",
              width: ui.sidebarOpen ? 190 : 70,
              borderTopRightRadius: 8,
              border: 0,
            }}
          />
        </Layout.Sider>
        <Layout style={{ background: colorBgContainer }}>
          <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
            {/* header things here */}
          </Layout.Header>
          <div
            style={{
              margin: 1,
              background: "#f5f5f5",
              height: "100%",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginRight: 12,
            }}
          >
            <Layout.Content
              style={{
                margin: "24px 16px",
                padding: 12,
                borderRadius: 8,
                background: colorBgContainer,
                overflowY: "auto",
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
