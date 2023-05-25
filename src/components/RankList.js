import { useState, useEffect } from 'react'
import { List, Typography, Card, Radio } from 'antd'

const { Title } = Typography

const scoresRaw = {
  'istio-ingressgateway': 1128.8893690579082,
  'ts-admin-order-service': 366.953385127636,
  'ts-ui-dashboard': 32.84087411511234,
}

const scoresRW = {
  'ts-admin-order-service': 365,
  'istio-ingressgateway': 130,
  'ts-ui-dashboard': 13,
  'ts-user-service': 5,
  'ts-vip-service': 1,
}

let scoresData = Object.entries(scoresRaw).map(([key, value]) => ({
  name: key,
  score: value.toFixed(2),
}))

let scoresDataRW = Object.entries(scoresRW).map(([key, value]) => ({
  name: key,
  score: value.toFixed(2),
}))

const RankList = ({ algorithm }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('TraceRCA')
  const [scores, setScores] = useState(scoresData)
  useEffect(() => { calculateScores(selectedAlgorithm) }, [selectedAlgorithm])



  const calculateScores = (algorithm) => {
    console.log("calculate RCA data")
    if (algorithm === 'TraceRCA') {

      setScores(scoresData)
      console.log("RCA data: ", scores)
    }
    else if (algorithm === 'RandomWalk') {

      setScores(scoresDataRW)
    }
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <Title level={2}>可疑微服务排名</Title>
      <Radio.Group
        onChange={(e) => {
          setSelectedAlgorithm(e.target.value)
          console.log("current RCA Algo: ", selectedAlgorithm)
        }}
        value={selectedAlgorithm}
      >
        <Radio.Button value="TraceRCA">TraceRCA</Radio.Button>
        <Radio.Button value="RandomWalk">RandomWalk</Radio.Button>
      </Radio.Group>
      <List
        itemLayout="vertical"
        dataSource={scores}
        renderItem={(item, index) => (
          <List.Item>
            <Card>
              <List.Item.Meta
                title={`${index + 1}. ${item.name}`}
                description={`Score: ${item.score}`}
                // add onMouseEnter event to show microservice information
                onMouseEnter={() => {
                  // handle showing microservice information
                }}
                // add onMouseLeave event to hide microservice information
                onMouseLeave={() => {
                  // handle hiding microservice information
                }}
              />
              {/* add component to display microservice information */}
              {/* this component should be hidden by default */}
              <div style={{ display: 'none' }}>
                {/* display microservice information */}
                {/* this component can show any information about the microservice */}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default RankList
