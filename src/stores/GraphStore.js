import { makeAutoObservable, action } from "mobx"
import axios from "axios"

const services = ['ts-cancel-service', 'ts-travel2-service', 'ts-train-service', 'ts-notification-service', 'ts-order-other-service', 'ts-payment-service', 'ts-admin-basic-info-service', 'ts-consign-service', 'ts-preserve-service', 'ts-order-service', 'ts-inside-payment-service', 'ts-config-service', 'ts-price-service', 'ts-seat-service', 'ts-travel-plan-service', 'ts-route-plan-service', 'ts-ticketinfo-service', 'ts-station-service', 'ts-contacts-service', 'ts-preserve-other-service', 'ts-route-service', 'ts-security-service', 'ts-travel-service', 'ts-admin-route-service', 'ts-basic-service', 'istio-ingressgateway', 'ts-ui-dashboard', 'ts-admin-order-service', 'ts-auth-service', 'ts-food-map-service', 'ts-assurance-service', 'ts-food-service', 'ts-user-service', 'ts-verification-code-service', 'ts-admin-user-service', 'ts-admin-travel-service']
const scores = { 'istio-ingressgateway': 1128.8893690579082, 'ts-ui-dashboard': 32.84087411511234, 'ts-admin-order-service': 366.953385127636 }
const total_invocations = 1526

// add a score field to each service if the scores less than 1/3 of total_invocations, then use 1/3 of total_invocations
for (let i = 0; i < services.length; i++) {
  if (!scores[services[i]] || scores[services[i]] < total_invocations / 3) {
    scores[services[i]] = total_invocations / 3
  }
}

// if a service has a score in scores, then use it, otherwise use 1
const service_data = services.map((service) => ({
  id: service,
  score: scores[service] || 0,
  prob: scores[service] / total_invocations
}))

// console.log(service_data)

const nodes = service_data.map(service => ({
  id: service.id,
  style: {
    keyshape: {
      size: service.prob * 100,
    },
    label: {
      value: service.id,
    }
  }
}))


// add a method to get critical path which will be highlighted visually
const criticalPath = [
  {
    source: "istio-ingressgateway",
    target: "ts-order-service"
  },
  {
    source: "ts-order-service",
    target: "ts-payment-service"
  },
  {
    source: "istio-ingressgateway",
    target: "ts-admin-order-service"
  },
  {
    source: "istio-ingressgateway",
    target: "ts-ui-dashboard"
  },
  {
    source: "ts-admin-order-service",
    target: "ts-order-service"
  }
]

// make the edge of the critical path red
// edges_data.forEach((edge) => {
//   criticalPath.forEach((criticalEdge) => {
//     if (edge.source === criticalEdge.source && edge.target === criticalEdge.target) {
//       edge.style.keyshape.stroke = "#f5222d"
//     }
//   })
// })

class GraphStore {
  constructor() {
    makeAutoObservable(this)
  }

  // graph data
  graphData = {
    nodes: nodes,
    edges: []
  };

  // 添加一个状态，表示边数据是否已加载
  isEdgesDataLoaded = false;

  setGraphData = (graphData) => {
    this.graphData = graphData
  };

  // 更新edges数据
  setEdgesData = (edgesData) => {
    this.graphData.edges = edgesData
  };

  // layout
  layout = "graphin-force";
  setLayout = (layout) => {
    this.layout = layout
    console.log("change layout to ", this.layout)
  };
}

const graphStore = new GraphStore()

// 通过 action 处理异步请求
const fetchEdgesData = action(async () => {
  try {
    const response = await axios.get("http://localhost:8080/invocation/edges")
    const edges_data = response.data.map((edge) => ({
      source: edge.source,
      target: edge.target,
      style: {
        keyshape: {
          lineWidth: edge.probability * 120,
        },
      },
    }))
    // 请求成功后，调用`setEdgesData`方法更新`edges_data`，并将`isEdgesDataLoaded`设置为`true`
    graphStore.setEdgesData(edges_data)
    graphStore.isEdgesDataLoaded = true
    console.log("graphStore 中请求 edges 数据完成", graphStore.graphData)
  } catch (error) {
    console.error("error", error)
  }
})

// 在graphStore类外部调用`fetchEdgesData`执行异步请求
fetchEdgesData()

export default graphStore