import axios from "axios";

const getGSTINEnquiry = (clientNo) => {
  let obj = {
    requestHeader: {
      source: "POS",
      carrierCode: "2",
      Branch: "PRA",
      userId: "website",
      userRole: "10",
      partnerId: "MSPOS",
      processId: "POS",
      monthendExtension: "N",
      monthendDate: "09/12/2023",
    },
    requestBody: {
      policyNumber: clientNo,
    },
  };

  const apiUrl =
    process.env.REACT_APP_FG_URL + "/PolicyServicing/api/GSTIN/GetGSTINEnquiry";
  const headers = {
    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_FG_KEY,
  };
  return axios.post(apiUrl, obj, { headers: headers, mode: "cors" });
};

export { getGSTINEnquiry };

