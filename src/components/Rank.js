//可疑微服务排名组件
import { observer } from 'mobx-react-lite'
import graphStore from '../stores/GraphStore'
import { List } from 'antd'

const Rank = () => {
  const scores = { 'istio-ingressgateway': 1128.8893690579082, 'ts-admin-order-service': 366.953385127636, 'ts-ui-dashboard': 32.84087411511234 }
  const data = Object.entries(scores).map(([key, value]) => ({ name: key, score: value.toFixed(2) }))
  return (
    <div style={{ marginTop: '50px' }}>
      <h1>可疑微服务排名</h1>
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.name} description={
              `Score: ${item.score}`} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default observer(Rank)
