import React from "react";
import {
  SURRENDER_RETAIN,
  RENEWAL,
  SEND_DOCUMENTS,
  SURRENDER_POLICY,
  CHECKLIST_REASONS,
} from "../config";
import SendDocuments from "./SendDocuments";
import Renewal from "./Renewal";
import SurrenderRetain from "./SurrenderRetain";
import ContactDetails from "./contactDetails";
import Reasons from "../utils/Reasons";

const DetailsComponent = (props) => {
  const obj =
    props?.callType === "surrenderretain"
      ? SURRENDER_RETAIN
      : props?.callType === "senddocuments"
      ? SEND_DOCUMENTS : props?.callType === "contactdetailsupdate" ? CHECKLIST_REASONS
      : RENEWAL;
  
  return (
    <>
      <div>
        {props?.callType === "surrenderretain" && props?.btnApply && (
          <>
            <SurrenderRetain
              data={obj}
              policyData={SURRENDER_POLICY}
            ></SurrenderRetain>
          </>
        )}
        {!props?.callType&& (
          <>
              <Renewal data={obj} title="Last 5 tickets"></Renewal>
          </>
        )}
        {props?.callType === "senddocuments" && props?.btnApply &&  (
          <>
              <SendDocuments data={obj}></SendDocuments>
          </>
        )} 
         {/* <div className="reasons-list">
          <Reasons />
        </div> */}
         {props?.callType && (
          <>
              <ContactDetails data={obj} subType={props?.subType} fullWidth={props?.fullWidth}    addressSelection={props?.addressSelection}></ContactDetails>
          </>
        )}
       
      </div>
    </>
  );
};

export default DetailsComponent;
