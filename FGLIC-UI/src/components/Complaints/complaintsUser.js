import React, { useState,useEffect, useRef  } from 'react';
import ReactQuill from 'react-quill';
import apiCalls from "../../api/apiCalls";
import { Card, Col, Row ,Radio, Timeline, Space, Tabs, Select, Input ,Form, Button, Collapse ,Modal,message,Spin} from 'antd';
import CloseIcon from "../../assets/images/close-icon.png";
import { Routes, Route, useParams,useLocation } from 'react-router-dom';
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;


// import apiCalls from "../../api/apiCalls";
const ComplaintsUser = (props) => {
  const callback = (key) => {
  
  };
  const [atrModal, setAtrModal] = useState(false);
  const [MissellingCalc, setMissellingCalc] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData]=useState([]);
  let { serviceId } = useParams();
  let location=useLocation();

  
  const [size, setSize] = useState('small');
const onChange = (e) => {
  setSize(e.target.value);
};

	const [mode, setMode] = useState('left');
	const handleModeChange = (e) => {
	  setMode(e.target.value);
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


 
  
  
  return (
   <>
   <Spin spinning={isLoading}>
<div className='complaints-section'>
  <div >
<br/>
	<Row className='sec-dark' gutter={16} style={{ width: '100%', margin: '0px 16px', padding:'10px' }}>
	<Col style={{ width: '20%'}}>
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
        <p >Graduate</p>
      </div>
    </div>
  </Col>
	<Col style={{ width: '20%'}}>
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
   <Col style={{ width: '20%'}}>
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
   <Col style={{ width: '20%'}}>
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

   <Col style={{ width: '20%'}}>
   <div className='boxx'>
      <div >
        <p ><b> Branch</b></p>
        <p >{data?.salesDetails?.branch}</p>
      </div>
      <div >
        <p ><b>Channel </b> </p>
        <p >{data?.salesDetails?.channel}</p>
      </div>
	  <div >
        <p ><b> Agent Name</b></p>
        <p >{data?.salesDetails?.agentName}</p>
      </div>
	  <div >
        <p ><b> Orphan Flag</b></p>
        <p >{data?.salesDetails?.orphanFlag
        }</p>
      </div>
    </div>
   </Col>
  </Row>
 
  </div>
  

  <div className = 'tabs-begin' style={{ width: '77%',float:'left', margin: '16px 16px'}}>



  <Tabs tabPosition="left" type="card">
      <TabPane
        tab={
          <span>

View Customer Complaint
          </span>
        }
        key="1"
      >
<Form >
<Form.Item label="Call Type" wrapperCol={{ span: 18 }} labelCol={{ span:6 }} >
  <Select placeholder="Select Call Type">
    <Option value="1">Surrender</Option>
    <Option value="2">Contact Details</Option>
  </Select>
</Form.Item>


<Form.Item label="Sub Type" wrapperCol={{ span: 18 }} labelCol={{ span:6 }}>
  <Select placeholder="Select Subtype" >
    <Option value="subtype1">Subtype 1</Option>
    <Option value="subtype2">Subtype 2</Option>
  </Select>
</Form.Item>

<Form.Item label="Complaints Description" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
  <div style={{ display: 'flex',alignItems: 'center' }}>
    <Input.TextArea placeholder="" />
  </div>
</Form.Item>

      <Form.Item label="" wrapperCol={{ span: 20 }} labelCol={{ span: 4 }}>
  <a href="#">View Letter / Email</a>
</Form.Item>
	  </Form>
      </TabPane>
      <TabPane
        tab={
          <span>
       
      Grievance Officer Remarks
          </span>
        }
        key="2"
      >


<div>

<Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>


<div style={{ width: '100%' }}>
<Form.Item label="ATR comments" wrapperCol={{ span: 18 }} labelCol={{ span: 6 }}>
  <div style={{ display: 'flex',alignItems: 'center' }}>
    <Input.TextArea placeholder="ATR comments" />
  </div>
</Form.Item>
	  </div>
    <div style={{ width: '100%' }}>
      <Form.Item label="Misselling Calculator Comments" wrapperCol={{ span: 18 }}  labelCol ={{ span: 6 }}>
      <div style={{ display: 'flex',alignItems: 'center' }}>
      <Input.TextArea  placeholder="Misselling Calculator Comments" />

  </div>
      </Form.Item>
	  </div>

      <div style={{ width: '100%' }}>
      <Form.Item label="General Comments/Recomentation" wrapperCol={{ span: 18 }}  labelCol ={{ span: 6 }}>
      <Input.TextArea  placeholder="General Comments/Recomentation" />
      </Form.Item>
	  </div>
    <div className="contact-details-btn" style={{margin:"auto"}}>
    <Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
>
        Save
    </Button>
    </div>
      </Form>
    </div>
      </TabPane>
      <TabPane
      tab={
        <span>
    ATR
        </span>
      }
      key="3"
    >
<div>
<div style={{ width: '100%' }}>
<div style={{ display: 'flex',alignItems: 'center' }}>
<div className="reuirement" style={{width:"100%"}}>
      
        <Collapse expandIconPosition="end" defaultActiveKey={['1']} onChange={callback} accordion>
      <Panel header="Personal Information" key="1">
       

      <Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
	<Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Name Of LA</b></p>
        <p >Mrs Babita Mittal</p>
      </div>
      <div >
        <p ><b> DOB</b></p>
        <p >10-07-1976</p>
      </div>
	  {/* <div >
        <p ><b> City Name</b></p>
        <p >MRS Babita Mittal</p>
      </div> */}
	  <div >
        <p ><b> Contact Details</b></p>
        <p >North West Delhi</p>
      </div>
      <div >
        <p ><b> Income of LA</b></p>
        <p >60,000</p>
      </div>
      <div >
        <p ><b> Occupation of LA</b></p>
        <p >Self Employed</p>
      </div>
      
    </div>
  </Col>
	<Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Name Of Proposer</b></p>
        <p >Mrs Babita Mittal</p>
      </div>
      <div >
        <p ><b> DOB</b></p>
        <p >10-07-1976</p>
      </div>
	  {/* <div >
        <p ><b> City Name</b></p>
        <p >MRS Babita Mittal</p>
      </div> */}
	  <div >
        <p ><b> Contact Details</b></p>
        <p >North West Delhi</p>
      </div>
      <div >
        <p ><b> Income of Proposer</b></p>
        <p >60,0000</p>
      </div>
      <div >
        <p ><b> Occupation of Proposer</b></p>
        <p >Self Employed</p>
      </div>
      
    </div>
  </Col>


	<Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Name Of Payor</b></p>
        <p >Mrs Babita Mittal</p>
      </div>
      <div >
        <p ><b> DOB</b></p>
        <p >10-07-1976</p>
      </div>
	  {/* <div >
        <p ><b> City Name</b></p>
        <p >MRS Babita Mittal</p>
      </div> */}
	  <div >
        <p ><b> Contact Details</b></p>
        <p >North West Delhi</p>
      </div>
      <div >
        <p ><b> Income of Payor</b></p>
        <p >60,0000</p>
      </div>
      <div >
        <p ><b> Occupation of Payor</b></p>
        <p >Self Employed</p>
      </div>
      
    </div>
  </Col>


  </Row>



      </Panel>
      <Panel header="Product Related Information" key="2">
      <Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
	<Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Policy Type</b></p>
        <p >Traditional</p>
      </div>
      <div >
        <p ><b> Frequency</b></p>
        <p >01</p>
      </div>
	  <div >
        <p ><b> Channel</b></p>
        <p >DRCT</p>
      </div>
    </div>
  </Col>
  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Policy Premium</b></p>
        <p >60000</p>
      </div>
      <div >
        <p ><b> Date of Isssuance</b></p>
        <p >31-01-2022</p>
      </div>
	  <div >
        <p ><b> Agent Name</b></p>
        <p >ANKIT  JAIN</p>
      </div>
    </div>
  </Col>

  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> SA</b></p>
        <p >360000</p>
      </div>
      <div >
        <p ><b> NPDD</b></p>
        <p >31-01-2024</p>
      </div>
	  <div >
        <p ><b> Advisor Status</b></p>
        <p >TERMINATED</p>
      </div>
    </div>
  </Col>


  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Normal / Rated Up</b></p>
        <p >Normal</p>
      </div>
      <div >
        <p ><b> Policy status</b></p>
        <p >IF</p>
      </div>
	  <div >
        <p ><b> Auto Pay</b></p>
        <p >ECS</p>
      </div>
    </div>
  </Col>

  </Row>

      </Panel>
      <Panel header="Issuance Related Information" key="3">
      <Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Proposal Sign Date</b></p>
        <p >31-01-2022</p>
      </div>
      <div >
        <p ><b> Medical</b></p>
        <p >NO</p>
      </div>
	  <div >
        <p ><b> Income Proof</b></p>
        <p >Yes</p>
      </div>
    </div>
  </Col>

  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Proposal Logged Date</b></p>
        <p >31-01-2022</p>
      </div>
      <div >
        <p ><b> Welcome calling done</b></p>
        <p >NO</p>
      </div>
	  <div >
        <p ><b> Any Questionnaire submitted</b></p>
        <p >Yes</p>
      </div>
    </div>
  </Col>



  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Login Location</b></p>
        <p >DLA</p>
      </div>
      <div >
        <p ><b> Age proof </b></p>
        <p >PANCARD </p>
      </div>
	  <div >
        <p ><b> PIVC</b></p>
        <p >No</p>
      </div>
    </div>
  </Col>


  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Mode of Premium</b></p>
        <p >Cheque</p>
      </div>
      <div >
        <p ><b>Address Proof </b></p>
        <p >AADHARCD </p>
      </div>
	  <div >
        <p ><b> F2F Done</b></p>
        <p >Yes</p>
      </div>
    </div>
  </Col>


  </Row>
      </Panel>

      <Panel header="Dispatch Related Information" key="4">
      <Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Date of Despatch</b></p>
        <p >31-01-2022</p>
      </div>
      <div >
        <p ><b> Within FLC Window</b></p>
        <p >Beyond Freelook</p>
      </div>

    </div>
  </Col>

  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Mode Of Despatch</b></p>
        <p >Courier</p>
      </div>
      <div >
        <p ><b> Any endorsements done </b></p>
        <p >NO</p>
      </div>

    </div>
  </Col>



  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b> Delivery Date</b></p>
        <p >28-11-2022</p>
      </div>
      <div >
        <p ><b> Is  customer related to Employee / Agent </b></p>
        <p >No </p>
      </div>
	 
    </div>
  </Col>


  <Col style={{ width: '50%'}}>
    <div className='atrbox'>
      <div>
        <p ><b>Delivery Status</b></p>
        <p >Yes</p>
      </div>
      <div >
        <p ><b>AWB No. </b></p>
        <p >40863466173 </p>
      </div>
	 
    </div>
  </Col>


  </Row>
      </Panel>


     


    </Collapse>


        </div>
</div>
  </div>
  <Form>
  <div style={{ width: '100%' }} className='mt-3'>
  <Form.Item label="Comments" wrapperCol={{ span: 18 }}  labelCol ={{ span: 6 }}>
  <Input.TextArea  placeholder="Comments" />
  </Form.Item>
</div>
</Form>
  <div className="contact-details-btn" style={{margin:"auto"}}>
  <Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
>
      Save
  </Button>
  </div>
  </div>
    </TabPane>
    <TabPane
    tab={
      <span>
      Misselling Calc
      </span>
    }
    key="4"
  >
<div>
<div style={{ width: '100%' }}>
<div style={{ display: 'flex',alignItems: 'center' }}>
<div className="reuirement"> 
<Collapse expandIconPosition="end"  onChange={callback} accordion>
<Panel header="Personal Information" key="1">
<Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Name Of LA</b></p>
<p >Mrs Babita Mittal</p>
</div>
<div >
<p ><b> DOB</b></p>
<p >10-07-1976</p>
</div>
{/* <div >
<p ><b> City Name</b></p>
<p >MRS Babita Mittal</p>
</div> */}
<div >
<p ><b> Contact Details</b></p>
<p >North West Delhi</p>
</div>
<div >
<p ><b> Income of LA</b></p>
<p >60,000</p>
</div>
<div >
<p ><b> Occupation of LA</b></p>
<p >Self Employed</p>
</div>

</div>
</Col>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Name Of Proposer</b></p>
<p >Mrs Babita Mittal</p>
</div>
<div >
<p ><b> DOB</b></p>
<p >10-07-1976</p>
</div>
{/* <div >
<p ><b> City Name</b></p>
<p >MRS Babita Mittal</p>
</div> */}
<div >
<p ><b> Contact Details</b></p>
<p >North West Delhi</p>
</div>
<div >
<p ><b> Income of Proposer</b></p>
<p >60,0000</p>
</div>
<div >
<p ><b> Occupation of Proposer</b></p>
<p >Self Employed</p>
</div>
</div>
</Col>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Name Of Payor</b></p>
<p >Mrs Babita Mittal</p>
</div>
<div >
<p ><b> DOB</b></p>
<p >10-07-1976</p>
</div>
{/* <div >
<p ><b> City Name</b></p>
<p >MRS Babita Mittal</p>
</div> */}
<div >
<p ><b> Contact Details</b></p>
<p >North West Delhi</p>
</div>
<div >
<p ><b> Income of Payor</b></p>
<p >60,0000</p>
</div>
<div >
<p ><b> Occupation of Payor</b></p>
<p >Self Employed</p>
</div>
</div>
</Col>
</Row>
</Panel>
<Panel header="Product Related Information" key="2">
<Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Policy Type</b></p>
<p >Traditional</p>
</div>
<div >
<p ><b> Frequency</b></p>
<p >01</p>
</div>
<div >
<p ><b> Channel</b></p>
<p >DRCT</p>
</div>
</div>
</Col>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Policy Premium</b></p>
<p >60000</p>
</div>
<div >
<p ><b> Date of Isssuance</b></p>
<p >31-01-2022</p>
</div>
<div >
<p ><b> Agent Name</b></p>
<p >ANKIT  JAIN</p>
</div>
</div>
</Col>

<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> SA</b></p>
<p >360000</p>
</div>
<div >
<p ><b> NPDD</b></p>
<p >31-01-2024</p>
</div>
<div >
<p ><b> Advisor Status</b></p>
<p >TERMINATED</p>
</div>
</div>
</Col>


<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Normal / Rated Up</b></p>
<p >Normal</p>
</div>
<div >
<p ><b> Policy status</b></p>
<p >IF</p>
</div>
<div >
<p ><b> Auto Pay</b></p>
<p >ECS</p>
</div>
</div>
</Col>

</Row>

</Panel>
<Panel header="Issuance Related Information" key="3">
<Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Proposal Sign Date</b></p>
<p >31-01-2022</p>
</div>
<div >
<p ><b> Medical</b></p>
<p >NO</p>
</div>
<div >
<p ><b> Income Proof</b></p>
<p >Yes</p>
</div>
</div>
</Col>

<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Proposal Logged Date</b></p>
<p >31-01-2022</p>
</div>
<div >
<p ><b> Welcome calling done</b></p>
<p >NO</p>
</div>
<div >
<p ><b> Any Questionnaire submitted</b></p>
<p >Yes</p>
</div>
</div>
</Col>



<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Login Location</b></p>
<p >DLA</p>
</div>
<div >
<p ><b> Age proof </b></p>
<p >PANCARD </p>
</div>
<div >
<p ><b> PIVC</b></p>
<p >No</p>
</div>
</div>
</Col>


<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Mode of Premium</b></p>
<p >Cheque</p>
</div>
<div >
<p ><b>Address Proof </b></p>
<p >AADHARCD </p>
</div>
<div >
<p ><b> F2F Done</b></p>
<p >Yes</p>
</div>
</div>
</Col>


</Row>
</Panel>

<Panel header="Dispatch Related Information" key="4">
<Row  gutter={16} style={{ width: '100%',  padding:'10px' }}>
<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Date of Despatch</b></p>
<p >31-01-2022</p>
</div>
<div >
<p ><b> Within FLC Window</b></p>
<p >Beyond Freelook</p>
</div>

</div>
</Col>

<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Mode Of Despatch</b></p>
<p >Courier</p>
</div>
<div >
<p ><b> Any endorsements done </b></p>
<p >NO</p>
</div>

</div>
</Col>



<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b> Delivery Date</b></p>
<p >28-11-2022</p>
</div>
<div >
<p ><b> Is  customer related to Employee / Agent </b></p>
<p >No </p>
</div>

</div>
</Col>


<Col style={{ width: '50%'}}>
<div className='atrbox'>
<div>
<p ><b>Delivery Status</b></p>
<p >Yes</p>
</div>
<div >
<p ><b>AWB No. </b></p>
<p >40863466173 </p>
</div>

</div>
</Col>


</Row>
</Panel>


<div style={{ padding:'10px', width: '40%', height:'430px', overflow:'auto', float:'left'}}>


<Row  gutter={24} style={{ width: '100%',  padding:'10px' }}>


<Form style={{ display: 'flex',padding:'10px', flexDirection: 'row', flexWrap: 'wrap' }}>


  <div style={{ width: '100%' }}>
  <Form.Item label="Customer Grievance" wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
    <div style={{ display: 'flex',alignItems: 'center' }}>
      <Input.TextArea placeholder="Customer Grievance" />
     
    </div>
  </Form.Item>
      </div>
      <div style={{ width: '100%' }}>
        <Form.Item label="Sales Reply" wrapperCol={{ span: 24 }}  labelCol ={{ span: 24 }}>
        <div style={{ display: 'flex',alignItems: 'center' }}>
        <Input.TextArea  placeholder="Reply" />
       

    </div>
        </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
        <Form.Item label="Observations" wrapperCol={{ span: 24 }}  labelCol ={{ span: 24 }}>
        <div style={{ display: 'flex',alignItems: 'center' }}>
        <Input.TextArea  placeholder="Observations" />
       

    </div>
        </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
        <Form.Item label="Additional Remarks" wrapperCol={{ span: 24 }}  labelCol ={{ span: 24 }}>
        <div style={{ display: 'flex',alignItems: 'center' }}>
        <Input.TextArea  placeholder="Observations" />
       

    </div>
        </Form.Item>
      </div>

      <div style={{ width: '100%' }}>
        <Form.Item label="Conclusion" wrapperCol={{ span: 24 }}  labelCol ={{ span: 24 }}>
        <div style={{ display: 'flex',alignItems: 'center' }}>
        <Input.TextArea  placeholder="Conclusion" />
       

    </div>
        </Form.Item>
      </div>


      <div style={{ width: '100%' }}>
        <Form.Item label="Additional Space for case remarks" wrapperCol={{ span: 24 }}  labelCol ={{ span: 24 }}>
        <div style={{ display: 'flex',alignItems: 'center' }}>
        <Input.TextArea  placeholder="Conclusion" />
       

    </div>
        </Form.Item>
      </div>
</Form>


</Row>
</div>

<div style={{ padding:'10px', width: '60%', height:'430px', overflow:'auto', float:'left'}}>
<div style={{  padding:'10px' }}>


<Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
<div style={{ width: '50%' }}>
<Form.Item label="LA age" {...formItemLayout2}>
<Input type="text" placeholder="LA age" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Is the LA SENIOR citizen" {...formItemLayout2}>
<Input type="text" placeholder="Is the LA SENIOR citizen" />
</Form.Item>
</div>

<div style={{ width: '50%' }}>
<Form.Item label="Proposer Age" {...formItemLayout2}>
<Input type="text" placeholder="Proposer Age" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Is the Proposer SENIOR citizen" {...formItemLayout2}>
<Input type="text" placeholder="Is the Proposer SENIOR citizen" />
</Form.Item>
</div>


<div style={{ width: '50%' }}>
<Form.Item label="Payer age" {...formItemLayout2}>
<Input type="text" placeholder="Payer age" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Is the Payor SENIOR citizen" {...formItemLayout2}>
<Input type="text" placeholder="Is the Payor SENIOR citizen" />
</Form.Item>
</div>


<div style={{ width: '50%' }}>
<Form.Item label="Income" {...formItemLayout2}>
<Input type="text" placeholder="Income" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Paying Capacity > = 30%" {...formItemLayout2}>
<Input type="text" placeholder="Paying Capacity > = 30%" />
</Form.Item>
</div>


<div style={{ width: '50%' }}>
<Form.Item label="Occupation of Payor" {...formItemLayout2}>
<Input type="text" placeholder="Occupation of Payor" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>

</div>


<div style={{ width: '50%' }}>
<Form.Item label="Is it Rated up" {...formItemLayout2}>
<Input type="text" placeholder="Is it Rated up" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Signature matching on the rate-up consent form" {...formItemLayout2}>
<Input type="text" placeholder="Signature matching on the rate-up consent form" />
</Form.Item>

</div>



<div style={{ width: '50%' }}>
<Form.Item label="Fake Letter issued to customer /Call recording" {...formItemLayout2}>
<Input type="text" placeholder="Fake Letter issued to customer /Call recording" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Letter issued on FG letter head with false promises" {...formItemLayout2}>
<Input type="text" placeholder="Letter issued on FG letter head with false promises" />
</Form.Item>

</div>



<div style={{ width: '50%' }}>
<Form.Item label="PLVC  done correctly" {...formItemLayout2}>
<Input type="text" placeholder="PLVC  done correctly" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="PLVC done correctly" {...formItemLayout2}>
<Input type="text" placeholder="PLVC done correctly" />
</Form.Item>

</div>




<div style={{ width: '50%' }}>
<Form.Item label="Welcome calling" {...formItemLayout2}>
<Input type="text" placeholder="Welcome calling" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Welcome calling done" {...formItemLayout2}>
<Input type="text" placeholder="Welcome calling done" />
</Form.Item>

</div>



<div style={{ width: '50%' }}>
<Form.Item label="Variance in Login location and customers address" {...formItemLayout2}>
<Input type="text" placeholder="Variance in Login location and customers address" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Any Variance Observed in Login Location" {...formItemLayout2}>
<Input type="text" placeholder="Any Variance Observed in Login Location" />
</Form.Item>

</div>




<div style={{ width: '50%' }}>
<Form.Item label="Variance in Signature on proposal form/CDF" {...formItemLayout2}>
<Input type="text" placeholder="Variance in Signature on proposal form/CDF" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Signature & Photo Matching on" {...formItemLayout2}>
<Input type="text" placeholder="Signature & Photo Matching on" />
</Form.Item>

</div>





<div style={{ width: '50%' }}>
<Form.Item label="PIVC/Welcome call- Any negative observations" {...formItemLayout2}>
<Input type="text" placeholder="PIVC/Welcome call- Any negative observations" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="PIVC/Welcome call- Any negative observations" {...formItemLayout2}>
<Input type="text" placeholder="PIVC/Welcome call- Any negative observations" />
</Form.Item>

</div>




<div style={{ width: '50%' }}>
<Form.Item label="Policy Delivery Done status" {...formItemLayout2}>
<Input type="text" placeholder="Policy Delivery Done status" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Has the customer received the policy bond" {...formItemLayout2}>
<Input type="text" placeholder="Has the customer received the policy bond" />
</Form.Item>

</div>



<div style={{ width: '50%' }}>
<Form.Item label="Fresh complaint" {...formItemLayout2}>
<Input type="text" placeholder="Fresh complaint" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Fresh or repeat complaint" {...formItemLayout2}>
<Input type="text" placeholder="Fresh or repeat complaint" />
</Form.Item>

</div>





<div style={{ width: '50%' }}>
<Form.Item label="Multiple policies" {...formItemLayout2}>
<Input type="text" placeholder="Multiple policies" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Has customer informed in proposal form about policies from other insurance companies" {...formItemLayout2}>
<Input type="text" placeholder="Has customer informed in proposal form about policies from other insurance companies" />
</Form.Item>

</div>





<div style={{ width: '50%' }}>
<Form.Item label="Customer approached just 90 days beyond FLC" {...formItemLayout2}>
<Input type="text" placeholder="Customer approached just 90 days beyond FLC" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="90 days beyond FLC" {...formItemLayout2}>
<Input type="text" placeholder="90 days beyond FLC" />
</Form.Item>

</div>


<div style={{ width: '50%' }}>
<Form.Item label="Renewal premium paid Yes/No" {...formItemLayout2}>
<Input type="text" placeholder="Renewal premium paid Yes/No" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Has customer informed in proposal form about policies from other insurance companies" {...formItemLayout2}>
<Input type="text" placeholder="Has customer informed in proposal form about policies from other insurance companies" />
</Form.Item>

</div>


<div style={{ width: '50%' }}>
<Form.Item label="Medical Tests conducted Yes/No" {...formItemLayout2}>
<Input type="text" placeholder="Medical Tests conducted Yes/No" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Has customer informed in proposal form about policies from other insurance companies" {...formItemLayout2}>
<Input type="text" placeholder="Has customer informed in proposal form about policies from other insurance companies" />
</Form.Item>

</div>

<div style={{ width: '50%' }}>
<Form.Item label="Renewal Call  Positive/Negative" {...formItemLayout2}>
<Input type="text" placeholder="Renewal Call  Positive/Negative" />
</Form.Item>
</div>
<div style={{ width: '50%' }}>
<Form.Item label="Has customer informed in proposal form about policies from other insurance companies" {...formItemLayout2}>
<Input type="text" placeholder="Has customer informed in proposal form about policies from other insurance companies" />
</Form.Item>

</div>


</Form>
</div>
</div>

</Collapse>





  {/* <div className="contact-details-btn">
    <Button
      type="primary"
      className="primary-btn"
     
    >
      Ok
    </Button>
  </div> */}
</div>
</div>
</div>
<div className="contact-details-btn mt-5" style={{margin:"auto"}}>
<Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
>
    Save
</Button>
</div>
</div>
  </TabPane>
      <TabPane
        tab={
          <span>
       
    Sales Feedback
          </span>
        }
        key="5"
      >


<Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

 {/*<div style={{ width: '100%' }}>
      <Form.Item label="Send To" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Input type="text" placeholder="Send To" />
      </Form.Item>
	  </div>
      */}

      <div style={{ width: '100%' }}>
      <Form.Item label="Sales Comments" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Input.TextArea  placeholder="" />
      </Form.Item>
	  </div>
      
      <div style={{ width: '100%' }}>
      <Form.Item label="Sales Feedback" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Select placeholder="Sales Feedback">
          <Option value="Approve">Approve </Option>
          <Option value="Reject">Reject</Option>
        </Select>
      </Form.Item>
	  </div>
    <div className="contact-details-btn" style={{margin:"auto"}}>
    <Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
>
        Save
    </Button>
    </div>
      </Form>





      </TabPane>



      <TabPane
        tab={
          <span>
    
           Refund Details
          </span>
        }
        key="6"
      >
  <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '50%' }}>
      <Form.Item label="IFSC" {...formItemLayout2}>
        <Input type="text" placeholder="IFSC" />
      </Form.Item>
	  </div>
	  <div style={{ width: '50%' }}>
      <Form.Item label="Account Holders Name" {...formItemLayout2}>
        <Input type="text" placeholder="Account Holders Name" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Bank Account Number" {...formItemLayout2}>
        <Input type="text" placeholder="Bank Account Number" />
      </Form.Item>
	  </div>


      <div style={{ width: '50%' }}>
      <Form.Item label="Re-enter Account Number" {...formItemLayout2}>
        <Input type="text" placeholder="Re-enter Account Number" />
      </Form.Item>
	  </div>

      <div style={{ width: '50%' }}>
      <Form.Item label="Bank" {...formItemLayout2}>
        <Input type="text" placeholder="Bank" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Penny Drop Result" {...formItemLayout2}>
        <Input type="text" placeholder="Penny Drop Result" />
      </Form.Item>
	  </div>
      <div style={{ width: '50%' }}>
      <Form.Item label="Branch Name" {...formItemLayout2}>
        <Input type="text" placeholder="Branch Name" />
      </Form.Item>
	  </div>
      </Form>

      </TabPane>

	  <TabPane
        tab={
          <span>
    
            Approver Comments
          </span>
        }
        key="7"
      >



    <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>



      <div style={{ width: '100%' }}>
      <Form.Item label="Approver Comments" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Input.TextArea  placeholder="Approver Comments" />
      </Form.Item>
	  </div>
      
      <div style={{ width: '100%' }}>
      <Form.Item label="Approver Feedback" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Select placeholder="Approver Feedback">
          <Option value="Approve">Approve </Option>
          <Option value="Reject">Reject</Option>
        </Select>
      </Form.Item>
	  </div>
    <div className="contact-details-btn" style={{margin:"auto"}}>
    <Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
>
        Save
    </Button>
    </div>
      </Form>

      </TabPane>

      <TabPane
        tab={
          <span>
    
            RCA
          </span>
        }
        key="8"
      >
  <Form style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
	 <div style={{ width: '100%' }}>
      <Form.Item label="Closure Remarks" {...formItemLayout2}  wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Input type="text" placeholder="Closure Remarks" />
    </Form.Item>
	  </div>
	  <div style={{ width: '100%' }}>
      <Form.Item label="Nature of Complaint" {...formItemLayout2}  wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Select placeholder="Select Nature of Complaint">
          <Option value="incoming">Surrender</Option>
          <Option value="outgoing">Contact Details</Option>
        </Select>
      </Form.Item>
	  </div>
      <div style={{ width: '100%' }}>
      <Form.Item label="Type of Error" {...formItemLayout2}  wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Select placeholder="Select Type of Error">
          <Option value="incoming">Surrender</Option>
          <Option value="outgoing">Contact Details</Option>
        </Select>
      </Form.Item>
	  </div>


      <div style={{ width: '100%' }}>
      <Form.Item label="Reason For Error" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Input.TextArea  placeholder="" />
      </Form.Item>
	  </div>

      <div style={{ width: '100%' }}>
      <Form.Item label="Root Cause" wrapperCol={{ span: 20 }}  labelCol ={{ span: 4 }}>
      <Input.TextArea  placeholder="" />
      </Form.Item>
	  </div>
    <div className="contact-details-btn" style={{margin:"auto"}}>
    <Button type="primary" className="primary-btn mt-4 me-3"    htmlType="submit"
>
        Save
    </Button>
    </div>

      </Form>
      </TabPane>


      <TabPane
        tab={
          <span>
    
           Closure Response
          </span>
        }
        key="9"
      >
  <Form {...formItemLayout}>
      <Form.Item label="Tag Complaint">
        <Radio.Group>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Response Mode">
        <Radio.Group>
          <Radio value="email">Email</Radio>
          <Radio value="letter">Letter</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="">
        <a href="#">Edit Response</a>
      </Form.Item>

	  <ReactQuill className="quill-container" theme="snow"  readOnly={false}/>  
    </Form>
      </TabPane>

    </Tabs>

    </div>
    <div  style={{ width: '17%',float:'left',margin: '16px 0px'}}>
    <>
 <p style={{ textAlign:'center'}}>
 <b>Timeline </b>
 </p>
      <Timeline
        mode={mode}
        items={[
          {
            label: 'DEC-25',
            children: 'Complaint Received',
          },
          {
            label: 'DEC-26',
            children: 'Acknowledgement Sent',
          },
          { label: 'DEC-27',
            children: 'Sales Feedback Sent',
          },
          {
            label: 'DEC-27',
            children: 'Sales Reminder 1',
          },
          {
            label: 'DEC-25',
            children: 'Sales Reminder 2',
          },
          {
            label: 'DEC-26',
            children: 'Send For Approver',
          },
          { label: 'DEC-27',
            children: 'Payment',
          }
        ]}
      />
    </>
    </div>
</div>


</Spin> 


   </>
  )
}


export default ComplaintsUser;
