import React, { useEffect, useState } from "react";
import {  Modal,
  Input, Button, Col,message, Collapse, Row, Space, Spin, Tooltip, Table , Select} from "antd";
import { useSelector } from 'react-redux';
import apiCalls from "../api/apiCalls";
import PopupAlert from "./popupAlert";
import CloseIcon from "../assets/images/close-icon.png";
import moment from 'moment';
import Header from "../layout/Header";

const PosApproveComponent = () => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);

  const { Panel } = Collapse;
  const [isLoading, setIsLoading] = useState(false);
  const [showTotalPages, setShowTotalpages] = useState(null);
  const [data, setData] = useState([]);
  const [alertTitle, setAlertTitle] = useState("");
  const [navigateTo, setNavigateTo] = useState("");
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const [SrvReqRefNo, setSrvReqRefNo] = useState('');
  const [Status, setStatus] = useState('');
  const [totalFundsModal, setTotalFundModal] = useState(false);
  const [activeRole, setActiveRole] = useState('posapprover1');

  const [taxCalculationn, setTaxCalculationn] = useState('');

  
const approverList =[
  {userId:'posapprover1', role: 6, value:'posapprover1'},
  {userId:'posapprover2', role: 7, value:'posapprover2'},
  {userId:'posapprover3', role: 8, value:'posapprover3'},
  {userId:'posapprover4', role: 9, value:'posapprover4'}
]

  useEffect(() => {

      getSearchData({userId:'posapprover1',role:'6' });
    
   }, []); 

  const getSearchData =  async (obj) => {
    setIsLoading(true);
    // let obj = {userId:'posapprover1',role:'6' }

    let response = apiCalls.getPOSData(obj);
    response.then((val)=>{
      if(val?.data){
        setData(val?.data);
        setShowTotalpages(val?.data?.length);
      }else{
        message.destroy();
        message.error({
          content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
      setIsLoading(false);
    }).catch((err)=>{
      setIsLoading(false);
    })
  }
 
  const taxCalculation = (val) => {


    setShowAlert(false);
    setIsLoader(true);
    let obj = {
      SrvReqRefNo: val,
      clientId:''

    };
  
    let response = apiCalls.taxCalculationForSerReq(obj);
    response
      .then((val) => {
        if (val?.data) {
          setTotalFundModal(true);
          setTaxCalculationn(val?.data)

        } else {
          message.error({
            content:
              val?.data?.responseBody?.errormessage ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        setIsLoader(false);
      
      })
      .catch((err) => {
        setIsLoader(false);
     
      });
  }

  const POSAction = (srvReqRefNo, status) => {
  
    setSrvReqRefNo(srvReqRefNo);
    setStatus(status);
    setIsModalOpen(true);


  };


  const POSApprover = (srvReqRefNo, status) => {
  
    setSrvReqRefNo(srvReqRefNo);
    setStatus(status);

    taxCalculation(srvReqRefNo)

  };

  const handleCallTypeChange = (value) => {
    let obj='';
    setActiveRole(value);
    if(value === 'posapprover1'){
      obj=   {userId:'posapprover1', role: 6, value:'posapprover1'}
    } else if(value === 'posapprover2'){
      obj= {userId:'posapprover2', role: 7, value:'posapprover2'}
    } else if(value === 'posapprover3'){
      obj=  {userId:'posapprover3', role: 8, value:'posapprover3'}
    } else if(value === 'posapprover4'){
      obj = {userId:'posapprover4', role: 9, value:'posapprover4'}
    }

getSearchData(obj)
  }
  
  const approvee = ()=>{
    if(activeRole === 'posapprover1'){
      setTotalFundModal(false); setIsModalOpen(true);setPassword('')
    }else{
      setPassword('1234')
      handleSubmitPsw()
    }
    
  }
const rejectt = ()=>{
  if(activeRole === 'posapprover1'){
    setTotalFundModal(false); setIsModalOpen(true);setPassword('')
  }else{
    setPassword('1234')
    handleSubmitPsw()
  }


}



const handleSubmitPsw = ()=>{
  if(!password){
    message.error({
      content:
        "Enter Password",
      className: "custom-msg",
      duration: 2,
    });
    return
   }
  setShowAlert(false);
  setIsLoader(true);
  let obj = {
    TransectionId: 1,
    SrvReqRefNo: SrvReqRefNo ,
    Status: Status,
    RequirementList: [],
    // "RequirementComments":requirementCmnt,
    Comments: '',
    TransactionPayload: [
      {
        "Status": "Create",
        "TagName": "ApproverPassword",
        "TagValue":password
    }
    ],
  };

  let response = apiCalls.POSActionsOnContactDetails(obj);
  response
    .then((val) => {
      if (val?.data) {
        setIsModalOpen(false);
        setAlertTitle(`${val?.data?.message}`);
        setTotalFundModal(false);
        setAlertData(`${"Ticket No " + val?.data?.srvReqRefNo}`);
        setShowAlert(true);
        getSearchData();
      } else {
        message.error({
          content:
            val?.data?.responseBody?.errormessage ||
            "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }
      setIsLoader(false);
    
    })
    .catch((err) => {
      setIsLoader(false);
   
    });
}

  const columns = [
    {
      title: "Request ID",
      dataIndex: "serviceNo",
      key: "serviceNo",
    },
    {
      title: "Policy Number",
      dataIndex: "policyNo",
    },

    {
      title: "PO Name",
      dataIndex: "poName",
    },
    {
      title: "Policy Type",
      dataIndex: "policyStatus",
    },
    {
      title: "Request SubType",
      dataIndex: "subTypeName",
    },
    {
      title: "Plan Name",
      dataIndex: "plan",
    },
    {
      title: "RCD",
      dataIndex: "rcd",
    },
    {
      title: "APE",
      dataIndex: "ape",
    },
    {
      title: "Total Premium Paid",
      dataIndex: "totalPremiumPaid",
    },
    // {
    //   title: "Request Type",
    //   dataIndex: "requestType",
    // },
    // {
    //   title: "Payouts Value",
    //   dataIndex: "payoutsValue",
    // },
    // {
    //   title: "TDS Amount",
    //   dataIndex: "tdsAmount",
    // },
    // {
    //   title: "FT Amount",
    //   dataIndex: "ftAmount",
    // },
    // {
    //   title: "Net Payout Value",
    //   dataIndex: "netPayoutValue",
    // },
    {
      title: "Loss / Gain",
      dataIndex: "lossorgain",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
    {activeRole==='posapprover1' &&   <> 
      <Button
            type="primary"
            className="primary-btn btn-cstm "
            onClick={() => POSApprover(record.serviceNo, 'APPROVED')}
          >
            Action
          </Button></>
          }

          {activeRole !=='posapprover1' &&   <>
          <Button
            type="primary"
            className="primary-btn btn-cstm "
            onClick={() => POSApprover(record.serviceNo, 'APPROVED')}
            // onClick={() => POSAction(record.serviceNo, 'APPROVED')}
          >
            Approve
          </Button>
          <Button
            type="primary"
            className="primary-btn btn-cstm"
            onClick={() => POSApprover(record.serviceNo, 'REJECTED')}
            // onClick={() => POSAction(record.serviceNo, 'REJECTED')}
          >
            Reject
          </Button></>
          }

        </Space>
      ),
    },
  ];
  const items = [
    "Maturity",
    "Survival Benefit",
    "Foreclosure",
    "Annuity",
    "Surrender",
    "Partial Withdrawal",
    "Loan",
    "Free Look/FLC",
    "Pension Maturity",
    "Cheque Re-validation",
  ];
  const stpItems = [
    "Yes",
    "No",
  ];
  const payoutMethodItems = [
    "NEFT",
    "Cheque",
    "Fund Transfer",
  ];
  const payoutAmtItems = [
    "> 0 - <= 3 lakh",
    "> 3 - <= 5 lakh",
    "> 5 - <= 10 lakh",
    "> 10 lakhs",
  ];
  const caseTypeItems = [
    "Fresh",
    "Resolved",
  ];
  return (
    <>
      {/* <section className='home'>
        <div className='container d_flex'>
    <div className='category'>
    <Collapse
            accordion
            expandIconPosition={"end"}
            defaultActiveKey={["1"]}
          >
             <Panel header="Payout Type" key={1}>
             <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
             </Panel>
            </Collapse>
    </div>
             <div className="table-scroll">
      <div className="table-container">
              <Table
              className="responsive-table m-10"
                columns={columns}
                dataSource={data}
                x={true}
                pagination={{
                  pageSize: 10,
                  defaultPageSize: 5,
                  total: { showTotalPages },
                }}
              />
              </div>
              
            </div>
          </div>
     
      </section> */}
         <Header /> 
     <div className="w-94">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={6} lg={6} xxl={6}>
            <div className="category">
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["1"]}
              >
                <Panel header="Payout Type" key={1}>
                  <ul>
                    {items?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["2"]}
              >
                <Panel header="STP" key={2}>
                  <ul>
                    {stpItems?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["3"]}
              >
                <Panel header="Payout Method" key={3}>
                  <ul>
                    {payoutMethodItems?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["4"]}
              >
                <Panel header="Payout Amount" key={4}>
                  <ul>
                    {payoutAmtItems?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                accordion
                expandIconPosition={"end"}
                defaultActiveKey={["5"]}
              >
                <Panel header="Case Type" key={5}>
                  <ul>
                    {caseTypeItems?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
            </div>
          </Col>

     

          <Col xs={12} sm={12} md={18} lg={18} xxl={18}>

             
         <Select
           showSearch
           placeholder="Select role"
           optionFilterProp="children"
   

           options={approverList}
           onChange={(e) => handleCallTypeChange(e)}
         />
     

            <div className="table-container approve-table o-auto">
              <Table
                hideSelectAll={false}
                columns={columns}
                dataSource={data}
                rowClassName={() => "editable-row"}
                pagination={{
                  pageSize: 5,
                  defaultPageSize: 5,
                  total: { showTotalPages },
                }}
              />
            </div>
          </Col>
        </Row>
      </div>



      <Modal
        title={"Values"}  
        open={totalFundsModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setTotalFundModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <div className="table-container">
        {<>
          <table className="responsive-table">
            <tr>
              <td width={50}>Payouts Value</td>
              <td width={70}>{taxCalculationn?.payableAmount}</td>
            </tr>
            <tr>
              <td>TDS Amount</td>
              <td>{taxCalculationn?.tdsAmount}</td>
            </tr>
            <tr>
              <td>FT Amount</td>
              <td>{taxCalculationn?.ftAmount }
                </td>
            </tr>
            <tr>
              <td>Intrest Amount</td>
              <td>{taxCalculationn?.interestAmount}
                </td>
            </tr>
            <tr>
              <td>Net Payout Value</td>
              <td>{taxCalculationn?.netPayableAmount}</td>
            </tr>
          
          </table>
     
          
          </>
        }

<div className="contact-details-btn">
                <Button
                  type="primary"
                  className="primary-btn"
                  htmlType="submit"
                  onClick={() => { approvee(); }}
                >
                  Approve
                </Button>

                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => {rejectt(); }}
                >
                  Reject
                </Button>
              </div>



        </div>
     
      </Modal>





      <Modal
        title="LifeAsia Password"
        open={isModalOpen}
        destroyOnClose={true}
        closeIcon={
         
            <span onClick={() => setIsModalOpen(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
        
        }
        footer={null}
      >
       
      
          <Input
            type="text"
            className="input-label"
            value={password}
            placeholder="Enter Pssword"
            onChange={(e) => setPassword(e.target.value)}
           
          />
      
          <div className="text-center modal-validate">
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => handleSubmitPsw()}
             
            >
            Submit
            </Button>
          
          </div>
     
      </Modal>



      {showAlert && (
        <PopupAlert
          alertData={alertData}
          title={alertTitle}
          navigate={navigateTo}
          setShowAlert={setShowAlert}
        ></PopupAlert>
      )}
    </>
  );
};

export default PosApproveComponent;
