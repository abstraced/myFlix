import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


var API_URL =  'http://myflixdb.herokuapp.com/';

export function RegistrationView(props)  {
<<<<<<< HEAD


/// SET state hook

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthdate, setBirthdate ] = useState(new Date());

  //datepicker
  const [ startDate, setStartDate ] = useState(new Date());







  /// function submit

=======
  
>>>>>>> parent of ef63870... update bug
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



  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');

  

  return (

  return (



<<<<<<< HEAD

=======
>>>>>>> parent of ef63870... update bug


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
<<<<<<< HEAD


=======
>>>>>>> parent of ef63870... update bug
       <Form.Label>Birthdate</Form.Label>
        <Form.Control type="date" placeholder="your birthdate..."  value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
        </Form.Group>

<<<<<<< HEAD



    <button type="button" onClick={sendRegistration}>Submit</button>
    </form>

=======
>>>>>>> parent of ef63870... update bug

=======
       <Form.Label>Birthdate</Form.Label>
        <Form.Control type="date" placeholder="your birthdate..."  value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
        </Form.Group>

>>>>>>> parent of ef63870... update bug

<<<<<<< HEAD

=======
>>>>>>> parent of ef63870... update bug
    <button type="button" onClick={sendRegistration}>Submit</button>
    </form>
  );
}



RegistrationView.propTypes ={
onLoggedIn: PropTypes.func.isRequired
}
