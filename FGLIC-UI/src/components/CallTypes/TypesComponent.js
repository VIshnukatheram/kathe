import React, { useState,useEffect, useRef  } from 'react';
import { Form,Row,Col,Select, Alert, Spin, message} from 'antd';
import {Data} from '../../mainconfig';
import apiCalls from '../../api/apiCalls';
import { connect } from 'react-redux';
import ContactDetails from './ContactDetails';
import PaymentRelated from './paymentRelated';
import ServicingDocuments from './servicingDocuments';
import Surrender from './surrender';
import BankDetails from './bankDetails';
import Revival from './revival';
import LoanPolicy from './loanPolicy';
import GeneralInformation from './generalInformation';
import CallRelated from './callRelated';
import CustomerPortal from './customerPortal';
import Website from './website';
import ContractAlteration from './contractAlteration';
import Nomination from './nomination';
import ProductRelated from './productRelated';
import OPSInitiative from './opsInitiative';
import FreeLook from './freeLook';
import PolicyBond from './PolicyBond';
import ProcessEnquiry from './ProcessEnquiry';
import PartialWithdrawal from './partialWithdrawal';
import MedicalAppointment from './MedicalAppointment';
import Assignment from './Assignment';
import ULIPCallType from './ULIPCallType';
import PaymentReProcessing from './PaymentReProcessing';
import PotentialComplaint from './PotentialComplaint';
import ChequeRepresentation from './ChequeRepresentation';
import OutBoundCall from './OutBoundCall';
import Refund from './Refund';
import Annuity from './annuity';
import { useNavigate  } from 'react-router-dom';


const TypesComponent = (props) => {
  const navigate = useNavigate();
    const [form] = Form.useForm();
    const {CALL_TyPES,masterData,clientRoleLU,requestModeLU,bankAccTypeLU,requestReceivedViaLU,cursorPortalLU,websitePortalLU,callRelatedActionLU,customerQueryLU,panUpdateLU,processNameLU,sisLU,loggedUser,callCenterLU,callCenterSubTypeLU,isVerifiedCheck} = props;
    const [selectedCallType,setSelectedCallType] = useState("");
    const [selectedSubTypeId,setSelectedSubTypeId] = useState("");
    const [selectedSubType,setSelectedSubType] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState(null);
    const [subTypeLU, setSubTypeLU] = useState(null);
    const [SelectedSubTypeVal, setSelectedSubTypeVal] = useState(null);
    
    // const [requestModeLU,setRequestModeLU] = useState([]);
    // const [clientRoleLU,setClientRoleLU] = useState([]);
    const [POSContactData,setPOSContactData] = useState({});
    const [duDupeData,setDuDupeData] = useState([]);

    const shouldLog = useRef(true);
 

    useEffect(() => {
      //getRequestSource();
      if(shouldLog.current){
        shouldLog.current = false;
        if(props?.isEmailManagement){
          setSelectedCallType(1);
          subTypeDropdown(1,2,masterData);
        }
        else if(props?.isShowAllTicketsData){
          // setSelectedCallType(props?.CallTypeId);
          // subTypeDropdown(props?.CallTypeId,props?.SubTypeId,masterData);
          getPOSIndividualData(masterData);
        }
        else if(masterData&&props?.customerData?.serialNo && props?.customerData?.isPOS){
          getPOSIndividualData(masterData);
        }
      }
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    const getAdvance = () => {
       setSelectedCallType(''); 
       setSelectedSubType('');
      form.resetFields();

      if(Object.keys(POSContactData).length !=0){
        navigate('/dashboard');
      }
    }

    const getPOSIndividualData = async (masterData)=>{
      setIsLoading(true);
      const  val = await apiCalls.getPOSIndividualData(props?.customerData?.serialNo || props?.isSelectedTicketsData?.serviceNo);
      //const val = response;
      // response.then( (val)=>{
        if(val?.data){
          setIsLoading(false);
          setPOSContactData(val?.data);
          setSelectedCallType(val?.data?.callType);
           subTypeDropdown(val?.data?.callType,val?.data?.subType,masterData);
           setDuDupeData(val?.data?.deDupPayload?.length>0 ? val?.data?.deDupPayload[0]?.deDupPayload[0]?.ResponseBody?.ClientDetails : []);
          //setData(val?.data)
          
        }else{
          message.destroy();
          message.error({
            content: val?.data?.responseHeader?.message||"Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
        
      // }).catch((err)=>{
      //   setIsLoading(false);
      // })
    }

    // const getRequestSource=() => {
    //   let obj =
    //   {
    //     "MasterRequest": [
    //       "REQST_SOURCE","REQST_MODE","REQUST_VIA","CLIENT_ROLE"
    //     ]
    // }
    //   let requestData = apiCalls.ctst(obj);
    //   requestData.then((val)=>{
    //     let rquestMode = val.data?.filter((ele) => ele.key === "REQST_MODE");
    //     let rquestModeData = rquestMode[0]?.value?.map((item) => ({
    //       ...item,
    //       label: item.mstDesc,
    //       value: item.mstID
    //     }));
    //     let clientrole = val.data?.filter((ele) => ele.key === "CLIENT_ROLE");
    //     let clientroleData = clientrole[0]?.value?.map((item) => ({
    //       ...item,
    //       label: item.mstDesc,
    //       value: item.mstID
    //     }));
    //     setRequestModeLU(rquestModeData);
    //     setClientRoleLU(clientroleData);
    //     setIsLoading(false);
    //   }).catch((err)=>{
    //     setIsLoading(false);
    //   })
    // }

     const subTypeDropdown =async (value,subType,allData)=>{
      let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") : allData?.filter((ele) => ele.key === "SUB_TYP");
      let data = SUB_TYP[0]?.value?.filter((ele) => ele?.mstParentID === value);
      let transformedData = data?.map((item) => ({
        ...item,
        label: item.mstDesc,
        value: item.mstID
      }));
      setSubTypeLU(transformedData);
      if(props?.customerData?.isPOS||props?.isEmailManagement||props?.isShowAllTicketsData){
        form.setFieldsValue({callType:value, subType:subType })
            handleSubTypeChange(subType,transformedData);
      }
    }

    const handleCallTypeChange = (value, obj) => {
      if(obj.isCallType){
        props?.setCallTypeId(obj.mstID);
        setSelectedCallType(obj.mstID);
        form.setFieldsValue({subType: null})
        setSubTypeLU(null);
        setSelectedSubType(null);
        subTypeDropdown(obj.mstID);
      }else{
        let CALL_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "CALL_TYP") :'';
        let SUB_TYP = masterData?.length>0 ? masterData?.filter((ele) => ele.key === "SUB_TYP") :'';
        let transformedData = SUB_TYP[0]?.value.filter((ele)=>(ele.mstParentID === obj.mstParentID)).map((ele) =>({
          ...ele,
          label: ele.mstDesc,
          value: ele.mstID
        }))
        setSubTypeLU(transformedData);
        let slectedCALL_TYP = CALL_TYP[0].value?.find((ele)=>{
          return ele.mstID === obj.mstParentID
        })
          props?.setCallTypeId(+slectedCALL_TYP?.mstID);
          setSelectedCallType(+slectedCALL_TYP?.mstID);
        // subTypeDropdown(obj.mstParentID);
        setSelectedSubTypeId(obj?.mstID);
        props?.setSubTypeId(obj.mstID);
        transformedData?.map((key, index) => {
          if(key.mstID===obj?.mstID){
            const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
            setSelectedSubType(modifiedDesc);
            setSelectedSubTypeVal(key.mstDesc)
          }
        });

        form.setFieldsValue({callType:slectedCALL_TYP?.mstDesc, subType:obj?.mstID })
      }

      };
      const handleSubTypeChange = (value,getSubLU) => {
        //debugger
        props?.setSubTypeId(value);
        if(loggedUser?.userName==="callcenter"&&!isVerifiedCheck){
          setSelectedSubTypeId(value);
          setSelectedSubType("verificationnotcompleted")
        }else {
        setSelectedSubTypeId(value);
        let subTypeData = subTypeLU?.length>0 ? subTypeLU : getSubLU;
        subTypeData?.map((key, index) => {
          if(key.mstID===value){
            const modifiedDesc = key.mstDesc?.replace(/[^\w]/g, "").toLowerCase();
            setSelectedSubType(modifiedDesc);
            setSelectedSubTypeVal(key.mstDesc)
          }
        });
      }
      };
      
      const changeSubType = (e) =>{
        // setSelectedSubType(e)
      }

      const onSearch = (e) =>{
      }
      const handleOk = () => {
      };
      const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
   

  return (
    <>
       <Spin spinning={isLoading} fullscreen />
        <div className={props?.isEmailManagement ? "section-border" :  "section-border w-78"}>
          <div className="bg-yelloww ">
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
            autoComplete="off"
          >
            <Row gutter={[16, 16]} className="grid-box bg-yellow">
              <Col
              className="m-10"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
              >
                <Form.Item
                  label="Call Type"
                  name="callType"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Call Type"
                    options={loggedUser?.userName==="callcenter"&&!isVerifiedCheck? callCenterLU : CALL_TyPES}
                    filterOption={filterOption}
                    onChange={(value, option) => handleCallTypeChange(value, option)}
                    disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
              </Col>
              <Col
               className="m-10"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xxl={12}
        
              >
                <Form.Item
                  label="Sub Type"
                  name="subType"
                  className="inputs-label mb-0 subtype right-colsize"
                >
                  <Select
                    showSearch
                    onSearch={onSearch}
                    className="cust-input calltype-select"
                    maxLength={100}
                    placeholder="Select Sub Type"
                    options={loggedUser?.userName==="callcenter"&&!isVerifiedCheck? callCenterSubTypeLU : subTypeLU}
                    filterOption={filterOption}
                    onChange={(e) => {handleSubTypeChange(e); }}
                    disabled={props?.customerData?.isPOS}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            </Form>
            </div>
         
              {selectedSubType && (
                <>
                  <div className="mt-30 p-1rem">
                    {errorMsg && ( 
                      <Alert
                        closable
                        type="error"
                        description={errorMsg}
                        onClose={() => setErrorMsg(null)}
                        showIcon
                      />
                    )}
                    {selectedCallType === 5  && <>
                        <ContactDetails POSContactData={POSContactData} customerData={props?.customerData} selectedSubTypeId={selectedSubTypeId} selectedCallType={selectedCallType} selectedSubType={selectedSubType} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} details={props?.policyDetails} duDupeData={duDupeData} getAdvance={getAdvance}></ContactDetails>
                    </>}
                    {selectedCallType === 1 && <>
                        <PaymentRelated POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} SelectedSubTypeVal={SelectedSubTypeVal} getAdvance={getAdvance}></PaymentRelated>
                    </>}
                    {selectedCallType === 2 && <>
                        <ServicingDocuments POSContactData={POSContactData} sisLU={sisLU} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} getAdvance={getAdvance}></ServicingDocuments>
                    </>}
                    {selectedCallType === 3 && <>
                        <BankDetails POSContactData={POSContactData}  customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} bankAccTypeLU={bankAccTypeLU} requestReceivedViaLU={requestReceivedViaLU} duDupeData={duDupeData} getAdvance={getAdvance}></BankDetails>
                    </>}
                    {selectedCallType === 6 && <>
                        <ContractAlteration POSContactData={POSContactData}  panUpdateLU={panUpdateLU} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} bankAccTypeLU={bankAccTypeLU} requestReceivedViaLU={requestReceivedViaLU} duDupeData={duDupeData} SelectedSubTypeVal={SelectedSubTypeVal} getAdvance={getAdvance}></ContractAlteration>
                    </>}
                    {selectedCallType === 7 && <>
                        <Annuity POSContactData={POSContactData}  panUpdateLU={panUpdateLU} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} bankAccTypeLU={bankAccTypeLU} requestReceivedViaLU={requestReceivedViaLU} duDupeData={duDupeData} SelectedSubTypeVal={SelectedSubTypeVal} getAdvance={getAdvance}></Annuity>
                    </>}
                    {selectedCallType === 8 && <>
                        <PartialWithdrawal POSContactData={POSContactData}   panUpdateLU={panUpdateLU} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} policyDetails={props?.policyDetails} details={props?.policyDetails} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} bankAccTypeLU={bankAccTypeLU} requestReceivedViaLU={requestReceivedViaLU} duDupeData={duDupeData} typesForm={form} setSelectedSubType={setSelectedSubType} getAdvance={getAdvance}></PartialWithdrawal>
                    </>}
                    {selectedCallType === 9 && <>
                      <Surrender POSContactData={POSContactData} changeSubType={changeSubType} selectedSubTypeId={selectedSubTypeId} details={props?.policyDetails} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubType={selectedSubType}   surrenderForm={form} setSelectedSubType={setSelectedSubType} getAdvance={getAdvance}></Surrender>
                    </>}
                    {selectedCallType === 4  && <>
                        <Revival POSContactData={POSContactData} customerData={props?.customerData} selectedSubTypeId={selectedSubTypeId} selectedCallType={selectedCallType} selectedSubType={selectedSubType} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} details={props?.policyDetails} getAdvance={getAdvance}></Revival>
                    </>}
                    {selectedCallType === 10  && <>
                        <Nomination POSContactData={POSContactData} customerData={props?.customerData} selectedSubTypeId={selectedSubTypeId} selectedCallType={selectedCallType} selectedSubType={selectedSubType} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} details={props?.policyDetails} SelectedSubTypeVal={SelectedSubTypeVal} getAdvance={getAdvance}></Nomination>
                    </>}
                    {selectedCallType === 11  && <>
                        <LoanPolicy POSContactData={POSContactData} customerData={props?.customerData}  selectedSubTypeId={selectedSubTypeId} selectedCallType={selectedCallType} selectedSubType={selectedSubType} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} duDupeData={duDupeData} details={props?.policyDetails} getAdvance={getAdvance}></LoanPolicy>
                    </>}
                    {selectedCallType === 12  && <>
                        <FreeLook POSContactData={POSContactData} customerData={props?.customerData} selectedSubTypeId={selectedSubTypeId} selectedCallType={selectedCallType} selectedSubType={selectedSubType} requestModeLU={requestModeLU} clientRoleLU={clientRoleLU} details={props?.policyDetails}  freeLookForm={form} SelectedSubTypeVal={SelectedSubTypeVal} setSelectedSubType={setSelectedSubType} getAdvance={getAdvance}></FreeLook>
                    </>}
                    {selectedCallType === 13 && <>
                        <GeneralInformation customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} getAdvance={getAdvance}></GeneralInformation>
                    </>}
                    {selectedCallType === 14 && <>
                        <CallRelated customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} callRelatedActionLU={callRelatedActionLU}  getAdvance={getAdvance}></CallRelated>
                    </>}
                    {selectedCallType === 15 && <>
                        <CustomerPortal customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} customerPortalForm={form} setSelectedSubType={setSelectedSubType} cursorPortalLU={cursorPortalLU} getAdvance={getAdvance}></CustomerPortal>
                    </>}
                    {selectedCallType === 16 && <>
                        <Website customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} websiteForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} getAdvance={getAdvance}></Website>
                    </>}
                    {selectedCallType === 17 && <>
                        <OPSInitiative customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} websiteForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} getAdvance={getAdvance}></OPSInitiative>
                    </>}
                    {selectedCallType === 18 && <>
                        <ProductRelated customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} customerQueryLU={customerQueryLU} getAdvance={getAdvance}></ProductRelated>
                    </>}
                    {selectedCallType === 19 && <>
                        <PolicyBond POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} customerQueryLU={customerQueryLU} getAdvance={getAdvance}></PolicyBond>
                    </>}
                    {selectedCallType === 20 && <>
                        <ProcessEnquiry setSelectedSubTypeId ={setSelectedSubTypeId} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} customerQueryLU={customerQueryLU} processNameLU={processNameLU} getAdvance={getAdvance}></ProcessEnquiry>
                    </>}
                    {selectedCallType === 21 && <>
                        <MedicalAppointment POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} customerQueryLU={customerQueryLU} processNameLU={processNameLU} getAdvance={getAdvance}></MedicalAppointment>
                    </>}
                    {selectedCallType === 22 && <>
                        <Assignment SelectedSubTypeVal ={SelectedSubTypeVal} POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} websitePortalLU={websitePortalLU} customerQueryLU={customerQueryLU} processNameLU={processNameLU} getAdvance={getAdvance}></Assignment>
                    </>}
                    {selectedCallType === 23 && <>
                        <ULIPCallType customerData={props?.customerData} changeSubType={changeSubType} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} getAdvance={getAdvance}></ULIPCallType>
                    </>}
                    {selectedCallType === 24 && <>
                        <PotentialComplaint POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} getAdvance={getAdvance}></PotentialComplaint>
                    </>}
                    {selectedCallType === 25 && <>
                        <PaymentReProcessing POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} getAdvance={getAdvance}></PaymentReProcessing>
                    </>}
                    {selectedCallType === 26 && <>
                        <ChequeRepresentation POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} typesForm={form} setSelectedSubType={setSelectedSubType} setSelectedSubTypeId ={setSelectedSubTypeId} getAdvance={getAdvance}></ChequeRepresentation>
                    </>}
                    {selectedCallType === 27 && <>
                        <OutBoundCall customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} callRelatedActionLU={callRelatedActionLU} getAdvance={getAdvance}></OutBoundCall>
                    </>}
                    {selectedCallType === 31 && <>
                        <Refund POSContactData={POSContactData} customerData={props?.customerData} selectedCallType={selectedCallType} selectedSubTypeId={selectedSubTypeId}  selectedSubType={selectedSubType} details={props?.policyDetails} callRelatedActionLU={callRelatedActionLU} getAdvance={getAdvance}></Refund>
                    </>}
                  </div>
                </>
              )}
        </div>
    </>
  );
}
const mapStateToProps = ({ state,policyDetails }) => {
  return { data: state?.PolicyDetailsReducer?.policyDetailsObj,policyDetails }
}
export default connect(mapStateToProps)((TypesComponent));