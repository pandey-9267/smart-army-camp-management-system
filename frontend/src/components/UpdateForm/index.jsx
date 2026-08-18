import React, { useEffect } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectUpdatedItem } from "@/redux/crud/selectors";

import { Button, Form } from "antd";
import Loading from "@/components/Loading";

export default function UpdateForm({ config, formElements }) {
  const { entity } = config;

  const dispatch = useDispatch();

  const {
    current,
    isLoading,
    isSuccess,
  } = useSelector(selectUpdatedItem);

  const { state, crudContextAction } = useCrudContext();

  const {
    panel,
    collapsedBox,
    readBox,
  } = crudContextAction;

  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    let values = { ...fieldsValue };

    /*
     * Convert date fields before sending them to MongoDB
     */
    const dateFields = [
      "maintenanceDate",
      "lastMaintenanceDate",
      "nextMaintenanceDate",
      "birthday",
      "date",
    ];

    dateFields.forEach((field) => {
      if (
        values[field] &&
        typeof values[field].format === "function"
      ) {
        values[field] = values[field].toISOString();
      }
    });

    /*
     * Make sure referenced Select fields contain IDs,
     * not populated MongoDB objects.
     */
    if (
      values.camp &&
      typeof values.camp === "object"
    ) {
      values.camp = values.camp._id;
    }

    if (
      values.equipment &&
      typeof values.equipment === "object"
    ) {
      values.equipment = values.equipment._id;
    }

    if (
      values.resource &&
      typeof values.resource === "object"
    ) {
      values.resource = values.resource._id;
    }

    if (!current?._id) {
      return;
    }

    dispatch(
      crud.update(
        entity,
        current._id,
        values
      )
    );
  };

  /*
   * Put the selected record into the Edit form.
   */
  useEffect(() => {
    if (!current) {
      return;
    }

    const formValues = {
      ...current,
    };

    /*
     * Equipment -> camp Select
     *
     * MongoDB may return:
     * camp: {
     *   _id: "...",
     *   campName: "Camp Alpha"
     * }
     *
     * Ant Design Select needs:
     * camp: "..."
     */
    if (
      current.camp &&
      typeof current.camp === "object"
    ) {
      formValues.camp = current.camp._id;
    }

    /*
     * Maintenance -> equipment Select
     */
    if (
      current.equipment &&
      typeof current.equipment === "object"
    ) {
      formValues.equipment =
        current.equipment._id;
    }

    /*
     * Resource reference, if populated.
     */
    if (
      current.resource &&
      typeof current.resource === "object"
    ) {
      formValues.resource =
        current.resource._id;
    }

    /*
     * Convert date strings to Moment objects
     * for Ant Design DatePicker.
     */
    const dateFields = [
      "maintenanceDate",
      "lastMaintenanceDate",
      "nextMaintenanceDate",
      "birthday",
      "date",
    ];

    dateFields.forEach((field) => {
      if (current[field]) {
        formValues[field] = moment(
          current[field]
        );
      }
    });

    form.setFieldsValue(formValues);
  }, [current, form]);

  /*
   * After successful update
   */
  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    form.resetFields();

    dispatch(
      crud.resetAction("update")
    );

    dispatch(
      crud.list(entity)
    );

    readBox.open();
    collapsedBox.open();
    panel.open();
  }, [
    isSuccess,
    entity,
    dispatch,
    form,
    readBox,
    collapsedBox,
    panel,
  ]);

  const { isEditBoxOpen } = state;

  const show = isEditBoxOpen
    ? {
        display: "block",
        opacity: 1,
      }
    : {
        display: "none",
        opacity: 0,
      };

  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          {formElements}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}