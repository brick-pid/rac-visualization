import React from 'react'
import { Layout, Menu } from 'antd'
import Graph from './Graph'
import Rank from './Rank'
import MicroservicesPage from './MicroservicesPage'
import Setting from './Setting'
import LoginPage from './Login'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

function Dashboard () {
  return (
    <BrowserRouter>
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
              <SubMenu key="sub1" title="Graph">
                <Menu.Item key="1">
                  <NavLink to="/graph" activeClassName="active">
                    Graph
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title="Rank">
                <Menu.Item key="2">
                  <NavLink to="/rank" activeClassName="active">
                    Rank
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="Microservices">
                <Menu.Item key="3">
                  <NavLink to="/microservices" activeClassName="active">
                    Microservices
                  </NavLink>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="Setting">
                <Menu.Item key="4">
                  <NavLink to="/setting" activeClassName="active">
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
              <Routes>
                <Route path="/graph" element={<Graph />} />
                <Route path="/rank" element={<Rank />} />
                <Route path="/microservices" element={<MicroservicesPage />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="login" element={<LoginPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default Dashboard
