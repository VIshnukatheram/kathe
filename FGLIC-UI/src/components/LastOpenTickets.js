import React, { useEffect, useState } from "react";
import TableFormat from "../utils/TableFormat";
import CloseIcon from "../assets/images/close-icon.png";

import {
  LAST5_OPEN_TICKETS,
  OPENTICKETS_DATA,
  PAYMENT_TRANSACTIONS,
  PAYMENT_TRANSACTIONS_DATA,
} from "../config";
import { Collapse } from "antd";
import apiCalls from "../api/apiCalls";

const LastOpenTickets = (props) => {
  const { Panel } = Collapse;
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    if(props?.lastOpenTickets){
      getLastOpenTicketsData();
    }
  }, []);

  const getLastOpenTicketsData = () => {
    let response = apiCalls.getLastOpenTickets();
    response
      .then((val) => {
        setTicketsData(val?.data)
      })
      .catch((err) => {});
  };



 
  const handlePaymentsCLose = () => {
    props?.setShowLastPayments(false);
  };
  const handleOpenTicketsCLose = () => {
   props?.setShowOpenTickets(false);
  };

  return (
    <>
      {props && props?.lastPayments && (
        <>
         <Collapse
            accordion
            expandIconPosition={"end"}
            defaultActiveKey={["1"]}
            className="lats-tickets mt-16"
          >
          <img
          src={CloseIcon}
          alt=""
          className="close-icons"
          onClick={() => handlePaymentsCLose()}
        ></img>
        <Panel header="Payment Transactions" key={1} className="table-top">
              <div>
                <TableFormat
                  headerData={PAYMENT_TRANSACTIONS}
                  data={PAYMENT_TRANSACTIONS_DATA}
                ></TableFormat>
              </div>
             
        </Panel>
        </Collapse>
        </>
      )}
      {props && props?.lastOpenTickets && (
        <>

          <Collapse
            accordion
            expandIconPosition={"end"}
            defaultActiveKey={["1"]}
            className="lats-tickets mt-16"
          >
              <img
              src={CloseIcon}
              alt=""
              className="close-icons"
              onClick={() => handleOpenTicketsCLose()}
            ></img>
            <Panel header="Last 05 Open Tickets" key={1} className="table-top">
              <div>
                <TableFormat
                  headerData={LAST5_OPEN_TICKETS||[]}
                  data={ticketsData}
                ></TableFormat>
              </div>
            </Panel>
          </Collapse>
        </>
      )}
    
    </>
  );
};

export default LastOpenTickets;
