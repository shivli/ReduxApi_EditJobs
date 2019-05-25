import React, { Component } from 'react';
import { FormErrors } from '../FormErrors'
/* Import Components */
import Input from './formFields/input';
import Button from './formFields/Button';
import SKILLSET from './skillsset';
import { WithContext as ReactTags } from 'react-tag-input'
const KeyCodes = {
    comma: 188,
    enter: 13
}

const suggestions = SKILLSET.map(skills => {
    return {
        id: skills,
        text: skills
    }
})
const delimiters = [KeyCodes.comma, KeyCodes.enter]
//Form for SIGNUP
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            suggestions: suggestions,
            SignUp: false,
            SignIn: true,
            formErrors: { name: '', email: '', password: '', phone: '' },
            name: '',
            email: '',
            password: '',
            phone: '',
            nameValid: false,
            emailValid: false,
            passwordValid: false,
            phoneValid: false,
            formValid: false

        };
        this.handleInput = this.handleInput.bind(this);
    }
    handleDelete = (i) => {
        const { tags } = this.state
        this.setState({
            tags: tags.filter((tag, index) => index !== i)
        })
    }

    handleAddition = (tag) => {
        this.setState(state => ({ tags: [...state.tags, tag] })
        )
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.tags]
        const newTags = tags.slice()
        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)
        this.setState({ tags: newTags })
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
            passwordValid: passwordValid,
            nameValid: nameValid,
            phoneValid: phoneValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid && this.state.phoneValid });

    }

    SignUp = () => {
        this.setState({
            SignUp: false,
            SignIn: true,
            email: '',
            password: '',
            name: '',
            phone: '',
            formErrors: { name: '', email: '', password: '', phone: '' }



        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const { name, password, email, phone, tags } = this.state;
        console.log(this.state);
        const role = "user"
        this.props.getsignup({ name, password, email, phone, role, tags })
        this.setState({
            name: '',
            password: '',
            email: '',
            phone: '',
            tags: []


        })
        return this.props.history.push('/signIn');
        //    const role="user"
        //    axios.post('http://localhost:8082/jobapp',{name,password,email,phone,role})
        //    .then((response) => {
        //        console.log(localStorage.setItem('data',JSON.stringify(response.data)))
        //     this.props.history.push('/signIn')
        //     console.log('Successfully added user');
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

    }

    render() {
        const { tags, suggestions } = this.state
        return (

            <div>

                {
                    <form className="SignUpForm" onSubmit={this.handleFormSubmit}>
                        <div className="default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className="signUpformComponents">
                            <Input inputType={'text'}
                                title={' name'}
                                name={"name"}
                                value={this.state.name}
                                placeholder={'Enter your name'}
                                handleChange={this.handleInput}

                            />{/* name of the user */}

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

                            <Input inputType={'text'}
                                title={'phone'}
                                name={"phone"}
                                value={this.state.phone}
                                placeholder={'Enter your phone'}
                                handleChange={this.handleInput}

                            />{/* name of the user */}

                            <ReactTags
                                tags={tags}
                                suggestions={suggestions}
                                delimiters={delimiters}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
                            />


                            {/* <Button
                                action={this.handleFormSubmit}
                                type={'primary'}
                                title={'Submit'}
                            /> */}
                             { /*Submit */}

                            {this.state.tags[3] && <Button
                                action={this.handleFormSubmit}
                                type={'submit'}
                                title={'Submit'}
                                // disabled={!this.state.formValidsignup}
                            />}
                        </div>
                    </form>

                }
            </div>
        )
    }
}

export default SignUp;
