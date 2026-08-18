import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import { useCrudContext } from "@/context/crud";
import { selectCurrentItem } from "@/redux/crud/selectors";
import { valueByString } from "@/utils/helpers";

export default function ReadItem({ config }) {
  const { readColumns } = config;

  const { result: currentResult } = useSelector(selectCurrentItem);

  const { state } = useCrudContext();
  const { isReadBoxOpen } = state;

  const [listState, setListState] = useState([]);

  useEffect(() => {
    if (!currentResult) {
      setListState([]);
      return;
    }

    const list = readColumns.map((column, index) => {
      const propsKey =
        column.dataIndex || column.key || `column-${index}`;

      const propsTitle = column.title;

      let value = "-";

      // Normal dataIndex column
      if (column.dataIndex) {
        value = valueByString(
          currentResult,
          column.dataIndex
        );
      }

      // Custom render column
      if (column.render) {
        value = column.render(
          column.dataIndex
            ? valueByString(currentResult, column.dataIndex)
            : undefined,
          currentResult,
          index
        );
      }

      return {
        propsKey,
        label: propsTitle,
        value: value ?? "-",
      };
    });

    setListState(list);
  }, [currentResult, readColumns]);

  const show = isReadBoxOpen
    ? {
        display: "block",
        opacity: 1,
      }
    : {
        display: "none",
        opacity: 0,
      };

  const itemsList = listState.map((item) => (
    <Row key={item.propsKey} gutter={12}>
      <Col className="gutter-row" span={8}>
        <p>{item.label}</p>
      </Col>

      <Col className="gutter-row" span={2}>
        <p>:</p>
      </Col>

      <Col className="gutter-row" span={14}>
        <p>{item.value}</p>
      </Col>
    </Row>
  ));

  return <div style={show}>{itemsList}</div>;
}