import Graphin, { Behaviors } from "@antv/graphin"
import graphStore from "../stores/GraphStore"
import { observer } from "mobx-react-lite"
import { Components } from "@antv/graphin"
const { Tooltip } = Components


const { ZoomCanvas } = Behaviors

const layouts = [
  { type: 'graphin-force' },
  {
    type: 'grid',
    // begin: [0, 0], // 可选，
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // preventOverlapPdding: 20, // 可选
    // nodeSize: 30, // 可选
    // condense: false, // 可选
    // rows: 5, // 可选
    // cols: 5, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'circular',
    // center: [200, 200], // 可选，默认为图的中心
    // radius: null, // 可选
    // startRadius: 10, // 可选
    // endRadius: 100, // 可选
    // clockwise: false, // 可选
    // divisions: 5, // 可选
    // ordering: 'degree', // 可选
    // angleRatio: 1, // 可选
  },
  {
    type: 'radial',
    // center: [200, 200], // 可选，默认为图的中心
    // linkDistance: 50, // 可选，边长
    // maxIteration: 1000, // 可选
    // focusNode: 'node11', // 可选
    // unitRadius: 100, // 可选
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // strictRadial: false, // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'force',
    preventOverlap: true,
    // center: [200, 200], // 可选，默认为图的中心
    linkDistance: 50, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.8, // 可选
    collideStrength: 0.8, // 可选
    nodeSize: 30, // 可选
    alpha: 0.9, // 可选
    alphaDecay: 0.3, // 可选
    alphaMin: 0.01, // 可选
    forceSimulation: null, // 可选
    onTick: () => {
      // 可选
      console.log('ticking')
    },
    onLayoutEnd: () => {
      // 可选
      console.log('force layout done')
    },
  },
  {
    type: 'gForce',
    linkDistance: 150, // 可选，边长
    nodeStrength: 30, // 可选
    edgeStrength: 0.1, // 可选
    nodeSize: 30, // 可选
    onTick: () => {
      // 可选
      console.log('ticking')
    },
    onLayoutEnd: () => {
      // 可选
      console.log('force layout done')
    },
    workerEnabled: false, // 可选，开启 web-worker
    gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
  {
    type: 'concentric',
    maxLevelDiff: 0.5,
    sortBy: 'degree',
    // center: [200, 200], // 可选，

    // linkDistance: 50, // 可选，边长
    // preventOverlap: true, // 可选，必须配合 nodeSize
    // nodeSize: 30, // 可选
    // sweep: 10, // 可选
    // equidistant: false, // 可选
    // startAngle: 0, // 可选
    // clockwise: false, // 可选
    // maxLevelDiff: 10, // 可选
    // sortBy: 'degree', // 可选
    // workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'dagre',
    rankdir: 'LR', // 可选，默认为图的中心
    // align: 'DL', // 可选
    // nodesep: 20, // 可选
    // ranksep: 50, // 可选
    // controlPoints: true, // 可选
  },
  {
    type: 'fruchterman',
    // center: [200, 200], // 可选，默认为图的中心
    // gravity: 20, // 可选
    // speed: 2, // 可选
    // clustering: true, // 可选
    // clusterGravity: 30, // 可选
    // maxIteration: 2000, // 可选，迭代次数
    // workerEnabled: false, // 可选，开启 web-worker
    // gpuEnabled: false, // 可选，开启 GPU 并行计算，G6 4.0 支持
  },
  {
    type: 'mds',
    workerEnabled: false, // 可选，开启 web-worker
  },
  {
    type: 'comboForce',
    // // center: [200, 200], // 可选，默认为图的中心
    // linkDistance: 50, // 可选，边长
    // nodeStrength: 30, // 可选
    // edgeStrength: 0.1, // 可选
    // onTick: () => {
    //   // 可选
    //   console.log('ticking');
    // },
    // onLayoutEnd: () => {
    //   // 可选
    //   console.log('combo force layout done');
    // },
  },
]

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
    <Graphin data={graphStore.graphData} style={{ height: '1000px' }} >
      <ZoomCanvas disabled />
      <Tooltip bindType="node" style={{ padding: '10px', width: '250px' }}>
        {handleTooltip}
      </Tooltip>
    </Graphin>
  )
}

export default observer(Graph)