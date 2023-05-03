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

  // graphinData
  graphinData = {
    nodes: [],
    edges: []
  }
  setGraphinNodes = (nodes) => {
    this.graphinData.nodes = nodes
  }
  setGraphinEdges = (edges) => {
    this.graphinData.edges = edges
  }
  // 添加一个状态，表示数据是否已加载
  isGraphinEdgesLoaded = false;
  isGraphinNodesLoaded = false;
  // update flags
  setGraphinEdgesLoaded = (isGraphinEdgesLoaded) => {
    this.isGraphinEdgesLoaded = isGraphinEdgesLoaded
  };
  setGraphinNodesLoaded = (isGraphinNodesLoaded) => {
    this.isGraphinNodesLoaded = isGraphinNodesLoaded
  };

  // 添加一个状态，表示数据是否已加载
  isEdgesDataLoaded = false;
  isNodesDataLoaded = false;
  // update flags
  setEdgesDataLoaded = (isEdgesDataLoaded) => {
    this.isEdgesDataLoaded = isEdgesDataLoaded
  };
  setNodesDataLoaded = (isNodesDataLoaded) => {
    this.isNodesDataLoaded = isNodesDataLoaded
  };

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

// 获取某个timespan内的边数据
const fetchEdgesDataByTimeSpan = action(async (timeSpan) => {
  try {
    const response = await axios.post("http://localhost:5000/invocation/timespan/compressed", {
      begin: timeSpan[0],
      end: timeSpan[1]
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const edges_data = response.data
    // 请求成功后，调用`setEdgesData`方法更新`edges_data`，并将`isEdgesDataLoaded`设置为`true`
    graphStore.setEdgesData(edges_data)
    graphStore.setEdgesDataLoaded(true)
    console.log("graphStore 中按照 timespan", timeSpan, " 更新 edges 数据完成", graphStore.graphData.edges)
  } catch (error) {
    console.error("fetch edges data error", error)
  }
})

// 获取初始数据
fetchEdgesDataByTimeSpan(["2019-10-01", "2019-11-01"])

// 通过 action 处理异步请求
const fetchNodesData = action(async () => {
  try {
    const response = await axios.get("http://localhost:5000/microservice/all")
    const nodes_data = response.data
    // 请求成功后，调用`setNodesData`方法更新`nodes_data`，并将`isNodesDataLoaded`设置为`true`
    graphStore.setNodesData(nodes_data)
    graphStore.setNodesDataLoaded(true)
    console.log("graphStore 中请求 nodes 数据完成", graphStore.graphData.nodes)
  } catch (error) {
    console.error("fetch nodes data error", error)
  }
})

// 在graphStore类外部调用`fetchNodesData`执行异步请求
fetchNodesData()

const generateGraphinData = action(() => {
  // set graphin data

  graphStore.setGraphinEdgesLoaded(true)
  graphStore.setGraphinNodesLoaded(true)

  graphStore.setGraphinNodes(
    graphStore.graphData.nodes.map((node) => {
      return {
        id: node.service_name,
        description: node.description,
        // style: {...}
      }
    })
  )

  graphStore.setGraphinEdges(
    graphStore.graphData.edges.map((edge) => {
      return {
        source: edge.source,
        target: edge.target,
        style: {
          keyshape: {
            lineWidth: edge.lineWidth
          }

        }
      }
    })
  )
})

if (graphStore.isEdgesDataLoaded && graphStore.isNodesDataLoaded) {
  generateGraphinData()
}

export default graphStore
export { fetchEdgesDataByTimeSpan }