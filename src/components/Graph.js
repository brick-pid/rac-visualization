import Graphin, { Behaviors } from "@antv/graphin"
import graphStore from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
import LayoutSelection from "./LayoutSelection"

const { Tooltip } = Components


const { ZoomCanvas, ActivateRelations } = Behaviors

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
    <div style={{ marginTop: '50px' }}>
      <LayoutSelection onChange={(value) => graphStore.setLayout(value)} />
      <Graphin data={graphStore.graphData} layout={graphStore.layout} style={{ height: '1000px' }} >
        <ZoomCanvas disabled />
        <ActivateRelations trigger="click" />
        <Tooltip bindType="node" style={{ padding: '10px', width: '250px' }}>
          {handleTooltip}
        </Tooltip>
      </Graphin>
    </div>
  )
}

export default observer(Graph)
