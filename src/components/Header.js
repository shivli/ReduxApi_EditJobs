import React, {Component} from 'react';
import {Link} from 'react-router-dom'
 
class Header extends Component {
    render(){
        return(
            <div className="header">
            <a href="#default" className="logo">Welcome</a>
            <div className="header-right">
              {/* <a className="active" href="#home">Recent Jobs</a> */}
              <ul style={{listStyleType:'none'}}>
              <li><Link to='/signUp'><span className="glyphicon glyphicon-log-in" ></span> signUp</Link></li>
              <li><Link to='/signIn'><span className="glyphicon glyphicon-user"></span> signIn</Link></li>
              <li><Link to='/CompanyForm'><span className="glyphicon glyphicon-plus"></span> Post Jobs</Link></li>
            
              </ul>
            </div>
            </div>
        )
    }
}
export default Header;