import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate, useNavigate  } from "react-router-dom";
import Header from "./Header";
import { Spin } from "antd";
import PosAdminDashboard from "../components/POSAdmin/posAdminDashboard";
import FinanceDashboard from '../components/Finance/financeDashboard';
import PosApproveComponent from "../components/PosApproveComponent";
import EmailManagement from "../components/EmailManagement";
import EmailManagementView from "../components/EmailManagement/EmailManagementView";

import ExcelUpload from  "../components/ExcelUpload";
import ComplaintsDashboard from  "../components/Complaints/complaintsDashboard";
import ComplaintsTeam from  "../components/Complaints/complaintsTeam";
import ComplaintsUser from  "../components/Complaints/complaintsUser";
import { connect,useSelector } from "react-redux";
import BOEDashboard from "../components/BOEDashboard/BOEDashboard";
import ComplaintTeamDashboard from "../components/Complaints/complaintTeamDashboard";
import ComplaintsUserDashboard from "../components/Complaints/complaintsUserDashboard";
import PAUserDashboard from "../components/PAUserDashboard/PAUserDashboard";
import NBUserDashboard from "../components/NBUserDashboard/NBUserDashboard";
// import RequireAuth from "../utils/RequireAuth";
const Login = lazy(() => import("./Login"));
const AdvanceSearchComponent = lazy(() =>
  import("../components/AdvanceSearch/advanceSearch")
);
const PosManagerDashboard = lazy(() =>
  import("../components/POSManager/posManagerDashboard")
);
const Dashboard = lazy(() => import("./Dashboard"));
const Table = lazy(() => import("../components/Table"));
const CustomerDetails = lazy(() => import("../components/customerDetails"));
const ErrorPage = lazy(() => import("../utils/ErrorPage"));

const Routing = () => {
  const navigate = useNavigate();
  const loginInfo = useSelector(state => state);
  const isLoggedIn = loginInfo?.userProfileInfo?.profileObj?.name ? true :false
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <>
     {window.location.hash?.toLocaleLowerCase().includes('/posapprove') && <>
                <PosApproveComponent/>
              </>}
      {window.location.hash?.toLocaleLowerCase() !== "#/posapprove"&&<>
      {isLoggedIn ? (     // lOGIN Page Routing Code
        <>
         <Header ></Header>
        <Suspense
          fallback={
            <div className="loader">
              <Spin size="large" tip="Loading..." />
            </div>
          }
        >
          
          <Routes>
            <Route path="/" element={<AdvanceSearchComponent />} />
            <Route path="/advancesearch" element={<AdvanceSearchComponent />} />
            <Route path="/policydetails" element={<CustomerDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Navigate to="/advancesearch" />} />
            <Route path="/calllogging" element={<CustomerDetails />} />
            {/* <Route path="/policydetails" element={<RequireAuth><CustomerDetails /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} /> */}
            <Route path="/table" element={<Table />} />
            <Route path="/posmanagerdashboard" element={<PosManagerDashboard />} />
            <Route path="/posadmindashboard" element={<PosAdminDashboard />} />
            <Route path="/complaints" element={<ComplaintsDashboard />} />

            <Route path="/financedashboard" element={<FinanceDashboard />} />
            {/* <Route path="/posapprove" element={<PosApproveComponent />} /> */}
            <Route path="/emailmanagement" element={<EmailManagement />} />
            <Route path="/emailmanagementview/:id" element={<EmailManagementView />} />
          {/*<Route path="/complaintsteam" element={<ComplaintsTeam />} />*/}

          <Route path="/complaintsteam" element={<ComplaintTeamDashboard />} />
          <Route path="/complaintsteam/:serviceId" element={<ComplaintsTeam />} />
          {/*  <Route path="/complaintsuser" element={<ComplaintsUser />} /> */}
          <Route path="/complaintsuser" element={<ComplaintsUserDashboard />} />
          <Route path="/complaintsuser/:serviceId" element={<ComplaintsUser />} />
            <Route path="/boedashboard" element={<BOEDashboard />} />
            <Route path="/pauserdashboard" element={<PAUserDashboard />} />
            <Route path="/nbuserdashboard" element={<NBUserDashboard />} />
            <Route path="/excelUpload" element={<ExcelUpload />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
        </>
      ) : (
        <Login />
      )}
      </>}
    </>
  );
};

export default Routing;
