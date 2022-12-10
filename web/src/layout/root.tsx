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
import { getItems } from "./sidebarItems";
import { localStorageKeys } from "./localStorage";

interface IProps extends PropsWithChildren {}

const RootWrapper: FC<IProps> = ({ children }) => {
  const { userType } = useRecoilValue(authState);
  const [ui, setUi] = useRecoilState(uiState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.localStorage.setItem(localStorageKeys.ui, JSON.stringify(ui));
    }, 0);

    return () => clearTimeout(timeout);
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
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              height: 64,
              display: "flex",
              width: "100%",
              cursor: "pointer",
              background: "#f5f5f5",
              marginBottom: 10,
              borderBottomRightRadius: 8,
            }}
            onClick={() =>
              setUi((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))
            }
          >
            <MenuUnfoldOutlined style={{ fontSize: 24, margin: "auto" }} />
          </div>

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={sidebarItems}
            style={{
              background: "#f5f5f5",
              height: "calc(100% - 74px)",
              width: ui.sidebarOpen ? 190 : 70,
              borderTopRightRadius: 8,
              border: 0,
              flex: 1,
            }}
          />
        </Layout.Sider>
        <Layout style={{ background: colorBgContainer }}>
          <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
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
              background: "#f5f5f5",
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
