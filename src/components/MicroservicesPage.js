import React from 'react'
import { Collapse, Card, Typography } from 'antd'
import { AppstoreOutlined, ApiOutlined } from '@ant-design/icons'

const { Panel } = Collapse
const { Title } = Typography

// 示例数据
const mockData = [
  {
    id: 1,
    appName: ' Admin services',
    services: [

      {
        "id": 1,
        "serviceName": "ts-admin-route-service",
        "description": "This service is responsible for routing requests to the appropriate internal service. It handles routing rules and configurations."
      },
      {
        "id": 2,
        "serviceName": "ts-admin-basic-info-service",
        "description": "This service provides basic information about trips, destinations, and packages. It is used to power the initial information screens."
      },
      {
        "id": 3,
        "serviceName": "ts-admin-order-service",
        "description": "This service handles all aspects of orders placed by customers, including validation, payment processing, and status updates."
      }
    ],
  },
  {
    id: 2,
    appName: 'User and authentication services',
    services: [
      {
        "id": 1,
        "serviceName": "ts-ui-dashboard",
        "description": "This service provides the UI dashboard application for administering and monitoring the system."
      },
      {
        "id": 2,
        "serviceName": "ts-security-service",
        "description": "This service handles security related tasks like authentication, authorization and auditing."
      },
      {
        "id": 3,
        "serviceName": "ts-user-service",
        "description": "This service manages all aspects of user accounts, profiles and groups."
      },
      {
        "id": 4,
        "serviceName": "ts-auth-service",
        "description": "This service provides authentication and authorization for other services."
      },
      {
        "id": 5,
        "serviceName": "ts-verification-code-service",
        "description": "This service is responsible for generating and validating verification codes used for user signup and password resets."
      }
    ],
  },
]

const MicroservicesPage = () => {
  return (
    <div style={{ marginTop: '10px' }}>
      <Title level={2}>系统应用信息查询</Title>
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