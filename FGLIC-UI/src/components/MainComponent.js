import React, { useState } from "react";
import TypesComponent from "./CallTypes/TypesComponent";
import { Drawer, Tooltip, Progress, Collapse } from "antd";
import CloseIcon from "../assets/images/close-icon.png";
import Assistance from "../assets/images/handshake.png";
import TableFormat from "../utils/TableFormat";
import apiCalls from "../api/apiCalls";
import {
  LAST5_OPEN_TICKETS,
  PAYMENT_TRANSACTIONS,
  PAYMENT_TRANSACTIONS_DATA,
} from "../config";

const MainComponent = (props) => {
  const { Panel } = Collapse;
  const [allDetailsOpen, setAllDetailsOpen] = useState(false);
  const [showLastPayments, setShowLastPayments] = useState(false);
  const [showOpenTickets, setShowOpenTickets] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
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
  };
  const onClose = () => {
    setAllDetailsOpen(false);
    setFaqOpen(false);
  };
  const handlePaymentsCLose = () => {
    setShowLastPayments(false);
  };
  const handleOpenTicketsCLose = () => {
    setShowOpenTickets(false);
  };
  const getLastOpenTicketsData = () => {
    let response = apiCalls.getLastOpenTickets();
    response
      .then((val) => {
        setTicketsData(val?.data);
      })
      .catch((err) => {});
  };

  return (
    <>
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
            <Panel header="Last 05 Open Tickets" key={1} className="table-top">
              <div>
                <TableFormat
                  headerData={LAST5_OPEN_TICKETS || []}
                  data={ticketsData}
                ></TableFormat>
              </div>
            </Panel>
          </Collapse>
        </>
      )}
      {!showLastPayments && !showOpenTickets && (
        <>
          <TypesComponent customerData={props?.customerData}></TypesComponent>
        </>
      )}

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
      ></Drawer>
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

      <div className="widgets-start">
        <aside className="fixed-nav active">
          <div className="widgets-1">
            <div className="item">
              <Tooltip placement="leftTop" title="Click here for FAQ Details">
                <a id="pay-premium">
                  <img src={Assistance} alt="" className="m-auto"></img>
                  <p>Assistances</p>
                </a>
              </Tooltip>
            </div>

            <div className="item">
              <Tooltip placement="leftTop" title="Click here for Payments">
                <a id="pay-premium" onClick={() => handleLastPayments()}>
                  <i className="bi bi-currency-rupee"></i>
                  <p>Renewal Paymentss</p>
                </a>
              </Tooltip>
            </div>

            <div className="item">
              <Tooltip placement="leftTop" title="Click here for Open Tickets">
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
              <Tooltip placement="leftTop" title="Click here for Payments">
                <a id="pay-premium">
                  <i className="bi bi-currency-rupee"></i>
                  <p>xxxx</p>
                </a>
              </Tooltip>
            </div>

            <div className="item">
              <Tooltip placement="leftTop" title="Click here for Payments">
                <a id="pay-premium">
                  <i className="bi bi-currency-rupee"></i>
                  <p>yyyyy</p>
                </a>
              </Tooltip>
            </div>

            <div className="item">
              <Tooltip placement="leftTop" title="Click here for Payments">
                <a id="pay-premium">
                  <i className="bi bi-currency-rupee"></i>
                  <p>zzzzzz</p>
                </a>
              </Tooltip>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default MainComponent;
