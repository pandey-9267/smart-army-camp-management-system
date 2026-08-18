import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";

import { request } from "@/request";

const { TextArea } = Input;
const { Option } = Select;

export default function EquipmentForm() {
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
        label="Equipment ID"
        name="equipmentId"
        rules={[
          {
            required: true,
            message: "Please enter the equipment ID.",
          },
        ]}
      >
        <Input placeholder="Example: GEN-001" />
      </Form.Item>

      <Form.Item
        label="Equipment Name"
        name="equipmentName"
        rules={[
          {
            required: true,
            message: "Please enter the equipment name.",
          },
        ]}
      >
        <Input placeholder="Example: Generator" />
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
          <Option value="Power Equipment">Power Equipment</Option>
          <Option value="Water Equipment">Water Equipment</Option>
          <Option value="Utility Vehicle">Utility Vehicle</Option>
          <Option value="Communication Equipment">
            Communication Equipment
          </Option>
          <Option value="Medical Equipment">Medical Equipment</Option>
          <Option value="General Equipment">General Equipment</Option>
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
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Please enter the equipment quantity.",
          },
        ]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Condition"
        name="condition"
        initialValue="Good"
      >
        <Select>
          <Option value="Excellent">Excellent</Option>
          <Option value="Good">Good</Option>
          <Option value="Fair">Fair</Option>
          <Option value="Poor">Poor</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Operational Status"
        name="operationalStatus"
        initialValue="Operational"
      >
        <Select>
          <Option value="Operational">Operational</Option>
          <Option value="Maintenance Due">
            Maintenance Due
          </Option>
          <Option value="Under Maintenance">
            Under Maintenance
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Last Maintenance Date"
        name="lastMaintenanceDate"
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Next Maintenance Date"
        name="nextMaintenanceDate"
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea
          rows={3}
          placeholder="Brief description of this equipment"
        />
      </Form.Item>
    </>
  );
}