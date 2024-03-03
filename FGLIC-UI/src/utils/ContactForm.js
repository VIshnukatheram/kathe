import React from 'react';
import { Input, Form, Row, Col } from 'antd';

const ContactForm = (props) => {

  return (
    <>
     <Row gutter={[16, 16]}>
      {props?.showPhoneNumber && (
          <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
        <Form.Item      label={<span>Mobile No<sup>*</sup></span>} name="mobileNo" rules={[{ required: true, message: 'Please enter phone number' }]}>
          <Input placeholder="Enter phone number"  disabled={true}/>
        </Form.Item>
        </Col>
      )}
       
      {props?.showEmailAddress && (
           <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
        <Form.Item      label={<span>Email ID<sup>*</sup></span>} name="emailId" rules={[{ required: true, message: 'Please enter email address' }]}>
          <Input placeholder="Enter email address"  disabled={true}/>
        </Form.Item>
      </Col>
      )}
      {props?.showWhatsApp && (
      <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
        <Form.Item      label={<span>WhatsApp No<sup>*</sup></span>} name="whatsAppNo" rules={[{ required: true, message: 'Please enter WhatsApp number' }]}>
          <Input placeholder="Enter WhatsApp number"  disabled={true}/>
        </Form.Item>
        </Col>
      )} 
      </Row>
    </>
  );
};

export default ContactForm;
