import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Table, Tag, Progress, Alert, Spin } from "antd";
import {
  EnvironmentOutlined,
  DatabaseOutlined,
  ToolOutlined,
  WarningOutlined,
  FireOutlined,
} from "@ant-design/icons";

import { DashboardLayout } from "@/layout";
import { request } from "@/request";

export default function Dashboard() {
  const [camps, setCamps] = useState([]);
  const [resources, setResources] = useState([]);
  const [consumptions, setConsumptions] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      try {
        const [campData, resourceData, consumptionData, equipmentData] =
          await Promise.all([
            request.list("camp", { items: 100 }),
            request.list("resource", { items: 100 }),
            request.list("consumption", { items: 10 }),
            request.list("equipment", { items: 100 }),
          ]);

        if (campData.success) {
          setCamps(campData.result || []);
        }

        if (resourceData.success) {
          setResources(resourceData.result || []);
        }

        if (consumptionData.success) {
          setConsumptions(consumptionData.result || []);
        }

        if (equipmentData.success) {
          setEquipment(equipmentData.result || []);
        }
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /*
   * Resource alert calculation
   *
   * Critical:
   *  - stock is at/below minimum level
   *  OR
   *  - 3 or fewer days remaining
   *
   * Warning:
   *  - more than 3 but 7 or fewer days remaining
   */
  const getResourceStatus = (resource) => {
    const current = Number(resource.currentQuantity || 0);
    const minimum = Number(resource.minimumStockLevel || 0);
    const daily = Number(resource.averageDailyConsumption || 0);

    const daysRemaining = daily > 0 ? current / daily : null;

    if (current <= minimum) {
      return {
        type: "error",
        label: "Low Stock",
        daysRemaining,
      };
    }

    if (daysRemaining !== null && daysRemaining <= 3) {
      return {
        type: "warning",
        label: "Critical Soon",
        daysRemaining,
      };
    }

    if (daysRemaining !== null && daysRemaining <= 7) {
      return {
        type: "warning",
        label: "Monitor",
        daysRemaining,
      };
    }

    return {
      type: "success",
      label: "Healthy",
      daysRemaining,
    };
  };

  const alertResources = resources.filter((resource) => {
    const status = getResourceStatus(resource);

    return (
      status.type === "error" ||
      status.label === "Critical Soon"
    );
  });

  const lowStockResources = resources.filter((resource) => {
    const current = Number(resource.currentQuantity || 0);
    const minimum = Number(resource.minimumStockLevel || 0);

    return current <= minimum;
  });

  // add recent
  const criticalResources = resources.filter((resource) => {
    const status = getResourceStatus(resource);
    return status.label === "Critical Soon";
  });

  const healthyResources = resources.filter((resource) => {
    const status = getResourceStatus(resource);
    return status.label === "Healthy";
  });

  const operationalCamps = camps.filter(
    (camp) => camp.operationalStatus === "Operational"
  );

  const operationalEquipment = equipment.filter(
    (item) => item.operationalStatus === "Operational"
  );

  const totalPersonnel = camps.reduce(
    (total, camp) => total + Number(camp.currentPersonnel || 0),
    0
  );

  const totalCapacity = camps.reduce(
    (total, camp) => total + Number(camp.maximumCapacity || 0),
    0
  );

  const capacityPercentage =
    totalCapacity > 0
      ? Math.round((totalPersonnel / totalCapacity) * 100)
      : 0;

  const resourceColumns = [
    {
      title: "Resource",
      render: (_, record) => record.resourceName,
    },
    {
      title: "Camp",
      render: (_, record) =>
        record.camp ? record.camp.campName : "-",
    },
    {
      title: "Stock",
      render: (_, record) =>
        `${record.currentQuantity} ${record.unit}`,
    },
    {
      title: "Days Remaining",
      render: (_, record) => {
        const daily = Number(record.averageDailyConsumption || 0);

        if (!daily) {
          return "Not calculated";
        }

        const days =
          Number(record.currentQuantity || 0) / daily;

        return `${days.toFixed(1)} days`;
      },
    },
    {
      title: "Status",
      render: (_, record) => {
        const status = getResourceStatus(record);

        return (
          <Tag color={status.type}>
            {status.label}
          </Tag>
        );
      },
    },
  ];

  const campColumns = [
    {
      title: "Camp",
      dataIndex: "campName",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Personnel",
      render: (_, record) =>
        `${record.currentPersonnel} / ${record.maximumCapacity}`,
    },
    {
      title: "Capacity",
      render: (_, record) => {
        const capacity =
          Number(record.maximumCapacity || 0);

        const personnel =
          Number(record.currentPersonnel || 0);

        const percent =
          capacity > 0
            ? Math.round((personnel / capacity) * 100)
            : 0;

        return (
          <Progress
            percent={percent}
            size="small"
          />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "operationalStatus",
      render: (status) => (
        <Tag
          color={
            status === "Operational"
              ? "green"
              : status === "Limited"
                ? "orange"
                : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  const consumptionColumns = [
    {
      title: "Date",
      render: (_, record) =>
        new Date(record.date).toLocaleDateString(),
    },
    {
      title: "Resource",
      render: (_, record) =>
        record.resource
          ? record.resource.resourceName
          : "-",
    },
    {
      title: "Camp",
      render: (_, record) =>
        record.camp
          ? record.camp.campName
          : "-",
    },
    {
      title: "Used",
      render: (_, record) =>
        `${record.quantityUsed} ${record.resource?.unit || ""
        }`,
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* ================= SUMMARY CARDS ================= */}

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Camps"
              value={camps.length}
              prefix={<EnvironmentOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              <Tag color="green">
                {operationalCamps.length} Operational
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Resources"
              value={resources.length}
              prefix={<DatabaseOutlined />}
            />

            <div
              style={{
                marginTop: 10,
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              <Tag color="red">
                {lowStockResources.length} Low Stock
              </Tag>

              <Tag color="orange">
                {criticalResources.length} Critical
              </Tag>

              <Tag color="green">
                {healthyResources.length} Healthy
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Equipment"
              value={equipment.length}
              prefix={<ToolOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              <Tag color="green">
                {operationalEquipment.length} Operational
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Critical Alerts"
              value={alertResources.length}
              prefix={<WarningOutlined />}
              valueStyle={{
                color:
                  alertResources.length > 0
                    ? "#cf1322"
                    : "#3f8600",
              }}
            />
            <div style={{ marginTop: 10 }}>
              {alertResources.length > 0 ? (
                <Tag color="red">
                  Attention Required
                </Tag>
              ) : (
                <Tag color="green">
                  All Clear
                </Tag>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <div style={{ height: 24 }} />

      {/* ================= ALERTS ================= */}

      {alertResources.length > 0 && (
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              title={
                <span>
                  <WarningOutlined
                    style={{ marginRight: 8 }}
                  />
                  Resource Alerts
                </span>
              }
            >
              {alertResources.slice(0, 5).map((resource) => {
                const status =
                  getResourceStatus(resource);

                return (
                  <Alert
                    key={resource._id}
                    type={status.type}
                    showIcon
                    style={{ marginBottom: 10 }}
                    message={`${resource.resourceName} - ${status.label}`}
                    description={
                      status.type === "error"
                        ? `Current stock is ${resource.currentQuantity} ${resource.unit}, which is at or below the minimum level of ${resource.minimumStockLevel} ${resource.unit}.`
                        : `Only ${status.daysRemaining?.toFixed(1)
                        } days of stock remaining.`
                    }
                  />
                );
              })}
            </Card>
          </Col>
        </Row>
      )}

      <div style={{ height: 24 }} />

      {/* ================= CAMP CAPACITY ================= */}

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Camp Capacity">
            <div style={{ textAlign: "center" }}>
              <Progress
                type="dashboard"
                percent={capacityPercentage}
              />

              <h3>
                {totalPersonnel} / {totalCapacity}
              </h3>

              <p>
                Current personnel across all camps
              </p>

              <Tag color="blue">
                {operationalCamps.length} Operational Camps
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Resource Stock Status">
            <Table
              columns={resourceColumns}
              dataSource={resources.slice(0, 5)}
              rowKey={(record) => record._id}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 24 }} />

      {/* ================= CAMPS ================= */}

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title={
              <span>
                <EnvironmentOutlined
                  style={{ marginRight: 8 }}
                />
                Camp Overview
              </span>
            }
          >
            <Table
              columns={campColumns}
              dataSource={camps.slice(0, 5)}
              rowKey={(record) => record._id}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 24 }} />

      {/* ================= CONSUMPTION ================= */}

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title={
              <span>
                <FireOutlined
                  style={{ marginRight: 8 }}
                />
                Recent Consumption
              </span>
            }
          >
            <Table
              columns={consumptionColumns}
              dataSource={consumptions.slice(0, 5)}
              rowKey={(record) => record._id}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}