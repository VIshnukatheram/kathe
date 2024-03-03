import React, { useEffect, useState,useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SearchOutlined } from '@ant-design/icons';

import { Bar } from "react-chartjs-2";
import { Card, Checkbox,Switch, Col, DatePicker , Form, Row, Space, Statistic, Table,message,Spin,Select ,  Button} from "antd";
import apiCalls from '../api/apiCalls';
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/images/close-icon.png";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmailManagement = () => {
  const [form] = Form.useForm();
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  // const [emailSource, setEmailSource] = useState([]);
  
  const [checkedCards, setCheckedCards] = useState({});
  const [masterData,setMasterData] = useState([]);
  const [callTypeLU,setCallTypeLU] = useState([]);
  let PONE = [0,0,0];
  let PTWO= [0,0,0];
  let PTHREE= [0,0,0];
  const selectedCategory = {
    'Q':'','R':'', 'C':''
  };

  const PFOUR =[0,0,0];

  const [selectedCallType,setSelectedCallType] = useState("");
  const [selectedSubTypeId,setSelectedSubTypeId] = useState(null);
  const [selectedSubType,setSelectedSubType] = useState(null);
  const [subTypeLU, setSubTypeLU] = useState(null);
  const isInitialMasterMount = useRef(true);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const [data, setData] = useState(); 
  const [NLPResponseChecked, setNLPResponseChecked] = useState(false);
  const [Addressedto, setAddressedto] = useState(false);


  const [NEW_CNT, setNEW_CNT]= useState();
  const [PENDING_CNT, setPENDING_CNT]= useState();
  const [RESOLVED_CNT, setRESOLVED_CNT]= useState();
  const [FOLLOWUP_CNT, setFOLLOWUP_CNT]= useState();
const emailSource = [
  { value: '1', label: 'Internal' },
  { value: '2', label: 'External' },
  { value: '3', label: 'Other Domain' },
    { value: '-1000', label: 'None' },

]
  
  // const data = {
  //   labels: ["24hrs", "24 hrs to 36 hrs", ">36 hrs"],
  //   datasets: [
  //     {
  //       label: "p1",
  //       data: PONE,
  //       backgroundColor: "#b3201f",
  //       borderColor: "black",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "p2",
  //       data: PTWO,
  //       backgroundColor: "yellow",
  //       borderColor: "black",
  //       borderWidth: 1,
  //     },
  //     {
  //       label: "p3",
  //       data: PTHREE,
  //       backgroundColor: "#6495ED",
  //       borderColor: "black",
  //       borderWidth: 1,
  //     },
  //   ],
  // };


  const columns = [
    {
      title: "Unique Reference Number(URN)",
      dataIndex: "urn",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
      render: (_, record) => (
                <Space size="middle">
        <a className="text-color" onClick={() => handleAction(record)}>{record.urn}</a>
                </Space>
              ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "serviceNo",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email Ageing",
      dataIndex: "emailAgeing",
      showSorterTooltip: false,
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },

    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
    {
      title: "Repeat Count",
      dataIndex: "repeatCount",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
    {
      title: "Addresses To Multiple Email IDs",
      dataIndex: "addressedToMultipleIDs",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
    {
      title: "Merge Email Y/N",
      dataIndex: "mergedMail",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
    {
      title: "Registered Flag",
      dataIndex: "RegdMailID",
      render: (RegdMailID) => (RegdMailID ? 'True' : 'False'),
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
    {
      title: "Junk / Spam Flag",
      dataIndex: "IsSpamEMS",
      render: (isSpamEMS) => (isSpamEMS ? 'True' : 'False'),
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },

    {
      title: "Life / Non-Life Flag",
      dataIndex: "lifeOrNonLife",
      sorter: (a, b) => a.from.length - b.from.length,
    sortDirections: ["descend", "ascend"],
    },
  ];

  
    // const clearAllFilters = () => {
    //   form.resetFields();
    // };

  const options = {
  };
  // const handleChange = (value,index) => {
  //   
  //   if (checkedList.includes(value)) {
  //     setCheckedList([]);
  //   } else {
  //     setCheckedList([value]);
  //   }
  // };
  useEffect(()=>{

    getCTST();
    handleSubmit()
    // if (!isInitialMasterMount.current) {
    // getCTST();
    // }
    // else {
    //   // Set isInitialMount to false after the initial render
    //   isInitialMasterMount.current = false;
    // }
  },[])

  useEffect(() => {
    
    // if (!isInitialMount.current) {
    //   getEmailManagementFilter(checkedCards);
    // } else {
   
    //   isInitialMount.current = false;
    // }
  }, [checkedCards]); 

  const handleAction=(item)=>{
    navigate(`/emailmanagementview/${item?.emailResponseId}`, { state: item });
  }

  const restAll = () => {
    form.resetFields();
    handleSubmit()
  }




  const handleSubmit = (values) => {
    let cat = Object.values(selectedCategory).filter((value) => {return value !== '' })
    let obj={
        "emailSource":values?.emailSource ? values?.emailSource?.split('').map(Number):'',
        "ReceivedFromDt":values?.ReceivedFromDt ? new Date(values?.ReceivedFromDt) : '',
        "ReceivedToDt":values?.ReceivedToDt ? new Date(values?.ReceivedToDt) : '',
        "IsNLPRespGen":values?.IsNLPRespGen ? values?.IsNLPRespGen  :'',
        "AddressedToMultipleIDs": values?.AddressedToMultipleIDs ? values?.AddressedToMultipleIDs  :false,
        "CallType":values?.CallType ? values.CallType:'',
        "SubType":values?.SubType ? values.SubType:'',
        "Category":cat
        // "Category":values?.Category ?   values?.Category?.split('').map(Number):'',
    

    }

    let response = apiCalls.getEmailManagementFilter(obj);
    response
      .then((val) => {
        if (val?.data) {
          //debugger
          if(Array.isArray(val?.data?.emailSummary)){
            val?.data?.emailSummary.forEach((ele)=>{
              if(ele.summaryDesc=== "NEW_CNT"){
                setNEW_CNT(ele.countOfMails)
              }else if(ele.summaryDesc=== "PENDING_CNT"){
                setPENDING_CNT(ele.countOfMails)
              }else if(ele.summaryDesc=== "RESOLVED_CNT"){
                setRESOLVED_CNT(ele.countOfMails)
              }else if(ele.summaryDesc=== "FOLLOWUP_CNT"){
                setFOLLOWUP_CNT(ele.countOfMails)
              }

            })
          }
          if(Array.isArray(val?.data?.graphDataSets)){
            val?.data?.graphDataSets.forEach((ele)=>{
                       if(ele.label === "p1"){
                        PONE = ele.data
                       }else if(ele.label === "p2"){
                        PTWO = ele.data
                       }else if(ele.label === "p3"){
                        PTHREE = ele.data
                       }
            })
          }
           if(Array.isArray(val?.data?.emailClassify) && val?.data?.emailClassify.length>0 ){
            setFiltersData(val?.data?.emailClassify);
           }else{
            setFiltersData([]);
           }

           setData ({
            labels: ["24hrs", "24 hrs to 36 hrs", ">36 hrs"],
            datasets: [
              {
                label: "p1",
                data: PONE,
                backgroundColor: "#b3201f",
                borderColor: "black",
                borderWidth: 1,
              },
              {
                label: "p2",
                data: PTWO,
                backgroundColor: "yellow",
                borderColor: "black",
                borderWidth: 1,
              },
              {
                label: "p3",
                data: PTHREE,
                backgroundColor: "#6495ED",
                borderColor: "black",
                borderWidth: 1,
              },
              {
                label: "p4",
                data: PFOUR,
                backgroundColor: "#00831a",
                borderColor: "green",
                borderWidth: 1,
              },
            ],
          });
        
          setIsLoading(false);
        } else {
          setIsLoading(false);
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });

    //debugger
  }

    // Define a reusable function for data transformation
const transformData = (data, key) => {
  const filteredData = data?.filter((ele) => ele.key === key);
  return filteredData[0]?.value?.map((item) => ({
    ...item,
    label: item.mstDesc,
    value: item.mstID,
  }));
};

const filterOption = (input, option) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const onSearch = (e) =>{
}

  const getCTST=async() => {
    
    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
          "CALL_TYP","SUB_TYP"
      ]
  }
    let response =await apiCalls.ctst(obj);
    if(Array.isArray(response?.data)){
      setMasterData(response.data);
      // Use the function for each set of data
      const transformedData = transformData(response.data, "CALL_TYP");
      setCallTypeLU(transformedData);
      setIsLoading(false);
    }
   else {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: "Something went to wrong!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }

  const subTypeDropdown =async (value,subType,allData)=>{
    let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") : allData?.filter((ele) => ele.key === "SUB_TYP");
    let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
    let transformedData = data?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID
    }));
    setSubTypeLU(transformedData);
  }

  const handleCallTypeChange = (value) => {
      setSelectedCallType(value);
      form.setFieldsValue({subType: null})
      setSubTypeLU(null);
      setSelectedSubType(null);
      subTypeDropdown(value);
    };
    const handleSubTypeChange = (value,getSubLU) => {
      setSelectedSubTypeId(value);
      let subTypeData = subTypeLU?.length>0 ? subTypeLU : getSubLU;
      subTypeData?.map((key, index) => {
        if(key.mstID===value){
          const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
          setSelectedSubType(modifiedDesc);
        }
      });
    };

  const handleChange = (item, index, categoryTitle) => {
    
    const updatedCheckedCards = { ...checkedCards };

    if (!updatedCheckedCards[categoryTitle]) {
      updatedCheckedCards[categoryTitle] = [];
    }

    if (updatedCheckedCards[categoryTitle].includes(item)) {
      // Uncheck the checkbox if it is already checked
      updatedCheckedCards[categoryTitle] = [];
    } else {
      // Check the clicked checkbox and uncheck others in the same category
      updatedCheckedCards[categoryTitle] = [item];

    }

    setCheckedCards(updatedCheckedCards);
  };

  const clearAllFilters = (categoryTitle) => {
    setCheckedCards((prevCheckedCards) => ({
      ...prevCheckedCards,
      [categoryTitle]: [],
    }));

  };


  const onChangeCategory = (e, type) => {
    if (type === 'Q') selectedCategory.Q = e.target.checked ? 1 : '';
    else if (type === 'R') selectedCategory.R = e.target.checked ? 2 : '';
    else if (type === 'C') selectedCategory.C = e.target.checked ? 3 : '';
  };
  
  // const getEmailManagementFilter =(selectedCheckBox)=>{
    
  //   setIsLoading(true);
  //      let obj={

  //       "emailSource":'',
  //       "ReceivedFromDt":'',
  //       "ReceivedToDt": '',
  //       "IsNLPRespGen":'',
  //       "AddressedToMultipleIDs": false,
  //       "CallType":'',
  //       "SubType":'',
  //       "Category":'',


        
  //      }
  //   let response = apiCalls.getEmailManagementFilter(obj);
  //   response
  //     .then((val) => {
  //       //debugger
  //       if (val?.data) {
   
  //         if(Array.isArray(val?.data?.emailSummary)){
  //           val?.data?.emailSummary.forEach((ele)=>{
  //             if(ele.summaryDesc=== "NEW_CNT"){
  //               setNEW_CNT(ele.countOfMails)
  //             }else if(ele.summaryDesc=== "PENDING_CNT"){
  //               setPENDING_CNT(ele.countOfMails)
  //             }else if(ele.summaryDesc=== "RESOLVED_CNT"){
  //               setRESOLVED_CNT(ele.countOfMails)
  //             }else if(ele.summaryDesc=== "FOLLOWUP_CNT"){
  //               setFOLLOWUP_CNT(ele.countOfMails)
  //             }

  //           })
  //         }
  //         if(Array.isArray(val?.data?.graphDataSets)){
  //           val?.data?.graphDataSets.forEach((ele)=>{
  //                      if(ele.label === "p1"){
  //                       PONE = ele.data
  //                      }else if(ele.label === "p2"){
  //                       PTWO = ele.data
  //                      }else if(ele.label === "p3"){
  //                       PTHREE = ele.data
  //                      }
  //           })
  //         }
   

  //      setData ({
  //       labels: ["24hrs", "24 hrs to 36 hrs", ">36 hrs"],
  //       datasets: [
  //         {
  //           label: "p1",
  //           data: PONE,
  //           backgroundColor: "#b3201f",
  //           borderColor: "black",
  //           borderWidth: 1,
  //         },
  //         {
  //           label: "p2",
  //           data: PTWO,
  //           backgroundColor: "yellow",
  //           borderColor: "black",
  //           borderWidth: 1,
  //         },
  //         {
  //           label: "p3",
  //           data: PTHREE,
  //           backgroundColor: "#6495ED",
  //           borderColor: "black",
  //           borderWidth: 1,
  //         },
  //         {
  //           label: "p4",
  //           data: PFOUR,
  //           backgroundColor: "#00831a",
  //           borderColor: "green",
  //           borderWidth: 1,
  //         },
  //       ],
  //     });

  //      //debugger
  // console.log(PONE,PTWO, PTHREE )

  //         setFiltersData(val?.data?.emailClassify);
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //         message.error({
  //           content:
  //             val?.data?.responseBody?.errormessage ||
  //             "Something went wrong please try again!",
  //           className: "custom-msg",
  //           duration: 2,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //     });
  // }
 
const sumAll = (values) => {
  //debugger
  return values.reduce((acc, current) => acc + current, 0)
}

  const clearValues = (fieldName) => {
    //debugger

    form.resetFields([fieldName]);
    if(fieldName === 'ReceivedFromDt'){
      form.resetFields(['ReceivedToDt']);
    }
    // form.setFieldsValue({
    //   [fieldName]: {
    //     value: undefined, // Use undefined to clear the selection
    //   },
    // });
  }
  return (
    <>
      <div className="email-container">
      <Row gutter={[16, 16]}>
      
  
  
  
      <Col xs={24} sm={24} md={18} lg={18} xxl={18}>
        <Spin spinning={isLoading} >
          <h5 style={{ textAlign: "center", marginTop: "10px" }}>Email Ageing</h5>
          <div className="d-flex">
            <div className="bar-charts">
            {data && 
              <Bar data={data} options={options} />
            }
            </div>
            <div className="count-status">
              <Space direction="horizontal" style={{ marginBottom: "20px" }}>
                <Card style={{width: 200}} hoverable={true}>
                  <Space direction="horizontal">
                    <Statistic title="New Count" value={NEW_CNT} />
                  </Space>
                </Card>
                <Card style={{width: 200}} hoverable={true}>
                  <Space direction="horizontal">
                    <Statistic title="Pending Count" value={PENDING_CNT} />
                  </Space>
                </Card>
              </Space>
              <Space direction="horizontal">
                <Card style={{width: 200}} hoverable={true}>
                  <Space direction="horizontal">
                    <Statistic title="Resolved Count" value={RESOLVED_CNT} />
                  </Space>
                </Card>
                <Card style={{width: 200}} hoverable={true}>
                  <Space direction="horizontal">
                    <Statistic title="Follow Up Count" value={FOLLOWUP_CNT} />
                  </Space>
                </Card>
              </Space>
            </div>
          </div>
          <div className="table-container table-responsive email-managedashboard">
            <Table
              columns={columns}
              dataSource={filtersData}
              x={true}
              pagination={{
                pageSize: 4,
                defaultPageSize: 4,
                total: { showTotalPages },
              }}
            />
          </div>
          </Spin>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6} xxl={6}>
        <div className="filters-right">
          {" "}
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
      
            <div className="email-filters">



<Space direction="horizontal" style={{ marginBottom: "0px" }}>
              <Card
                      style={{ width: 350 }}
                      hoverable={true}
                      className="mb-10 pt-10"
                    >

      
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                       <div className="w-95">
                       <p> <a style={{ textDecoration: "underline !important" }}  onClick={() => restAll()}>Reset All </a></p>
                  </div>
                  <div className="">
                  <Button
                      type="primary"
                      htmlType="submit"
                      className="primary-btn advance-btn"
                     
                    >
                     Search <SearchOutlined />
                    </Button>
                   </div>
                   </div>
          

                    </Card>
                    </Space>



                    <Card
                      style={{ width: 350 }}
                      hoverable={true}
                      className="mb-10 pt-10"
                    >

<Form.Item label="Email Source" name="emailSource" className="inputs-label mb-0">

  
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="w-95">
      <Select
        showSearch
        onSearch={onSearch}
        className="cust-input calltype-select"
        maxLength={100}
        placeholder="Select Email Source"
        options={emailSource}
        name="emailSource" 
        onChange={(value) => {
          form.setFieldsValue({ emailSource: value });
        }}
      ></Select>
    </div>
    <div className="">
      <img className="close-icon" src={CloseIcon} alt="" onClick={() => clearValues('emailSource')}></img>
    </div>
  </div>
</Form.Item>

                    </Card>
                 
                    <Card style={{ width: 350 }} hoverable={true} className="mb-10 pt-10">
                    <Form.Item label="Received On"   name="ReceivedToDt" className="inputs-label mb-0" style={{ display: "none" }}></Form.Item>
  <Form.Item label="Received On"   name="ReceivedFromDt" className="inputs-label mb-0">
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="w-95">
      <DatePicker   onChange={(value) => {
          form.setFieldsValue({ ReceivedFromDt: value });
        }} name="ReceivedFromDt" style={{ marginRight: 8 }} />
      <DatePicker    onChange={(value) => {
          form.setFieldsValue({ ReceivedToDt: value });
        }} name="ReceivedToDt" style={{ marginRight: 8 }} />
      
    </div>
    <div> 
                <img className="close-icon" src={CloseIcon} onClick={() => clearValues('ReceivedFromDt')} alt=""></img></div>
                   </div>
 
  </Form.Item>
</Card>


                    <Card
                      style={{ width: 350 }}
                      hoverable={true}
                      className="mb-10 pt-10"
                    >

                     <Form.Item
                   label="NLP Response"
                  name="IsNLPRespGen"
                  className="inputs-label mb-0"
                >
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                   <div className="w-95">
            

    <Switch
                      checked={NLPResponseChecked}
                      onChange={ (checked) => {setNLPResponseChecked(checked); form.setFieldsValue({ IsNLPRespGen: NLPResponseChecked })}}
                      checkedChildren="Generated"
                      unCheckedChildren="Ignore"
                    />


    </div> 
    <div> 
                <img className="close-icon" src={CloseIcon} onClick={() => clearValues('IsNLPRespGen')} alt=""></img></div>
                   </div>
                </Form.Item>

                    </Card>



                    <Card style={{ width: 350 }} hoverable={true} className="mb-10 pt-10">
                      <Form.Item label="Q / R / C" name="Category" className="inputs-label mb-0">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div className="w-95">
                           <span title="Query"> Q <Checkbox 
                                  onChange={(event)=> onChangeCategory(event, 'Q')}

                           label="Query"  name="query" className="inputs-label mb-0 mr-15 pr-2" /></span>
                           <span title="Request">  R<Checkbox  onChange={(event)=> onChangeCategory(event, 'R')} label="Request" name="request" className="inputs-label mb-0 mr-15 pr-2" /></span>
                           <span title="Complaint"> C<Checkbox  onChange={(event)=> onChangeCategory(event, 'C')} label="Complaint" name="complaint" className="inputs-label mb-0 mr-15 pr-2" /></span>
                          </div>
                          <div>
                            <img className="close-icon" onClick={() => clearValues('Category')} src={CloseIcon} alt="" />
                          </div>
                        </div>
                      </Form.Item>
                    </Card>




                    <Card
                      style={{ width: 350 }}
                      hoverable={true}
                      className="mb-10 pt-10"
                    >

                     <Form.Item
                   label="Addressed to"
                  name="AddressedToMultipleIDs"
                  className="inputs-label mb-0"
                >
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                 <div className="w-95">
                   {/* <Radio.Group defaultValue="ignore" buttonStyle="solid">
      <Radio.Button value="multiple">Multiple</Radio.Button>
      <Radio.Button value="ignore">Ignore</Radio.Button>

    </Radio.Group> */}
    
    <Switch
                      checked={Addressedto}
                      onChange={ (checked) => {setAddressedto(checked); form.setFieldsValue({ AddressedToMultipleIDs: Addressedto })}}
                      checkedChildren="Multiple"
                      unCheckedChildren="Ignore"
                    />
    </div> 
    <div>
                <img className="close-icon" src={CloseIcon} onClick={() => clearValues('AddressedToMultipleIDs')}  alt=""></img></div> 
                   </div>
                </Form.Item>

                    </Card>
                 






                    <Card
                      style={{ width: 350 }}
                      hoverable={true}
                      className="mb-10 pt-10"
                    >
    <Form.Item
                   label="Call Type"
                  name="CallType"
                  className="inputs-label mb-16"
                >
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                 <div className="w-95"> 
                  <Select
                    showSearch
                    onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Call Type"
                    options={ callTypeLU}
                    filterOption={filterOption}
                 

                    onChange={(value) => {handleCallTypeChange(value);
                      form.setFieldsValue({ CallType: value });
                    }}
                  ></Select>
            </div>
            <div>
                <img className="close-icon" onClick={() => clearValues('CallType')} src={CloseIcon} alt=""></img></div> 
                
            </div>
            </Form.Item>
            <Form.Item
                   label="Sub Type"
                  name="SubType"
                  className="inputs-label mb-16"
                >
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                 <div className="w-95"> 
                  <Select
                    showSearch
                    onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Sub Type"
                    options={subTypeLU}
                    filterOption={filterOption}
                 

                    
                    onChange={(value) => {handleSubTypeChange(value);
                      form.setFieldsValue({ SubType: value });
                    }}
                  ></Select>
                  </div>
                  <div>
                <img className="close-icon" onClick={() => clearValues('SubType')} src={CloseIcon} alt=""></img></div> 
                
        
                  </div>
                </Form.Item>

                    </Card>

                    <Card
                      style={{ width: 350 }}
                      hoverable={true}
                      className="mb-10 pt-10"
                    >

                     <Form.Item
                   label="Assigned To"
                  name="AssignedTo"
                  className="inputs-label mb-0"
                >
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                       <div className="w-95">
                  <Select
                    showSearch
                    onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Call Type"
                    options={ emailSource}
                    filterOption={filterOption}
                    onChange={(e) => handleCallTypeChange(e)}
                  ></Select>
                  </div>
                  <div className="">
                   <img className="close-icon" onClick={() => clearValues('AssignedTo')} src={CloseIcon} alt=""></img>
                   </div>
                   </div>
                </Form.Item>

                    </Card>




            </div>
          </Form>
        </div>
        </Col>
        </Row>
      </div>
    </>
  );
};

export default EmailManagement;
