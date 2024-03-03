import React, { useEffect, useState } from "react";
import { Checkbox, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { sentDetailsObj } from "../../reducers/policyDetailsReducer";
import { useData } from "../../reducers/DataContext";
import { useSelector } from 'react-redux';

const AdvanceSearchComponent = (props) => {
  const loggedUser = useSelector(state => state?.userProfileInfo?.profileObj);
  const { sharedData } = useData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isAdvanceVerifiedCheck,setIsAdvanceVerifiedCheck] = useState(false);
  useEffect(() => {
      if (sharedData) {
        getSearchData(sharedData);
      }
  }, [sharedData]);
  const getSearchData = async (sharedData) => {
    setIsLoading(true);
    setData([]);
    let response = apiCalls.getSearchData(sharedData);
    response
      .then((val) => {
        if (val?.data?.responseHeader?.issuccess) {
          setData(val?.data?.responseBody?.searchDetails);
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
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
  const handlePolicyLink = (item) => {
    let sentObj = {};
    sentObj.emailId = item?.emailID;
    sentObj.mobileNo = item?.mobileNo;
    sentObj.dob = item?.dob;
    sentObj.isBOE = false;
    item.isAdvanceVerifiedCheck = isAdvanceVerifiedCheck;
    item.isBOE = false;
    props?.updateSentDetails(item);
    navigate("/policydetails", { state: item,sentObj });
  };
  const renderTableData = () => {
    return data?.map((value, index) => {
      const {
        policyNo,
        applicationNo,
        poName,
        laName,
        policyStatus,
        sumAssured,
        premiumAmt,
        agentName,
        pinCode,
        pan,
        mobileNo,
        role,
        caseType,
      } = value; //destructuring
      return (
        <>
          <tr key={index}>
          {loggedUser?.userName==="callcenter"&&<>
            <td><Checkbox type="checkbox" onChange={(e) => handleVerifyCheckBox(e)}/></td>
            </>}
            <td>
              <div className="gridLink" onClick={() => handlePolicyLink(value)}>
                {policyNo}
              </div>
            </td>
            <td>{applicationNo}</td>
            <td>{poName}</td>
            <td>{laName}</td>
            <td>{policyStatus}</td>
            <td>
              {sumAssured && (
                <NumberFormat
                  value={sumAssured}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>
              {premiumAmt && (
                <NumberFormat
                  value={premiumAmt}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={8}
                />
              )}
            </td>
            <td>{agentName}</td>
            <td>{pinCode}</td>
            <td>{pan}</td>
            <td>{mobileNo}</td>
            <td>{role}</td>
            <td>{caseType}</td>       
          </tr>
        </>
      );
    });
  };
  const handleVerifyCheckBox =(e)=>{
    console.log(e.target.checked)
    setIsAdvanceVerifiedCheck(e.target.checked)
  }
  return (
    <>
      <div className="main-start">
        <div className="w-94">
          <div className="advance-page">
            <div>
              <h6 className="advance-title">Latest Details / Search Results</h6>
            </div>
            <div>
             
                <div className="table-container">
                  <table
                    className="responsive-table"
                    style={{ border: "1px solid #ddd" }}
                  >
                    <tbody>
                      <tr>
                      {loggedUser?.userName==="callcenter"&&<><th>Verified</th></>} 
                        <th>Policy No</th>
                        <th>Application No</th>
                        <th>PO Name</th>
                        <th>LA Name</th>
                        <th>Policy Status</th>
                        <th>Sum Assured</th>
                        <th>Premium Amt</th>
                        <th>Agent Name</th>
                        <th>PIN Code</th>
                        <th>PAN</th>
                        <th>Mobile No</th>
                        <th>Role</th>
                        <th>Case Type</th>
                      </tr>
                      {renderTableData()}
                      {data?.length === 0 && (
                        <tr>
                          <td colSpan="14">
                            <div className="text-center">
                              <span>No data avalable</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      <Spin spinning={isLoading} fullscreen />
    </>
  );
};
const mapStateToProps = ({ policyDetails }) => {
  return { policyDetails };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateSentDetails: (info) => {
      dispatch(sentDetailsObj(info));
    },
    dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvanceSearchComponent);