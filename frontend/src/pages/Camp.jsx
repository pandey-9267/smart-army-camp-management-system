import React from "react";

import CrudModule from "@/modules/CrudModule";
import CampForm from "@/forms/CampForm";

function Camp() {
  const entity = "camp";

  const searchConfig = {
    displayLabels: ["campName", "location"],
    searchFields: "campName,location",
    outputValue: "_id",
  };

  const readColumns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Maximum Capacity",
      dataIndex: "maximumCapacity",
    },
    {
      title: "Current Personnel",
      dataIndex: "currentPersonnel",
    },
    {
      title: "Status",
      dataIndex: "operationalStatus",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

  const dataTableColumns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Capacity",
      dataIndex: "maximumCapacity",
    },
    {
      title: "Personnel",
      dataIndex: "currentPersonnel",
    },
    {
      title: "Status",
      dataIndex: "operationalStatus",
    },
  ];

  const config = {
    entity,
    panelTitle: "Camp Management",
    dataTableTitle: "Camps List",
    ENTITY_NAME: "camp",
    CREATE_ENTITY: "Create camp",
    ADD_NEW_ENTITY: "Add new camp",
    UPDATE_ENTITY: "Update camp",
    DATATABLE_TITLE: "Camps List",
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels: ["campName"],
  };

  return (
    <CrudModule
      createForm={<CampForm />}
      updateForm={<CampForm />}
      config={config}
    />
  );
}

export default Camp;