import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select } from "antd";

import { request } from "@/request";

const { TextArea } = Input;
const { Option } = Select;

export default function ResourceForm() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const loadCamps = async () => {
      const data = await request.list("camp", { items: 100 });

      if (data.success) {
        setCamps(data.result);
      }
    };

    loadCamps();
  }, []);

  return (
    <>
      <Form.Item
        label="Resource Name"
        name="resourceName"
        rules={[
          {
            required: true,
            message: "Please enter the resource name.",
          },
        ]}
      >
        <Input placeholder="Example: Drinking Water" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select a category.",
          },
        ]}
      >
        <Select placeholder="Select category">
          <Option value="Water">Water</Option>
          <Option value="Food">Food</Option>
          <Option value="Fuel">Fuel</Option>
          <Option value="Medicine">Medicine</Option>
          <Option value="General Supplies">General Supplies</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Camp"
        name="camp"
        rules={[
          {
            required: true,
            message: "Please select a camp.",
          },
        ]}
      >
        <Select placeholder="Select camp">
          {camps.map((camp) => (
            <Option key={camp._id} value={camp._id}>
              {camp.campName} — {camp.location}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Current Quantity"
        name="currentQuantity"
        rules={[
          {
            required: true,
            message: "Please enter the current quantity.",
          },
        ]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Unit"
        name="unit"
        rules={[
          {
            required: true,
            message: "Please select a unit.",
          },
        ]}
      >
        <Select placeholder="Select unit">
          <Option value="Litres">Litres</Option>
          <Option value="Kilograms">Kilograms</Option>
          <Option value="Units">Units</Option>
          <Option value="Packets">Packets</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Minimum Stock Level"
        name="minimumStockLevel"
        rules={[
          {
            required: true,
            message: "Please enter the minimum stock level.",
          },
        ]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Average Daily Consumption"
        name="averageDailyConsumption"
        rules={[
          {
            required: true,
            message: "Please enter average daily consumption.",
          },
        ]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea
          rows={3}
          placeholder="Optional details about this resource"
        />
      </Form.Item>
    </>
  );
}