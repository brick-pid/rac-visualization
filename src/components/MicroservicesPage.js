import React from 'react'
import { Collapse, Card, Typography } from 'antd'
import { AppstoreOutlined, ApiOutlined } from '@ant-design/icons'

const { Panel } = Collapse
const { Title } = Typography

// 示例数据
const mockData = [
  {
    id: 1,
    appName: '应用A',
    services: [
      { id: 1, serviceName: 'istio-ingressgateway', description: 'istio-ingressgateway 的描述' },
      { id: 2, serviceName: 'ts-ui-dashboard', description: 'ts-ui-dashboard的描述' },
    ],
  },
  {
    id: 2,
    appName: '应用B',
    services: [
      { id: 1, serviceName: '微服务B1', description: '微服务B1的描述' },
      { id: 2, serviceName: '微服务B2', description: '微服务B2的描述' },
    ],
  },
]

const MicroservicesPage = () => {
  return (
    <div style={{ padding: '2rem', marginTop: '50px' }}>
      <Title level={2}>微服务信息检索</Title>
      <Collapse accordion>
        {mockData.map((app) => (
          <Panel header={app.appName} key={app.id} extra
            ={<AppstoreOutlined />}>
            {app.services.map((service) => (
              <Card
                key={service.id}
                title={
                  <>
                    <ApiOutlined /> {service.serviceName}
                  </>
                }
                style={{ marginBottom: '1rem' }}
              >
                <p>{service.description}</p>
              </Card>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default MicroservicesPage