import React from "react";

import CrudModule from "@/modules/CrudModule";
import EquipmentForm from "@/forms/EquipmentForm";

function Equipment() {
  const entity = "equipment";

  const searchConfig = {
    displayLabels: ["equipmentName", "equipmentId"],
    searchFields: "equipmentName,equipmentId",
    outputValue: "_id",
  };

  const readColumns = [
    {
      title: "Equipment ID",
      dataIndex: "equipmentId",
    },
    {
      title: "Equipment Name",
      dataIndex: "equipmentName",
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
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Condition",
      dataIndex: "condition",
    },
    {
      title: "Operational Status",
      dataIndex: "operationalStatus",
    },
    {
      title: "Last Maintenance",
      dataIndex: "lastMaintenanceDate",
    },
    {
      title: "Next Maintenance",
      dataIndex: "nextMaintenanceDate",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

 const dataTableColumns = [
  {
    title: "ID",
    dataIndex: "equipmentId",
  },
  {
    title: "Equipment",
    dataIndex: "equipmentName",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Camp",
    render: (_, record) =>
      record.camp ? record.camp.campName : "Not assigned",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Condition",
    dataIndex: "condition",
  },
  {
    title: "Status",
    dataIndex: "operationalStatus",
  },
  {
    title: "Maintenance",
    render: (_, record) => {
      if (!record.nextMaintenanceDate) {
        return (
          <span style={{ color: "#8c8c8c" }}>
            ● Not Scheduled
          </span>
        );
      }

      const today = new Date();
      const maintenanceDate = new Date(record.nextMaintenanceDate);

      const difference =
        maintenanceDate.getTime() - today.getTime();

      const daysRemaining = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      );

      if (daysRemaining < 0) {
        return (
          <span style={{ color: "#ff4d4f" }}>
            ● Overdue
          </span>
        );
      }

      if (daysRemaining <= 30) {
        return (
          <span style={{ color: "#faad14" }}>
            ● Due Soon ({daysRemaining} days)
          </span>
        );
      }

      return (
        <span style={{ color: "#52c41a" }}>
          ● Scheduled
        </span>
      );
    },
  },
];
  const config = {
    entity,
    panelTitle: "Equipment Management",
    dataTableTitle: "Equipment List",
    ENTITY_NAME: "equipment",
    CREATE_ENTITY: "Create equipment",
    ADD_NEW_ENTITY: "Add new equipment",
    UPDATE_ENTITY: "Update equipment",
    DATATABLE_TITLE: "Equipment List",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels: ["equipmentName"],
  };

  return (
    <CrudModule
      createForm={<EquipmentForm />}
      updateForm={<EquipmentForm />}
      config={config}
    />
  );
}

export default Equipment;