import { observer } from 'mobx-react-lite'
import { List, Typography, Card } from 'antd'

const { Title } = Typography

const Rank = () => {
  const scores = {
    'istio-ingressgateway': 1128.8893690579082,
    'ts-admin-order-service': 366.953385127636,
    'ts-ui-dashboard': 32.84087411511234,
  }
  const data = Object.entries(scores).map(([key, value]) => ({
    name: key,
    score: value.toFixed(2),
  }))

  return (
    <div style={{ marginTop: '10px' }}>
      <Title level={2}>可疑微服务排名</Title>
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <Card>
              <List.Item.Meta
                title={`${index + 1}. ${item.name}`}
                description={`Score: ${item.score}`}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default observer(Rank)
