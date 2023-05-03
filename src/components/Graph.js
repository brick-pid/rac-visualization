import Graphin, { Behaviors } from "@antv/graphin"
import graphStore, { fetchEdgesDataByTimeSpan } from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
import { Button, DatePicker } from "antd"
import LayoutSelection from "./LayoutSelection"

const { Tooltip } = Components
const { RangePicker } = DatePicker

const { ActivateRelations } = Behaviors



function Graph () {

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

  const handleEdgeLabel = () => {

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
        <Button onClick={() => { }} style={{ marginLeft: '10px' }}> 显示边宽 </Button>
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
                style: {
                  label: {
                    value: edge.lineWidth
                  },
                  keyshape: {
                    lineWidth: edge.lineWidth
                  }

                }
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
