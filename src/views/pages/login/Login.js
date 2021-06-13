import React ,{ useState } from 'react'
import axios from 'axios';
import base_url from './Env'
import { Link , useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Login = () => {
  let history = useHistory();
  const [username, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [alert, SetAlert] = useState(false);
  const [message, SetMessage] = useState("");

 const  handleChange = e => {
  const { name, value } = e.target;
    if (name === 'username'){
      SetName(value);
    }
    if (name === 'password'){
      SetPassword(value);
    }
  };



const handleClick = () => {
//debugger

  if ( username ==="" || password=== "")
   {
    SetAlert(true);
    SetMessage('ERROR: The username or password field is empty.');
    setTimeout(function(){ SetAlert(false); }, 3000);
    return;
   }

   const url = base_url+'api/token/'; 
    
   const data = { 
       username : username  ,
       password : password  };

   const config = {
        headers: {
          'Content-Type': 'application/json'
           }
      }
   axios.post(url, data, config)
        .then((result) => {
                  if (result.status===200) 
                  {
                   // console.log('stataus' + result.data.access)
                    document.cookie = 'access' + "=" + result.data.access + ";" + ";path=/";
                    history.push("/dashboard");
                  }
                  else 
                  {      
                    SetAlert(true);
                    SetMessage('ERROR: '+ result.status + ' '+ result.text);
                    setTimeout(function(){ SetAlert(false); }, 3000);
                  }  
                  })
                .catch((e) => {
                  console.log('e' + e)
                if (e==='Error: Request failed with status code 401') 
                {
                  SetAlert(true);
                  SetMessage('No active account found with the given credentials');
                  setTimeout(function(){ SetAlert(false); }, 3000);
                }
                else 
                {      
                  SetAlert(true);
                  SetMessage('edwe'+ e);
                  setTimeout(function(){ SetAlert(false); }, 3000);
                }  
         }) 

  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                {alert ? (
                    <CAlert color="info" >{message}</CAlert> 
                    ) : (
                    null
                    )}    
                  <CForm>
                                  
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" value = {username}  onChange={handleChange} name ="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" value = {password}  onChange={handleChange} name ="password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={handleClick} >Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      {/* <CButton color="link" className="px-0">Forgot password?</CButton>*/}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h3><br/>Welcome to Fusion <br/>Mass upload Application</h3>
                    {/*   <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
