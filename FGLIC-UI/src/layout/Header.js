import React, { useState,startTransition, useEffect   } from "react";
import logo from "../assets/images/logo-small.svg";
import user from "../assets/images/user.png";
import { connect, useSelector } from "react-redux";
import { useData } from '../reducers/DataContext';
import { profileObj } from '../reducers/ProfileReducer';
import { useDispatch } from 'react-redux';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tooltip,
} from "antd";
import NotificationIcon from "../assets/images/notification_symbol.png";
import DashboardIcon from "../assets/images/dashboard.png";
import CloseIcon from "../assets/images/close_1.png";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";

const Header = ({ policyDetails, userProfileInfo }) => {
  const dispatch = useDispatch();

  const app_name = useSelector(state => state);
  const { setSharedData } = useData();
  const { Search } = Input;
  const [advanceSearchModal, setAdvanceSearchModal] = useState(false);
  const currentPathname = window.location.hash;
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState(null);
  // For Switch Role
  const users = [
    {
      FullName: "BOE User",
      name: "boeadmin",
      roleId: 4
    },
    {
      FullName: "POS Executive",
      name: "posexecutive",
      roleId: 3
    },
    {
      FullName: "NB Role",
      name: "nbuser",
      roleId: 1
    },
    {
      FullName: "POS Approver",
      name: "posApprover",
      roleId: 2
    },
    {
      FullName: "PA User",
      name: "pauser",
      roleId: 5
    }
  ]
  const [switchRoleModal, setSwitchRoleModal] = useState(false);
  const [handlesRole, setHandlesRole] = useState("");
  const [filterUser, setFilterUsers] = useState(users);

  const navigate = useNavigate();

  //#region AD Authntication Start
  const { instance } = useMsal();

    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }
    useEffect(() => {
      const callbackId = instance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGOUT_SUCCESS) {
          console.log("Inside Effect Add Link", event);
          console.log(activeAccount)
          let account = event.payload;
          handleLogout();
        }
      });
  
      return () => {
        if (callbackId) {
          instance.removeEventCallback(callbackId);
        }
      };
      // eslint-disable-next-line
    }, [instance]);
  const ADLogoutRedirection = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
    // handleLogout();
};

  //#endregion

  const searchObj ={
    requestheader: {
      "source": "POS",
      "policyNo": "",
      "applicationNo": ""

    },
    requestBody: {
      mobileNo: "",
      emailID: "",
      pan: "",
      customerID: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dob: '',
    }
  }

  const items = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          className="drpdwn-links"
          onClick={() => handleLogout()}
        >
          Logout
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          className="drpdwn-links"
          onClick={() => handleSwitchRole()}
        >
          Switch Role
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          rel="noopener noreferrer"
          className="drpdwn-links"
          onClick={() => ADLogoutRedirection()}
          
        >
          AD Logout
        </a>
      ),
    },
  ];

  const handleLogout = () => {
    startTransition(() => {

      let user = {
        userName: '',
        password: '',
        boe: '',
        pos: '',
        role: '',
        name: ''
      }
      dispatch(profileObj(user))

      // localStorage.removeItem("isLoggedIn");
      navigate("/login");
    })
  };
  const hanldeSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  }
  const inputChange = (e) => {
    setMobileSearchValue(e.target.value)
  }
  const handleSwitchRole = () => {
    setSwitchRoleModal(true);
  }
  const handleCancel = () => {
    setSwitchRoleModal(false)
  }
  const handleOk = () => {
    const selectedRole = users.find(x => x.name == handlesRole)
    const userFullName = userProfileInfo?.profileObj?.name;
    let navigationURL = "";
    const user= {
      userName : handlesRole,
      password: "1234",
      boe: true,
      pos: false,
      role: handlesRole,
      name:userFullName,
      roleName: selectedRole.FullName
    }

    if (handlesRole === "nbuser") {
      navigationURL = '/nbuserdashboard'
    }
    else if (handlesRole === "boeadmin") {
       navigationURL = '/advancesearch'
    }
    else if (handlesRole === "posApprover") {
      user.boe = false;
      user.pos = true;
      navigationURL = '/posapprove'
    }
    else if (handlesRole === "posexecutive") {
      user.boe = false;
      user.pos = true;
      navigationURL = '/dashboard'
    }
    else  if (handlesRole === "pauser") {
      navigationURL = '/pauserdashboard'
    }
    dispatch(profileObj(user))
    navigate(navigationURL)
    setSwitchRoleModal(!switchRoleModal)
  }

  const handleRole = (e) => {
    setHandlesRole(e);
  }

  const onSearchByRole = (e) => {
    const value = e?.trim();
    if (value === "") 
    { 
      setFilterUsers(users);
      return; 
    }
    const filterBySearch = users?.filter(item => item.FullName.toLowerCase().includes(value.toLowerCase()));
    setFilterUsers(filterBySearch);
  }
  const onSearch = (e) => {
    const value = e?.trim();
    const regex = /@/;

    //  if(!isNaN(+value) && value.length !==10){
    //   console.log('It is a number.');

    //   searchObj.requestBody.emailID = value;

    //  }

    if (regex.test(value)) {
      searchObj.requestBody.emailID = value;
    } else if (!isNaN(+value) && value.length === 10) {
      searchObj.requestBody.mobileNo = value;
    } else if (isNaN(+value) && value.length === 10) {
      searchObj.requestBody.pan = value;
    } else if (isNaN(+value) && value.length !== 10) {
      searchObj.requestheader.applicationNo = value;
    } else {
      searchObj.requestheader.policyNo = value;
      searchObj.requestBody.customerID = value;
    }
    //  else {

    //   searchObj.requestBody.firstName = value;
    //   searchObj.requestBody.middleName = value;
    //   searchObj.requestBody.lastName = value;
    //  }
    setSharedData(searchObj);
    setShowMobileSearch(false);
    setMobileSearchValue(null);
  }
  const handleIconAction = () =>{
    navigate('/boedashboard')
  }
  const handleSubmit = (values) => {
    searchObj.requestBody.firstName = values.firstname;
    searchObj.requestBody.middleName = values.middleName;
    searchObj.requestBody.lastName = values.lastname;
    searchObj.requestBody.dob = values.dob
    setSharedData(searchObj);
  }
  return (
    <>

      <nav className="navbar bg">
        <div className="container-fluid header-content">
          <div className="navbar-header d-flex">
            <a className="" href={userProfileInfo?.profileObj?.boe ? "#advancesearch/" : "#dashboard/"}>
              <img className="" src={logo} alt="" />
            </a>
          </div>
          {(currentPathname?.includes("posmanagerdashboard")) && (
            <>
              <div className="search-box d-flex mobile-hide">
                <Search
                  placeholder="Search by Service Request No / Policy No / PO Name / LA Name / Type of client / Failed Reason"
                  allowClear
                  size="large"
                  onSearch={(e) => onSearch(e)}
                  className="header-search"
                />
              </div>

              {!currentPathname?.includes("login") &&
                !currentPathname?.includes("dashboard") && (
                  <>
                    <div className="profile">
                      <div className="user-profile">
                        <p className="user-name">{userProfileInfo?.profileObj?.name} </p>
                        <p className="user-role">{userProfileInfo?.profileObj?.roleName || 'User Role'}</p>
                      </div>
                      <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()} >
                          <img className="user-img" src={user} alt="" />{" "}
                        </a>
                      </Dropdown>
                    </div>
                  </>
                )}
              <div className="header desk-hide">
                {showMobileSearch && <>
                  <div className="site-search">
                    <form className="clearfix" >
                      <input type="text" name="q" placeholder="Search by Policy / App No / Mobile No / Mail / PAN / Customer ID" id="searchInput" onChange={inputChange} className="search" data-gtm-form-interact-field-id="0" />
                      <button type="submit" className="search-btn" onClick={() => onSearch(mobileSearchValue)}><span className="bi bi-search mobilesearch-icon"></span></button>
                    </form>
                  </div>
                </>}
                <button type="button" className="open-search mobile-only" onClick={() => setShowMobileSearch(!showMobileSearch)}>
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </>
          )}
          {(currentPathname?.includes("advancesearch") ||
            currentPathname === "") && (
              <>
                <div className="search-box d-flex mobile-hide">
                  <Search
                    placeholder="Search by Policy / App No / Mobile No / Mail / PAN / Customer ID"
                    allowClear
                    size="large"
                    onSearch={(e) => onSearch(e)}
                    className="header-search"
                  />
                  <div className="advance-search-bt d-flex">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="primary-btn advance-btn"
                      onClick={() => setAdvanceSearchModal(true)}
                    >
                      Advance Search
                    </Button>{" "}
                    <span className="notification-icon">
                      <img src={NotificationIcon} alt="" style={{ padding: "8px", width: "40px" }} />
                    </span>                  
                  </div>                  
                </div>             
                <span  className="notification-icon-container">
                      <img src={DashboardIcon} alt="" style={{ padding: "8px", width: "40px", marginTop: "-10px"}} onClick={() => handleIconAction()}/>
                </span>
                <div className="header desk-hide">
                  {showMobileSearch && <>
                    <div className="site-search">
                      <form className="clearfix" >
                        <input type="text" name="q" onChange={inputChange} placeholder="Search by Policy / App No / Mobile No / Mail / PAN / Customer ID" id="searchInput" className="search" data-gtm-form-interact-field-id="0" />
                        <button type="submit" className="search-btn" onClick={() => onSearch(mobileSearchValue)}><span className="bi bi-search mobilesearch-icon"></span></button>
                      </form>
                    </div>
                  </>}
                  <button type="button" className="open-search mobile-only" onClick={() => hanldeSearch()}>
                    <i class="bi bi-search"></i>
                  </button>
                </div>
                {!currentPathname?.includes("login") &&
                  !currentPathname?.includes("dashboard") && (
                    <>
                      <div className="profile">
                        <div className="user-profile">
                          <p className="user-name">{userProfileInfo?.profileObj?.name}</p>
                          <p className="user-role">{userProfileInfo?.profileObj?.roleName || 'User Role'}</p>
                        </div>
                        <Dropdown menu={{ items }}>
                          <a onClick={(e) => e.preventDefault()} >
                            <img className="user-img" src={user} alt="" />{" "}
                          </a>
                        </Dropdown>
                      </div>
                    </>
                  )}
                {/* <div className = 'search-box mobile-search'>
                  <Search
                    placeholder="Search by Policy / App No / Mobile No / Mail / PAN / Customer ID"
                    allowClear
                    size="large"
                    onSearch={(e)=>onSearch(e)}
                    className="header-search"
                  />
                  <div className="advance-search-bt d-flex">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="primary-btn advance-btn"
                      onClick={() => setAdvanceSearchModal(true)}
                    >
                      Advance Search
                    </Button>{" "}
                    <span className="notification-icon"> 
                      <img src={NotificationIcon} alt="" style={{ padding: "8px",width: "40px" }} />
                    </span>
                      </div>
                  </div>  */}
              </>
            )}
          {!currentPathname?.includes("advancesearch") && currentPathname !== "" && (
            <>
              <div className="profile">
                <div className="user-profile">
                  <p className="user-name">{userProfileInfo?.profileObj?.name}</p>
                  <p className="user-role">{userProfileInfo?.profileObj?.roleName || 'User Role'}</p>
                </div>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()} >
                    <img className="user-img" src={user} alt="" />{" "}
                  </a>
                </Dropdown>
              </div>
            </>
          )}
        </div>
        {/* <div className="mt-24 container-fluid d-block mb-24 desk-none">
            <div className="d-flex gap-12">
              <FloatLabel label={"Policy Number"} value={"XXXXX465"} />
              <FloatLabel label={"Application Number"} value={"XXXXX465"} />
            </div>
            <div className="d-flex gap-12">
              <FloatLabel label={"LA Name"} value={"LA Name"} />
              <FloatLabel label={"PO Name"} value={"PO Name"} />
            </div>
          </div> */}
      </nav>


      <Modal
        title="Advance Search"
        open={advanceSearchModal}
        destroyOnClose={true}
        closeIcon={
          <Tooltip title="Close">
            <span onClick={() => setAdvanceSearchModal(false)}>
              <img src={CloseIcon} alt=""></img>
            </span>
          </Tooltip>
        }
        footer={null}
      >
        <Form onFinish={handleSubmit}
        //name="wrap"
        // labelCol={{
        //   flex: "60%",
        // }}
        // labelAlign="left"
        // labelWrap
        // wrapperCol={{
        //   flex: 1,
        // }}
        // colon={false}
        >
          <Row gutter={[24]} className="reasons-list mt-26">
            <Col className="advSerach">
              <Form.Item
                label={<span>First Name<sup>*</sup></span>}
                name="firstname"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="First Name"
                />
              </Form.Item>

              <Form.Item

                label={<span>Middle Name<sup>*</sup></span>}
                name="middleName"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Last Name"
                />
              </Form.Item>

              <Form.Item

                label={<span>Last Name<sup>*</sup></span>}
                name="lastname"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item

                label={<span>DOB<sup>*</sup></span>}
                name="dob"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    required: true,
                    // whitespace: true,
                    message: "",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={10}
                  placeholder="DOB"
                />
              </Form.Item>

              {/* <Form.Item
                label="Role"
                name="role"
                className="inputs-label fs-16 fw-400"
              >
                <Select
                  style={{ width: 250 }}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Select Role"
                  options={[
                    {
                      label: "PO Name",
                      value: "poname",
                    },
                    {
                      label: "LA Name",
                      value: "laname",
                    },
                    {
                      lebel: "Nominee",
                      value: "Nominee",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Case Type"
                name="casetype"
                className="inputs-label mb-0 fs-16 fw-400"
              >
                <Select
                  style={{ width: 250 }}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Case Type"
                  options={[
                    {
                      label: "PO Name",
                      value: "poname",
                    },
                    {
                      label: "LA Name",
                      value: "laname",
                    },
                    {
                      lebel: "Nominee",
                      value: "Nominee",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Assigned Flag"
                name="assignedflag"
                className="inputs-label mb-0"
              >
                <Select
                  style={{ width: 250 }}
                  className="cust-input"
                  maxLength={100}
                  placeholder="Assigned Flag"
                  options={[
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="MWPA Flag"
                name="mwpaflag"
                className="inputs-label mb-0"
              >
                <Select
                  style={{ width: 250 }}
                  className="cust-input"
                  maxLength={100}
                  placeholder="MWPA Flag"
                  options={[
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Agent Name"
                name="agentname"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    whitespace: true,
                    message: "Is required",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Agent Name"
                />
              </Form.Item>
              <Form.Item
                label="Channel"
                name="channel"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    whitespace: true,
                    message: "Is required",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Channel"
                />
              </Form.Item>
              <Form.Item
                label="Branch"
                name="branch"
                className="inputs-label fs-16 fw-400"
                rules={[
                  {
                    whitespace: true,
                    message: "Is required",
                  },
                ]}
              >
                <Input
                  className="cust-input"
                  maxLength={20}
                  placeholder="Branch"
                />
              </Form.Item> */}
            </Col>
          </Row>

          <div className="text-center modal-validate">
            <Button htmlType="submit"
              type="primary"
              className="primary-btn"
            // onClick={() => {
            //   handleOk();
            // }}
            >
              Search
            </Button>
          </div>
        </Form>


      </Modal>

      {/* Switch Role Pop UP */}
      <Modal title="Switch Role"
        open={switchRoleModal}
        closeIcon={false}
        footer={null}
      >
        <Form
          label="Role Type"
          name="RoleType"
          className="inputs-label mb-16"
        >
          {/* <div className="row"> */}
            <div>
              <Select
                showSearch
                onSearch={onSearchByRole}
                className="cust-input calltype-select "
                placeholder="Select Role Type"
                onChange={handleRole}
                style={{ width: "200px" }}
              >
                {filterUser?.length > 0 && filterUser?.map((ele, index) => {
                  return <option key={index}
                    value={ele.name}
                  >{ele.FullName}</option>
                })}
              </Select>
            </div>
          {/* </div> */}
          {/* <div className="row"> */}
          <div className="contact-details-btn mt-24">
              <Button type="primary" className="primary-btn" onClick={() => handleCancel()}>
                Cancel
              </Button>
            {/* <div className="col-sm-3 ms-5"> */}
              <Button type="primary" className="primary-btn" onClick={() => handleOk()}>
                Ok
              </Button>
              </div>
            {/* </div> */}
          {/* </div> */}
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ state, policyDetails, userProfileInfo }) => {
  return {
    data: state?.PolicyDetailsReducer?.policyDetailsObj, policyDetails,
    userProfileInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (info) => { dispatch(profileObj(info)) },
    dispatch
  }
}

export default connect(mapStateToProps)((Header));
