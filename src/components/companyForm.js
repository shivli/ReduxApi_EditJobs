import React, { Component } from 'react';
import { FormErrors } from '../FormErrors';
/* Import Components */
import Input from './formFields/input';
import Button from './formFields/Button';
// import axios from 'axios';
// import { connect } from 'react-redux';

//Form for company adding jobs
class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formErrors: {  position: '', contact: '', Experience: '', city: '' },
            // company_Name: '',
            position: '',
            contact: '',
            Experience: '',
            city: '',
            companynameValid: false,
            positionValid: false,
            contactValid: false,
            ExperienceValid: false,
            cityValid: false,
            formValid: false

        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let companynameValid = this.state.companynameValid;
        let positionValid = this.state.positionValid;
        let contactValid = this.state.contactValid;
        let ExperienceValid = this.state.ExperienceValid
        let cityValid = this.state.cityValid

        switch (fieldName) {
            // case 'company_Name':
            //     companynameValid = value.match(/^[a-zA-Z]+$/);;
            //     fieldValidationErrors.company_Name = companynameValid ? '' : ' is invalid';
            //     break;
            case 'position':
                positionValid = value.match(/^[a-zA-Z]+$/);;

                fieldValidationErrors.position = positionValid ? '' : 'is invalid';
                break;
            case 'contact':
                contactValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.contact = contactValid ? '' : ' is too short';
                break;
            case 'city':
                cityValid = value.match(/^[a-zA-Z]+$/);;
                fieldValidationErrors.city = cityValid ? '' : ' is too short';
                break;
            case 'Experience':
                ExperienceValid = value.match(/^[0-9]+( [a-zA-Z]+)*$/);
                fieldValidationErrors.Experience = ExperienceValid ? '' : ' Enter a Valid Phone no.';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            companynameValid: companynameValid,
            positionValid: positionValid,
            contactValid: contactValid,
            cityValid: cityValid,
            ExperienceValid: ExperienceValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.companynameValid && this.state.positionValid && this.state.contactValid && this.state.cityValid && this.state.ExperienceValid });

    }
    handleFormSubmit = () => {
        if (localStorage.getItem('Currentuser')) {
            var company_Name = localStorage.getItem('Currentuser');
            company_Name = company_Name.replace(/"/g, "");
        }

        console.log(123)

        this.props.postJob({
            company_Name: company_Name,
            position: this.state.position,
            contact: this.state.contact,
            Experience: this.state.Experience,
            city: this.state.city

        })
        this.props.history.push('/')
        // this.setState({
        //     company_Name: '',
        //     position: '',
        //     contact: '',
        //     Experience: '',
        //     city: ''


        // })

        // this.props.history.push('/');
        // event.preventDefault();
        // const { company_Name, position, contact, Experience, city } = this.state;
        // axios.post('http://localhost:8082/newjobs', { company_Name, position, contact, Experience, city })
        //     .then((response) => {
        //         //console.log(response)
        //          return this.props.history.push('/')
        //        // console.log('Successfully added job');
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }
    render() {
        return (

            <div>
                        <div className="default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className="companyformComponents">

                            {/* <Input inputType={'text'}
                                title={'company_Name'}
                                name={"company_Name"}
                                value={this.state.company_Name}
                                placeholder={'Company Name'}
                                handleChange={this.handleInput}

                            /> Company name */}

                            <Input inputType={'text'}
                                title={' position'}
                                name={"position"}
                                value={this.state.position}
                                placeholder={'Enter position for company'}
                                handleChange={this.handleInput}
                            />{/* Position for the company */}

                            <Input inputType={'text'}
                                title={'contact'}
                                name={"contact"}
                                value={this.state.contact}
                                placeholder={'Enter email of the company'}
                                handleChange={this.handleInput}
                            />{/* contact for the company */}

                            <Input inputType={'text'}
                                title={'Experience'}
                                name={"Experience"}
                                value={this.state.Experiencet}
                                placeholder={'Enter email of the company'}
                                handleChange={this.handleInput}
                            />{/* Experience for the company */}

                            <Input inputType={'text'}
                                title={'city'}
                                name={"city"}
                                value={this.state.city}
                                placeholder={'city of the company'}
                                handleChange={this.handleInput}
                            />{/* contact for the company */}

                            <Button
                                onClick={() => this.handleFormSubmit()}
                                title={'Submit'}
                                action={this.handleFormSubmit}
                            /> { /*Submit */}
                        </div>

            </div>
        )
    }
}


export default CompanyForm;
