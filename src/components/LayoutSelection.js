// using antd and graphin library to implement a dropdown menu to select different layouts
import React from 'react';
import { Select } from 'antd';
import { GraphinContext } from '@antv/graphin';

const { Option } = Select;

const LayoutSelection = () => {
  const graphin = React.useContext(GraphinContext);
  const { layout } = graphin;

  const handleChange = (value) => {
    layout.changeLayout(value);
  };

  return (
    <Select defaultValue="force" style={{ width: 120 }} onChange={handleChange}>
      <Option value="force">Force</Option>
      <Option value="circular">Circular</Option>
      <Option value="radial">Radial</Option>
      <Option value="grid">Grid</Option>
      <Option value="concentric">Concentric</Option>
    </Select>
  );
};

export default LayoutSelection;
