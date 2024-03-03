import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { profileObj } from '../reducers/ProfileReducer';
import { useAuth } from '../utils/auth';
import { useData } from '../reducers/DataContext';
import { loginRequest } from '../authConfig';
import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBOEScreen, setIsBOEScreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { setSharedData } = useData();
  const redirectPath = location.state?.path || '/';


  //#region AD Authntication Start
  const { instance } = useMsal();


  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest)
      .catch((error) => console.log(error));
  };
  const handleLogoutRedirect = () => {
    instance.logoutRedirect()
      .then(res => {
        console.log(res);
      })
      .catch((error) => console.log(error))
      .finally(res => {
        console.log(res)

      })
  };

  //#endregion

  useEffect(() => {
    // If the user is logged in, navigate to the advancesearch page
    if (loggedIn && !isBOEScreen) {
      navigate('/advancesearch', { replace: true });
    }
    else if (loggedIn && isBOEScreen) {
      navigate('/dashboard', { replace: true, state: props?.userProfileInfo?.profileObj });
    }
    let callbackId = null;
    if(!callbackId) {
      callbackId = instance.addEventCallback((event) => {
        if (
          (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
          event.payload.account
        ) {
          console.log("Inside Effect Add Link", event);
          let account = event.payload;
          if (account) {
            console.log(account.idTokenClaims.roles, account.account.username);
            let user = {
              //username: account.username,
              //password: "1234",
              adAuth : true,
              name: account.account.name,
              //role: account.role
            }
            handleSignIn(user);
          }
        }
      });
    }

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [loggedIn, navigate, instance]);

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  const handleSignIn = ({adAuth = false, name = "", }) => {
    const usersList = [
      { username: "boeadmin", password: "1234", role: "boeadmin",DisplayName: "BOE Admin",DisplayRole: "BOE User"},
      { username: "boeadmin1", password: "1234", role: "boeadmin",DisplayName: "BOE Admin1",DisplayRole: "BOE User"},
      { username: "boeadmin2", password: "1234", role: "boeadmin",DisplayName: "BOE Admin2",DisplayRole: "BOE User"},
      { username: "callcenter", password: "1234", role: "boeadmin",DisplayName: "Call Center",DisplayRole: "Call Center"},
      { username: "posexecutive", password: "1234", role: "posexecutive",DisplayName: "POS Executive",DisplayRole: ""},
      { username: "posexecutive1", password: "1234", role: "posexecutive",DisplayName: "POS Executive1",DisplayRole: ""},
      { username: "posexecutive2", password: "1234", role: "posexecutive",DisplayName: "POS Executive2",DisplayRole: ""},
      { username: "posexecutive3", password: "1234", role: "posexecutive",DisplayName: "POS Executive3",DisplayRole: ""},
      { username: "pauser", password: "1234", role: "pauser",DisplayName: "PA User",DisplayRole: ""},
      { username: "nbuser", password: "1234", role: "nbuser",DisplayName: "NB User",DisplayRole: ""},
      { username: "nbuser1", password: "1234", role: "nbuser",DisplayName: "NB User1",DisplayRole: ""},
      { username: "complaintsteam", password: "1234", role: "complaintsteam",DisplayName: "Complaints Team",DisplayRole: ""},
      { username: "complaints", password: "1234", role: "complaints",DisplayName: "Complaints",DisplayRole: ""},
      { username: "posadmin", password: "1234", role: "posadmin",DisplayName: "POS Admin",DisplayRole: ""},
      { username: "posmanager", password: "1234", role: "posmanager",DisplayName: "POS Manager",DisplayRole: ""},
      { username: "posapprover", password: "1234", role: "posapprover",DisplayName: "POS Approver",DisplayRole: ""},
      { username: "finance", password: "1234", role: "finance",DisplayName: "Finance",DisplayRole: ""},
    ]

    let userName = username?.toLocaleLowerCase()?.trim();
    let passWord = password?.toLocaleLowerCase()?.trim();

    const loggedUser = usersList.find(x => x.username == userName && x.password == passWord);

    let user = {
      userName: username,
      password: passWord,
      boe: false,
      pos: false,
      role: loggedUser?.role,
      name: loggedUser?.DisplayName
    }

    if (adAuth == true) {
      // Authentication with AD
      auth?.login("boeadmin");
      setLoggedIn(true);
      setIsBOEScreen(false);
      setSharedData(null);

      user.boe = true;
      user.role = "boeadmin";
      user.roleName = "BOE User";
      user.name = name;

      navigate('/advancesearch', { replace: true });

    } else if(loggedUser?.role == "boeadmin") {
      auth?.login(username);
      localStorage.setItem('isLoggedIn', 'true');
      setLoggedIn(true);
      setIsBOEScreen(false);
      setSharedData(null);
      user.boe = true;
      navigate('/boedashboard', { replace: true });

    } else if(loggedUser?.role == "posexecutive") {
      auth?.login(username);
      navigate("/dashboard");

      user.pos = true;

    } else if(loggedUser?.role == "nbuser") {
      auth?.login(username);
      navigate('/nbuserdashboard', { replace: true });
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      user.pos = true;

    } else if(loggedUser?.role == "pauser") {
      auth?.login(username);
      navigate('/pauserdashboard', { replace: true });
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      user.pos = true;

    } else if(loggedUser?.role == "complaintsteam") {
      auth?.login(username);
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      navigate("/complaintsteam");
      user.pos = true;

    } else if(loggedUser?.role == "posadmin") {
      auth?.login(username);
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      navigate("/posadmindashboard");
      user.pos = true;

    } else if(loggedUser?.role == "complaints") {
      auth?.login(username);
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      navigate("/complaints");
      user.pos = true;

    } else if(loggedUser?.role == "posmanager") {
      auth?.login(username);
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      navigate("/dashboard");
      user.pos = true;
      
    } else if(loggedUser?.role == "posapprover") {
      auth?.login(username);
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      navigate('/posapprove', { replace: true });
      user.pos = true;
      
    } else if(loggedUser?.role == "finance") {
      auth?.login(username);
      setLoggedIn(true);
      setIsBOEScreen(true);
      setSharedData(null);
      navigate("/financedashboard");
      user.pos = true;

    } else {
      message.destroy();
      message.error({
        content: "Your email or password is incorrect",
        className: "custom-msg",
        duration: 2,
      });
    }
    props?.updateProfile(user);
  }
  const handleForgotPassword = () => {

  }
  return (
    <>
      {!loggedIn && <>



        <div className='login-div'>
          <div>
            <h4 className='login-heading fs-25'>Space For <span className='fw-600'>System Name</span></h4>
            <Card className='login' style={{ width: 340 }}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <div className="login-account">
                  <Form.Item
                    name="username"
                    className='mb-36'
                    rules={[{ required: true, message: "Please enter your Email / Mobile No" }]}
                  >
                    <Input
                      placeholder="Email/Mobile No"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    className=''
                    rules={[{ required: true, message: "Please enter your Password" }]}
                  >
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item className='m-0'>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={() => handleSignIn({adAuth : false})}
                    >
                      SignIn
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={() => handleLoginRedirect()}
                    >
                      SignIn With AD
                    </Button>
                    <a
                      style={{ float: "center" }}
                      className="login-form-forgot"
                      href="/"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </a>
                  </Form.Item>
                </div>
              </Form>
            </Card>
          </div>

        </div>







        {/* <div className='login-page'>
   <div className="split left">
   <div ></div>
  
</div>

<div className="split right">


</div>
    </div> */}

      </>}
      {/* {isValidLogin&&<><Routing></Routing></>} */}
    </>
  )
}

const mapStateToProps = ({ userProfileInfo }) => {
  return { userProfileInfo }
}
const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (info) => { dispatch(profileObj(info)) },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)((Login));