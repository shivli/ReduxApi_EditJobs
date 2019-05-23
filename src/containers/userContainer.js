// import React, { Component } from 'react'
import  {connect} from  "react-redux";
import SignIn from '../components/login';
import {getlogin} from '../Actions/userAction'
const mapStateToProps=(state)=>{
   return {       
       currentUser:state.user.data
          }
}

const mapDispatchToProps=(dispatch)=>{
    
    return ({
      
        getlogin: (user)=>dispatch(getlogin(user)) 

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

