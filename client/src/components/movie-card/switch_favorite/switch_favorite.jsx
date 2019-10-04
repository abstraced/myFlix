import React, { useState } from 'react';
import PropTypes from 'prop-types';





export function SwitchFavorite (props) {


    const [movie, setMovie] = useState([]);
    const [state, setState] = useState([]);



    // useEffect(() => {
    //     // Update the document title using the browser API
    //     // document.title = `You clicked ${count} times`;
    //   });




    // const handleAddtoFavorite = (e) => {
    //     e.preventDefault();
         
    //      axios({
    //          method: 'put',
    //          url: `http://localhost:3000/user/username/${user._id}`,
    //          headers: { Authorization: `Bearer ${accessToken}` },
    //          data: {
    //              Username: username,
    //          }
    //      })
    //               .catch(e => {
    //          console.log('no such user')
    //        });




    // }

  const test = "checked";


    const handleAddtoFavorite = (e) => {
        e.preventDefault();
         
         axios({
             method: 'put',
             url: `http://localhost:3000/user/username/${user._id}`,
             headers: { Authorization: `Bearer ${accessToken}` },
             data: {
                 Username: username,
             }
         })
                  .catch(e => {
             console.log('no such user')
           });




    }






    return (

        <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id={`customSwitch${props.favMovie}`}   ></input>   
        
                     <label className="custom-control-label"  for={`customSwitch${props.favMovie}`} >Add  {props.favMovie} as favorite </label>
                 
              
                     </div>

    )







}