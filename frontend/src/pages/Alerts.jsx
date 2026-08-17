import React, { useEffect, useState } from "react";
import { Alert, Card, Empty, Spin, Tag } from "antd";

import { request } from "@/request";

function Alerts() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const data = await request.list("resource", { items: 100 });

        if (data.success) {
          setResources(data.result);
        }
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const alerts = resources
    .map((resource) => {
      const current = Number(resource.currentQuantity || 0);
      const minimum = Number(resource.minimumStockLevel || 0);
      const daily = Number(resource.averageDailyConsumption || 0);

      if (current <= minimum) {
        return {
          ...resource,
          type: "error",
          title: `${resource.resourceName} - Low Stock`,
          message: `Current stock is ${current} ${resource.unit}, which is at or below the minimum level of ${minimum} ${resource.unit}.`,
        };
      }

      if (daily > 0 && current / daily <= 3) {
        return {
          ...resource,
          type: "warning",
          title: `${resource.resourceName} - Critical Soon`,
          message: `Only ${(current / daily).toFixed(
            1
          )} days of stock remaining.`,
        };
      }

      return null;
    })
    .filter(Boolean);

  return (
    <div style={{ padding: 24 }}>
      <h1>Resource Alerts</h1>

      {loading ? (
        <Spin />
      ) : alerts.length === 0 ? (
        <Empty description="No active resource alerts" />
      ) : (
        alerts.map((item) => (
          <Card
            key={item._id}
            style={{ marginBottom: 16 }}
          >
            <Alert
              type={item.type}
              showIcon
              message={item.title}
              description={
                <>
                  <div>{item.message}</div>
                  <div style={{ marginTop: 8 }}>
                    Camp:{" "}
                    <Tag>
                      {item.camp?.campName || "Assigned Camp"}
                    </Tag>
                  </div>
                </>
              }
            />
          </Card>
        ))
      )}
    </div>
  );
}

export default Alerts;