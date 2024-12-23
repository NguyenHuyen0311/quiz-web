import { Button, Drawer, Layout, Menu } from "antd";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../images/quiz-logo.png";
import { BarsOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import "./LayoutDefault.scss";
const { Content } = Layout;

function LayoutDefault() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer);

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
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/">
                  Trang chủ
                </NavLink>
              </li>
              {token && (
                <>
                  <li>
                    <NavLink to="/topic">
                      Chủ đề
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/answers">
                      Lịch sử
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="layout-default__account">
            {token ? (<>
              <NavLink to="/logout">Đăng xuất</NavLink>
            </>) : (<>
              <NavLink to="/login">Đăng nhập</NavLink>
              <NavLink to="/register">Đăng ký</NavLink>
            </>)}
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
          open={drawerVisible}
          width={250}
        >
          <Menu mode="inline">
            <Menu.Item key="home">
              <NavLink to="/">Trang chủ</NavLink>
            </Menu.Item>
            {token ? (
              <>
                <Menu.Item key="topic">
                  <NavLink to="/topic">Chủ đề</NavLink>
                </Menu.Item>
                <Menu.Item key="answers">
                  <NavLink to="/answers">Lịch sử</NavLink>
                </Menu.Item>
                <Menu.Item key="logout">
                  <NavLink to="/logout">Đăng xuất</NavLink>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="login">
                  <NavLink to="/login">Đăng nhập</NavLink>
                </Menu.Item>
                <Menu.Item key="register">
                  <NavLink to="/register">Đăng ký</NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Drawer>
        <Content className="layout-default__main">
          <Outlet />
        </Content>
        <footer className="layout-default__footer">
          Copyright @2024 by Huyen
        </footer>
      </Layout>
    </>
  );
}

export default LayoutDefault;
