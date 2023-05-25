// SettingsPage.js
import React, { useState, useEffect } from 'react'
import { Select, Button, Upload, Space, Card } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import RCASetting from './RCASetting'

const { Title } = Typography

const { Option } = Select

const SettingsPage = () => {
  const [dataSet, setDataSet] = useState('')

  const handleChangeDataSet = (value) => {
    setDataSet(value)
  }

  const importedDataSets = [' admin-order_abort_1011', ' admin-order_cpu_1014', 'assurance_abort_1011']

  return (
    <div>
      <Title level={2}>系统设置页面</Title>
      <Card title="数据集管理" style={{ width: '100%' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
          <Button type='primary'>上传</Button>
          <div>
            <label>选择数据集：</label>
            <Select value={dataSet} onChange={handleChangeDataSet} style={{ width: '200px' }} defaultValue={importedDataSets[0]}>
              {importedDataSets.map((dataSet, index) => (
                <Option key={index} value={dataSet}>{dataSet}</Option>
              ))}
            </Select>
          </div>

        </Space>
      </Card>
      <Card title="根因分析算法设置" style={{ width: '100%' }}>
        <RCASetting />
      </Card>
    </div >
  )
}

export default SettingsPage
