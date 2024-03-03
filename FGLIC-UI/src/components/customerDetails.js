import React, { useState, useEffect, useRef } from "react";
import { Collapse, Spin, Tooltip, Drawer, Progress, message, Modal, Button, Checkbox } from "antd";
import moment from 'moment';
import apiCalls from "../api/apiCalls";
import NumberFormat from "react-number-format";

import { policyDetailsObj } from "../reducers/policyDetailsReducer";
import { useLocation } from "react-router-dom";
import TypesComponent from "./CallTypes/TypesComponent";
import CloseIcon from "../assets/images/close-icon.png";
import Assistance from "../assets/images/handshake.png";
import TableFormat from "../utils/TableFormat";
import { connect,useSelector } from "react-redux";

import {
  LAST5_OPEN_TICKETS,
  PAYMENT_TRANSACTIONS,
  PAYMENT_TRANSACTIONS_DATA,
} from "../config";
import TicketsOpenPopup from "./TicketsOpenPopup";


const CustomerDetails = (props) => {

  const { Panel } = Collapse;
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const [allDetailsOpen, setAllDetailsOpen] = useState(false);
  const [showLastPayments, setShowLastPayments] = useState(false);
  const [showOpenTickets, setShowOpenTickets] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [CALL_TyPES, setCALL_TyPES] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [requirementModalLoader, setRequirementLoader] = useState(false);
  const [requestModeLU, setRequestModeLU] = useState([]);
  const [clientRoleLU, setClientRoleLU] = useState([]);
  const [ticketsLoader, setTicketsLoader] = useState(false);
  const [bankAccTypeLU, setBankAccTypeLU] = useState([]);
  const [requestReceivedViaLU, setRequestReceivedViaLU] = useState([]);
  const [premiumStatus, setPremiumStatus] = useState("");
  const [policyStatus, setPolicyStatus] = useState("");
  const [cursorPortalLU, setCursorPortalLU] = useState([]);
  const [websitePortalLU, setWebsitePortalLU] = useState([]);
  const [callRelatedActionLU, setCallRelatedActionLU] = useState([]);
  const [customerQueryLU, setCustomerQueryLU] = useState([]);
  const [panUpdateLU, setPanUpdateLU] = useState([]);
  const [processNameLU, setProcessNameLU] = useState([]);
  const [BirthdayIcon, setBirthdayIcon] = useState(false);
  const [sisLU, setSISLU] = useState([]);
  const [isVerifiedCheck, setIsVerifiedCheck] = useState(false);
  const isCheckedButton = state && state.isAdvanceVerifiedCheck;

  const [assistance, setAssistance] = useState([]);

  const [assistanceOpen, setAssistanceOpen] = useState(false);
  const [CallTypeId, setCallTypeId] = useState("");
  const [SubTypeId, setSubTypeId] = useState("");
  const [isShowAllTicketsData, setIsShowAllTicketsData] = useState(false);
  const [isSelectedTicketsData, setIsSelectedTicketsData] = useState({});
  const [isTicketsPOSObj, setIsTicketsPOSObj] = useState({});
  const [isChecked, SetIsChecked] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [isOpenTicket,setIsOpenTicket]=useState(false);
  const [serviceId,setServiceId]=useState('');




  const premiumStatusList = [
    { descItem: 'AC', shortDesc: 'Auto Cover', longDesc: 'Auto Cover Period' },
    { descItem: 'AF', shortDesc: 'Foreclose', longDesc: 'Foreclosure' },
    { descItem: 'AP', shortDesc: 'Ann Paying', longDesc: 'Annuity in Payment' },
    { descItem: 'CD', shortDesc: 'CF DOB Chg', longDesc: 'Cancelld frm Inception DOB chg' },
    { descItem: 'CF', shortDesc: 'CFI', longDesc: 'Cancelled from Inception' },
    { descItem: 'CR', shortDesc: 'Clm-Regstd', longDesc: 'Health Claim Premium Status' },
    { descItem: 'DC', shortDesc: 'Declined', longDesc: 'Declined' },
    { descItem: 'DF', shortDesc: 'Disc Forc', longDesc: 'Discontinuance Foreclose' },
    { descItem: 'DH', shortDesc: 'Deceased', longDesc: 'Deceased' },
    { descItem: 'DI', shortDesc: 'Dth Disc I', longDesc: 'Dth-Discontinued Invalid' },
    { descItem: 'DS', shortDesc: 'Er Sur Reg', longDesc: 'Early Surrendr Registered' },
    { descItem: 'DU', shortDesc: 'Discont', longDesc: 'Policy Discontinued' },
    { descItem: 'EL', shortDesc: 'Extd Life', longDesc: 'Extended Maturity' },
    { descItem: 'ET', shortDesc: 'ETI', longDesc: 'Extended Term Insurance' },
    { descItem: 'EX', shortDesc: 'Expired', longDesc: 'Expired' },
    { descItem: 'FL', shortDesc: 'Free Look', longDesc: 'Free Look Cancellation' },
    { descItem: 'FP', shortDesc: 'Fully Paid', longDesc: 'Fully Paid' },
    { descItem: 'FR', shortDesc: 'FL Regstr', longDesc: 'Free Look Cancel Register' },
    { descItem: 'FU', shortDesc: 'FP Death', longDesc: 'FullyPaid Death' },
    { descItem: 'HA', shortDesc: 'Prem Holdy', longDesc: 'Premium Holiday - Auto' },
    { descItem: 'HC', shortDesc: 'Health Clm', longDesc: 'Health Claim' },
    { descItem: 'HP', shortDesc: 'PH RestPnd', longDesc: 'PH Reinstatement Pending' },
    { descItem: 'LA', shortDesc: 'Lapsed', longDesc: 'Lapsed' },
    { descItem: 'LM', shortDesc: 'Lapse Mat', longDesc: 'Lapsed Maturity' },
    { descItem: 'MA', shortDesc: 'Matured', longDesc: 'Matured' },
    { descItem: 'MD', shortDesc: 'Mat Death', longDesc: 'Maturity-Death' },
    { descItem: 'MO', shortDesc: 'MO', longDesc: 'Maturity-Settlmnt (No admin)' },
    { descItem: 'MS', shortDesc: 'Mat Stl', longDesc: 'Maturity-Settlmnt opt' },
    { descItem: 'MX', shortDesc: 'Setlmt-End', longDesc: 'Setlmt-End' },
    { descItem: 'NF', shortDesc: 'NF Surr', longDesc: 'Non-Forfeiture Surrendered' },
    { descItem: 'PM', shortDesc: 'Prm Matury', longDesc: 'Premium Maturity' },
    { descItem: 'PO', shortDesc: 'Postpone', longDesc: 'Contract Postponed' },
    { descItem: 'PP', shortDesc: 'Prm Paying', longDesc: 'Premium Paying' },
    { descItem: 'PS', shortDesc: 'Proposal', longDesc: 'Proposal' },
    { descItem: 'PU', shortDesc: 'Paid-up', longDesc: 'Made Paid-up' },
    { descItem: 'RC', shortDesc: 'Repudiate', longDesc: 'Repudiate Death Claim' },
    { descItem: 'RP', shortDesc: 'Red Paidup', longDesc: 'Reduced Paid-up' },
    { descItem: 'RS', shortDesc: 'Repd Setlm', longDesc: 'Repudiation Settlement Option' },
    { descItem: 'S', shortDesc: 'Suspended', longDesc: 'Suspended Pending Transaction' },
    { descItem: 'SD', shortDesc: 'Er Sr Appv', longDesc: 'Early Surrender Approval' },
    { descItem: 'SP', shortDesc: 'Single Prm', longDesc: 'Single Premium' },
    { descItem: 'SR', shortDesc: 'Surr Reg', longDesc: 'Surrender Register' },
    { descItem: 'SU', shortDesc: 'Surrender', longDesc: 'Fully Surrendered' },
    { descItem: 'TM', shortDesc: 'Terminate', longDesc: 'Termination Health Claim' },
    { descItem: 'UD', shortDesc: 'Unpaid Dis', longDesc: 'Unpaid Discontinued' },
    { descItem: 'VA', shortDesc: 'Vest Appr', longDesc: 'Vesting Approval' },
    { descItem: 'VP', shortDesc: 'Vest pendg', longDesc: 'Vesting Pending' },
    { descItem: 'VR', shortDesc: 'Vest Reg', longDesc: 'Vesting Registered' },
    { descItem: 'WD', shortDesc: 'Withdrawn', longDesc: 'Withdrawn' },
    { descItem: 'WV', shortDesc: 'WvrofPrem', longDesc: 'Waiver of Premium' },
  ];


  const billFreq = {
    '01': 'Annual',
    '04': 'Quarterly ',
    '06': 'Semi Annual',
    '12': 'Monthly',
    '00': 'Single Pay',
    '02': 'Semi Annual',


  }

  const callCenterLU = [
    { label: 'Call Related', value: 14 },
  ];
  const callCenterSubTypeLU = [
    { label: 'Verification not Completed', value: 10 },
  ];
  // Policy Status List 
  const policyStatusList = [
    { descItem: 'EL', shortDesc: 'Extd Life', longDesc: 'Extended Maturity' },
    { descItem: 'EX', shortDesc: 'Expiry', longDesc: 'Expiry' },
    { descItem: 'FA', shortDesc: 'FP DthAppv', longDesc: 'FullyPaid Death Approval' },
    { descItem: 'FD', shortDesc: 'FP Dth Reg', longDesc: 'FullyPaid Death Register' },
    { descItem: 'FL', shortDesc: 'Free Look', longDesc: 'Free Look Cancellation' },
    { descItem: 'FR', shortDesc: 'FL Regstr', longDesc: 'Free Look Cancel Register' },
    { descItem: 'HC', shortDesc: 'Health Clm', longDesc: 'Health Claim' },
    { descItem: 'HP', shortDesc: 'PH RestPnd', longDesc: 'PH Reinstatement Pending' },
    { descItem: 'IF', shortDesc: 'In Force', longDesc: 'In Force' },
    { descItem: 'LA', shortDesc: 'Lapsed', longDesc: 'Contract Lapsed' },
    { descItem: 'LM', shortDesc: 'Lapsed Mat', longDesc: 'Lapsed Maturity' },
    { descItem: 'MA', shortDesc: 'Matured', longDesc: 'Contract Matured' },
    { descItem: 'MD', shortDesc: 'Mat Death', longDesc: 'Maturity Death' },
    { descItem: 'MO', shortDesc: 'MO', longDesc: 'Maturity-Settlmnt (No admin)' },
    { descItem: 'MP', shortDesc: 'Modify prp', longDesc: 'Component changes - modify prp' },
    { descItem: 'MR', shortDesc: 'MA Dth Reg', longDesc: 'Maturity Death Register' },
    { descItem: 'MS', shortDesc: 'Mat Stl', longDesc: 'Maturity-Settlmnt opt' },
    { descItem: 'MX', shortDesc: 'Setlmt-End', longDesc: 'Setlmt-End' },
    { descItem: 'PM', shortDesc: 'Prm Matury', longDesc: 'Premium Maturity' },
    { descItem: 'PO', shortDesc: 'Postpone', longDesc: 'Contract Postponed' },
    { descItem: 'PS', shortDesc: 'Proposal', longDesc: 'Contract Proposal' },
    { descItem: 'PU', shortDesc: 'Paid Up', longDesc: 'Paid Up Contract' },
    { descItem: 'PW', shortDesc: 'Wfwd Pndg', longDesc: 'Windforward Pending' },
    { descItem: 'RC', shortDesc: 'Repudiate', longDesc: 'Repudiate Death Claim' },
    { descItem: 'RD', shortDesc: 'Reg Death', longDesc: 'Registered Death Claim' },
    { descItem: 'RP', shortDesc: 'Red paidup', longDesc: 'Reduced Paid Up Contract' },
    { descItem: 'RS', shortDesc: 'Repd Setlm', longDesc: 'Repudiation Settlement Option' },
    { descItem: 'SD', shortDesc: 'Er Sr Appv', longDesc: 'Early Surrender Approval' },
    { descItem: 'SR', shortDesc: 'Surr Reg', longDesc: 'Surrender Register' },
    { descItem: 'SU', shortDesc: 'Surrender', longDesc: 'Contract Surrendered' },
    { descItem: 'TM', shortDesc: 'Terminate', longDesc: 'Termination Health Claim' },
    { descItem: 'TR', shortDesc: 'Terminated', longDesc: 'Contract Terminated' },
    { descItem: 'UW', shortDesc: 'U/W', longDesc: 'Underwriting' },
    { descItem: 'VA', shortDesc: 'Vest Appr', longDesc: 'Vesting Approval' },
    { descItem: 'VP', shortDesc: 'Vest pendg', longDesc: 'Vesting Pending' },
    { descItem: 'VR', shortDesc: 'Reg Vested', longDesc: 'Vesting Registered' },
    { descItem: 'WD', shortDesc: 'Withdrawn', longDesc: 'Contract Withdrawn' },
    { descItem: 'AF', shortDesc: 'Foreclose', longDesc: 'Foreclosure' },
    { descItem: 'AP', shortDesc: 'Add prpsl', longDesc: 'Component change - Add prpsl' },
    { descItem: 'CD', shortDesc: 'CF DOB Chg', longDesc: 'Cancelld frm Inception DOB chg' },
    { descItem: 'CF', shortDesc: 'CFI', longDesc: 'Cancelled from Inception' },
    { descItem: 'CP', shortDesc: 'CP', longDesc: 'Certificate Printed' },
    { descItem: 'CR', shortDesc: 'Regstd HLT', longDesc: 'Health Claim Resgistred' },
    { descItem: 'DC', shortDesc: 'Declined', longDesc: 'Contract Declined' },
    { descItem: 'DD', shortDesc: 'Dth Disc R', longDesc: 'Dth-Discontinued Registered' },
    { descItem: 'DF', shortDesc: 'Disc Forc', longDesc: 'Discontinuance Foreclosure' },
    { descItem: 'DH', shortDesc: 'Death Clm', longDesc: 'Approved Death Claim' },
    { descItem: 'DI', shortDesc: 'Dth Disc I', longDesc: 'Dth - Discontinued Invalid' },
    { descItem: 'DS', shortDesc: 'Er Sur Reg', longDesc: 'Early Surrender' },
    { descItem: 'DU', shortDesc: 'Discont', longDesc: 'Policy Discontinued' },
  ];
  const shouldLog = useRef(true);

  useEffect(() => {
    isCusBirthday();
    if (shouldLog.current) {
      shouldLog.current = false;
      getHeadersData();

    }
  }, [props?.searchPolicyData, isVerifiedCheck]); //eslint-disable-line react-hooks/exhaustive-deps

  const getPremiumStatus = (status, stausList) => {
    if (status) {
      const lowerCaseStatus = status.toLowerCase();
      const filteredStatus = stausList?.find(
        (ele) => ele?.descItem?.toLocaleLowerCase() === lowerCaseStatus
      );
      return filteredStatus?.longDesc || ''; // Return an empty string if not found
    }
    return '';
  };



  const convertDate = (inputDate) => {
    const formattedDate = moment(inputDate, 'YYYYMMDD').format('DD/MM/YYYY');
    return formattedDate;
  };
  // const checkData = [
  //   {
  //     id:1,
  //     name: "Signature Failed"
  //   },
  //   {
  //     id:2,
  //     name: "Documents Incomplete "
  //   },
  //   {
  //     id:3,
  //     name: "Documnets Not Clear"
  //   }
  // ]

  useEffect(()=>{
if(state?.isAdvanceVerifiedCheck){
  setIsVerifiedCheck(true)
}
  },[state.isAdvanceVerifiedCheck])


  const isCusBirthday = () => {
    const dobString = props?.policyDetails?.sentDetailsObj?.dob;
    if (dobString) {
      const dob = new Date(
        parseInt(dobString.substring(0, 4)),
        parseInt(dobString.substring(4, 6)) - 1, // Months are zero-indexed
        parseInt(dobString.substring(6, 8))
      );

      // Get the current date
      const currentDate = new Date();

      // Calculate the difference in days
      const differenceInDays = Math.floor((currentDate - dob) / (24 * 60 * 60 * 1000));

      // Check if the difference is less than 5
      const isLessThan5Days = differenceInDays <= 5;
      setBirthdayIcon(isLessThan5Days)
    }


  }
  const getHeadersData = async () => {
    setIsLoading(true);
    let obj = {
      "policyNo": state?.policyNo || props?.searchPolicyData?.policyNo,
      "applicationNo": state?.applicationNo || props?.searchPolicyData?.applicationNo,
      "dob": state?.dob ? state?.dob.includes('/') ? state?.dob : convertDate(state?.dob) :
        props?.searchPolicyData?.dob ? props?.searchPolicyData?.dob.includes('/') ? props?.searchPolicyData?.dob : convertDate(props?.searchPolicyData?.dob) : null
    }
    let response = await apiCalls.getHeaderParameters(obj);
    if (response?.data?.responseHeader?.issuccess) {
      props?.updatePolicyDetails(response?.data?.responseBody);
      setData(response?.data?.responseBody);
      const newPremiumStatus = getPremiumStatus(response?.data?.responseBody?.planAndStatus?.premiumStatus, premiumStatusList);
      setPremiumStatus(newPremiumStatus);
      const newPolicyStatus = getPremiumStatus(response?.data?.responseBody?.planAndStatus?.policyStatus, policyStatusList);
      setPolicyStatus(newPolicyStatus);
      getCTST();
    }
    else {
      message.destroy()
      message.error({
        content: response?.data?.responseBody?.errormessage || "Smoething went wrong please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };

  // Define a reusable function for data transformation
const transformData = (data, keyy) => {
  const filteredData = data?.filter((ele) => ele.key === keyy);
  return filteredData[0]?.value?.map((item, index) => {
    let obj;

    if(keyy==='CALL_TYP'){
      obj= {
        ...item,
        label: item.mstDesc,
        // value: item.mstID,
        isCallType:true
      }
    }else if(keyy==='SUB_TYP'){   
      obj = {
        ...item,
        label: item.mstDesc,
        // value: item.mstID,
        isSubType:true
      }
    }else{
      obj = {
        ...item,
        label: item.mstDesc,
        value: item.mstID,
      }
    }
    return obj
  }
  );
};
const funCallType =(calltypes, subtypes) => {
  debugger

  if(loggedUser?.boe){
    return [...calltypes, ...subtypes ].map((ele, index)=>{
      return {
        ...ele,
        value: index+1
      }
    })
  }else{
    return [...calltypes ].map((ele, index)=>{
      return {
        ...ele,
        value: ele.mstID
      }
    })
  }


}

  const getCTST = () => {
    let obj =
    {
      "MasterRequest": [
        "STATE", "DISTRICT", "CITY", "CALL_TYP", "SUB_TYP", "REQST_MODE", "CLIENT_ROLE", "BNKACCTYP", "REQVIA", "CUST_PORTAL_ISSUE", "WEBSITE_PORTAL_ISSUE", "CALL_RELATED_ACTION", "CUSTOMER_QUERY_TOPIC", "PanUpdate", "PROCESS_NAME", "FORM_NAME"
      ]
    }
    let CTST = apiCalls.ctst(obj);
    CTST.then((val) => {
      setMasterData(val.data);
      // Use the function for each set of data
      const transformedData = transformData(val.data, "CALL_TYP");
      const transformedSubType = transformData(val.data, "SUB_TYP");
      const rquestModeData = transformData(val.data, "REQST_MODE");
      const clientroleData = transformData(val.data, "CLIENT_ROLE");
      const bankTypeLU = transformData(val.data, "BNKACCTYP");
      const getReqViaData = transformData(val.data, "REQVIA");
      const getPortalData = transformData(val.data, "CUST_PORTAL_ISSUE");
      const getWebsiteData = transformData(val.data, "WEBSITE_PORTAL_ISSUE");
      const getRelatedData = transformData(val.data, "CALL_RELATED_ACTION");
      const getCustomerQueryData = transformData(
        val.data,
        "CUSTOMER_QUERY_TOPIC"
      );
      const getPANUpdateData = transformData(val.data, "PanUpdate");
      const gerProcessNameData = transformData(val.data, "PROCESS_NAME");
      const getSISData = transformData(val.data, "FORM_NAME");
      // Set state using the transformed data
     // setCALL_TyPES(transformedData);
      setCALL_TyPES(funCallType(transformedData, transformedSubType));
      setRequestModeLU(rquestModeData);
      setClientRoleLU(clientroleData);
      setBankAccTypeLU(bankTypeLU);
      setRequestReceivedViaLU(getReqViaData);
      setCursorPortalLU(getPortalData);
      setWebsitePortalLU(getWebsiteData);
      setCallRelatedActionLU(getRelatedData);
      setCustomerQueryLU(getCustomerQueryData);
      setPanUpdateLU(getPANUpdateData);
      setProcessNameLU(gerProcessNameData);
      setSISLU(getSISData);
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      message.destroy()
      message.error({
        content: err?.data?.responseBody?.errormessage,
        className: "custom-msg",
        duration: 2,
      });
    })

  }




  const getAssistanceDetails = () => {
    if (!CallTypeId || !SubTypeId) {
      return
    }
    //setTicketsLoader(true);
    setIsLoading(true);
    let response = apiCalls.getAssistanceDetails(CallTypeId, SubTypeId);
    response
      .then((val) => {
        setAssistance(val.data)
        // setTicketsLoader(false);
        setIsLoading(false);
        setAssistanceOpen(true)
      })
      .catch((err) => {
        // setTicketsLoader(false);
        setIsLoading(false);
        message.destroy()
        message.error({
          content: response?.data?.responseBody?.errormessage || "Smoething went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };



  const Assistancee = () => {
    getAssistanceDetails();
  }
  const handleCancel = () => {
    SetIsChecked(false)
    setIsVerifiedCheck('');
  }
  const handleOk = () => {
    console.log(checkedValues)
    setRequirementLoader(true);


    SetIsChecked(false)


  }
  const handleOnChange = (value) => {
    console.log(value)
    setCheckedValues(value);
   
   // SetIsChecked(false)


  };

  const handleVerifyCheckBox = (e) => {
    console.log(e)
    // if(state?.isAdvanceVerifiedCheck){
    //   console.log(state?.isAdvanceVerifiedCheck)
    //   setIsVerifiedCheck(state?.isAdvanceVerifiedCheck)
    // }
   // else{
    if(e.target.checked){
      SetIsChecked(true)
      setIsVerifiedCheck(e.target.checked);
    }
    else {
      SetIsChecked(false)
      setIsVerifiedCheck(e.target.checked);

    }
   // }
  }

  const handleAllDetails = () => {
    setAllDetailsOpen(true);
  };
  const handleLastPayments = () => {
    setShowLastPayments(true);
    setShowOpenTickets(false);
  };
  const handleOpenTickets = () => {
    setShowOpenTickets(true);
    setShowLastPayments(false);
    getLastOpenTicketsData();
    setIsShowAllTicketsData(false);
    setIsTicketsPOSObj({});
  };
  const onClose = () => {
    setAllDetailsOpen(false);
    setFaqOpen(false);
  };
  const handlePaymentsCLose = () => {
    setShowLastPayments(false);
  };
  const handleOpenTicketsCLose = () => {
    //debugger
    setShowOpenTickets(false);
    setIsShowAllTicketsData(false);
    setIsTicketsPOSObj({});
    setIsSelectedTicketsData({});
  };
  const getLastOpenTicketsData = () => {
    //setTicketsLoader(true);
    setIsLoading(true);
    let response = apiCalls.getLastOpenTickets(state?.policyNo);
    response
      .then((val) => {
        setTicketsData(val?.data);
        // setTicketsLoader(false);
        setIsLoading(false);
      })
      .catch((err) => {
        // setTicketsLoader(false);
        setIsLoading(false);
        message.destroy()
        message.error({
          content: response?.data?.responseBody?.errormessage || "Smoething went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };
  const customHeader = (
    <>
      <div class="flex-container">
        <span className="headingg gridd flexxx p-0">
          Policy No : {data?.identifiers?.policyNo}
          <Tooltip title="NPS Score">
            <span className="square">5</span>
          </Tooltip>
        </span>
        <span className="headingg gridd p-0">
          Application No : {data?.identifiers?.applicationNo}
        </span>
        <span className="headingg gridd flexxx p-0">
          LA Name : {data?.identifiers?.la_Name}
          {/* <Tooltip title="Happy Birthday">
            <span className="square">
              <i className="bi bi-cake"></i>
            </span>
          </Tooltip> */}
        </span>
        <span className="headingg gridd flexxx p-0">
          {" "}
          PO Name : {data?.identifiers?.po_Name}
          {/* <Tooltip title="NPS Score">
            <span className="square">5</span>
          </Tooltip> */}

          {BirthdayIcon &&

            <Tooltip title={convertDate(props?.policyDetails?.sentDetailsObj?.dob) || "-"}>
              <span className="square">
                <i className="bi bi-cake"></i>
              </span>
            </Tooltip>}
        </span>
      </div>
    </>
  );

  const handleTickectNoLink = (slectedRow) => {
    console.log("welcomes==>",slectedRow)
    setCallTypeId(slectedRow?.callType);
    setSubTypeId(slectedRow?.subType);
    setIsShowAllTicketsData(true);
    setIsOpenTicket(true);
    setServiceId(slectedRow?.serviceNo)
    // setShowOpenTickets(false);
    // setIsSelectedTicketsData(slectedRow);
    // setIsTicketsPOSObj({
    //   serialNo: slectedRow?.serviceNo, isPOS: true, policyNo: state?.policyNo || props?.searchPolicyData?.policyNo,
    //   dob: state?.dob ? state?.dob.includes('/') ? state?.dob : convertDate(state?.dob) :
    //     props?.searchPolicyData?.dob ? props?.searchPolicyData?.dob.includes('/') ? props?.searchPolicyData?.dob : convertDate(props?.searchPolicyData?.dob) : null
    // })
  }
  const handleClose=()=>{
    setIsOpenTicket(false);
  }
  return (
    <>
      <Spin spinning={isLoading} fullscreen />
      <div className="main-start">
        <div className="w-94">
          {!props?.isEmailManagement && <>
            <div>
              <Collapse
                accordion
                expandIconPosition={"end"}
                className="accordian customer acc1"
                defaultActiveKey={["1"]}
              >
                <Panel
                  header={customHeader}
                  key="1"
                  className="fs-16 fw-500 mb-10"
                >
                  <div className="">
                    <div className="flex-container">
                      <section className="grid">
                        <div className="left-half">
                          <article>
                            <p>Customer Type</p>
                            <p>Plan Name</p>
                            <p>Policy Status</p>
                            <p>Premium Status</p>
                            {loggedUser?.userName === "callcenter" && <>
                              <p>Verified</p>
                            </>}
                          </article>
                        </div>
                        <div className="right-half">
                          <article>
                            <p>
                              <b>
                                {data?.planAndStatus?.customerType || "-"}{" "}
                              </b>
                            </p>
                            <p>
                              <b>
                                {" "}
                                {data?.planAndStatus?.planName ||
                                  "-"}{" "}
                              </b>
                            </p>
                            <p>
                              <b>
                                {" "}
                                {/* {data?.planAndStatus?.policyStatus ||
                                  "-"}{" "} */}
                                {policyStatus || "-"}{" "}
                              </b>
                            </p>
                            <p>
                              <b>
                                {" "}
                                {/* {getPremiumStatus(data?.planAndStatus?.premiumStatus) ||
                                  "-"}{" "} */}
                                {premiumStatus || "-"}{" "}
                              </b>
                            </p>
                            {loggedUser?.userName === "callcenter" && <><p>
                              <Checkbox type="checkbox"
                              onChange={(e) => handleVerifyCheckBox(e)} checked={isVerifiedCheck} />
                                {/* <h1>{isCheckedButton?"srrr":"hhhhh"}</h1> */}
                              </p>
                            {/* <Modal title="Verified"
                                open={isChecked}
                                closeIcon={false}
                                footer={null}
                              >
          <div  >
              <div className="reuirement">

              
              <table className="responsive-table">
                <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Description</th>
                  <th className="z-index">Select</th>
                </tr></thead>
                <tbody>
                  {checkData?.map((ele, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{ele.name}</td>

                      <td>
                        {" "}
                        <Checkbox
                                       type="checkbox"

                                      onChange={(e) => {
                                        const value = e.target.checked
                                          ? [...checkedValues, ele.name]
                                          : checkedValues.filter(item => item !== ele.name);
                                        handleOnChange(value);
                                      }}
                                      checked={checkedValues.includes(ele.name)}
                                   />
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              </div> */}
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
          {/* <div className="contact-details-btn">
          <Button type="primary" className="primary-btn" onClick={() => handleCancel()}>
                                    Cancel
                                  </Button>
                                  <Button type="primary" className="primary-btn" onClick={() => handleOk()}>
                                    Ok
                                  </Button>
              </div>
          </div>

          
      </Modal> */}
                              {/* <Modal title="Verified"
                                open={isChecked}
                                closeIcon={false}
                                footer={null}
                              >


                                {checkData.map((ele, index) => (
                                  <div style={{
                                    width: '100rem',
                                    display: 'Flex',
                                    textAlign: 'center',
                                  }}>

                                    <Checkbox
                                      onChange={(e) => {
                                        const value = e.target.checked
                                          ? [...checkedValues, ele.name]
                                          : checkedValues.filter(item => item !== ele.name);
                                        handleOnChange(value);
                                      }}
                                      checked={checkedValues.includes(ele.name)}
                                    >
                                      {ele.name}
                                    </Checkbox>

                                  </div>
                                ))}







                                <div className="contact-details-btn mt-24">

                                  <Button type="primary" className="primary-btn" onClick={() => handleCancel()}>
                                    Cancel
                                  </Button>
                                  <Button type="primary" className="primary-btn" onClick={() => handleOk()}>
                                    Ok
                                  </Button>
                                </div>
                              </Modal> */}

                            </>}
                          </article>
                        </div>
                      </section>
                      <section className="grid">
                        <div className="left-half">
                          <article>
                            <p>Sum Assured</p>
                            <p>PT</p>
                            <p>RCD</p>
                            <p>Assignment</p>
                          </article>
                        </div>
                        <div className="right-half">
                          <article>
                            <p>
                              <b>
                                {(data?.saDetails?.sumAssured && (
                                  <NumberFormat
                                    value={data?.saDetails?.sumAssured}
                                    decimalSeparator="."
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                  />
                                )) ||
                                  "-"}
                              </b>
                            </p>
                            <p>
                              <b>{data?.saDetails?.pt || "-"}</b>
                            </p>
                            <p>
                              <b>{convertDate(data?.saDetails?.rcd) || "-"}</b>
                            </p>
                            <p>
                              <b>{data?.saDetails?.assignment || "N"}</b>
                            </p>
                          </article>
                        </div>
                      </section>
                      <section className="grid">
                        <div className="left-half">
                          <article>
                            <p>Premium Amount</p>
                            <p>PPT</p>
                            <p>PTD</p>
                            <p>Mode</p>
                          </article>
                        </div>
                        <div className="right-half">
                          <article>
                            <p>
                              <b>
                                {(data?.premiumDetails?.modelPremiumAmount && (
                                  <NumberFormat
                                    value={
                                      data?.premiumDetails?.modelPremiumAmount
                                    }
                                    decimalSeparator="."
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={0}
                                  />
                                )) ||
                                  "-"}
                              </b>
                            </p>
                            <p>
                              <b>{data?.premiumDetails?.ppt || "-"}</b>
                            </p>
                            <p>
                              <b>{convertDate(data?.premiumDetails?.ptd) || "-"}</b>
                            </p>
                            <p>
                              <b>{billFreq[data?.premiumDetails?.billFreq] || "-"}</b>
                            </p>
                          </article>
                        </div>
                      </section>
                      <section className="grid">
                        <div className="left-half">
                          <article>
                            <p>Branch</p>
                            <p>Channel</p>
                            <p>Agent Name</p>
                            <p>Orphan Flag</p>
                          </article>
                        </div>
                        <div className="right-half">
                          <article>
                            <p>
                              <b>{data?.identifiers?.branchName || "-"} </b>
                            </p>
                            <p>
                              <b>{data?.salesDetails?.channel || "-"} </b>
                            </p>
                            <p>
                              <b>
                                {data?.salesDetails?.agentName || "-"}
                              </b>
                            </p>
                            <p>
                              <b>{data?.salesDetails?.orphanFlag || "-"}</b>
                            </p>
                          </article>
                        </div>
                      </section>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>

            {showLastPayments && (
              <>
                <Collapse
                  accordion
                  expandIconPosition={"end"}
                  defaultActiveKey={["1"]}
                  className="lats-tickets"
                >
                  <img
                    src={CloseIcon}
                    alt=""
                    className="close-icons"
                    onClick={() => handlePaymentsCLose()}
                  ></img>
                  <Panel
                    header="Payment Transactions"
                    key={1}
                    className="table-top"
                  >
                    <div>
                      <TableFormat
                        headerData={PAYMENT_TRANSACTIONS}
                        data={PAYMENT_TRANSACTIONS_DATA}
                        ticketsLoader={ticketsLoader}
                      ></TableFormat>
                    </div>
                  </Panel>
                </Collapse>
              </>
            )}
            {showOpenTickets && (
              <>
                <Collapse
                  accordion
                  expandIconPosition={"end"}
                  defaultActiveKey={["1"]}
                  className="lats-tickets"
                >
                  <img
                    src={CloseIcon}
                    alt=""
                    className="close-icons"
                    onClick={() => handleOpenTicketsCLose()}
                  ></img>
                  <Panel
                    header="All Tickets Details"
                    key={1}
                    className="table-top"
                  >
                    <div>
                      <TableFormat
                        headerData={LAST5_OPEN_TICKETS || []}
                        data={ticketsData}
                        ticketsLoader={ticketsLoader}
                        handleTickectNoLink={handleTickectNoLink}
                      ></TableFormat>
                    </div>
                  </Panel>
                </Collapse>
              </>
            )}
          </>}

      


          {((!showLastPayments && !showOpenTickets && CALL_TyPES?.length > 0) || isShowAllTicketsData) && (
            <>
              <TypesComponent
                customerData={(isTicketsPOSObj?.isPOS && isTicketsPOSObj) || state || props?.searchPolicyData} CALL_TyPES={CALL_TyPES} masterData={masterData} clientRoleLU={clientRoleLU} requestModeLU={requestModeLU}
                bankAccTypeLU={bankAccTypeLU} requestReceivedViaLU={requestReceivedViaLU}
                cursorPortalLU={cursorPortalLU} websitePortalLU={websitePortalLU} callRelatedActionLU={callRelatedActionLU}
                customerQueryLU={customerQueryLU}
                isEmailManagement={props?.isEmailManagement}
                panUpdateLU={panUpdateLU}
                processNameLU={processNameLU}
                sisLU={sisLU}
                loggedUser={loggedUser}
                callCenterLU={callCenterLU}
                callCenterSubTypeLU={callCenterSubTypeLU}
                isVerifiedCheck={state?.isAdvanceVerifiedCheck ? state?.isAdvanceVerifiedCheck : isVerifiedCheck}
                setSubTypeId={setSubTypeId}
                setCallTypeId={setCallTypeId}
                isShowAllTicketsData={isShowAllTicketsData}
                CallTypeId={CallTypeId}
                SubTypeId={SubTypeId}
                isSelectedTicketsData={isSelectedTicketsData}
              ></TypesComponent>
            </>
          )}
          {!props?.isEmailManagement &&
            <div className="widgets-start">
              <aside className="fixed-nav active">
                <div className="widgets-1">
                  <div className="item">
                    <Tooltip
                      placement="leftTop"
                      title="Click here for FAQ Details"
                    >
                      <a id="pay-premium" onClick={() => Assistancee()}>
                        <img src={Assistance} alt="" className="m-auto"></img>
                        <p>Assistance</p>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="item">
                    <Tooltip
                      placement="leftTop"
                      title="Click here for Payments"
                    >
                      <a id="pay-premium" onClick={() => handleLastPayments()}>
                        <i className="bi bi-currency-rupee"></i>
                        <p>Renewal Payments</p>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="item">
                    <Tooltip
                      placement="leftTop"
                      title="Click here for Open Tickets"
                    >
                      <a id="pay-premium" onClick={() => handleOpenTickets()}>
                        <i className="bi bi-ticket"></i>
                        <p>Tickets</p>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="item">
                    <Tooltip placement="leftTop" title="Click here for DMS">
                      <a id="pay-premium">
                        <i className="bi bi-file-text"></i>
                        <p>DMS</p>
                      </a>
                    </Tooltip>
                  </div>
                </div>

                <div className="widgets">
                  <div className="item">
                    <Tooltip placement="leftTop" title="Click here for Profile">
                      <a id="pay-premium" onClick={() => handleAllDetails()}>
                        <Progress type="circle" size={35} percent={75} />
                        <p>Profile</p>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="item">
                    <Tooltip
                      placement="leftTop"
                      title="Click here for Payments"
                    >
                      <a id="pay-premium">
                        <i className="bi bi-currency-rupee"></i>
                        <p>xxxx</p>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="item">
                    <Tooltip
                      placement="leftTop"
                      title="Click here for Payments"
                    >
                      <a id="pay-premium">
                        <i className="bi bi-currency-rupee"></i>
                        <p>yyyyy</p>
                      </a>
                    </Tooltip>
                  </div>

                  <div className="item">
                    <Tooltip
                      placement="leftTop"
                      title="Click here for Payments"
                    >
                      <a id="pay-premium">
                        <i className="bi bi-currency-rupee"></i>
                        <p>zzzzzz</p>
                      </a>
                    </Tooltip>
                  </div>
                </div>
              </aside>
            </div>}
        </div>
      </div>

      <Drawer
        title="Profile"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={allDetailsOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" />
          </Tooltip>
        }
      >
        <div>
          <table className="table table-bodered Profile">

            <tbody>
              <tr>
                <td>NPS Score</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Customer Sentiment</td>
                <td></td>
              </tr>


              <tr>
                <td colSpan={2} className="text-center"> <b>Near Future Event </b></td>

              </tr>
              <tr>
                <td>PO DOB</td>
                <td>	23-01-2024</td>
              </tr>
              <tr>
                <td>Renewal Due Date</td>
                <td>	23-01-2024</td>
              </tr>

              <tr>
                <td>Policy payout</td>
                <td>	Survival Benefit</td>
              </tr>
              <tr>
                <td>Loan (If active)</td>
                <td>No</td>
              </tr>

              <tr>
                <td colSpan={2} className="text-center"> <b> Customer Profile</b></td>

              </tr>

              <tr>
                <td>CKYC Status</td>
                <td>Registered</td>
              </tr>

              <tr>
                <td>PAN</td>
                <td>AAJOJ8888k</td>
              </tr>





              <tr>
                <td>Aadhar Seeding Status/Date</td>
                <td>	23-01-2024</td>
              </tr>

              <tr>
                <td>Language/Mode</td>
                <td>Marathi/Email</td>
              </tr>


              <tr>
                <td>Contact details - Mobile</td>
                <td>9892686867</td>
              </tr>


              <tr>
                <td>Contact details - Email</td>
                <td>Abc@gmail.com</td>
              </tr>
              <tr>
                <td>Update bank account</td>
                <td>IMPS Pass/No Bank Account</td>
              </tr>

              <tr>
                <td>Update Auto pay</td>
                <td>No</td>
              </tr>

              <tr>
                <td>Registered on Portal</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Registered on mobile app</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Language/Mode</td>
                <td>Marathi/Email</td>
              </tr>
            </tbody>
          </table>
        </div>

      </Drawer>
      <Drawer
        title="FAQ"
        placement={"right"}
        width={500}
        onClose={onClose}
        open={faqOpen}
        maskClosable={false}
        closeIcon={
          <Tooltip title="Close">
            <img src={CloseIcon} alt="" />
          </Tooltip>
        }
      >
        <div>
          <h1>Payment Link</h1>
          <p>
            <ul>
              <li>
                Now you can choose to send customers payment link over
                registered email/SMS/whatsapp.
              </li>
              <li>
                SR will be raised and Auto closed. No further action is required
                from your side for this SR.
              </li>
            </ul>
          </p>
        </div>
      </Drawer>



      <Modal
        title="Assistance"
        open={assistanceOpen}
        destroyOnClose={true}
        width={1200}
        closeIcon={false}
        footer={null}
      >

        <div>

          <div className="reuirement">
            <table className="table responsive-table assistanceTable">

              <tbody>
                {assistance?.length > 0 &&
                  assistance?.map((item, ind) => (
                    <tr key={ind + 1}>

                      <td>{item.assistanceDesc}</td>

                    </tr>
                  ))}
                {assistance?.length === 0 &&
                  <tr>
                    <td>

                      <div className="text-center"><span>No Data Available</span></div>
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>

          <div className="contact-details-btn">


            <Button
              type="primary"
              className="primary-btn"
              onClick={() => setAssistanceOpen(false)}
            >
              Close
            </Button>
          </div>

        </div>

      </Modal>
      {
        isOpenTicket && <TicketsOpenPopup isOpenTicket={isOpenTicket} serviceId={serviceId} handleClose={handleClose}/>
      }


    </>
  );
};


const mapStateToProps = ({ policyDetails, profileReducer }) => {
  return { policyDetails, profileReducer };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePolicyDetails: (info) => {
      dispatch(policyDetailsObj(info));
    },
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
