import Graphin, { Behaviors } from "@antv/graphin"
import graphStore, { fetchEdgesDataByTimeSpan } from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
import { Button, DatePicker } from "antd"
import LayoutSelection from "./LayoutSelection"
import { useState, useEffect } from "react"

const { Tooltip } = Components
const { RangePicker } = DatePicker

const { ActivateRelations } = Behaviors

const appIdToColor = (application_id) => {
  const colors = ['red', 'blue', 'green', 'black', 'purple', 'orange', 'pink']
  const index = application_id - 8
  if (index >= 0 && index < colors.length) {
    return colors[index]
  } else {
    return 'Invalid application_id value'
  }
}

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
          <p>描述: 一个 JSON Web Token 认证服务,提供注册、登录、JWT 生成和校验等认证基础功能。</p>
          <p>所属应用: User and authentication services</p>
        </div>
      )
    }
    return null
  }

  const toggleLabel = () => {
    setLabelFlag(!labelFlag)
  }

  useEffect(() => {
    console.log("toggel criticalFlag", criticalFlag)
    if (criticalFlag === true) {
      // todo
    }
  }, [criticalFlag])


  const getGraphinData = () => {
    let nodes = graphStore.graphData.nodes.map((node) => {
      if (node.service_name === "istio-ingressgateway") {
        node.size = 60
      } else {
        node.size = 30
      }
      return {
        id: node.service_name,
        style: {
          keyshape: {
            size: node.size,
            fill: appIdToColor(node.application_id),
            stroke: appIdToColor(node.application_id)
          }
        }
      }
    })
    let edges = graphStore.graphData.edges.map((edge) => {
      if (criticalFlag === true && edge.source === "istio-ingressgateway" && edge.target === "ts-ui-dashboard") {
        edge.color = 'red'
      }
      return {
        source: edge.source,
        target: edge.target,
        style: {
          keyshape: {
            lineWidth: edge.lineWidth,
            stroke: edge.color
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
        <Button onClick={() => { setCriticalFlag(!criticalFlag) }} style={{ marginLeft: '10px' }}> 故障传播路径 </Button>
        <RangePicker
          style={{ marginLeft: '10px' }}
          onChange={(value) => { handleDateRangeChange(value) }}
        />
        <Button onClick={toggleLabel} style={{ marginLeft: '10px' }}> 显示标记 </Button>
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
