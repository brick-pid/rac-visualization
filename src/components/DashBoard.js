import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

function Dashboard () {
  return (

    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white' }}>
        <div className="logo" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          A system for detecting suspicious microservices
        </div>
      </Header>
      <Layout style={{ marginTop: '64px' }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title="微服务拓扑">
              <Menu.Item key="1">
                <NavLink to="/graph">
                  Graph
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="可疑微服务排序">
              <Menu.Item key="2">
                <NavLink to="/rank">
                  Rank
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="微服务数据">
              <Menu.Item key="3">
                <NavLink to="/microservicesPage">
                  Microservices Page
                </NavLink>
              </Menu.Item>
              <Menu.Item key="32">
                <NavLink to="/microservicesInfo">
                  Microservices Info
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title="自定义设置">
              <Menu.Item key="4">
                <NavLink to="/setting">
                  Setting
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Dashboard
