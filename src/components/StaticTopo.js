import Graphin from "@antv/graphin"
import graphStore, { fetchEdgesDataByTimeSpan } from "../stores/GraphStore"

function StaticTopo () {
  return (
    <div>
      <Graphin
        data={
          {
            nodes: graphStore.graphData.nodes.map((node) => {
              return {
                id: node.service_name,
              }
            }
            ),
            edges: graphStore.graphData.edges.map((edge) => {
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
          }}
      >
      </Graphin>
    </div>
  )
}

export default StaticTopo