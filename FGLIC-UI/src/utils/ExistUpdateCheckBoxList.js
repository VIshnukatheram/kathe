// CheckBoxList.js
import React from 'react';
import { Row, Col, Checkbox, Form } from 'antd';

const ExistUpdateCheckBoxList = ({ checkedList, handleChange, options }) => {
  return (
    <Row gutter={[16, 16]} className="reasons-list">
      {options.map((option) => (
        <Col key={option?.value} xs={24} sm={24} md={8} lg={8} xxl={8} className="loan-checkboxes">
          <Form.Item label={option?.label} name={option?.name} className="checkbox-gap">
            <Checkbox
              value={option?.value}
              checked={checkedList?.includes(option?.value)}
              onChange={() => handleChange(option?.value)}
            ></Checkbox>
          </Form.Item>
        </Col>
      ))}
    </Row>
  );
};

export default ExistUpdateCheckBoxList;
