// SettingsPage.js
import React, { useState, useEffect } from 'react'
import { Select, Button, Upload, DatePicker, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const { Title } = Typography

const { Option } = Select
const { RangePicker } = DatePicker

const SettingsPage = () => {
  const [algorithm, setAlgorithm] = useState('')
  const [dataSet, setDataSet] = useState('')
  const [importedDataSets, setImportedDataSets] = useState([])
  const [dateRange, setDateRange] = useState([])

  // Fetch the list of previously imported data sets when the component mounts
  useEffect(() => {
    // Replace this with an API call to fetch the imported data sets
    const fetchDataSets = async () => {
      const data = await fetch('your-api-url/data-sets')
      const json = await data.json()
      setImportedDataSets(json)
    }

    fetchDataSets()
  }, [])

  const handleChangeAlgorithm = (value) => {
    setAlgorithm(value)
  }

  const handleChangeDataSet = (value) => {
    setDataSet(value)
  }

  const handleImportLogData = (file) => {
    // Implement your logic to import log data here
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
  }

  const handleSubmit = () => {
    // Implement your logic to save the configuration and perform RCA here
  }

  const getMonthRange = (offset) => {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth() - offset, 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1 - offset, 0)
    return [firstDay, lastDay]
  }

  return (
    <div>
      <Title level={2}>设置</Title>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <label>RCA Algorithm: </label>
          <Select value={algorithm} onChange={handleChangeAlgorithm} style={{ width: '130px' }}>
            <Option value="random_walk">Random Walk</Option>
            <Option value="TraceRCA">TraceRCA</Option>
          </Select>
        </div>
        <div>
          <label>Import Log Data: </label>
          <Upload beforeUpload={handleImportLogData} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div>
          <label>Select Data Set: </label>
          <Select value={dataSet} onChange={handleChangeDataSet} style={{ width: '130px' }}>
            {importedDataSets.map((dataSet, index) => (
              <Option key={index} value={dataSet.id}>{dataSet.name}</Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Date Range: </label>
          <RangePicker
            value={dateRange}
            presets={{
              'Last Month': getMonthRange(1),
              'Last 3 Months': getMonthRange(3),
              'Last 6 Months': getMonthRange(6),
            }}
            onChange={handleDateRangeChange}
          />

        </div>
        <div>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Space>
    </div>
  )
}

export default SettingsPage
