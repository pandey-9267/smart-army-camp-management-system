import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectCreatedItem } from "@/redux/crud/selectors";

import { Button, Form } from "antd";
import Loading from "@/components/Loading";

export default function CreateForm({ config, formElements }) {
  const { entity } = config;

  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector(selectCreatedItem);

  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox } = crudContextAction;

  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    if (fieldsValue) {
      if (fieldsValue.birthday) {
        fieldsValue = {
          ...fieldsValue,
          birthday: fieldsValue.birthday.format("DD/MM/YYYY"),
        };
      }

      if (fieldsValue.date) {
        fieldsValue = {
          ...fieldsValue,
          date: fieldsValue.date.format("DD/MM/YYYY"),
        };
      }
    }

    dispatch(crud.create(entity, fieldsValue));
  };

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    // Reset the form after successful creation
    form.resetFields();

    // Refresh the table so the new record appears immediately
    dispatch(crud.list(entity));

    // Keep the page open and return to the normal CRUD view
    collapsedBox.open();
    panel.open();

    // Reset create state so this effect doesn't run again
    dispatch(crud.resetAction("create"));
  }, [
    isSuccess,
    entity,
    dispatch,
    form,
    collapsedBox,
    panel,
  ]);

  return (
    <Loading isLoading={isLoading}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        {formElements}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}