import Graphin, { Behaviors } from "@antv/graphin"
import graphStore, { fetchEdgesDataByTimeSpan } from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
import { Button, DatePicker } from "antd"
import LayoutSelection from "./LayoutSelection"
import { useState } from "react"

const { Tooltip } = Components
const { RangePicker } = DatePicker

const { ActivateRelations } = Behaviors



function Graph () {
  const [labelFlag, setLabelFlag] = useState(false)
  const [criticalFlag, setCriticalFlag] = useState(false)
  const handleDateRangeChange = (dateRange) => {
    // console.log("日期更新", dateRange)
    if (dateRange[1]) {
      const startDate = dateRange[0].format('YYYY-MM-DD')
      const endDate = dateRange[1].format('YYYY-MM-DD')
      console.log("日期更新", startDate, endDate)
      fetchEdgesDataByTimeSpan([startDate, endDate])
    }
  }

  const handleTooltip = (value) => {
    if (value && value.model) {
      const { model } = value
      return (
        <div>
          <p>ID: {model.id}</p>
          <p>描述: {model.description}</p>
        </div>
      )
    }
    return null
  }

  const toggleLabel = () => {
    setLabelFlag(!labelFlag)
  }

  const toggleCriticalPath = () => {
    setCriticalFlag(!criticalFlag)
  }

  const getGraphinData = () => {
    let nodes = graphStore.graphData.nodes.map((node) => {
      return {
        id: node.service_name,
      }
    })
    let edges = graphStore.graphData.edges.map((edge) => {
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
    if (labelFlag) {
      for (let node of nodes) {
        node.style = {
          label: {
            value: node.id
          }
        }
      }
      for (let edge of edges) {
        edge.style.label = { value: edge.style.keyshape.lineWidth }
      }
    }
    if (criticalFlag) {
      // todo
    }
    return {
      nodes,
      edges
    }
  }


  return (
    <div>
      <div>
        <LayoutSelection />
        <Button onClick={() => { }} style={{ marginLeft: '10px' }}> 故障传播路径 </Button>
        <RangePicker
          style={{ marginLeft: '10px' }}
          onChange={(value) => { handleDateRangeChange(value) }}
        />
        <Button onClick={toggleLabel} style={{ marginLeft: '10px' }}> 显示Label </Button>
      </div>




      {graphStore.isEdgesDataLoaded && graphStore.isNodesDataLoaded && (
        <Graphin
          data={getGraphinData()}
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
