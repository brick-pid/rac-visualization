// import Graphin from "@antv/graphin"
// import graphStore from "../stores/GraphStore"

// function StaticTopo () {
//   return (
//     <div>
//       <Graphin
//         data={
//           {
//             nodes: graphStore.graphData.nodes.map((node) => {
//               return {
//                 id: node.service_name,
//               }
//             }
//             ),
//             edges: graphStore.graphData.edges.map((edge) => {
//               return {
//                 source: edge.source,
//                 target: edge.target,
//                 style: {
//                   keyshape: {
//                     lineWidth: edge.lineWidth
//                   }
//                 }
//               }
//             })
//           }}
//       >
//       </Graphin>
//     </div>
//   )
// }

// export default StaticTopo

import Graphin from "@antv/graphin"
import staticTopoStore from "../stores/StaticTopoStore"
import graphStore from "../stores/GraphStore"

// map application_id{from 8 to 14} to color(red, blue, green, ...)
const appIdToColor = (application_id) => {
  const colors = ['red', 'blue', 'green', 'black', 'purple', 'orange', 'pink']
  const index = application_id - 8
  if (index >= 0 && index < colors.length) {
    return colors[index]
  } else {
    return 'Invalid application_id value'
  }
}

const genNodesData = () => {
  return graphStore.graphData.nodes.map((node) => {
    return {
      id: node.service_name,
      style: {
        label: {
          value: node.service_name
        },
        keyshape: {
          fill: appIdToColor(node.application_id),
          stroke: appIdToColor(node.application_id)
        }
      }
    }
  })
}

const genEdgesData = () => {
  return graphStore.graphData.edges.map((edge) => {
    return {
      source: edge.source,
      target: edge.target,
    }
  }
  )
}




const graphData = {
  nodes: genNodesData(),
  edges: genEdgesData()
}

function StaticTopo () {
  console.log("graphData", graphData)
  return (
    <Graphin data={graphData} width={800} height={600} />
  )
}

export default StaticTopo