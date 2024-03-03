import React, { useState } from "react";
import { Input, Radio, Form, DatePicker,Row,Col,Select, Upload, message } from "antd";

const ChecklistDetails = (props) => {
  const {
    data,
    handleRadioChange,
    suffix,
    showPOSScreen,
    handleTextLink,
    disabledDate,
    handleDateChange,
    handleUploadLink,
    form,
  } = props;
  const { TextArea } = Input;
  const [uploadFiles,setUploadFiles] = useState([]);
  const dateFormat = "DD/MM/YYYY";
  const [showUploadFile, setShowUploadFile] = useState(null);
  const surrenderReasonsLU = [
    { label: 'Financial Problem', value: 'financialproblem' },
    { label: 'Personal Reason', value: 'personalreason' },
    { label: 'Service Issue', value: 'serviceissue' },
    { label: 'Medical Reason', value: 'medicalreason' },
    { label: 'Investment in new policy', value: 'investmentpolicy' },
    { label: 'Not Satisfied with Fund value', value: 'satisfiedfundvalue' },
  ];
  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    customRequest: ({ file, onSuccess, index }) => {
      let formData = new FormData();
      formData.append("file", file, file.name);
      setShowUploadFile(index);
      setUploadFiles(file);
      message.success({
        content: "File Upload successfully",
        className: "custom-msg",
        duration: 3,
      });
      onSuccess();
    },
    beforeUpload: (file) => {
      setShowUploadFile(false);
      let fileType = {
        "image/png": true,
        "image/jpg": true,
        "image/jpeg": true,
        "image/PNG": true,
        "image/JPG": true,
        "image/JPEG": true,
        "application/pdf": true,
        "application/PDF": true,
      };
      let isFileName = file.name.split(".").length > 2 ? false : true;
      if (fileType[file.type] && isFileName) {
        return true;
      } else {
        message.error("File don't allow double extension")
        return Upload.LIST_IGNORE;
      }
    }
    }

    const getUploadVal= (item)=>{
      const prevUploadFile = form.getFieldsValue();
      return prevUploadFile[item.name]?.file?.name;
    }

  return (
    <>
      <Row gutter={[16, 16]} className="reasons-list mt-26">
        {data?.map((item,index) => (
          <>
            {item.inputType === "title" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}   >
                  <h4 
                  className="subtype-headings fs-16 fw-500">
                    {item.label}
                  </h4>
                </Col>
              </>
            )}
           {item.inputType === "radio" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div>
                    <Form.Item
                      label={<span>{item.label}{item.required && <sup>*</sup>}
                      </span>}
                      name={item.name}
                      className="inputs-label radio-grp fs-16 fw-400"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                        { whitwspace: item?.required },
                      ]}
                    >
                      <Radio.Group
                        onChange={handleRadioChange}
                        className="radio-check"
                      >
                        <Radio
                          value={item?.radioValue}
                          className="fs-16 fw-400"
                        >
                          {item?.title}
                        </Radio>
                        <Radio
                          value={item?.secondRadioValue}
                          className="fs-16 fw-400"
                        >
                          {item?.secondTitle}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "date" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}   >
                  <Form.Item
                    label={<span>{item.label}{item.required && <sup>*</sup>}
                    </span>}
                    name={item.name}
                    className="inputs-label fs-16 fw-400"
                    rules={[
                      {
                        required: item?.required,
                        message: item?.validationmsg,
                      }
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      className="cust-input"
                      format={dateFormat}
                      // onChange={handleDateChange}
                      onChange={(e)=>handleDateChange(e,item)}
                     disabledDate={disabledDate}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            {item.inputType === "texts" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}   ></Col>
              </>
            )}

            {item.inputType === "text" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}   >
                  <Form.Item
                    label={<span>{item.label}{item.required && <sup>*</sup>}
                    </span>}
                    name={item.name}
                    className="inputs-label fs-16 fw-400"
                    rules={[
                      {
                        required: item?.required,
                        message: item?.validationmsg,
                      },
                      { whitwspace: item?.required },
                      { min: item.minlength },
                      { max: item.maxlength },
                    ]}
                  >
                    <Input
                      placeholder={item.placeholder || item.label}
                      className="cust-input"
                      maxLength={item?.maxlength}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            {item.inputType === "dropdown" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}   >
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    className="inputs-label mb-0"
                    rules={[
                      {
                        required: item?.required,
                        message: item?.validationmsg,
                      }
                    ]}
                  >
                    <Select
                      className="cust-input"
                      maxLength={100}
                      placeholder={item.placeholder}
                      options={
                        item.name?.toLowerCase().includes("reasonforsurrender")
                        ? surrenderReasonsLU : []
                      }
                     
                      // options={[
                      //   {
                      //     label: "PO Name",
                      //     value: "poname",
                      //   },
                      //   {
                      //     label: "LA Name",
                      //     value: "laname",
                      //   },
                      //   {
                      //     lebel: "Nominee",
                      //     value: "Nominee",
                      //   },
                      // ]}
                    ></Select>
                  </Form.Item>
                </Col>
              </>
            )}
            {item.inputType === "upload" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12} key={index}>
                  <div>
                    <Form.Item
                      label={<span>{item.label}{item.required && <sup>*</sup>}
                      </span>}
                      name={item.name}
                      className="inputs-label fs-16 fw-400"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        }
                      ]}
                    >
                       <Upload 
                          {...uploadProps}
                          accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG"
                        customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess, index })}
                          >
                      <Input
                        placeholder={item.placeholder}
                        type="text"
                        className="cust-input upload-column"
                        size="small"
                        //value={uploadFiles?.name}
                        value={showUploadFile===index ? uploadFiles.name : getUploadVal(item)}
                        suffix={!props?.hideUploadOption&&suffix}
                        />
                        </Upload>
                    </Form.Item>
                    {item?.linkValue&&<>
                      <p style={{ textAlign: "center",textDecoration: "underline", color:"#b3201f"}}>
                        {!showPOSScreen&&<><a  className="link-txt" onClick={()=>handleUploadLink()}>
                          {item?.linkValue}
                        </a>
                        </>}
                      </p>
                      </>}
                  </div>
                </Col>
              </>
            )}

            {item.inputType === "link" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}  >
                  <Form.Item
                    label={<span>{item.label}{item.required && <sup>*</sup>}
                    </span>}
                    name={item.name}
                    className="inputs-label fs-16 fw-400"
                  >
                    <a  className="link-txt" onClick={handleTextLink}>
                      {item.linkValue}
                      
                    </a>
                  </Form.Item>
                </Col>
              </>
            )}
             {item.inputType === "textarea" && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                  <div className="text-area">
                    <Form.Item
                      label={<span>{item.label}{item.required && <sup>*</sup>}
                      </span>}
                      name={item.name}
                      className="inputs-label mb-0"
                      rules={[
                        {
                          required: item?.required,
                          message: item?.validationmsg,
                        },
                      ]}
                    >
                      <TextArea rows={2} placeholder="Comment Box" />
                    </Form.Item>
                  </div>
                </Col>
              </>
            )}
          </>
        ))}
      </Row>
    </>
  );
};

export default ChecklistDetails;
