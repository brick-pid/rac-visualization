// using antd and graphin library to implement a dropdown menu to select different layouts
import React from 'react'
import { Select } from 'antd'
import graphStore from '../stores/GraphStore'

const { Option } = Select


const layouts = [
  {
    type: 'graphin-force',
    options: {},
    title: '渐进力导',
  },
  {
    type: 'grid',
    options: {},
    title: '网格布局',
  }
  ,
  {
    type: 'concentric',
    options: {},
    title: '同心圆布局',
  },
  {
    type: 'radial',
    options: {},
    title: '辐射布局',
  },
  {
    type: 'dagre',
    options: {},
    title: '层次布局',
  },
  {
    type: 'circular',
    options: {},
    title: '环形布局',
  },
  {
    type: 'gForce',
    options: {},
    title: 'G6力导',
  },
  {
    type: 'mds',
    options: {},
    title: '降纬布局',
  },
  {
    type: 'random',
    options: {},
    title: '随机布局',
  },
]

const LayoutSelection = ({ onChange }) => {

  const handleChange = (value) => {
    graphStore.setLayout(value)
    // console.log(value)
  }

  return (
    <Select defaultValue={graphStore.layout} style={{ width: 120 }} onChange={handleChange}>
      options={layouts.map((layout) => (
        <Option key={layout.type} value={layout.type}>
          {layout.title}
        </Option>
      ))}
    </Select>
  )
}

export default LayoutSelection
