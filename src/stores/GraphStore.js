import { makeAutoObservable } from "mobx"

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

console.log(service_data)

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

const edges = [{ source: 'ts-basic-service', target: 'ts-station-service', prob: 0.146 }, { source: 'ts-ticketinfo-service', target: 'ts-basic-service', prob: 0.088 }, { source: 'ts-travel-service', target: 'ts-ticketinfo-service', prob: 0.059 }, { source: 'ts-travel-service', target: 'ts-route-service', prob: 0.054 }, { source: 'ts-seat-service', target: 'ts-travel-service', prob: 0.04 }, { source: 'ts-travel-service', target: 'ts-train-service', prob: 0.031 }, { source: 'istio-ingressgateway', target: 'ts-ui-dashboard', prob: 0.028 }, { source: 'istio-ingressgateway', target: 'ts-verification-code-service', prob: 0.027 }, { source: 'ts-seat-service', target: 'ts-config-service', prob: 0.022 }, { source: 'ts-admin-order-service', target: 'ts-order-service', prob: 0.021 }, { source: 'istio-ingressgateway', target: 'ts-admin-order-service', prob: 0.021 }, { source: 'ts-seat-service', target: 'ts-order-service', prob: 0.02 }, { source: 'ts-food-service', target: 'ts-food-map-service', prob: 0.019 }, { source: 'ts-order-other-service', target: 'ts-station-service', prob: 0.018 }, { source: 'istio-ingressgateway', target: 'ts-order-other-service', prob: 0.018 }, { source: 'istio-ingressgateway', target: 'ts-order-service', prob: 0.018 }, { source: 'ts-food-service', target: 'ts-station-service', prob: 0.017 }, { source: 'ts-order-service', target: 'ts-station-service', prob: 0.017 }, { source: 'ts-admin-order-service', target: 'ts-order-other-service', prob: 0.015 }, { source: 'ts-basic-service', target: 'ts-price-service', prob: 0.015 }, { source: 'ts-basic-service', target: 'ts-train-service', prob: 0.015 }, { source: 'ts-basic-service', target: 'ts-route-service', prob: 0.015 }, { source: 'ts-travel-service', target: 'ts-seat-service', prob: 0.013 }, { source: 'ts-cancel-service', target: 'ts-order-service', prob: 0.012 }, { source: 'istio-ingressgateway', target: 'ts-assurance-service', prob: 0.012 }, { source: 'istio-ingressgateway', target: 'ts-contacts-service', prob: 0.012 }, { source: 'ts-travel-plan-service', target: 'ts-ticketinfo-service', prob: 0.012 }, { source: 'istio-ingressgateway', target: 'ts-food-service', prob: 0.012 }, { source: 'ts-travel2-service', target: 'ts-route-service', prob: 0.011 }, { source: 'ts-food-service', target: 'ts-travel-service', prob: 0.01 }, { source: 'ts-travel2-service', target: 'ts-ticketinfo-service', prob: 0.009 }, { source: 'ts-seat-service', target: 'ts-travel2-service', prob: 0.008 }, { source: 'istio-ingressgateway', target: 'ts-cancel-service', prob: 0.008 }, { source: 'ts-inside-payment-service', target: 'ts-order-service', prob: 0.008 }, { source: 'ts-travel2-service', target: 'ts-train-service', prob: 0.008 }, { source: 'ts-travel-service', target: 'ts-order-service', prob: 0.007 }, { source: 'ts-travel-plan-service', target: 'ts-seat-service', prob: 0.007 }, { source: 'istio-ingressgateway', target: 'ts-auth-service', prob: 0.007 }, { source: 'ts-security-service', target: 'ts-order-other-service', prob: 0.007 }, { source: 'ts-security-service', target: 'ts-order-service', prob: 0.007 }, { source: 'ts-auth-service', target: 'ts-verification-code-service', prob: 0.006 }, { source: 'ts-route-plan-service', target: 'ts-travel-service', prob: 0.006 }, { source: 'istio-ingressgateway', target: 'ts-preserve-service', prob: 0.005 }, { source: 'ts-preserve-service', target: 'ts-notification-service', prob: 0.005 }, { source: 'ts-preserve-service', target: 'ts-station-service', prob: 0.005 }, { source: 'ts-preserve-service', target: 'ts-user-service', prob: 0.005 }, { source: 'ts-preserve-service', target: 'ts-food-service', prob: 0.004 }, { source: 'ts-inside-payment-service', target: 'ts-payment-service', prob: 0.004 }, { source: 'ts-preserve-service', target: 'ts-assurance-service', prob: 0.004 }, { source: 'ts-seat-service', target: 'ts-order-other-service', prob: 0.004 }, { source: 'istio-ingressgateway', target: 'ts-inside-payment-service', prob: 0.004 }, { source: 'ts-cancel-service', target: 'ts-inside-payment-service', prob: 0.004 }, { source: 'ts-cancel-service', target: 'ts-notification-service', prob: 0.004 }, { source: 'ts-preserve-service', target: 'ts-order-service', prob: 0.004 }, { source: 'ts-cancel-service', target: 'ts-user-service', prob: 0.004 }, { source: 'ts-preserve-service', target: 'ts-seat-service', prob: 0.003 }, { source: 'ts-route-plan-service', target: 'ts-travel2-service', prob: 0.003 }, { source: 'ts-travel-plan-service', target: 'ts-station-service', prob: 0.003 }, { source: 'ts-preserve-service', target: 'ts-security-service', prob: 0.003 }, { source: 'ts-preserve-service', target: 'ts-contacts-service', prob: 0.003 }, { source: 'istio-ingressgateway', target: 'ts-travel-plan-service', prob: 0.003 }, { source: 'ts-preserve-service', target: 'ts-ticketinfo-service', prob: 0.003 }, { source: 'istio-ingressgateway', target: 'ts-travel-service', prob: 0.003 }, { source: 'ts-preserve-service', target: 'ts-travel-service', prob: 0.002 }, { source: 'ts-travel2-service', target: 'ts-seat-service', prob: 0.002 }, { source: 'ts-cancel-service', target: 'ts-order-other-service', prob: 0.002 }, { source: 'istio-ingressgateway', target: 'ts-consign-service', prob: 0.001 }, { source: 'ts-travel2-service', target: 'ts-order-other-service', prob: 0.001 }, { source: 'ts-inside-payment-service', target: 'ts-order-other-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-notification-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-station-service', prob: 0.001 }, { source: 'istio-ingressgateway', target: 'ts-preserve-other-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-user-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-food-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-assurance-service', prob: 0.001 }, { source: 'ts-travel-plan-service', target: 'ts-route-plan-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-order-other-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-seat-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-ticketinfo-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-security-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-contacts-service', prob: 0.001 }, { source: 'ts-preserve-other-service', target: 'ts-travel2-service', prob: 0.001 }, { source: 'istio-ingressgateway', target: 'ts-admin-basic-info-service', prob: 0.001 }, { source: 'ts-admin-basic-info-service', target: 'ts-train-service', prob: 0.001 }, { source: 'ts-admin-basic-info-service', target: 'ts-config-service', prob: 0.001 }, { source: 'ts-admin-basic-info-service', target: 'ts-price-service', prob: 0.001 }, { source: 'ts-admin-basic-info-service', target: 'ts-station-service', prob: 0.001 }, { source: 'ts-admin-travel-service', target: 'ts-travel-service', prob: 0.001 }, { source: 'istio-ingressgateway', target: 'ts-admin-travel-service', prob: 0.001 }, { source: 'ts-admin-travel-service', target: 'ts-travel2-service', prob: 0.001 }, { source: 'ts-admin-basic-info-service', target: 'ts-contacts-service', prob: 0.001 }, { source: 'istio-ingressgateway', target: 'ts-admin-route-service', prob: 0.001 }, { source: 'ts-admin-route-service', target: 'ts-route-service', prob: 0.001 }, { source: 'istio-ingressgateway', target: 'ts-admin-user-service', prob: 0.001 }, { source: 'ts-admin-user-service', target: 'ts-user-service', prob: 0.001 }, { source: 'ts-ui-dashboard', target: 'ts-verification-code-service', prob: 0.001 }, { source: 'ts-ui-dashboard', target: 'ts-travel-service', prob: 0.001 }]

const edges_data = edges.map((edge) => ({
  source: edge.source,
  target: edge.target,
  style: {
    keyshape: {
      lineWidth: edge.prob * 120,
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
edges_data.forEach((edge) => {
  criticalPath.forEach((criticalEdge) => {
    if (edge.source === criticalEdge.source && edge.target === criticalEdge.target) {
      edge.style.keyshape.stroke = "#f5222d"
    }
  })
})



const graphDataMooc = {
  "nodes": nodes,
  "edges": edges_data
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
