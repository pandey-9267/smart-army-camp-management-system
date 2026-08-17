import React from "react";
import { Form, Input, InputNumber, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

export default function CampForm() {
  return (
    <>
      <Form.Item
        label="Camp Name"
        name="campName"
        rules={[
          {
            required: true,
            message: "Please enter the camp name.",
          },
        ]}
      >
        <Input placeholder="Example: Camp Alpha" />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: "Please enter the camp location.",
          },
        ]}
      >
        <Input placeholder="Example: Pune, Maharashtra" />
      </Form.Item>

      <Form.Item
        label="Maximum Capacity"
        name="maximumCapacity"
        rules={[
          {
            required: true,
            message: "Please enter the maximum capacity.",
          },
        ]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Current Personnel"
        name="currentPersonnel"
        rules={[
          {
            required: true,
            message: "Please enter the current personnel count.",
          },
        ]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Operational Status"
        name="operationalStatus"
        initialValue="Operational"
      >
        <Select>
          <Option value="Operational">Operational</Option>
          <Option value="Limited">Limited</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea
          rows={3}
          placeholder="Brief description of this simulated camp"
        />
      </Form.Item>
    </>
  );
}