// import { clientApi} from ".";
import axios from "axios";

const ctst = (val) => {
	const apiUrl = process.env.REACT_APP_API_URL + "GetMasterData"
	//const apiUrl = "https://fglicservicerequestapi.azurewebsites.net/api/GetMasterData"
	const params = {
        'code': process.env.REACT_APP_API_KEY

    };

	 return axios.post(apiUrl, val, {params})
}


const genericAPI=(data)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'CreateServiceRequest';
	const params = {
        'code': process.env.REACT_APP_API_KEY

    };
	 return axios.post(apiUrl, data, { params })
}




const paymentLink = (obj) => {

};




const getLastOpenTickets = (policyNo) => {
	const apiUrl = process.env.REACT_APP_API_URL + 'GetBOELatestServiceRequests';
	const params = {
		policyNo:policyNo,
        'code': process.env.REACT_APP_API_KEY

    };
	
	return axios.get(apiUrl, { params })
}

// const contactDetailsUpdate = (data) => {
// 	const apiUrl = 'https://servicerequesttestapi.azurewebsites.net/api/CreateServiceRequest';
// 	const params = {
//         'code': 'nzxd5NDpQ-vIPF-dXYQhwvNrFhKqc79_-78C8VY7gpduAzFu945Ppg=='
       
//         // Add other headers if needed
//     };
// 	 return axios.post(apiUrl, data, { params })
// }





const getPOSData=(obj)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetPOSListServiceRequests';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		'userId':  obj?.userId,
		'role': obj?.role
        // Add other headers if needed
    };
	 return axios.get(apiUrl, { params })
}
const getPOSIndividualData=(serialNum)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetServiceRequestBySID';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		'srId': serialNum,

        // Add other headers if needed
    };
	 return axios.get(apiUrl, { params })
}

const getRaiseRequirements=(data)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetRaiseRequirements';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		'calltype':data.calltype,
		'subtype':data.subtype,
		'Role':data.Role

        // Add other headers if needed
    };
	 return axios.get(apiUrl, { params })
}

const POSActionsOnContactDetails=(data)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'POSActionsOnServReq'
	const params = {
        'code': process.env.REACT_APP_API_KEY
	

        // Add other headers if needed
    };
	 return axios.post(apiUrl, data, { params })
}


const getBankDeatils=(data)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetBankDeatils'
	const params = {
        code: process.env.REACT_APP_API_KEY,
	
		policyNo: data.policyNo,
		clientId : data.clientId,
		// SerReq :  data.SerReq
        // Add other headers if needed
    };
	 return axios.get(apiUrl, { params })
}

const getIFSCBanks = (ifscCode) => {
	const apiUrl = process.env.REACT_APP_API_URL+'IFSCBank'
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		ISFC: ifscCode,
    };
	return axios.get(apiUrl, { params })
}
const getDocMaster=(obj)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetDocMaster'
	const params = {
        'code': process.env.REACT_APP_API_KEY

        // Add other headers if needed
    };
	 return axios.post(apiUrl, obj, { params })
}

const getProcesDocLnk=(obj)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetProdDocLnk'
	const params = {
        'code': process.env.REACT_APP_API_KEY

        // Add other headers if needed
    };
	 return axios.post(apiUrl, obj, { params })
}
const getProcesLink=(obj)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'GetProcesDocLnk'
	const params = {
        'code': process.env.REACT_APP_API_KEY

        // Add other headers if needed
    };
	 return axios.post(apiUrl, obj, { params })
}


const FinanceActionsOnSerReq=(obj)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'FinanceActionsOnSerReq'
	const params = {
        'code': process.env.REACT_APP_API_KEY

        // Add other headers if needed
    };
	 return axios.post(apiUrl, obj, { params })
}


const SaveEmailResponseDtls=(obj)=>{

	const apiUrl = process.env.REACT_APP_API_URL + 'SaveEmailResponseDtls'
	const params = {
        'code': process.env.REACT_APP_API_KEY

        // Add other headers if needed
    };
	 return axios.post(apiUrl, obj, { params })
}
const getDoNotDisturbAPI = (policyNumber, mobile) => {
	const apiUrl = process.env.REACT_APP_API_URL +'GetDoNotDisturbAPI';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		policy: policyNumber,
		mobileNo:mobile
    };
	return axios.get(apiUrl, { params })
}

const taxCalculationForSerReq = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'TaxCalculationForSerReq';
	const params = {
        code: process.env.REACT_APP_API_KEY2,
		//clientId: obj.clientId,
		srid:obj.SrvReqRefNo
    };
	return axios.get(apiUrl, { params })
}

const searchLocation = (pincode) => {
	const apiUrl = process.env.REACT_APP_API_URL +'SearchLocation';
	const params ={
		code: process.env.REACT_APP_API_KEY,
		
	}
    const obj = {
		"searchLocationBy":4,
		"postalCode":{
			"Pincode":pincode
		}
	}

	return axios.post(apiUrl, obj ,{ params })
}

// ********************************** 2222222222222222**********************************//


const GetSerReqStatus = (roleId) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'GetSerReqStatus';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		 Roleid: roleId
    };
	return axios.get(apiUrl, { params })
}
const GetSerReqByFilters = (callType,subType,caseStatus) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'GetSerReqByFilters';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		Calltype: callType||0,
		Subtype:subType||0,
		Status:caseStatus||0
    };
	return axios.get(apiUrl, { params })
}
const GetPOSExecRoles = () => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'GetPOSExecRoles';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		Roleid: 4,
    };
	return axios.get(apiUrl, { params })
}
const saveAssignToPOS = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'AssignToPOS';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
    };
	return axios.post(apiUrl, obj, { params })
}

const fileUpload = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'InsertBlob';
	const params = {
        'code': process.env.REACT_APP_API_KEY2
    };
	return axios.post(apiUrl, obj, { params })
}
const getRelationsData = (clientId) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'GetNomineeRelation';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		'clientId': clientId
    };
	return axios.get(apiUrl, { params })
}
const getEmailManagementFilter = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2+'GetEmailResponse'
	const params = {
        //'code': "Qi9AuTJ2jjwmR0yiBuVRNjquki_BGfs44ZrdFoF6m5KrAzFulLJLrg==",
		'code': process.env.REACT_APP_API_KEY2,
    };
	return axios.post(apiUrl, obj, { params })
}



const SendEmailSMTP = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2+'SendEmailSMTP'
	const params = {
        //'code': "fGboTum1tBYW4aFrgLlpmCVL-Ki298PWfC03vr9XgbqPAzFu1PWwxg==",
		'code': process.env.REACT_APP_API_KEY2,
    };
	return axios.post(apiUrl, obj, { params })
}


const GetEmailResponseDtls = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'GetEmailResponseDtls';
	const params = {
        "code":process.env.REACT_APP_API_KEY2,
    };
	return axios.post(apiUrl, obj, { params })
}


const getSendOTP = (data) => {
const apiUrl = process.env.REACT_APP_API_URL2+'OTPService'
const params = {
		'code':process.env.REACT_APP_API_KEY2,
	  };
	 return axios.post(apiUrl, data, { params })
}
const getServiceRequestCount = (PolicyNo,callType,subType) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'GetServiceRequestCount';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		'PolicyNo': PolicyNo,
		'callType': callType,
		'subType': subType
    };
	return axios.get(apiUrl, { params })
}
const getPaymentReprocessing = (PolicyNo,callType,subType) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'PaymentReprocessing';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		'PolicyNo': PolicyNo,
		'callType': callType,
		'subType': subType
    };
	return axios.get(apiUrl, { params })
}

// const getSendOTP = (data) => {
// 	const apiUrl = 'https://commonservice.azurewebsites.net/api/OTPService?code=y3BxlW2EwU_02Pve3tEdXudjcU9vZQ5DGfLz9w72OvZZAzFuq264Gg==';
// 	const headers = {
// 		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY,
// 	  };
// 	 return axios.post(apiUrl, data, { headers:headers,mode: 'cors' })
// }
const savePaymentLink = (obj) => {
	const apiUrl = 'https://servicerequestfg.azurewebsites.net/api/CreateServiceRequest?code=8mwgijI-vaJqSNBvMklnE8wiYiHueCdXah1vqDckALp9AzFucT2MBg==';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };

	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
}


const PPCSave = (data) => {
	const apiUrl = 'https://premiumpaidcretificateservice.azurewebsites.net/api/PremiumPaidCertificate';
	const params = {
        'code': 'y9VBbTtGOVEvLPJzO82DDtCCxvOJSO1fBDuoEL9u50-TAzFuXu78Mw=='
       
        // Add other headers if needed
    };
	 return axios.post(apiUrl, data, { params })
}


const getPlanFund = (data) => {
	const apiUrl = process.env.REACT_APP_API_URL +'GetPlanFundMst';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
    };
	return axios.post(apiUrl, data, { params })
}
const getAssistanceDetails = (calltype,subtype ) => {
	const apiUrl = process.env.REACT_APP_API_URL +'GetAssistanceDetails';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		calltype:calltype,
		subtype:subtype
    };
	return axios.get(apiUrl, { params })
}

const TransectionPayouts = (obj ) => {
	const apiUrl = process.env.REACT_APP_API_URL +'TransectionPayouts';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		  ...obj
    };
	return axios.get(apiUrl, { params })
}


const UploadExcelFileAPI = ( formdata, obj) => {
	const apiUrl = process.env.REACT_APP_API_URL +'UploadExcelFileAPI';
	const params = {
        'code': process.env.REACT_APP_API_KEY,
		  ...obj
    };
	return axios.post(apiUrl,formdata, { params })
}




// ********************************** FG SERVER CALLS **********************************//



const getClientEnquiry = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'Generic/api/Generic/GetClientEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		
			"requestHeader": {
			  "source": "POS",
			  "carrierCode": "2",
			  "branch": "Baroda Branch Office",
			  "userId": "website",
			  "userRole": "10",
			  "partnerId": "MSPOS",
			  "processId": "POS",
			  "monthEndExtension": "N",
			  "monthendDate": "12/10/2023"
			},
			"requestBody": {
			  "clientNumber": obj.clientNumber 
			}
		  }
		  
	
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}
const getCheckPANdetails = (panNo) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/PAN/getCheckPANdetails';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = { 
			// "requestHeader": {     //dynamic passing
			//   "source": "POS",
			//   "policyNo": obj?.policyNumber,
			//   "applicationNo": obj?.applicationNo,
			//   "dob": obj?.dob
			// },
			// "requestBody": {
			//  "panNumber": obj?.panNumber
			// }
			"requestHeader": {   //static passing
				"source": "POS",
				"policyNo": "00013374",
				"applicationNo": "",
				"dob": "01/01/1986"
			  },
			  "requestBody": {
			   "panNumber": panNo
			  }
			
		  }
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}
const getAgentEnquiry = (agnetNo) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/Agent/GetAgentEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = { 
			"requestHeader": { 
				"source": "POS",
				"carrierCode": "2",
				"branch": "PRA",
				"userId": "WEBSITE",
				"userRole": "10",
				"partnerId": "MSPOS",
				"processId": "POS",
				"monthendExtension": "N",
				"monthendDate": "18/10/2023"
			},
			"requestBody": {
				"agntsel": agnetNo
			}
		
		  }
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}
const getNomineeCreation = (policyNo) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'/PolicyServicing/api/Nominee/GetNomineeCreation';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = { 
			"requestHeader": {
			  "source": "POS",
				  "carrierCode": "2",
				  "Branch": "PRA",
				  "userId": "website",
				  "userRole": "10",
				  "partnerId": "MSPOS",
				  "processId": "POS",
				  "monthendExtension": "N",
				  "monthendDate": "09/12/2023"
			},
			"requestBody": {
				"bnycD1": "",
				"bnypC1": "100",
				"bnyrlN1": "WI",
				"bnyseL1": "50008879",
				"effectiveDate1": "20230831",
			
			
			
				"bnycD2": "",
				"bnypC2": "",
				"bnyrlN2": "",
				"bnyseL2": "",
				"effectiveDate2": "",
			
			
			
			
				"bnycD3": "",
				"bnypC3": "",
				"bnyrlN3": "",
				"bnyseL3": "",
				"effectiveDate3": "",
			
			
			
			
				"bnycD4": "",
				"bnypC4": "",
				"bnyrlN4": "",
				"bnyseL4": "",
				"effectiveDate4": "",
			
			
			
				"bnycD5": "",
				"bnypC5": "",
				"bnyrlN5": "",
				"bnyseL5": "",
				"effectiveDate5": "",
			
			
			
				"bnycD6": "",
				"bnypC6": "",
				"bnyrlN6": "",
				"bnyseL6": "",
				"effectiveDate6": "",
			
			
			
				"bnycD7": "",
				"bnypC7": "",
				"bnyrlN7": "",
				"bnyseL7": "",
				"effectiveDate7": "",
			
			
			
				"bnycD8": "",
				"bnypC8": "",
				"bnyrlN8": "",
				"bnyseL8": "",
				"effectiveDate8": "",
			
			
			
				"bnycD9": "",
				"bnypC9": "",
				"bnyrlN9": "",
				"bnyseL9": "",
				"effectiveDate9": "",
			
			
			
				"bnycD10": "",
				"bnypC10": "",
				"bnyrlN10": "",
				"bnyseL10": "",
				"effectiveDate10": "",
			
			
			
				"policyNumber": policyNo
			  }
			
		  
		  }
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}
const getNomineeEnquiry = (policyNo) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/Nominee/GetNomineeEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = { 
		"requestHeader": {
			"source": "POS",
				"carrierCode": "2",
				"Branch": "PRA",
				"userId": "website",
				"userRole": "10",
				"partnerId": "MSPOS",
				"processId": "POS",
				"monthendExtension": "N",
				"monthendDate": "09/12/2023"
		  },
		  "requestBody": {
			"policyNumber": policyNo
		  }
		  }
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}
const getExistPANNumber = (clientNo) => {
	const apiUrl =  process.env.REACT_APP_FG_URL2 +'LifeAsiaApi/AML/api/AML/Enquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY2
	  };
	  const data = {
		"requestHeader": {
		   "source": "POS",
			  "carrierCode": "2",
			  "Branch": "KAN",
			  "userId": "F1140098",
			  "userRole": "10",
			  "partnerId": "MSPOS",
			  "processId": "POS",
			  "monthendExtension": "N",
			  "monthendDate": "09/12/2023"
		},
		"requestBody": {
		  "CltID": clientNo
		 
		}
	  }
	  
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}

const getSearchData = (data) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'Generic/api/SearchAPI/GetSearchAPI';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY,
		'Access-Control-Allow-Origin': '*'
	  };

	 return axios.post(apiUrl, data, { headers:headers,mode: 'cors' })
}
const getHeaderParameters = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'Generic/api/HeaderAPI/GetHeaderParameters';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		"requestHeader": {
			"source": "POS",
			"policyNo": obj?.policyNo,
			"applicationNo": obj?.applicationNo,
			"dob":  obj?.dob
		}
	}
	
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}


const getComplaintAction = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'ComplaintAction';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		'clientId':'blobs_extension'
    };
	return axios.post(apiUrl, obj, { params })
}

const getSendAction = (obj) => {
	const apiUrl = process.env.REACT_APP_API_URL2 +'SendAction';
	const params = {
        'code': process.env.REACT_APP_API_KEY2,
		'clientId':'blobs_extension'
    };
	return axios.post(apiUrl, obj, { params })
}

const getPremiumEnquiryData = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/PremiumEnquiry/GetPremiumEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };

	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 


const surrenderEnquiryData = (obj) => {

	const apiUrl = process.env.REACT_APP_FG_URL +'Surrender/api/Surrender/GetSurrenderEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };

	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 


const loanQuotationn = (obj) => {

	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/Loan/LoanQuotation';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };

	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 

const getPartialWithdrawalEnquiry = (obj) => {

	const apiUrl = process.env.REACT_APP_FG_URL +'Surrender/api/PartialWithdrawalEnquiry/GetPartialWithdrawalEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };

	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 

const getMandatetagEnquiry = (policyNumber) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/MandateTag/GetMandatetagEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		"requestHeader": {
			 "source": "POS",
			 "carrierCode": "2",
			 "branch": "PRA",
			 "userId": "WEBSITE",
			 "userRole": "10",
			 "partnerId": "MSPOS",
			 "processId": "POS",
			 "monthendExtension": "N",
			 "monthendDate": "18/10/2023"
		 },
	   "requestBody": {
		 "chdrsel": policyNumber
	   }
	 }
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}

const getMandateData = (poClientID,mandreff) => {
	const apiUrl = process.env.REACT_APP_FG_URL2 +'LifeAsiaApi/Payment/api/Mandate/Enquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY2
	  };
	  const data = {
		"requestHeader": {
			"source": "AAAA",
			"carrierCode": "2",
			"branch": "Baroda Branch Office",
			"userId": "F1142259",
			"userRole": "10",
			"partnerId": "1142259",
			"processId": "",
			"monthendExtension": "",
			"monthendDate": ""
		},
		"requestBody": {
			"clntnum": poClientID,
			"mandreff": mandreff,
			"applicationNo": ""
		}
	}
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}



const bankaccverification = (obj) => {
	// const apiUrl = 'https://testapi.karza.in/v3/bankacc-verification';

	const apiUrl = 'https://lfagentapigw-rsg.azure-api.net/KarzaAccountValidationService/v3/bankacc-verification';
	const headers = {
		"Ocp-Apim-Subscription-Key":'e0ae85271f264332964ac20964b93da5',
		"x-karza-key":'J1QFFg5gVB6YPuIj'
	  };
	// const headers = {
	// 	// "Ocp-Apim-Subscription-Key":"e0ae85271f264332964ac20964b93da5",
	// 	'x-karza-key':'J1QFFg5gVB6YPuIj',
	// 	"Content-Type": "application/json"
	//   };
	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 


const LoanEnquiry = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/LoanENQ/LoanEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 



const LoanStatement = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/Loan/LoanStatement ';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 


const GetAssigneeEnquiry = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/Assignee/GetAssigneeEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 

const GetFundValue = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/FundSwitch/GetFundValue';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
} 

const getEmailDedupeAPI=(obj)=>{

	const apiUrl = process.env.REACT_APP_FG_URL + 'Generic/api/Dedupe/GetEmailDedupeAPI'
	const headers = {
        "Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY

        // Add other headers if needed
    };
	 return axios.post(apiUrl, obj, { headers: headers, mode: 'cors' })
}




const getAllowableModeChangeOptionFetch = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/AllowableModeChangeOptionFetch/GetAllowableModeChangeOptionFetch';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
			"requestHeader": {
			"source": "POS",
			"carrierCode": "2",
			"Branch": "PRA",
			"userId": "website",
			"userRole": "10",
			"partnerId": "MSPOS",
			"processId": "POS",
			"monthendExtension": "N",
			"monthendDate": "09/12/2023"
			},
			"requestBody": {
			"cnttype": obj?.planCodeNo
			}
		}
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}

const getBillingFrequencyChangeQuotation = (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/BillingFrequency/GetBillingFrequencyChangeQuotation';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		"requestHeader": {
		"source": "POS",
		"carrierCode": "2",
		"Branch": "PRA",
		"userId": "website",
		"userRole": "10",
		"partnerId": "MSPOS",
		"processId": "POS",
		"monthendExtension": "N",
		"monthendDate": "09/12/2023"
		},
		"requestBody": {
		"policyNumber": obj?.policyNumber,  
		"frequency": obj?.mode
		}
	}
		
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}

const GetPartSurrenderEnquiry =  (obj) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'/Surrender/api/PartSurrender/GetPartSurrenderEnquiry';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	
		
	 return axios.post(apiUrl, obj, { headers: headers,mode: 'cors' })
}

const GetPaymentDetails =  (applicationNo) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'Generic/api/Payment/GetPaymentDetails';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		"requestHeader": {
		  "source": "",
		  "policyNo": "",
		  "applicationNo": applicationNo,
		  "dob": ""
		},
		"requestBody": {
		}
	  }
	  
		
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}





const CKYC = (obj) => {
	const apiUrl = 'https://lfagentapigw-rsg.azure-api.net/CKYC/ckyc/test/v1/search ';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		"idType": "PAN",
		"idValue": "DQEFT1234H",
		"name": null,
		"dob": null,
		"gender": null,
		"consent": "Y",
		"getMultipleRecord": "N",
		"clientData": {
			"caseId": null
		}
	}
	
		
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}

const GetCurrentFundAllocation =  (policyNo) => {
	const apiUrl = process.env.REACT_APP_FG_URL +'PolicyServicing/api/CurrentFundAllocation/GetCurrentFundAllocation';
	const headers = {
		"Ocp-Apim-Subscription-Key":process.env.REACT_APP_FG_KEY
	  };
	  const data = {
		"requestHeader": {
		  "source": "POS",
		  "policyNo": "00110402",
		  "applicationNo": "",
		  "dob": ""
		}
	  }
	  
	  
		
	 return axios.post(apiUrl, data, { headers: headers,mode: 'cors' })
}


const objects = {UploadExcelFileAPI, getAssistanceDetails,TransectionPayouts,  GetCurrentFundAllocation, GetPartSurrenderEnquiry, searchLocation, CKYC, getPlanFund, taxCalculationForSerReq, getEmailDedupeAPI, SaveEmailResponseDtls,SendEmailSMTP, GetEmailResponseDtls, FinanceActionsOnSerReq, GetFundValue, LoanStatement,GetAssigneeEnquiry, LoanEnquiry, GetSerReqStatus, bankaccverification, getPartialWithdrawalEnquiry, loanQuotationn, surrenderEnquiryData, getBankDeatils, genericAPI, getClientEnquiry, POSActionsOnContactDetails, getRaiseRequirements, getPOSIndividualData, getPOSData, getSearchData,getHeaderParameters,getPremiumEnquiryData,paymentLink,savePaymentLink, ctst,getLastOpenTickets,getSendOTP,PPCSave,GetSerReqByFilters,GetPOSExecRoles,saveAssignToPOS,getIFSCBanks,fileUpload,getCheckPANdetails,getAgentEnquiry,getNomineeCreation,getNomineeEnquiry,getExistPANNumber,getRelationsData,getProcesDocLnk,getProcesLink,getDocMaster,getEmailManagementFilter,getAllowableModeChangeOptionFetch,getBillingFrequencyChangeQuotation,getDoNotDisturbAPI,getMandatetagEnquiry,getServiceRequestCount,GetPaymentDetails,getPaymentReprocessing,getComplaintAction,getSendAction,getMandateData};


export default objects;