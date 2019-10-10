import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalTitle from 'react-bootstrap/ModalTitle'

import Button from 'react-bootstrap/Button';
import axios from 'axios';




export function UpdateView(userId) {

    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthdate, setBirthdate ] = useState('');

    const [modalMessage,setModalMessage] = useState('');
    const [show, setShow] = useState(true);

   
    


    
    let accessToken = localStorage.getItem('token');
   


    



    const handleSubmitUsername = () => {
      //e.preventDefault();
        
        axios({
            method: 'put',
            url: `http://localhost:3000/user/username/${userId.userId}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Username: username,
            }
        })
           
                 .catch(e => {
            console.log('no such user')
          });


    };

    const handleSubmitPassword = (e) => {
        
    //    e.preventDefault();
        axios({
            method: 'put',
            url: `http://localhost:3000/user/password/${userId.userId}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Password: password,
            }
        })
        
           
                 .catch(e => {
                    console.log('no such user')
                  });
        

    };

    const handleSubmitEmail = (e) => {
        // e.preventDefault();
         axios({
             method: 'put',
             url: `http://localhost:3000/user/email/${userId.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             data: {
                 Email: email,
             }
         })
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };

     const handleSubmitBirthdate = (e) => {
        // e.preventDefault();
         axios({
             method: 'put',
             url: `http://localhost:3000/user/birthdate/${userId.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             data: {
                 Birthdate: birthdate,
             }
         })
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };


     const deleteAccount = (e) => {
        // e.preventDefault();
         axios({
             method: 'delete',
             url: `http://localhost:3000/user/${userId.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             
         })
         .then (( )=> {
            onDisconnect();

            
         })
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };

    const onUnregister =() => {
    deleteAccount();
    onDisconnect();



    }

    // let test = (e) => {
    //     // e.preventDefault();
    // //  console.log(userId);
    // //  console.log("test");
    //  userId.onDisconnect();
    


    // }

    let handleDisconnect = (e) => {
        e.preventDefault();
        // userId.onDisconnect();
        console.log(userId.onDisconnect);
    
    
      }



    return (
<div className="update-user-info">
    <h1>  Update user informations</h1>  


        <Form>
            <Form.Group controlId="formBasicUsername">
           
                <Form.Control type="text" value={username} placeholder="Enter new username" onChange={e => setUsername(e.target.value)} />
            
            <Button variant="primary" type="submit" onClick={handleSubmitUsername()} >

                Change username
</Button>
</Form.Group>
            <Form.Group controlId="formBasicPassword">
               
                <Form.Control type="text"   placeholder="Enter new password"  value={password}   onChange={e => setPassword(e.target.value)} />
                <Button variant="primary" type="submit" onClick={handleSubmitPassword()}> Change password</Button>
            </Form.Group>


            <Form.Group controlId="formBasicEmail">
               
                <Form.Control type="text" placeholder="Enter new email"  value={email} onChange={e => setEmail(e.target.value)} />
                <Button variant="primary" type="submit" onClick={handleSubmitEmail()}> Change Email</Button>
            </Form.Group>



            <Form.Group controlId="formBasicBirthdate">
               
                <Form.Control type="text" className='input-group date' value={birthdate} placeholder="Enter new birthdate"  onChange={e => setBirthdate(e.target.value)} /> 
                <Button variant="primary" type="submit" onClick={handleSubmitBirthdate()}> Change birthdate</Button>
            </Form.Group>
            <Form.Group controlId="formBasicBirthdate">
                <Form.Label> <h1>Unsuscribe</h1> </Form.Label>
                {/* <Link to={`.. /`}> */}
                <Button variant="primary" type="submit"  onClick={handleDisconnect} > Delete your account</Button>
                {/* </Link> */}
            </Form.Group>

            {/* onClick={deleteAccount} */}




        </Form>


       
        </div>

    )


}





