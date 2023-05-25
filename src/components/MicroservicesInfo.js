import React, { useState, useEffect } from 'react'
import { Table, Input, Select, Space } from 'antd'
import staticTopoStore from '../stores/StaticTopoStore'

const { Search } = Input
const { Option } = Select

// 示例数据
const generateMockData = () => {
  staticTopoStore.getApplication()
  const applications = staticTopoStore.application
  const apps = applications.map((app) => {
    return app.app_name
  })
  console.log("apps", apps)
  const groups = apps
  const services = ['ts-admin-basic-info', 'istio-ingressgateway', 'ts-admin-order-service']
  const data = []

  for (let i = 0; i < 10; i++) {
    const group = groups[Math.floor(Math.random() * groups.length)]
    const service = services[Math.floor(Math.random() * services.length)]

    data.push({
      key: i,
      group,
      service,
      latency: Math.floor(Math.random() * 100),
      load: Math.floor(Math.random() * 100),
      successRate: Math.floor(Math.random() * 100),
    })
  }

  return data
}

const MicroservicesInfo = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)

  useEffect(() => {
    setData(generateMockData())
  }, [])

  useEffect(() => {
    const newData = data.filter(item => {
      return item.service.toLowerCase().includes(searchText.toLowerCase()) && (!selectedGroup || item.group === selectedGroup)
    })
    setFilteredData(newData)
  }, [data, searchText, selectedGroup])

  const customSorter = (a, b, key, sortOrder) => {
    return sortOrder === 'ascend'
      ? a[key] - b[key]
      : b[key] - a[key]
  }

  const columns = [
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      sorter: (a, b) => a.group.localeCompare(b.group),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      sorter: (a, b) => a.service.localeCompare(b.service),
    },
    {
      title: 'Latency',
      dataIndex: 'latency',
      key: 'latency',
      sorter: (a, b) => customSorter(a, b, 'latency', 'ascend'),
    },
    {
      title: 'Load',
      dataIndex: 'load',
      key: 'load',
      sorter: (a, b) => customSorter(a, b, 'load', 'ascend'),
    },
    {
      title: 'Success Rate',
      dataIndex: 'successRate',
      key: 'successRate',
      sorter: (a, b) => customSorter(a, b, 'successRate', 'ascend'),
    },
  ]


  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Search
          placeholder="Search service"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Select group"
          onChange={value => setSelectedGroup(value)}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="Notification and configuration services">Notification and configuration services</Option>
          <Option value="Admin services">Admin services</Option>
          <Option value="Payment and pricing services">Payment and pricing services</Option>
          <Option value="Order and reservation services">Order and reservation services</Option>
          <Option value="Route and travel services">Route and travel services</Option>
        </Select>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowClassName={record => (record.load > 70 ? 'high-load' : '')}
      />
    </Space>
  )
}

export default MicroservicesInfo
