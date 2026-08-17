import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Alert } from "antd";

import { request } from "@/request";

const { TextArea } = Input;
const { Option } = Select;

export default function ConsumptionForm() {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [quantityUsed, setQuantityUsed] = useState(0);

  useEffect(() => {
    const loadResources = async () => {
      const data = await request.list("resource", { items: 100 });

      if (data.success) {
        setResources(data.result);
      }
    };

    loadResources();
  }, []);

  const handleResourceChange = (resourceId) => {
    const resource = resources.find(
      (item) => item._id === resourceId
    );

    setSelectedResource(resource || null);
    setQuantityUsed(0);
  };

  const remainingQuantity =
    selectedResource && quantityUsed
      ? selectedResource.currentQuantity - Number(quantityUsed)
      : selectedResource
      ? selectedResource.currentQuantity
      : 0;

  return (
    <>
      <Form.Item
        label="Resource"
        name="resource"
        rules={[
          {
            required: true,
            message: "Please select a resource.",
          },
        ]}
      >
        <Select
          placeholder="Select resource"
          onChange={handleResourceChange}
          showSearch
          optionFilterProp="children"
        >
          {resources.map((resource) => (
            <Option key={resource._id} value={resource._id}>
              {resource.resourceName} — {resource.currentQuantity}{" "}
              {resource.unit} available
            </Option>
          ))}
        </Select>
      </Form.Item>

      {selectedResource && (
        <Alert
          message={`Current Stock: ${selectedResource.currentQuantity} ${selectedResource.unit}`}
          description={`Camp: ${
            selectedResource.camp?.campName || "Assigned Camp"
          }`}
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Form.Item label="Opening Stock">
        <Input
          value={
            selectedResource
              ? `${selectedResource.currentQuantity} ${selectedResource.unit}`
              : ""
          }
          placeholder="Select a resource first"
          disabled
        />
      </Form.Item>

      <Form.Item
        label="Quantity Used"
        name="quantityUsed"
        rules={[
          {
            required: true,
            message: "Please enter the quantity used.",
          },
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.resolve();
              }

              if (
                selectedResource &&
                Number(value) > selectedResource.currentQuantity
              ) {
                return Promise.reject(
                  new Error(
                    "Quantity used cannot be greater than current stock."
                  )
                );
              }

              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          min={0.01}
          style={{ width: "100%" }}
          onChange={(value) => setQuantityUsed(value || 0)}
          placeholder="Enter quantity used"
        />
      </Form.Item>

      <Form.Item label="Remaining Stock">
        <Input
          value={
            selectedResource
              ? `${Math.max(remainingQuantity, 0)} ${
                  selectedResource.unit
                }`
              : ""
          }
          placeholder="Calculated automatically"
          disabled
        />
      </Form.Item>

      <Form.Item label="Recorded By" name="recordedBy">
        <Input placeholder="Example: Store Officer" />
      </Form.Item>

      <Form.Item label="Remarks" name="remarks">
        <TextArea
          rows={3}
          placeholder="Optional notes about this consumption record"
        />
      </Form.Item>
    </>
  );
}