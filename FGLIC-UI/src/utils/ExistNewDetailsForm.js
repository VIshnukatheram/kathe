import React from "react";
import {
  Input,
  Radio,
  Checkbox,
  Form,
  DatePicker,
  Select,
  Collapse,
} from "antd";
import SendIcon from "../assets/images/send.png";
import DownloadIcon from "../assets/images/download.png";

const ExistNewDetailsForm = (props) => {
  const {
    data,
    handleRadioChange,
    handleNumberChange,
    handleCheckBox,
    options,
    suffix,
    handleProposerCollapse,
    handleTextLink,
    handleProcessedBy
  } = props;
  const { Panel } = Collapse;
  const dateFormat = "DD/MM/YYYY";
  const options1 = [
    { label: "SMS", value: "sms" },
    { label: "Whats App", value: "whatsapp" },
    { label: "Email", value: "email" },
  ];

  const handleCheckBoxes = (checkedValues) => {
  };
  return (
    <>
      {data?.map((item) => (
        <>
          {item.inputType === "title" && (
            <>
              <h4 className="subtype-headings fs-16 fw-500">{item.label}</h4>
            </>
          )}
          {item.inputType === "radios" && (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label radio-grp fs-14 fw-400"
              >
                <Checkbox.Group
                  options={options1}
                  defaultValue={["SMS"]}
                  onChange={handleCheckBoxes}
                ></Checkbox.Group>
                <span>
                  <img src={SendIcon} className="send-icon" alt=""/>
                  {(item.label?.indexOf("Generate Fund Value Letter") > -1 ||
                    item.label?.indexOf("Loan Statement") > -1) && (
                    <>
                      Download <img src={DownloadIcon} className="send-icon" alt=""/>
                    </>
                  )}
                </span>
              </Form.Item>
            </>
          )}
          {item.inputType === "radio" &&
            item.name === "validatesignature" &&
            item.subType?.toString().indexOf(props?.subType) > -1 &&
            props?.subType !== "changeinsignature" && (
              <>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  className="inputs-label radio-grp fs-16 fw-400"
                >
                  <Radio.Group
                    onChange={handleRadioChange}
                    className="radio-check"
                  >
                    <Radio value={1} className="fs-16 fw-400">
                      Yes
                    </Radio>
                    <Radio value={2} className="fs-16 fw-400">
                      No
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
          {item.inputType === "date" && (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label fs-16 fw-400"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  className="cust-input"
                  format={dateFormat}
                />
              </Form.Item>
            </>
          )}
          {item.inputType === "date" &&
            props?.subType === "worknumberupdate" &&
            !item.isKYC && (
              <>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  className="inputs-label fs-16 fw-400"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                    
                  />
                </Form.Item>
              </>
            )}
          {item.inputType === "text" && (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label fs-16 fw-400 validate"
                rules={[
                  {
                    required: item?.required,
                    message: item?.validationmsg,
                  },
                  { whitwspace: item?.required },
                  // { min: item.minlength },
                  // { max: item.maxlength },
                ]}
              >
                <Input
                  placeholder={item.placeholder || item.label}
                  onChange={handleNumberChange}
                  className="cust-input"
                  maxLength={item.maxlength}
                />
              </Form.Item>
            </>
          )}

          {item.inputType === "checkbox" && (
            <>
              {" "}
              <Form.Item label={item.label} name={item.name}>
                <Checkbox.Group
                  options={options}
                  defaultValue={["SMS"]}
                  onChange={handleCheckBox}
                />
              </Form.Item>
            </>
          )}
          
          {item.inputType === "dropdown" && item.name==="processedby"&& (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label mb-0"
              >
                <Select
                  className="cust-input"
                  maxLength={100}
                  placeholder={item.placeholder}
                  onChange={(e)=>handleProcessedBy(e)}
                  options={[
                    {
                      label: " OTP",
                      value: "otp",
                    },
                    {
                      label: "Document Upload",
                      value: "documentupload",
                    },
                    
                  ]}
                ></Select>
              </Form.Item>
            </>
          )}
           {(item.inputType === "dropdown" && item.label==="Client Role") && (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label mb-0"
              >
                <Select
                  className="cust-input"
                  maxLength={100}
                  placeholder={item.placeholder}
                  options={[
                    {
                      label: "LA",
                      value: "la",
                    },
                    {
                      label: "PA",
                      value: "pa",
                    },
                    {
                      label: "PAYOR",
                      value: "payor",
                    },
                    

                    
                  ]}
                ></Select>
              </Form.Item>
            </>
          )}
          {item.inputType === "upload" && (
            <>
              <div>
                <Form.Item
                  label={item.label}
                  name={item.name}
                  className="inputs-label fs-16 fw-400"
                >
                  <Input
                    placeholder={item.placeholder}
                    type="text"
                    className="cust-input"
                    size="small"
                    suffix={suffix}
                  />
                </Form.Item>
              </div>
            </>
          )}
          {item.inputType === "link" &&  (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label fs-16 fw-400"
              >
                <a  className="link-txt" onClick={()=>handleTextLink(item)}>
                  {item.textvalue}
                </a>
              </Form.Item>
            </>
          )}

          {item.inputType === "texts" && (
            <>
              <div>
                <Form.Item></Form.Item>
              </div>
            </>
          )}
          {item.inputType === "accordian" && (
            <>
              <Form.Item
                label={item.label}
                name={item.name}
                className="inputs-label fs-16 fw-400"
              >
                <div className="d-flex">
                  <Input
                    placeholder={item.placeholder || item.label}
                    className="cust-input"
                  />
                  <span>
                    <Collapse
                      accordion
                      expandIconPosition={"end"}
                      key="1"
                      bordered={false}
                      className="proposer-accordian"
                      onChange={(e) => handleProposerCollapse(e)}
                    >
                      <Panel
                        key="1"
                        className="fs-16 fw-500 proposer-collapse"
                      ></Panel>
                    </Collapse>
                  </span>
                </div>
              </Form.Item>
            </>
          )}
        </>
      ))}
    </>
  );
};

export default ExistNewDetailsForm;
