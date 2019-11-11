import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';


//date picker
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

// REDUX
import { connect } from 'react-redux';

import { setUserInfos } from '../../../actions/actions';




import Button from 'react-bootstrap/Button';
import axios from 'axios';




var API_URL =  'http://myflixdb.herokuapp.com/';



const mapStateToProps = state => {

    return { user: state.userInfos,
            movies: state.movies
     };
  };

function UpdateView(props) {

    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthdate, setBirthdate ] = useState('');

       
    let accessToken = localStorage.getItem('token');
   


    
   const updateUserInfos = () => {
       
        axios.get(`${API_URL}user/${props.userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
          .then(response => {
            // Assign the result to the state
            props.setUserInfos(response.data[0]);
          
          
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

//// This one IS THEfunctioning one  > MONGODB UPDATED, no function fired on render need to update redux now
    const handleSubmitUsername = (e) => {
   
            e.preventDefault();
        axios({
            method: 'put',
            url: `${API_URL}user/username/${props.userId}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Username: username,
            }
        })
        .then( ()  =>  {
         updateUserInfos();
    
        }
        )
        .catch(e => {
            console.log('no such user')
          });


    };

    const handleSubmitPassword = (e) => {
        e.preventDefault(); 
    
        axios({
            method: 'put',
            url: `${API_URL}user/password/${props.userId}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Password: password,
            }
        })
        .then( ()  =>  {
            updateUserInfos();
       
           }
           )   
           .catch(e => {
                    console.log('no such user')
                  });
        

    };

    const handleSubmitEmail = (e) => {
        e.preventDefault(); 
         axios({
             method: 'put',
             url: `${API_URL}user/email/${props.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             data: {
                 Email: email,
             }
         })
         .then( ()  =>  {
            updateUserInfos();
       
           }
           )
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };

     const handleSubmitBirthdate = (e) => {
        e.preventDefault(); 
         axios({
             method: 'put',
             url: `${API_URL}user/birthdate/${props.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             data: {
                 Birthdate: birthdate,
             }
         })
         .then( ()  =>  {
            updateUserInfos();
       
           }
           )
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };


     const deleteAccount = (e) => {
        e.preventDefault();
         axios({
             method: 'delete',
             url: `${API_URL}user/${props.userId}`,
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
               
                <Form.Control type="password"   placeholder="Enter new password"  value={password}   onChange={e => setPassword(e.target.value)} />
                <Button variant="primary" type="submit" onClick={(e)=> handleSubmitPassword(e)}> Change password</Button>
            </Form.Group>


            <Form.Group controlId="formBasicEmail">
               
                <Form.Control type="text" placeholder="Enter new email"  value={email} onChange={e => setEmail(e.target.value)} />
                <Button variant="primary" type="submit" onClick={(e)=> handleSubmitEmail(e)}> Change Email</Button>
            </Form.Group>


    


            <Form.Group controlId="formBasicBirthdate" >
            <Form.Control type="date" placeholder="Enter birthdatze"  value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            
                <Button variant="primary" type="submit" onClick={(e)=> handleSubmitBirthdate(e)}> Change birthdate</Button>
            </Form.Group>
            




               
                <Form.Label> <h1>Unsuscribe</h1> </Form.Label>
                {/* <Link to={`.. /`}> */}
                <Button variant="primary" type="submit"  href="/" onClick={(e) => deleteAccount (e)} > Delete your account</Button>
                {/* </Link> */}
           
            {/* onClick={deleteAccount} */}




        </Form>


       
        </div>

    )


}



export default connect(mapStateToProps,{setUserInfos})(UpdateView);



