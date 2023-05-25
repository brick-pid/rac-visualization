import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Upload,
} from 'antd'

import { useState } from 'react'

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
const RCASetting = () => {
  const [RCAAlgorithm, setRCAAlgorithm] = useState('TraceRCA')
  const RCAAlgoHandler = (e) => {
    setRCAAlgorithm(e.target.value)
    console.log("current RCA Algo: ", RCAAlgorithm)
  }
  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="根因分析算法">
          <Radio.Group onChange={RCAAlgoHandler} defaultValue={'TraceRCA'}>
            <Radio value="TraceRCA" > TraceRCA 算法 </Radio>
            <Radio value="rw" > 随机游走算法 </Radio>
          </Radio.Group>
        </Form.Item>
        {/* 进行条件渲染 */}
        {RCAAlgorithm === 'rw' && (
          <>
            <Form.Item label="单轮步长">
              <Input defaultValue={50}>
              </Input>
            </Form.Item>
            <Form.Item label="迭代轮数">
              <Input defaultValue={50}>
              </Input>
            </Form.Item>
            <Form.Item label="阶数选择">
              <Select defaultValue={"first"}>
                <Select.Option value="first">一阶随机游走</Select.Option>
                <Select.Option value="second">二阶随机游走</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}

        {RCAAlgorithm === 'TraceRCA' && (
          <>
            <Form.Item label="可疑微服务集合空间k">
              <Input defaultValue={100}></Input>
            </Form.Item>
          </>
        )}
      </Form>
    </>
  )
}
export default RCASetting