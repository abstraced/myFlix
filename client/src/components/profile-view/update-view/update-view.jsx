import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { NavLink } from 'react-router-dom';

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


     const deleteAccountfromMongo = () => {
        // e.preventDefault();
         axios({
             method: 'delete',
             url: `${API_URL}user/${props.userId}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             
         })
         .then (()=> {
            props.onDisconnect();

            
         })
                  .catch(e => {
                     console.log('no such user')
                   });
         
 
     };

        
     const onDeleteAccount = () => {
        deleteAccountfromMongo();
     props.onDisconnect();


     } 
    

   

    return (
<div className="update-user-info">
    <h3>  Update user informations</h3>  


        <Container>
            <Row>
            <Col>
            <Form.Control type="text" value={username} placeholder="Enter new username" onChange={e => setUsername(e.target.value)} />
            </Col>
            <Col>
            <Button variant="primary" type="submit" onClick={(e)=> {handleSubmitUsername(e)}}  block> 
            Change username
            </Button>
 
 </Col> </Row>
 <Row>
            <Col>
            <Form.Control type="password"   placeholder="Enter new password"  value={password}   onChange={e => setPassword(e.target.value)}  />
            </Col>
            <Col>
            <Button variant="primary" type="submit" onClick={(e)=> handleSubmitPassword(e)} block> Change password
            </Button>
 
 </Col> </Row>
 <Row>
            <Col>
            <Form.Control type="text" placeholder="Enter new email"  value={email} onChange={e => setEmail(e.target.value)} />
            </Col>
            <Col>
            <Button variant="primary" type="submit" onClick={(e)=> handleSubmitEmail(e)} block> Change Email
            </Button>
 
 </Col> </Row>

 <Row>
            <Col>
            <Form.Control type="date" placeholder="Enter birthdate"  value={birthdate} onChange={e => setBirthdate(e.target.value)} />
            </Col>
            <Col>
            <Button variant="primary" type="submit" onClick={(e)=> handleSubmitBirthdate(e)} block> Change birthdate
            </Button>
 
 </Col> </Row>
    <Row></Row>
    <Row>

    
                
       <Col>  <NavLink to="/">   <Button variant="primary" type="submit"   onClick={() => onDeleteAccount ()} block > Delete your account </Button> </NavLink>  </Col> 
                  
    </Row>
               
               
           
            



        </Container>


       
        </div>

    )


}



export default connect(mapStateToProps,{setUserInfos})(UpdateView);



