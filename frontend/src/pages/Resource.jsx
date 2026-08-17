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
  title: "Days Remaining",
  render: (_, record) => {
    if (!record.averageDailyConsumption) return "Not calculated";

    return (
      (record.currentQuantity / record.averageDailyConsumption).toFixed(1) +
      " days"
    );
  },
},
{
  title: "Status",
  render: (_, record) => {
    const current = Number(record.currentQuantity || 0);
    const minimum = Number(record.minimumStockLevel || 0);
    const daily = Number(record.averageDailyConsumption || 0);

    if (current <= minimum) {
      return "🔴 Low Stock";
    }

    if (daily > 0 && current / daily <= 3) {
      return "🟡 Critical Soon";
    }

    return "🟢 Healthy";
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