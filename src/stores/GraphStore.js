import { makeAutoObservable } from "mobx"

class GraphStore {
  constructor() {
    makeAutoObservable(this)
  }

  // Observable state
  graphData = {
    nodes: [
      {
        id: "node1",
        label: "node1",
      },
      {
        id: "node2",
        label: "node2",
      },
    ],
    edges: [
      {
        source: "node1",
        target: "node2",
      },
    ],
  }

  // Actions
  setGraphData = (graphData) => {
    this.graphData = graphData
  }
}

const graphStore = new GraphStore()
export default graphStore
