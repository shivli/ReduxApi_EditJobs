import React, { Component } from 'react';
import './App.css';
import './components/header.css'
import Body from './containers/jobContainer'
import signIn from './containers/userContainer'
import signUp from './containers/signupContainer'
import CompanyForm from './containers/newjobContainer'
import EditJob from './containers/updateContainer'
import { BrowserRouter, Route } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact component={Body} />
          <Route path="/signIn/" component={signIn} />
          <Route path="/signUp/" component={signUp} />
          <Route path="/CompanyForm" component={CompanyForm}/>
          <Route path='/update/:job' component={EditJob} />
          
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

