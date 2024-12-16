import { Button, Drawer, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../images/quiz-logo.png";
import "./LayoutDefault.scss";
import { BarsOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Content } = Layout;

function LayoutDefault() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Layout className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/topic">
                  Topic
                </NavLink>
              </li>
              <li>
                <NavLink to="/answers">
                  Answers
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="layout-default__account">
            <NavLink to="/logout">Đăng xuất</NavLink>
            <NavLink to="/login">Đăng nhập</NavLink>
            <NavLink to="/register">Đăng ký</NavLink>
          </div>
          <Button
            className="menu-icon"
            icon={<BarsOutlined />}
            onClick={toggleDrawer}
          />
        </header>
        <Drawer
          title="Menu"
          placement="right"
          onClose={handleCloseDrawer}
          visible={drawerVisible}
          width={250}
        >
          <Menu mode="inline">
            <Menu.Item key="home">
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="topic">
              <NavLink to="/topic">Topic</NavLink>
            </Menu.Item>
            <Menu.Item key="answers">
              <NavLink to="/answers">Answers</NavLink>
            </Menu.Item>
            <Menu.Item key="logout">
              <NavLink to="/logout">Đăng xuất</NavLink>
            </Menu.Item>
            <Menu.Item key="login">
              <NavLink to="/login">Đăng nhập</NavLink>
            </Menu.Item>
            <Menu.Item key="register">
              <NavLink to="/register">Đăng ký</NavLink>
            </Menu.Item>
          </Menu>
        </Drawer>
        <Content className="layout-default__main">
          <Outlet />
        </Content>
        <footer className="layout-default__footer">
          Copyright @ 2024 by Huyen
        </footer>
      </Layout>
    </>
  );
}

export default LayoutDefault;