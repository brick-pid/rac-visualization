import Graphin, { Behaviors } from "@antv/graphin"
import graphStore from "../stores/GraphStore"
import { observer } from "mobx-react-lite"

const { ZoomCanvas } = Behaviors

function Graph () {
  return (
    <Graphin data={graphStore.graphData} >
      <ZoomCanvas disabled />
    </Graphin>
  )
}

export default observer(Graph)