import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";

import { request } from "@/request";

const { TextArea } = Input;
const { Option } = Select;

export default function MaintenanceForm() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const loadEquipment = async () => {
      const data = await request.list("equipment", { items: 100 });

      if (data.success) {
        setEquipment(data.result || []);
      }
    };

    loadEquipment();
  }, []);

  return (
    <>
      <Form.Item
        label="Equipment"
        name="equipment"
        rules={[
          {
            required: true,
            message: "Please select equipment.",
          },
        ]}
      >
        <Select placeholder="Select equipment">
          {equipment.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.equipmentId} — {item.equipmentName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Maintenance Date"
        name="maintenanceDate"
        rules={[
          {
            required: true,
            message: "Please select the maintenance date.",
          },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Maintenance Type"
        name="type"
        initialValue="Preventive"
        rules={[
          {
            required: true,
            message: "Please select the maintenance type.",
          },
        ]}
      >
        <Select>
          <Option value="Preventive">Preventive</Option>
          <Option value="Repair">Repair</Option>
          <Option value="Inspection">Inspection</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        initialValue="Scheduled"
      >
        <Select>
          <Option value="Scheduled">Scheduled</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Overdue">Overdue</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Technician"
        name="technician"
      >
        <Input placeholder="Example: Maintenance Team A" />
      </Form.Item>

      <Form.Item
        label="Cost"
        name="cost"
        initialValue={0}
      >
        <InputNumber
          min={0}
          style={{ width: "100%" }}
          placeholder="Enter maintenance cost"
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <TextArea
          rows={3}
          placeholder="Describe the maintenance work"
        />
      </Form.Item>
    </>
  );
}