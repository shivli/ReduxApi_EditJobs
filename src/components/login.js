import React, { Component } from 'react';
import { FormErrors } from '../FormErrors'
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { PropTypes } from 'react'
// import { Redirect } from 'react-router-dom';


/* Import Components */
import Input from './formFields/input';
import Button from './formFields/Button';

//Form for login
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {

      formErrors: { name: '', email: '', password: '', phone: '' },
      email: '',
      password: '',
      nameValid: false,
      emailValid: false,
      formValid: false

    };
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    localStorage.getItem('isLoggedIn') === "true" && this.props.history.push('/')
  }

  handleInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nameValid = this.state.passwordValid;
    let phoneValid = this.state.phoneValid

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8 && value.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8}$/);

        fieldValidationErrors.password = passwordValid ? '' : 'is Weak';
        break;
      case 'name':
        nameValid = value.match(/^[a-zA-Z]+$/);;
        fieldValidationErrors.name = nameValid ? '' : ' is too short';
        break;
      case 'phone':
        phoneValid = value.length === 10 && value.match(/^[0-9]+$/);;
        fieldValidationErrors.phone = phoneValid ? '' : ' Enter a Valid Phone no.';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }
  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });

  }

  SignIn = () => {
    this.setState({
      SignUp: false,
      SignIn: true,
      email: '',
      password: '',
      name: '',
      phone: '',
      formErrors: { email: '', password: '' }



    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.currentUser }, () => {
      localStorage.setItem('isLoggedIn', "true")
      localStorage.setItem("Currentuser", JSON.stringify(nextProps.currentUser.name));
      localStorage.setItem("user_type", JSON.stringify(nextProps.currentUser.role));
      localStorage.setItem('Currentid', JSON.stringify(nextProps.currentUser._id));

      return this.props.history.push('/')

    })
    console.log(nextProps)

  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.getlogin({
      email: this.state.email,
      password: this.state.password
    });

    // event.preventDefault();
    // const{email,password}=this.state;

    // axios.post(`http://localhost:8082/retriveuser`,{email,password})
    // .then( (response)=> {
    //   console.log(response)
    // console.log('Successfully Logged In');
    // console.log(response.data)
    // localStorage.setItem('Currentuser',response.data.name)
    // if (response.data["role"] === 1) {
    //   localStorage.setItem("user_type", "admin")
    // }
    // else if (response.data["role"] === 2) {
    //   localStorage.setItem("user_type", "user")
    // }
    // else {
    //   localStorage.setItem("user_type", "company")
    // }

    // localStorage.setItem('isLoggedIn',"true")
    // this.props.history.push('/')


    // })
    // .catch(function (error) {
    // console.log(error);
    // });

  }
  
  render() {
    return (

      <div>

        {
          <form className="SigninForm" onSubmit={this.handleFormSubmit}>
            <div className="default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className="signinformComponents">

              <Input inputType={'text'}
                title={' email'}
                name={"email"}
                value={this.state.email}
                placeholder={'Enter your email'}
                handleChange={this.handleInput}

              /> {/* email of the user */}

              <Input inputType={'password'}
                title={' password'}
                name={"password"}
                value={this.state.password}
                placeholder={'Enter your password'}
                handleChange={this.handleInput}
              />{/* Password of the user */}

              <Button
                action={this.handleFormSubmit}
                type={'primary'}
                title={'Submit'}
              /> { /*Submit */}
            </div>


          </form>

        }
      </div>
    )
  }
}


export default SignIn;
