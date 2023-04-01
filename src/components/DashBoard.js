import React from 'react'
import { Layout, Menu } from 'antd'
import Graph from './Graph'
import Rank from './Rank'
import Application from './Application'
import Setting from './Setting'
import LoginPage from './Login'
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'

const { Header } = Layout


function Dashboard () {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <NavLink to='/graph' activeClassName="active"> Graph </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to='/rank' activeClassName="active"> Rank </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to='/application' activeClassName="active"> Application </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to='/setting' activeClassName="active"> Setting </NavLink>
            </Menu.Item>
          </Menu>
        </Header>
        <Routes>
          <Route path="/graph" element={<Header><Graph /></Header>} />
          <Route path="/rank" element={<Header><Rank /></Header>} />
          <Route path="/application" element={<Header><Application /></Header>} />
          <Route path="/setting" element={<Header><Setting /></Header>} />
          <Route path="login" element={<Header><LoginPage /></Header>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Dashboard
