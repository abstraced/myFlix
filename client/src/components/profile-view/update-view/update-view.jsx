import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';


//date picker
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";






import Button from 'react-bootstrap/Button';
import axios from 'axios';




var API_URL =  'http://myflixdb.herokuapp.com/';





export function UpdateView(userId) {

    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthdate, setBirthdate ] = useState('');

       
    let accessToken = localStorage.getItem('token');
   


    


//// This one IS THEfunctioning one  > MONGODB UPDATED, no function fired on render need to update redux now
    const handleSubmitUsername = (e) => {
   
            e.preventDefault();
        axios({
            method: 'put',
            url: `${API_URL}user/username/${userId.userId}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Username: username,
            }
        })
           
                 .catch(e => {
            console.log('no such user')
          });


    };

    const handleSubmitPassword = () => {
        
    
        axios({
            method: 'put',
            url: `${API_URL}user/password/${userId.userId}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Password: password,
            }
        })
        
           
                 .catch(e => {
                    console.log('no such user')
                  });
        

    };

    const handleSubmitEmail = () => {
      
         axios({
             method: 'put',
             url: `${API_URL}user/email/${userId.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             data: {
                 Email: email,
             }
         })
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };

     const handleSubmitBirthdate = () => {
      
         axios({
             method: 'put',
             url: `${API_URL}user/birthdate/${userId.userId}`,
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
             url: `${API_URL}user/${userId.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             
         })
         .then (( )=> {
            this.props.onDisconnect();

            
         })
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };

    

   

    return (
<div className="update-user-info">
    <h1>  Update user informations</h1>  


        <Form>
            <Form.Group controlId="formBasicUsername">
           
                <Form.Control type="text" value={username} placeholder="Enter new username" onChange={e => setUsername(e.target.value)} />
            
            <Button variant="primary" type="submit" onClick={(e)=> {handleSubmitUsername(e)}} >

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
            <DatePicker placeholder="Enter new birthdate"
        selected={birthdate}
        onChange={e => setBirthdate(e)}
      />
                {/* <Form.Control type="text" className='input-group date' 
                value={birthdate} placeholder="Enter new birthdate"  
                onChange={e => setBirthdate(e.target.value)} />  */}
                <Button variant="primary" type="submit" onClick={handleSubmitBirthdate}> Change birthdate</Button>
            </Form.Group>
            




               
                <Form.Label> <h1>Unsuscribe</h1> </Form.Label>
                {/* <Link to={`.. /`}> */}
                <Button variant="primary" type="submit"  href="/" onClick={deleteAccount} > Delete your account</Button>
                {/* </Link> */}
           
            {/* onClick={deleteAccount} */}




        </Form>


       
        </div>

    )


}





