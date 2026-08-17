import React from "react";

import CrudModule from "@/modules/CrudModule";
import ConsumptionForm from "@/forms/ConsumptionForm";

function Consumption() {
  const entity = "consumption";

  const searchConfig = {
    displayLabels: ["recordedBy", "remarks"],
    searchFields: "recordedBy,remarks",
    outputValue: "_id",
  };

  const readColumns = [
    {
      title: "Resource",
      dataIndex: "resource.resourceName",
    },
    {
      title: "Camp",
      dataIndex: "camp.campName",
    },
    {
      title: "Quantity Used",
      dataIndex: "quantityUsed",
    },
    {
      title: "Opening Quantity",
      dataIndex: "openingQuantity",
    },
    {
      title: "Remaining Quantity",
      dataIndex: "remainingQuantity",
    },
    {
      title: "Recorded By",
      dataIndex: "recordedBy",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
  ];

  const dataTableColumns = [
    {
      title: "Date",
      render: (_, record) =>
        new Date(record.date).toLocaleDateString(),
    },
    {
      title: "Resource",
      render: (_, record) =>
        record.resource ? record.resource.resourceName : "-",
    },
    {
      title: "Camp",
      render: (_, record) =>
        record.camp ? record.camp.campName : "-",
    },
    {
      title: "Used",
      render: (_, record) =>
        `${record.quantityUsed} ${
          record.resource ? record.resource.unit : ""
        }`,
    },
    {
      title: "Opening",
      render: (_, record) =>
        `${record.openingQuantity} ${
          record.resource ? record.resource.unit : ""
        }`,
    },
    {
      title: "Remaining",
      render: (_, record) =>
        `${record.remainingQuantity} ${
          record.resource ? record.resource.unit : ""
        }`,
    },
  ];

  const config = {
    entity,
    panelTitle: "Consumption Tracking",
    dataTableTitle: "Consumption Records",
    ENTITY_NAME: "consumption record",
    CREATE_ENTITY: "Record consumption",
    ADD_NEW_ENTITY: "Add consumption",
    UPDATE_ENTITY: "Update consumption",
    DATATABLE_TITLE: "Consumption Records",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels: ["recordedBy"],
  };

  return (
    <CrudModule
      createForm={<ConsumptionForm />}
      updateForm={<ConsumptionForm />}
      config={config}
    />
  );
}

export default Consumption;