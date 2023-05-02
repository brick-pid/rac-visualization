import { makeAutoObservable, action } from "mobx"
import axios from "axios"

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
    nodes: [],
    edges: []
  };

  // 添加一个状态，表示数据是否已加载
  isEdgesDataLoaded = false;
  isNodesDataLoaded = false;

  setGraphData = (graphData) => {
    this.graphData = graphData
  };

  // 更新数据
  setEdgesData = (edgesData) => {
    this.graphData.edges = edgesData
  };
  setNodesData = (nodesData) => {
    this.graphData.nodes = nodesData
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
    const response = await axios.get("http://localhost:5000/invocation/random")
    const edges_data = response.data
    // 请求成功后，调用`setEdgesData`方法更新`edges_data`，并将`isEdgesDataLoaded`设置为`true`
    graphStore.setEdgesData(edges_data)
    graphStore.isEdgesDataLoaded = true
    console.log("graphStore 中请求 edges 数据完成", graphStore.graphData.edges)
  } catch (error) {
    console.error("fetch edges data error", error)
  }
})

// 在graphStore类外部调用`fetchEdgesData`执行异步请求
fetchEdgesData()

// 通过 action 处理异步请求
const fetchNodesData = action(async () => {
  try {
    const response = await axios.get("http://localhost:5000/microservice/all")
    const nodes_data = response.data
    // 请求成功后，调用`setNodesData`方法更新`nodes_data`，并将`isNodesDataLoaded`设置为`true`
    graphStore.setNodesData(nodes_data)
    graphStore.isNodesDataLoaded = true
    console.log("graphStore 中请求 nodes 数据完成", graphStore.graphData.nodes)
  } catch (error) {
    console.error("fetch nodes data error", error)
  }
})

// 在graphStore类外部调用`fetchNodesData`执行异步请求
fetchNodesData()

export default graphStore


// graphin 的数据格式
// {
//   id: node.name,
//   style: {
//     keyshape: {
//       size: node.probability * 100,
//     },
//     label: {
//       value: node.name,
//     }
//   }
// }