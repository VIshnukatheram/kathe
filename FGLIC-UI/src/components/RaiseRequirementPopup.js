import React from 'react';
import {
    Button,
    Form,
    Spin,
    message,
    Row,
    Col,
    Modal,
    Checkbox,
    Input,
    DatePicker,
    Select,
    Upload,
    Tooltip
  } from "antd";

const RaiseRequirementPopup = (props) => {
    return (
    <div>
    <Modal
    title="Requirements"
    open={props?.raiseRequirementOpen}
    destroyOnClose={true}
    width={1200}
    closeIcon={false}
    footer={null}
  >
    <Spin spinning={props?.requirementModalLoader}>
      <div  >
        <Form onFinish={props?.handleRequirementSubmit}>
          <div className="reuirement">
          <table className="responsive-table">
            <thead>
            <tr>
              <th>Sr No</th>
              <th>Description</th>
              <th className="z-index">Select</th>
            </tr></thead>
            <tbody>
               { props?.raiseRequerimentList?.length >0 && props?.raiseRequerimentList?.map((item, ind) => (
                <tr key={ind + 1}>
                  <td>{ind + 1}</td>

                  <td>{item.raiseReqDesc}</td>
                  <td>
                    {" "}
                    <Checkbox
                      type="checkbox"
                      onChange={(e) => (item.status = e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
              {props?.raiseRequerimentList?.length === 0 && (
                <tr>
                  <td colspan="13">
                    <div className="text-center">
                      <span>No data avalable</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          {/* <div className="text-area mt-16">
         <Form.Item
                  // label={<span>{"Comment"} <sup>*</sup>
                  // </span>}
                  name="requirementCmnt"
                  className="inputs-label mb-0"
                  rules={[
                    {
                      required: true,
                      message: "Enter Comments",
                    },
                  ]}
                >
                   <TextArea rows={2} value={requirementCmnt} placeholder="Comments" onChange={(e)=>setRequirementCmnt(e.currentTarget.value)}/>
                </Form.Item>
              </div> */}
      <div className="contact-details-btn">
            <Button
              type="primary"
              className="primary-btn"
              htmlType="submit"
              //onClick={()=>handleRequirementSubmit()}
            >
              Submit
            </Button>

            <Button
              type="primary"
              className="primary-btn"
              onClick={props?.popupClose}
            >
              Close
            </Button>
          </div>
        </Form>
      </div>

      
    </Spin>
  </Modal>
    </div>
  )
}

export default RaiseRequirementPopup