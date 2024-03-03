import React, { useState, useEffect, } from "react";

import { connect,useSelector } from "react-redux";

import { Form,Select,Row,Col, Table,Spin, message,  DatePicker , Button,  Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import apiCalls from "../api/apiCalls";
import PopupAlert from "./popupAlert";


const ExcelUpload = (props) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  
  const [isLoading,setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [trigger,setTrigger] = useState([
    {
      value: "T-10",
      label: "T-10",
    },
    {
      value: "T-30",
      label: "T-30",
    },
    {
      value: "T-90",
      label: "T-90",
    },
    {
      value: "T-15",
      label: "T-15",
    },
    
  ]);
  const [commuType,setCommuType] = useState([
    {
      value: "email",
      label: "Email",
    },
    {
      value: "phone",
      label: "Phone",
    }
    
  ]);
  const [uploadType,setUploadType] = useState([
    {
      value: "PayeeCodeTransection",
      label: "Payment Transaction",
    },
     {
      value: "ChequeStatus",
      label: "Check Status",
    },

  ])
  
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props2 = {
    onRemove: (file) => {
      const index = fileList2.indexOf(file);
      const newFileList = fileList2.slice();
      newFileList.splice(index, 1);
      setFileList2(newFileList);
    },
    beforeUpload: (file) => {
      //debugger
      setFileList2([file]);
     // setFileList2([...fileList2, file]);
      return false;
    },
    multiple: false,
    fileList2,
  };

  const propss = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      //setFileList([...fileList, file]);
      setFileList([file]);
      return false;
    },
    multiple: false,
    fileList,
  };
  const handleSubmit = (values) => {
    setShowAlert(false);
    let formData = new FormData();
    formData.append("File", fileList[0]);
    let obj = {
      reqtype:values?.trigger

    }
    let response = apiCalls.UploadExcelFileAPI(formData, obj);
    response
      .then((val) => {

        setAlertTitle('Uploaded Successfully');

        setShowAlert(true);
      })
      .catch((err) => {
        setAlertTitle('Failed to Upload');

        setShowAlert(true);
        setIsLoading(false);
      });
  }
  
  const handleSubmit2 = (values) => {
    setShowAlert(false);
    let formData = new FormData();
    formData.append("File", fileList2[0]);
    let obj = {
      reqtype:values?.uploadType

    }
    let response = apiCalls.UploadExcelFileAPI(formData, obj);
    response
      .then((val) => {
        setAlertTitle('Uploaded Successfully');

        setShowAlert(true);
      })
      .catch((err) => {
        setAlertTitle('Failed to Upload');

        setShowAlert(true);
        setIsLoading(false);
      });


  }

  return (

    <>
      <div className='w-94'>
      <Spin spinning={isLoading}>
  
        <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={[16,16]} className='dashboard-filters'>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Trigger"
                name="trigger"
                className="input-label mb-0"
                rules={[
                    {
                      required: true,
                      message: 'Please select Trigger',
                    },
                  ]}
              >
        

        <Select
                  showSearch
                  placeholder="Select Trigger Value"
                  optionFilterProp="children"
   
                  options={trigger}
                />

              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Communication Type"
                name="communicationType"
                className="input-label mb-0"
                rules={[
                    {
                      required: true,
                      message: 'Please select Communication Type',
                    },
                  ]}
              >

<Select
                  showSearch
                  placeholder="Select Communication Type"
                  optionFilterProp="children"
   
                  options={commuType}
                />



              </Form.Item>
            </Col>

            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>

            <Form.Item
                label="Upload Excel"
                name=""
                className="input-label mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please Upload Excel File',
                  },
                ]}
              >




<Upload {...propss}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

              </Form.Item>




      {/* <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button> */}
       </Col>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
            <Button
                  type="primary"
                  className="primary-btn mt-33"
                  htmlType="submit"
                 
                >
                   Submit
                </Button>
            </Col>


      


          </Row>
        </Form>
      
        <Form
          form={form2}
          name="wrap"
          labelCol={{
            flex: "35%",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          onFinish={handleSubmit2}
          autoComplete="off"
        >
          <Row gutter={[16,16]} className='dashboard-filters'>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="Upload Type"
                name="uploadType"
                className="input-label mb-0"
                rules={[
                    {
                      required: true,
                      message: 'Please Upload Type',
                    },
                  ]}
              >
        

        <Select
                  showSearch
                  placeholder="Select Upload Type"
                  optionFilterProp="children"
   
                  options={uploadType}
                />

              </Form.Item>
            </Col>
    

            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>

            <Form.Item
                label="Upload Excel"
                name=""
                className="input-label mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please Upload Excel File',
                  },
                ]}
              >




<Upload {...props2}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

              </Form.Item>




      {/* <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button> */}
       </Col>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
            <Button
                  type="primary"
                  className="primary-btn mt-33"
                  htmlType="submit"
                 
                >
                   Submit
                </Button>
            </Col>


      


          </Row>
        </Form>
      </Spin>
      </div>

      {showAlert && (
        <PopupAlert
          alertData={''}
          title={alertTitle}
          navigate={''}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
      
    </>
  );


};

const mapStateToProps = ({ state, policyDetails }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails };
};

export default connect(mapStateToProps)(ExcelUpload);
