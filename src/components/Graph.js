import Graphin, { Behaviors } from "@antv/graphin"
import graphStore from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
const { Tooltip } = Components


const { ZoomCanvas } = Behaviors

function Graph () {
  const handleTooltip = (value) => {
    if (value && value.model) {
      const { model } = value
      return (
        <div>
          <p>ID: {model.id}</p>
          <p>Score: {model.style.keyshape.size}</p>
        </div>
      )
    }
    return null
  }
  return (
    <Graphin data={graphStore.graphData} >
      <ZoomCanvas disabled />
      <Tooltip bindType="node" style={{ padding: '10px', width: '250px' }}>
        {handleTooltip}
      </Tooltip>
    </Graphin>
  )
}

export default observer(Graph)