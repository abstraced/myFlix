import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

export function InfoView (user)  {

 


return (

<div>  
<Card >
        <Card.Body> 
       <Card.Title>User informations </Card.Title>


  <Card.Text>Username:    {user.user.Username}</Card.Text>
  <Card.Text>Email:    {user.user.Email}</Card.Text>
  <Card.Text>Birthday:    {user.user.Birthdate}</Card.Text>
       
  </Card.Body>  
   </Card>





</div>

)


}