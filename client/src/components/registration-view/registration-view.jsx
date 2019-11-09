import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';




import { NavLink } from 'react-router-dom';



/// date picker
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";



var API_URL =  'https://myflixdb.herokuapp.com/';







export function RegistrationView(props)  {
  

/// SET state hook

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');

  //datepicker
  // const [ startDate, setStartDate ] = useState(new Date());







  /// function submit

const sendRegistration = (e) => {

  axios.post(`${API_URL}users`, {
    Username: username,
    Password: password,
    Email: email,
    Birthdate: birthdate
  })
  .then(response => {
    const data = response.data;
   
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log('error registering the user')
  });
};









  

  return (
   
   <div>


   

    <form className="container">
    <Form.Group controlId="formBasicUsername">

    <Form.Label>Username</Form.Label>
    <Form.Control type="username" placeholder="chose your username..."  value={username} onChange={e => setUsername(e.target.value)}/>
     </Form.Group>
     <Form.Group controlId="formBasicPassword">

     <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="chose a password..."  value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
       <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="your email address..."  value={email} onChange={e => setEmail(e.target.value)}/>
       </Form.Group>

       <Form.Group controlId="formBasicBirthdate">
       <Form.Label>Email
       <DatePicker placeholder="Enter new birthdate"
        selected={birthdate}
        onChange={e => setBirthdate(e)}
      />
      </Form.Label>
        </Form.Group>

        

        <NavLink to="/">
    <button type="button" onClick={sendRegistration}>Submit</button></NavLink>
    </form>

    


    </div>
  );
}



