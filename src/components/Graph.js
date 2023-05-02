import Graphin, { Behaviors } from "@antv/graphin"
import graphStore from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
import { Button, DatePicker } from "antd"
import LayoutSelection from "./LayoutSelection"
import { useState } from "react"

const { Tooltip } = Components
const { RangePicker } = DatePicker

const { ActivateRelations } = Behaviors



function Graph () {
  const [dateRange, setDateRange] = useState([])

  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
  }

  const getMonthRange = (offset) => {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), date.getMonth() - offset, 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1 - offset, 0)
    return [firstDay, lastDay]
  }

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

  console.log("在 Graph 组件中 ：graphStore.graphData", graphStore.graphData)

  return (
    <div>
      <div>
        <LayoutSelection />
        <Button onClick={() => { }} style={{ marginLeft: '10px' }}> 故障传播路径 </Button>
        <RangePicker
          style={{ marginLeft: '10px' }}
          value={dateRange}
          presets={{
            'Last Month': getMonthRange(1),
            'Last 3 Months': getMonthRange(3),
            'Last 6 Months': getMonthRange(6),
          }}
          onChange={handleDateRangeChange}
        />
      </div>




      {graphStore.isEdgesDataLoaded && graphStore.isNodesDataLoaded && (
        <Graphin
          data={{
            nodes: graphStore.graphData.nodes.map((node) => {
              return {
                id: node.service_name,
                description: node.description,
                // style: {...}
              }
            }),
            edges: graphStore.graphData.edges.map((edge) => {
              return {
                source: edge.source,
                target: edge.target,
                // style: {...}
              }
            })
          }}
          layout={{ type: graphStore.layout }}
          style={{ height: "1000px" }}
        >
          <ActivateRelations trigger="click" />
          <Tooltip bindType="node" style={{ width: "200px" }}>
            {handleTooltip}
          </Tooltip>
        </Graphin>
      )}
    </div>
  )
}
export default observer(Graph)
