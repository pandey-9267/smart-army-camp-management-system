import React from "react";

import CrudModule from "@/modules/CrudModule";
import ResourceForm from "@/forms/ResourceForm";

function Resource() {
  const entity = "resource";

  const searchConfig = {
    displayLabels: ["resourceName", "category"],
    searchFields: "resourceName,category",
    outputValue: "_id",
  };

  const readColumns = [
    {
      title: "Resource Name",
      dataIndex: "resourceName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Camp",
      dataIndex: "camp.campName",
    },
    {
      title: "Current Quantity",
      dataIndex: "currentQuantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Minimum Stock Level",
      dataIndex: "minimumStockLevel",
    },
    {
      title: "Average Daily Consumption",
      dataIndex: "averageDailyConsumption",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

 const dataTableColumns = [
  {
    title: "Resource",
    dataIndex: "resourceName",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Camp",
    render: (_, record) =>
      record.camp ? record.camp.campName : "-",
  },
  {
    title: "Quantity",
    render: (_, record) =>
      `${record.currentQuantity || 0} ${record.unit || ""}`,
  },
  {
    title: "Minimum Level",
    render: (_, record) =>
      `${record.minimumStockLevel || 0} ${record.unit || ""}`,
  },
  {
    title: "Days Remaining",
    render: (_, record) => {
      const current = Number(record.currentQuantity || 0);
      const daily = Number(record.averageDailyConsumption || 0);

      if (!daily) {
        return "Not calculated";
      }

      return `${(current / daily).toFixed(1)} days`;
    },
  },
  {
    title: "Status",
    render: (_, record) => {
      const current = Number(record.currentQuantity || 0);
      const minimum = Number(record.minimumStockLevel || 0);
      const daily = Number(record.averageDailyConsumption || 0);

      if (current <= minimum) {
        return <span style={{ color: "#ff4d4f" }}>● Low Stock</span>;
      }

      if (daily > 0 && current / daily <= 3) {
        return <span style={{ color: "#faad14" }}>● Critical Soon</span>;
      }

      return <span style={{ color: "#52c41a" }}>● Healthy</span>;
    },
  },
];

  const config = {
    entity,
    panelTitle: "Resource Management",
    dataTableTitle: "Resources List",
    ENTITY_NAME: "resource",
    CREATE_ENTITY: "Create resource",
    ADD_NEW_ENTITY: "Add new resource",
    UPDATE_ENTITY: "Update resource",
    DATATABLE_TITLE: "Resources List",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels: ["resourceName"],
  };

  return (
    <CrudModule
      createForm={<ResourceForm />}
      updateForm={<ResourceForm />}
      config={config}
    />
  );
}

export default Resource;