import React, { useState,useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form,Select,Row,Col, Table,Spin, message,  DatePicker , Button,  } from 'antd';
import apiCalls from "../../api/apiCalls";
import moment from 'moment';
import ExportToExcelButton from '../ExportToExcelButton';

const FinanceDashboard = () => {
  const navigate = useNavigate();

  const { Option } = Select;
  const [form] = Form.useForm();
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [showTotalPages,setShowTotalpages] = useState(null);



  const [tableKey, setTableKey] = useState(0); // Key to force remount



  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const values = form.getFieldsValue();
  const dateFormat = "DD/MM/YYYY";
  const defaultColumns = [
    
    {
      title: "Policy Number",
      dataIndex: "policyNo",
      key: 'policyNo',
      // showSorterTooltip: false,
      // sorter: {
      //   compare: (a, b) => a.policyNo - b.policyNo,
      // },
    },
    {
      title: "Beneficiary Name",
      dataIndex: "beneficiaryName",
      key: 'beneficiaryName',
    },
    {
      title: "ChequeNo",
      dataIndex: "chequeNo",
      key: 'chequeNo',
    },
    {
      title: "IFSC",
      dataIndex: "ifscCode",
      key: 'ifscCode',
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: 'userName',
    },
    {
      title: "Payment Details1",
      dataIndex: "paymentDetails1",
      key: 'paymentDetails1',
    }
    

  ];
  const columns = defaultColumns?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        //handleSave,
      }),
    };
  });

  const excelData = [
    { Name: 'John', Age: 25, Country: 'USA' },
    { Name: 'Jane', Age: 30, Country: 'Canada' },
    // Add more data as needed
  ];

  useEffect(() => {
 
  }, []); 

  
  const handleSubmit = (values) => {
    const obj = {
        // "FromDate": new Date(values?.fromDate) ,
        // "ToDate": new Date(values?.todate)
        "FromDate": "2023-05-06T10:10:55.367Z",
    "ToDate": "2024-12-19T10:10:55.367Z"
    }
         
    let response = apiCalls.FinanceActionsOnSerReq(obj);
    response
      .then((val) => {
        if (val?.data) {
            setData(val?.data);
             
        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });  
  };
 

  

  const handleFromDateChange = (date) => {
        
    setFromDate(date);

  };
    const handleToDateChange = (date) => {
        setToDate(date);
        if (fromDate && date && date.isBefore(fromDate)) {
            message.error('To Date cannot be earlier than From Date');
            setToDate(()=> null); // Reset To Date
            form.setFieldsValue({ todate: null });
          } else {
            setToDate(date);
          }

      };

const handleButtonClick = () => {
    // Navigate to the 'excelUpload' path
    navigate('/excelUpload');
  };

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
                label="From Date"
                name="fromDate"
                className="input-label mb-0"
                rules={[
                    {
                      required: true,
                      message: 'Please select From Date',
                    },
                  ]}
              >
        

<DatePicker
                    style={{ width: "100%" }}
                    className="cust-input"
                    placeholder="From Date"
                    format={dateFormat}
                   value={fromDate}
                    onChange={(e) => handleFromDateChange(e)}
                  />

              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
              <Form.Item
                label="To Date"
                name="todate"
                className="input-label mb-0"
                rules={[
                    {
                      required: true,
                      message: 'Please select To Date',
                    },
                  ]}
              >
      
<DatePicker
                    style={{ width: "100%" }}
                    className="cust-input"
                    placeholder="To Date"
                    format={dateFormat}
                    value={toDate}
                    onChange={(e) => handleToDateChange(e)}
                  />
              </Form.Item>
            </Col>
      
            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
            <Button
                  type="primary"
                  className="primary-btn mt-33"
                  htmlType="submit"
                 
                >
                   Search
                </Button>
            </Col>


            <Col xs={12} sm={12} md={4} lg={4} xxl={4}>
            <Button
                  type="primary"
                  className="primary-btn mt-33"
                 
                  onClick={handleButtonClick}
                >
                   Excel Upload
                </Button>
            </Col>


            {/* <Col xs={12} sm={12} md={1} lg={1} xxl={1}>
            <span className='assignto-icon'>
              <span className="editIcon c-pointer"> <i  onClick={() => saveAssignTo()} className="bi bi-file-earmark-excel-fill"></i></span>
              </span>
            </Col> */}
          </Row>
        </Form>
      
      <div className="main-start">
        <div className="w-94">
        <p className="export-btn">
        <ExportToExcelButton data={data} fileName="exported-data.xlsx" sheetName="MySheet" />

            </p>
          <div className="table-container dashboard">
          <Table
           key={tableKey}
       
          rowKey={(record) => record.key}
          hideSelectAll={false}
        columns={columns}
        dataSource={data}
        rowClassName={() => 'editable-row'}
        //bordered={true}
       // x={true}
        pagination={{
          //pageSizeOptions: ["5", "10", "15", "15"],
          pageSize: 5,
          //showSizeChanger: true,
          defaultPageSize: 5,
         // size:"small",
           total: {showTotalPages},
          //showTotal: `Total ${showTotalPages} items`
        }}
      />
      </div>
      </div>
      </div>
      </Spin>
      </div>
    </>
  );
}

export default FinanceDashboard