import Graphin, { Behaviors } from "@antv/graphin"
import graphStore from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
import { Button } from "antd"
import LayoutSelection from "./LayoutSelection"
import { useState } from "react"

const { Tooltip } = Components


const { ZoomCanvas, ActivateRelations } = Behaviors



function Graph () {
  const handleTooltip = (value) => {
    if (value && value.model) {
      const { model } = value
      return (
        <div>
          <p>ID: {model.id}</p>
          <p>Application: Dashboard</p>
          <p>Score: {model.style.keyshape.size.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <LayoutSelection />
      <Button onClick={() => { }} style={{ marginLeft: '10px' }}> test button</Button>

      <Graphin data={graphStore.graphData} layout={{ type: graphStore.layout }} style={{ height: '1000px' }} >
        <ActivateRelations trigger="click" />
        <Tooltip bindType="node" style={{ width: '200px' }}>
          {handleTooltip}
        </Tooltip>
      </Graphin>

    </div>
  )
}

export default observer(Graph)
