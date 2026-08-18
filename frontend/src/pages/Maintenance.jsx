import React from "react";

import CrudModule from "@/modules/CrudModule";
import MaintenanceForm from "@/forms/MaintenanceForm";

function Maintenance() {
  const entity = "maintenance";

  const searchConfig = {
    displayLabels: ["technician", "type", "status"],
    searchFields: "technician,type,status",
    outputValue: "_id",
  };

  const readColumns = [
    {
      title: "Equipment",
      render: (_, record) =>
        record.equipment
          ? `${record.equipment.equipmentId} - ${record.equipment.equipmentName}`
          : "Not assigned",
    },
    {
      title: "Maintenance Date",
      dataIndex: "maintenanceDate",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Technician",
      dataIndex: "technician",
    },
    {
      title: "Cost",
      dataIndex: "cost",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

  const dataTableColumns = [
    {
      title: "Equipment",
      render: (_, record) =>
        record.equipment
          ? `${record.equipment.equipmentId} - ${record.equipment.equipmentName}`
          : "Not assigned",
    },
    {
      title: "Date",
      dataIndex: "maintenanceDate",
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "-",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = "blue";

        if (status === "Completed") {
          color = "green";
        }

        if (status === "Overdue") {
          color = "red";
        }

        if (status === "Scheduled") {
          color = "orange";
        }

        return (
          <span style={{ color }}>
            ● {status}
          </span>
        );
      },
    },
    {
      title: "Technician",
      dataIndex: "technician",
    },
    {
      title: "Cost",
      render: (_, record) =>
        record.cost ? `₹ ${record.cost}` : "₹ 0",
    },
  ];

  const config = {
    entity,
    panelTitle: "Maintenance Management",
    dataTableTitle: "Maintenance History",
    ENTITY_NAME: "maintenance",
    CREATE_ENTITY: "Create maintenance",
    ADD_NEW_ENTITY: "Add new maintenance",
    UPDATE_ENTITY: "Update maintenance",
    DATATABLE_TITLE: "Maintenance History",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels: ["technician"],
  };

  return (
    <CrudModule
      createForm={<MaintenanceForm />}
      updateForm={<MaintenanceForm />}
      config={config}
    />
  );
}

export default Maintenance;
