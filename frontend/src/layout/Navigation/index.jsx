import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  AlertOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{ zIndex: 1000 }}
    >
      <div className="logo" />

      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/" />
          Home Page
        </Menu.Item>

        <Menu.Item key="2" icon={<EnvironmentOutlined />}>
          <Link to="/camp" />
          Camps
        </Menu.Item>

        <Menu.Item key="9" icon={<DatabaseOutlined />}>
          <Link to="/resource" />
          Resources
        </Menu.Item>

        {/* add recent */}
        <Menu.Item key="10" icon={<BarChartOutlined />}>
          <Link to="/consumption" />
          Consumption
        </Menu.Item>

{/* add recent  */}
        <Menu.Item key="11" icon={<AlertOutlined />}>
  <Link to="/alerts" />
  Alerts
</Menu.Item>

        <Menu.Item key="3" icon={<CustomerServiceOutlined />}>
          <Link to="/customer" />
          Customer
        </Menu.Item>

        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/selectcustomer" />
          Custom Select Customer
        </Menu.Item>

        <Menu.Item key="5" icon={<FileTextOutlined />}>
          <Link to="/lead" />
          Lead
        </Menu.Item>

        <Menu.Item key="6" icon={<FileSyncOutlined />}>
          <Link to="/product" />
          Product
        </Menu.Item>

        <Menu.Item key="7" icon={<TeamOutlined />}>
          <Link to="/admin" />
          Admins Management
        </Menu.Item>

        <Menu.Item key="8" icon={<SettingOutlined />}>
          <Link to="/settings" />
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Navigation;