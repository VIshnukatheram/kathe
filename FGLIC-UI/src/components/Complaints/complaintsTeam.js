import React, { useState,useEffect, useRef  } from 'react';
import ReactQuill from 'react-quill';
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Routes, Route, useParams,useLocation } from 'react-router-dom';
import apiCalls from "../../api/apiCalls";
import { Card,Button, Col, Row ,List, Space, Radio,Tabs, Select, Input ,Form, Upload, Collapse,message,Spin} from 'antd';
import { Color } from '@rc-component/color-picker';

const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;


const items = [
  {
    key: '1',
    label: 'Basic Details',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text . ",
  },
  {
    key: '2',
    label: 'Financial & Viability',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
  },
  {
    key: '3',
    label: 'Medicals',
    children: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
  },
];

// import apiCalls from "../../api/apiCalls";
const ComplaintsTeam = (props) => {
  const [form] = Form.useForm();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [data,setData]=useState([]);
  const [isResponseMode,setIsResponseData]=useState('email');
  const [callType,setCallType]=useState('');
  const [subType,setSubType]=useState('');
  const [fromDate,setFromDate]=useState('');
  const [toDate,setToDate]=useState('');
  const [subject,setSubject]=useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [subTypeLU,setSubTypeLU] = useState([]);
  const [masterData,setMasterData] = useState([]);
  const [callTypeLU,setCallTypeLU] = useState([]);
  const [selectedCallType,setSelectedCallType] = useState("");
  const [selectedSubType,setSelectedSubType] = useState(null);
  const [isSubmitButton,setIsSubmitButton]=useState("");
  const [selectedComplaintCallType,setSelectedComplaintCallType]=useState('');
  const [selectedComplaintSubType,setSelectedComplaintSubType]=useState('');
  const { state } = useLocation();





  const responseMode=[
    {
      name:"Email",
      value:"email"
    },
    {
      name:"Letter",
      value:"letter"
    }
  ]
  

  const [ComplaintCall, setComplaintCall] = useState(false);
  const [isClickedButton,setIsClickedButton]=useState(false);

  let { serviceId } = useParams();

  
	const [mode, setMode] = useState('left');
	const handleModeChange = (e) => {
	  setMode(e.target.value);
	};

  const handleChangeEditor = (html) => {
    setEditorHtml(html);
  };

	const formItemLayout = {
		labelCol: {
		  span:4, // adjust the span based on your layout needs
		},
		wrapperCol: {
		  span: 16, // adjust the span based on your layout needs
		},
	  };

	  const formItemLayout2 = {
		labelCol: {
		  span: 8,
		},
		wrapperCol: {
		  span: 16,
		},
	  };

  useEffect(() => {
    getPOSIndividualData()
  }, []);

  const beforeUpload = file => {
    // Add your custom validation logic here
    return true;
  };
  const handleChange1 = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleRemove = file => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const getPOSIndividualData=async()=>{
    setIsLoading(true);
    const  val = await apiCalls.getPOSIndividualData(serviceId);
    setIsLoading(false);
    getHeaderParametersData(val.data)
  }

  const getHeaderParametersData=async(ele)=>{
    setIsLoading(true);
    let obj = {
      "policyNo": ele?.policyNo,
			"applicationNo": '',
			"dob":ele?.dob
    }
    const response=await apiCalls.getHeaderParameters(obj);
    if(response?.data?.responseHeader?.issuccess) {
      setIsLoading(false);
      setData(response?.data?.responseBody);
    }
    else {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Smoething went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  }

  

  const customRequest = ({ file, onSuccess, onError }) => {
    // Add your custom upload logic here (e.g., using Axios or Fetch)
    // onSuccess should be called when the upload is successful
    // onError should be called when there is an error during upload
    onSuccess();
  };


 
  const handlePreview = file => {
    // Add logic to preview the file (e.g., open a modal or navigate to a preview page)
    //window.open(file.url || file.thumbUrl, '_blank');
    // const reader = new FileReader();  // download code
    // reader.onloadend = () => {
    //   window.open(reader.result, '_blank');
    // };
    // reader.readAsDataURL(file.originFileObj);

    // Check if the file type is an image or a PDF
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      // Display images and PDFs directly in the browser
      //window.open(URL.createObjectURL(file.originFileObj), '_blank');
      // Display images and PDFs directly in the browser
      setPreviewFile(file);
      setPreviewVisible(true);
    } else {
      // For other file types, open a new window with a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(file.originFileObj);
      downloadLink.download = file.name;
      downloadLink.click();
    }
  };
  
  const uploadButton = (
    <Button icon={<i
      class="bi bi-paperclip text-color c-pointer fs-20"
      style={{ width: "20px" }}
    ></i>}></Button>
  );


  const handleDownload = file => {
    // Create a download link and trigger the click event
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file.originFileObj);
    downloadLink.download = file.name;
    downloadLink.click();
  };

  const handleChangeTC = (e) => {
    if(e.target.value === 'yes'){
     setComplaintCall(true);
    }else{
      setComplaintCall(false);
    }
  
 
  };

  const handleResponseMode=(ele)=>{
    setIsResponseData(ele.value)
  }
  
  useEffect(()=>{
   getCTST();
  },[])

  const getCTST=async() => {
    
    setIsLoading(true);
    let obj =
    {
      "MasterRequest": [
          "CALL_TYP","SUB_TYP","COMPLAINT_CT","COMPLAINT_ST_2"
      ]
  }
    let response =await apiCalls.ctst(obj);
    if(Array.isArray(response?.data)){
      setMasterData(response.data);
      // Use the function for each set of data
      const transformedData = transformData(response.data, "CALL_TYP");
      const subTypeData = transformData(response.data, "SUB_TYP");
      const cellTypeComplaintData = transformData(response.data, "COMPLAINT_CT");
      const subTypeComplaintData = transformData(response.data, "COMPLAINT_ST_2");
      setSelectedComplaintSubType(subTypeComplaintData)
      setSelectedComplaintCallType(cellTypeComplaintData)
      setCallTypeLU(transformedData);
      let filteredData=subTypeData?.filter((item)=>{
        return item.mstParentID===state?.callTypeNum
      });
      console.log("=====>",filteredData);
      setSubTypeLU(filteredData);
      form.setFieldsValue({
        callType:state?.cellType,
        subType:state?.subType
      })
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


  const transformData = (data, key) => {
    const filteredData = data?.filter((ele) => ele.key === key);
    return filteredData[0]?.value?.map((item) => ({
      ...item,
      label: item.mstDesc,
      value: item.mstID,
    }));
  };
const handleSave=async(e)=>{
  const values = form.getFieldsValue();
  var obj=
    {
      ServicereqId: serviceId,
      CallType: state?.callTypeNum,
      SubType: isClickedButton?subType:state?.subTypeNum,
      ComplaintCallType: null,
      ComplaintSubType: null,
      ComplaintFrom: values.from,
      SenderTo: values.to,
      Subject: values.subject,
      CC:  values.cc,
      content:editorHtml ,
      Policynumber: data?.identifiers?.policyNo
    }
    const response=await apiCalls.getComplaintAction(obj);
 

}

const handleSend=async()=>{
  const values = form.getFieldsValue();
  var obj=
  {
    ServicereqId: serviceId,
    CallType: state?.callTypeNum,
    SubType: isClickedButton?subType:state?.subTypeNum,
    ComplaintCallType: null,
    ComplaintSubType: null,
    ComplaintFrom: values.from,
    SenderTo: values.to,
    Subject: values.subject,
    CC:  values.cc,
    content:editorHtml ,
    Policynumber: data?.identifiers?.policyNo
  }
    const response=await apiCalls.getSendAction(obj);
}

const handleChangeCellType=(e)=>{
setCallType(e)
}
const handleChangeSubType=(e)=>{
  setSubType(e);
  setIsClickedButton(true);
}
const onSearch = (value) => {
};
const handleCallTypeChange=(e,index)=>{
  setSelectedCallType(e);
}
const filterOption = (input, option) =>
(option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const handleSubTypeChange=(e)=>{
  setSelectedSubType(e)
}

const onFinish = (values) => {
  if(isSubmitButton==="save"){
    handleSave()
  }
  else if(isSubmitButton==="send"){
    handleSend();
  }
};

const onFinishFailed = (errorInfo) => {

};

  return (
   <>
   <Spin spinning={isLoading}>
<div className='complaints-section'>
  <div style={{ width: '80%', float: 'left'}}>
<br/>

	<Row className='sec-dark' gutter={16} style={{ margin: '0px 16px', padding:'10px' }}>
	<Col span={6}>
    <div className='boxx'>
      <div>
        <p ><b> Policy No</b></p>
        <p >{data?.identifiers?.policyNo}</p>
      </div>
      <div >
        <p ><b> App No</b></p>
        <p >{data?.identifiers?.applicationNo}</p>
      </div>
	  <div >
        <p ><b> LA Name</b></p>
        <p >{data?.identifiers?.la_Name}</p>
      </div>
	  <div >
        <p ><b> PO Name</b></p>
        <p >{data?.identifiers?.po_Name}</p>
      </div>
    </div>
  </Col>
	<Col span={6}>
    <div className='boxx'> 
      <div >
        <p ><b> Customer Type</b></p>
        <p >{data?.planAndStatus?.customerType}</p>
      </div>
      <div >
        <p ><b> Plan Name(ULIP/Non ULIP)</b></p>
        <p >{data?.planAndStatus?.planName}</p>
      </div>
	  <div >
        <p ><b> Policy  Status</b></p>
        <p >{data?.planAndStatus?.policyStatus}</p>
      </div>
	  <div >
        <p ><b> Premium Status</b></p>
        <p >{data?.planAndStatus?.premiumStatus}</p>
      </div>
    </div>
   </Col>
   <Col span={6}>
   <div className='boxx'>
      <div >
        <p ><b> Sum Assured</b></p>
        <p >{data?.saDetails?.sumAssured}</p>
      </div>
      <div >
        <p ><b> PT </b> </p>
        <p >{data?.saDetails?.pt}</p>
      </div>
	  <div >
        <p ><b> RCD</b></p>
        <p >{data?.saDetails?.rcd}</p>
      </div>
	  <div >
        <p ><b> Assignment</b></p>
        <p >{data?.saDetails?.assignment}</p>
      </div>
    </div>
   </Col>
   <Col span={6}>
   <div className='boxx'>
      <div >
        <p ><b> Model Premium Amount</b></p>
        <p >{data?.premiumDetails?.modelPremiumAmount}</p>
      </div>
      <div >
        <p ><b>PPT </b> </p>
        <p >{data?.premiumDetails?.ppt}</p>
      </div>
	  <div >
        <p ><b> PTD</b></p>
        <p >{data?.premiumDetails?.ptd}</p>
      </div>
	  <div >
        <p ><b> Mode</b></p>
        <p >{data?.premiumDetails?.mode}</p>
      </div>
    </div>
   </Col>
  </Row>
  <div className = 'tabs-begin' style={{  margin: '16px 16px',}}>
  <Tabs tabPosition="left" type="card">
      <TabPane
        tab={
          <span>

Complaint Description
          </span>
        }
        key="1"
      >

<Form >
<Form.Item label="Complaint Description" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} >
        <Input.TextArea rows={6} placeholder={state.complaintDescription} Disabled="true"/>
      </Form.Item>

      <Form.Item label="" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
  <a href="#">View Letter / Email</a>
</Form.Item>
	  </Form>

       {/* <p>
	   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
	   </p> */}
      </TabPane>
      <TabPane
        tab={
          <span>
       
           Data Points
          </span>
        }
        key="2"
      >
	 <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="Policy Login Date" {...formItemLayout2}>
        <Input type="text" placeholder="Policy Login Date" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
      <Form.Item label="Any Questionnaire Submitted" {...formItemLayout2}>
        <Input type="text" placeholder="Any Questionnaire Submitted" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Age" {...formItemLayout2}>
        <Input type="text" placeholder="Age" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Payment Mode" {...formItemLayout2}>
        <Input type="text" placeholder="Payment Mode" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="PIVC Status" {...formItemLayout2}>
        <Input type="text" placeholder="PIVC Status" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Location" {...formItemLayout2}>
        <Input type="text" placeholder="Location" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Date of Issuance" {...formItemLayout2}>
        <Input type="text" placeholder="Date of Issuance" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Income of Proposer" {...formItemLayout2}>
        <Input type="text" placeholder="Income of Proposer" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Welcome Calling Status" {...formItemLayout2}>
        <Input type="text" placeholder="Welcome Calling Status" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Normal / Rated Up" {...formItemLayout2}>
        <Input type="text" placeholder="Normal / Rated Up" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Occupation of LA" {...formItemLayout2}>
        <Input type="text" placeholder="Occupation of LA" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Policy Delivery Date" {...formItemLayout2}>
        <Input type="text" placeholder="Policy Delivery Date" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Medical / Non Medical" {...formItemLayout2}>
        <Input type="text" placeholder="Medical / Non Medical" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>

	  <Form.Item label="Channel" {...formItemLayout2}>
        <Input type="text" placeholder="Channel" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
	  <Form.Item label="Proposal Sign Date" {...formItemLayout2}>
        <Input type="text" placeholder="Proposal Sign Date" />
      </Form.Item>
	  </div>
    </Form>
      </TabPane>
      <TabPane
        tab={
          <span>
    
            User Description
          </span>
        }
        key="3"
      >
  <Form 
  form={form}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}>

  <div style={{display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
      <Form.Item label="Tag Complaint" wrapperCol={{ span: 18 }} labelCol={{ span:6 }}>
        <Radio.Group onChange={handleChangeTC}>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </Form.Item>
      </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Response Mode" wrapperCol={{ span: 18 }} labelCol={{ span:6 }}>
        <Radio.Group>
          {
            responseMode.length > 0 && responseMode.map((data,index)=>{
              return <Radio value={data.value} onClick={()=>handleResponseMode(data)}>{data.name}</Radio>
            })
          }
        </Radio.Group>
      </Form.Item>
      </div>
      </div>



      <div style={{display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
      <Form.Item label="Call Type" wrapperCol={{ span: 18 }} labelCol={{ span:6 }} rules={[{ required: true, message: "Please Select call type" }]} name="callType">
        {/*<Select placeholder="Select Call Type" onChange={(e)=>handleChangeCellType(e)}>
          <Option value="1">{isDisplayedCallType}</Option>
        </Select>
        */}
        <Select
                 className="inputs-label cust-input"
                placeholder="Select a Call Type"
                    options={ callTypeLU}
                                filterOption={filterOption}
                                onChange={(value) => {handleCallTypeChange(value);}}
                                disabled={true}
                              />
      </Form.Item>
     </div>
     <div style={{ width: '50%' }}>
      <Form.Item label="Subtype" name="subType" wrapperCol={{ span: 18 }} labelCol={{ span:6 }}>
        <Select placeholder="Select Subtype" onChange={(e)=>handleChangeSubType(e)}>
        {
          subTypeLU?.length > 0 && subTypeLU?.map((i)=>{
            return <Option value={i.mstID} key={i.mstID}>{i.mstDesc}</Option>
          })
        }
        </Select>
      </Form.Item>
      </div>
      </div>
       {ComplaintCall && 
      <div style={{display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
      <Form.Item label="Complaint Call Type" wrapperCol={{ span: 18 }} labelCol={{ span:6 }} name="">
       <Select
       showSearch
       placeholder="Select a Call Type"
       optionFilterProp="children"
       onSearch={onSearch}
       filterOption={filterOption}
       options={selectedComplaintCallType}
       onChange={(e) => handleCallTypeChange(e)}
     />
      </Form.Item>
     </div>
     <div style={{ width: '50%' }}>
      <Form.Item label="Complaint Subtype" wrapperCol={{ span: 18 }} labelCol={{ span:6 }}>
      <Select
      showSearch
      placeholder="Select a Sub Type"
      optionFilterProp="children"
      onChange={(e) => handleSubTypeChange(e)}
      onSearch={onSearch}
      filterOption={filterOption}
      options={selectedComplaintSubType}
    />
      </Form.Item>
      </div>
      </div>
    }

      <div style={{display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
      {
        isResponseMode==="email" &&
          <Form.Item  label={
            <span>
             From
              <sup> *</sup>
            </span>
          } name="from" wrapperCol={{ span: 18 }} labelCol={{ span:6 }} 
        rules={[{ required: true, message: "Please enter your From" }]}
        >
        <Input type="text" placeholder="From"  />
        </Form.Item>
      }
     
     </div>
     <div style={{ width: '50%' }}>
     {
      isResponseMode==="email" &&
      <Form.Item label={
        <span>
         To
          <sup> *</sup>
        </span>
      } wrapperCol={{ span: 18 }} labelCol={{ span:6 }} name="to"  rules={[{ required: true, message: "Please enter your To" }]}>
      <Input type="text" placeholder="To"  />
      </Form.Item>
     }
      </div>
      </div>



      <div style={{display: 'flex', width: '100%' }}> 
      {
        isResponseMode==="email" &&
        <div style={{ width: '50%' }}>
      <Form.Item label={
        <span>
         Cc
          <sup> *</sup>
        </span>
      } wrapperCol={{ span: 18 }} name="cc" labelCol={{ span:6 }}   
      rules={[{ required: true, message: "Please enter your Cc" }]}>
      <Input type="text" placeholder="Cc"   />
      </Form.Item>
      </div>
      }
      {
        isResponseMode==="email" &&
        <div style={{ width: '50%' }}>
      <Form.Item label={
        <span>
         Subject
          <sup> *</sup>
        </span>
      } wrapperCol={{ span: 18 }} name="subject" labelCol={{ span:6 }}   
      rules={[{ required: true, message: "Please enter your Subject" }]}>
      <Input type="text" placeholder="Subject"   />
      </Form.Item>
      </div>
      }
      </div>
      {
        isResponseMode==="email" &&
      <Form.Item
             label="Attachments"
             name="Attachments"
             className="inputs-label mb-0"
          >
          <p>
            
            <Upload
            multiple={true}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange1}
        onRemove={handleRemove}
        customRequest={customRequest}
        onPreview={handlePreview}
        showUploadList={false}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      {fileList.length > 0 && (
      <List
        style={{ marginTop: 16 }}
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={file => (
          <List.Item
            actions={[
                <Button type="link" onClick={() => handleDownload(file)}>
                <DownloadOutlined /> Download
              </Button>,
                <Button type="link" danger onClick={() => handleRemove(file)}>
                <DeleteOutlined /> Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={file.name}
              description={`File Size: ${(file.size / 1024).toFixed(2)} KB`}
            />
          </List.Item>
        )}
      />
      )}
              </p>
          </Form.Item>

          }

          {
            isResponseMode==="letter" &&
          <Form.Item
                 label="Upload Letter *"
                 name="Upload Letter"
                 className="inputs-label mb-0"
              >
              <p>
                
                <Upload
                multiple={true}
            fileList={fileList}
            beforeUpload={beforeUpload}
            onChange={handleChange1}
            onRemove={handleRemove}
            customRequest={customRequest}
            onPreview={handlePreview}
            showUploadList={false}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          {fileList.length > 0 && (
          <List
            style={{ marginTop: 16 }}
            itemLayout="horizontal"
            dataSource={fileList}
            renderItem={file => (
              <List.Item
                actions={[
                    <Button type="link" onClick={() => handleDownload(file)}>
                    <DownloadOutlined /> Download
                  </Button>,
                    <Button type="link" danger onClick={() => handleRemove(file)}>
                    <DeleteOutlined /> Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={file.name}
                  description={`File Size: ${(file.size / 1024).toFixed(2)} KB`}
                />
              </List.Item>
            )}
          />
          )}
                  </p>
              </Form.Item>
    
              }

      {/* <Form.Item label="">
        <a href="#">Edit Response</a>
      </Form.Item> */}
      {
        isResponseMode==="email" &&
	  <ReactQuill className="quill-container" theme="snow"  readOnly={false} value={editorHtml}   onChange={handleChangeEditor}/>  
      }
      <div style={{display: 'flex', width: '100%',justifyContent:"center" }}>
      <Button type="primary" className="primary-btn mt-4 me-3"   onClick={()=>setIsSubmitButton("save")}  htmlType="submit"
      >
          Save
      </Button>

      <Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
      onClick={()=>setIsSubmitButton("send")} 
 >
          Send
      </Button>

      <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" 
      >
          Register Complaint
      </Button>
</div>
    </Form>

      </TabPane>

	
    </Tabs>

    </div>
    </div>
    <div  style={{ width: '20%', float: 'left',background:'#f2f2f2', height:'100vh'}}>
      <div style={{  margin: '16px 16px',}}>
      <h5>Comments</h5>

  <div style={{ background: '#fff' }}>
  <Collapse items={items} expandIconPosition="end" className='commentss' bordered={false}  />
  </div>
 <br/>
  <div className='underwriterDecision' style={{ background: '#fff' }}>
  <h5> Underwriter Decision</h5>

  <Form className='form1' id='form1'>
      <div style={{ width: '100%' }}>
  <Form.Item label=" Comments"   labelCol ={{ span: 24 }}>
      <Input.TextArea  placeholder="" />
      </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
  <Form.Item label=" Select Decision"   labelCol ={{ span: 24 }}>
  <Select placeholder="Select Decision">
          <Option value="Approve">Approve </Option>
          <Option value="Reject">Reject</Option>
        </Select>
      </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
  <Form.Item label=" Assign To"   labelCol ={{ span: 24 }}>
  <Input type="text" placeholder="Assign To" />
      </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
  <Form.Item label=" Feedback"   labelCol ={{ span: 24 }}>
  <Select placeholder="Select Feedback">
          <Option value="Approve">Approve </Option>
          <Option value="Reject">Reject</Option>
        </Select>
      </Form.Item>
      </div>
    </Form>

  </div>

      
      </div>
       
    </div>
</div>


</Spin>

   </>
  )
}


export default ComplaintsTeam;
