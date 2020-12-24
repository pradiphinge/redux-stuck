import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../redux/actionCreators/auth";
import PropTypes from "prop-types";

const { SubMenu, Item } = Menu;

const Header = ({ user, logout }) => {
  const [current, setCurrent] = useState("home");
  const handleClick = (e) => setCurrent(e.key);
  //const { user } = auth;

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/"> Training</Link>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<LoginOutlined />}
          title={(user.name && user.name) || (user.email && user.email)}
          className="float-right"
        >
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};
Header.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Header);
