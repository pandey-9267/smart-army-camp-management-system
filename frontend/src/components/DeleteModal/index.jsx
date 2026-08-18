import React, { useEffect, useState } from "react";
import { Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectDeletedItem } from "@/redux/crud/selectors";
import { valueByString } from "@/utils/helpers";

export default function DeleteModal({ config }) {
  const {
    entity,
    entityDisplayLabels,
    deleteMessage = "Do you want delete : ",
    modalTitle = "Remove Item",
  } = config;

  const dispatch = useDispatch();

  const {
    current,
    isLoading,
    isSuccess,
  } = useSelector(selectDeletedItem);

  const { state, crudContextAction } = useCrudContext();

  const { isModalOpen } = state;
  const { modal } = crudContextAction;

  const [displayItem, setDisplayItem] = useState("");

  useEffect(() => {
    if (current) {
      const labels = entityDisplayLabels
        .map((x) => valueByString(current, x))
        .join(" ");

      setDisplayItem(labels);
    } else {
      setDisplayItem("");
    }
  }, [current, entityDisplayLabels]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    // Close confirmation modal
    modal.close();

    // Refresh the table
    dispatch(crud.list(entity));

    // IMPORTANT:
    // Reset the DELETE action, not the entity name.
    dispatch(crud.resetAction("delete"));
  }, [
    isSuccess,
    entity,
    dispatch,
    modal,
  ]);

  const handleOk = () => {
    if (isLoading) {
      return;
    }

    if (!current || !current._id) {
      return;
    }

    dispatch(
      crud.delete(
        entity,
        current._id
      )
    );
  };

  const handleCancel = () => {
    if (!isLoading) {
      modal.close();

      // Clear delete action when cancelling
      dispatch(crud.resetAction("delete"));
    }
  };

  return (
    <Modal
      title={modalTitle}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      maskClosable={!isLoading}
      closable={!isLoading}
    >
      <p>
        {deleteMessage}
        {displayItem}
      </p>
    </Modal>
  );
}