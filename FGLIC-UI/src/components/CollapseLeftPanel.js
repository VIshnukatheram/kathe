import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import TypesComponent from "./CallTypes/TypesComponent";
import CallLogging from "./CallTypes/CallLogging";
import { Collapse } from "antd";
const { Sider, Content } = Layout;

const CollapsibleSidebar = (props) => {
  const { Panel } = Collapse;
  const [collapsed, setCollapsed] = useState(false);
  const [hideLeftPanel, setHideLeftPanel] = useState(false);

  useEffect(() => {
    props?.setHideCustomerDetails(hideLeftPanel);
  }, [hideLeftPanel]
  )

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="left-panel mobile-none">

        <Layout style={{ minHeight: "100vh" }}>
          {!hideLeftPanel && <>
            <Sider
              width={collapsed ? 390 : 10}
              theme="light"
              collapsible
              collapsed={!collapsed}
              onCollapse={toggleSidebar}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                {collapsed && <>
                  <div className="flex-container">
                    <ul className="sidebar">
                      <li>
                        <p className="left-panel-head">All Details</p>
                      </li>
                      <li className="gridd">
                        <p className="column-1">NPS Score </p>
                        <p className="column-2">
                          <b>NPS Score</b>
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">
                          Customer Sentiment
                        </p>
                        <p className="column-2">
                          <b>Customer Sentiment</b>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="head-title title-border">Near Future Event</p>
                  </div>

                  <div className="flex-container">
                    <ul className="sidebar">
                      <li className="gridd">
                        <p className="column-1">PO/LA DOB </p>
                        <p className="column-2">
                          <b>PO/LA DOB</b>
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">
                          Renewal due date / T-30 day Flag
                        </p>
                        <p className="column-2">
                          <b>DD/MM/YYYY / T-30 day Flag</b>
                        </p>
                      </li>
                      <li className="gridd">
                        <p className="column-1">Policy payout </p>
                        <p className="column-2">
                          <p className="d-flex justify-content">
                            <span style={{ fontWeight: "bold" }}>SB</span>{" "}
                            <span style={{ textDecoration: "underline" }} className="px-16">
                              View Details
                            </span>
                          </p>
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">Loan (If active ) </p>
                        <p className="column-2">
                          <b>Loan details</b>
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="customer-border title-border line-border">Customer Profile <span className="profile-percent">50% Completed</span></p>
                  </div>

                  <div className="flex-container">
                    <ul className="sidebar">
                      <li className="gridd">
                        <p className="column-1">KYC</p>
                        <p className="column-2">
                          <b>KYC</b>
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">
                          PAN Status
                        </p>
                        <p className="column-2">
                          <b>PAN Status</b>
                        </p>
                      </li>
                      <li className="gridd">
                        <p className="column-1">PAN Aadhar seeding status </p>
                        <p className="column-2">
                          <p className="column-2">
                            <b> PAN Aadhar seeding status</b>
                          </p>
                          {/* <p className="d-flex justify-content">
                            <span style={{ fontWeight: "bold" }}>PAN Aadhar seeding status</span>{" "}
                            <span style={{ textDecoration: "underline" }} className="px-16">
                              View Details
                            </span>
                          </p> */}
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">Contact details - Mobile </p>
                        <p className="column-2">
                          <b> Contact details - Mobile</b>
                        </p>
                      </li>
                      <li className="gridd">
                        <p className="column-1">Contact details - Email </p>
                        <p className="column-2">
                          <b>Contact details - Email</b>
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">Update bank account </p>
                        <p className="column-2">
                          <b>Update bank account</b>
                        </p>
                      </li>
                      <li className="gridd">
                        <p className="column-1">Update Auto pay </p>
                        <p className="column-2">
                          <b>Update Auto pay</b>
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="other-border title-border">Other Details</p>
                  </div>

                  <div className="flex-container">
                    <ul className="sidebar">
                      <li className="gridd bg-w">
                        <p className="column-1">Registered on Portal </p>
                        <p className="column-2">
                          <b>Registered on Portal</b>
                        </p>
                      </li>
                      <li className="gridd">
                        <p className="column-1">
                          Registered on mobile app
                        </p>
                        <p className="column-2">
                          <b>Registered on mobile app</b>
                        </p>
                      </li>
                      <li className="gridd bg-w">
                        <p className="column-1">Last login date & time (P/M)</p>
                        <p className="column-2">
                          <b>Last login date & time (P/M)</b>
                        </p>
                      </li>
                    </ul>
                  </div>
                </>}
                {!collapsed&&<>
                <div className="text-vertical">
                  <p>Clicke Here For All Deatils</p>
                </div>
                </>}
              </Menu>
            </Sider>
          </>}
          <Layout className="site-layout">
            <Content>
              {window.location.pathname?.toLocaleLowerCase().includes('/calllogging') && <>
                <CallLogging collapsed={collapsed} />
              </>}
              {window.location.pathname?.toLocaleLowerCase().includes('/policydetails') && <>
                <TypesComponent collapsed={collapsed} setHideLeftPanel={setHideLeftPanel} sentObj={props?.sentObj}></TypesComponent>
              </>}
            </Content>
          </Layout>
        </Layout>


      </div>

      <div className="left-panel desk-none">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={!collapsed ? 320 : 30}
            theme="light"
            collapsed={collapsed}
            onCollapse={toggleSidebar}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              {!collapsed && <>
                <div className="flex-container">
                  <ul className="sidebar">
                    <li>
                      <p className="left-panel-head">All Details</p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">NPS Score </p>
                      <p className="column-2">
                        <b>NPS Score</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">
                        Customer Sentiment
                      </p>
                      <p className="column-2">
                        <b>Customer Sentiment</b>
                      </p>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="head-title title-border">Near Future Event</p>
                </div>

                <div className="flex-container">
                  <ul className="sidebar">
                    <li className="gridd">
                      <p className="column-1">PO/LA DOB </p>
                      <p className="column-2">
                        <b>PO/LA DOB</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">
                        Renewal due date / T-30 day Flag
                      </p>
                      <p className="column-2">
                        <b>DD/MM/YYYY / T-30 day Flag</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Policy payout </p>
                      <p className="column-2">
                        <p className="d-flex justify-content">
                          <span style={{ fontWeight: "bold" }}>SB</span>{" "}
                          <span style={{ textDecoration: "underline" }} className="px-16">
                            View Details
                          </span>
                        </p>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Loan (If active ) </p>
                      <p className="column-2">
                        <b>Loan details</b>
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="customer-border title-border line-border">Customer Profile <span className="profile-percent">50% Completed</span></p>
                </div>

                <div className="flex-container">
                  <ul className="sidebar">
                    <li className="gridd">
                      <p className="column-1">KYC</p>
                      <p className="column-2">
                        <b>KYC</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">
                        PAN Status
                      </p>
                      <p className="column-2">
                        <b>PAN Status</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">PAN Aadhar seeding status </p>
                      <p className="column-2">
                        <p className="column-2">
                          <b> PAN Aadhar seeding status</b>
                        </p>
                        {/* <p className="d-flex justify-content">
                            <span style={{ fontWeight: "bold" }}>PAN Aadhar seeding status</span>{" "}
                            <span style={{ textDecoration: "underline" }} className="px-16">
                              View Details
                            </span>
                          </p> */}
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Contact details - Mobile </p>
                      <p className="column-2">
                        <b> Contact details - Mobile</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Contact details - Email </p>
                      <p className="column-2">
                        <b>Contact details - Email</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Update bank account </p>
                      <p className="column-2">
                        <b>Update bank account</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Update Auto pay </p>
                      <p className="column-2">
                        <b>Update Auto pay</b>
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="other-border title-border">Other Details</p>
                </div>

                <div className="flex-container">
                  <ul className="sidebar">
                    <li className="gridd">
                      <p className="column-1">Registered on Portal </p>
                      <p className="column-2">
                        <b>Registered on Portal</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">
                        Registered on mobile app
                      </p>
                      <p className="column-2">
                        <b>Registered on mobile app</b>
                      </p>
                    </li>
                    <li className="gridd">
                      <p className="column-1">Last login date & time (P/M)</p>
                      <p className="column-2">
                        <b>Last login date & time (P/M)</b>
                      </p>
                    </li>
                  </ul>
                </div>
              </>}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content>
              <div className="row">
                <div className="col-sm-12">
                  <TypesComponent setHideLeftPanel={setHideLeftPanel}></TypesComponent>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>

    </>
  );
};

export default CollapsibleSidebar;
