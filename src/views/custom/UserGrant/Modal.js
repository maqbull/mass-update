import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'

import  base_url from '../../pages/login/Env'
import EnhancedTable from './UserGrant'
 const Modal = () => {
    const [modal, setModal] = useState(false)
    const [listOfUsers , setListOfUsers] = useState([])
    const [show,setShow] = useState(false)
    const [user_id,setUser_id] = useState(null)

    async function fetchData() {
      const URL = base_url + 'api/users/'
      const Bearer = sessionStorage.getItem('token')
      const AuthStr = "Bearer " + Bearer
      try {
        let response = await axios.get(URL, { headers: { Authorization: AuthStr } })
        let card = await response.data
        setListOfUsers(card)
         console.log(card);
  
      }
      catch {
        console.log("error happend");
  
      }
       
    }
  
    useEffect(() => {
      fetchData();
    }, [])

    const handleClick = id => () => {
      setShow(true)
      setUser_id(id)
      setModal(false)
      console.log(user_id); 
    }

return (
  <>
   <CRow>
   <CCol>
   <CCardHeader>
   Select users
   </CCardHeader>
   <CCardBody>
            <CButton 
            color="info"
              onClick={() => setModal(!modal)} 
              className="mr-1"
            >Show Users</CButton>

            <CModal 
            show={modal} 
            onClose = {setModal}>
            <CModalHeader  closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
               {
                 listOfUsers.map( (item) => {
                  const {id , username , first_name , last_name , email} = item
                   return (
                     <button
                     style={{display:"block" , marginBottom:10 , padding:5}}
                     type="submit" 
                     id = {id}
                     onClick = {handleClick(id) } key = {id}>{username}</button>
                   )
                 })
               }
            </CModalBody>
            </CModal>
            </CCardBody>
   </CCol>
   </CRow>
   { show && <EnhancedTable id = {user_id}/>}
   </>
)
}
export default Modal
