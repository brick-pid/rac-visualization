import { makeAutoObservable } from "mobx"

const data = {
  "istio-ingressgateway": {
    "score": 1128.8893690579082,
    "pattern": ["istio-ingressgateway"],
    "pattern_score": 0.5017286084701814,
    "in-pattern_score": 2250
  },
  "ts-ui-dashboard": {
    "score": 32.84087411511234,
    "pattern": ["ts-ui-dashboard"],
    "pattern_score": 0.33856571252693135,
    "in-pattern_score": 97
  },
  "ts-admin-order-service": {
    "score": 366.953385127636,
    "pattern": ["ts-admin-order-service"],
    "pattern_score": 0.3190899001109878,
    "in-pattern_score": 1150
  }
}

const nodes = Object.keys(data).map(key => ({
  id: key,
  style: {
    keyshape: {
      size: Math.sqrt(data[key].score * 10), // 将 Score 归一化为节点大小
    },
    label: {
      value: key,
    }
  }
}))

const edges = []

const graphDataMooc = {
  nodes,
  edges,
}


console.log(graphDataMooc)

class GraphStore {
  constructor() {
    makeAutoObservable(this)
  }

  // Observable state
  graphData = graphDataMooc

  // Actions
  setGraphData = (graphData) => {
    this.graphData = graphData
  }
}

const graphStore = new GraphStore()
export default graphStore
