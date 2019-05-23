import React, { Component } from 'react';
import { FormErrors } from '../FormErrors';
/* Import Components */
import Input from './formFields/input';
import Button from './formFields/Button';
//Form for updating jobs
class UpdateJob extends Component {
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

handleFormSubmit = (event) => {
    event.preventDefault()
    

  
    const { position,contact, city, Experience } = this.state

    if (localStorage.getItem('Currentuser')) {
      var company_name = localStorage.getItem('Currentuser')
      company_name = company_name.replace(/"/g, '')
    }
    if (localStorage.getItem('job_id')) {
      var id = localStorage.getItem('job_id')
      id = id.replace(/"/g, '')
    }

    this.props.updateJobs({ id, position,contact, city, Experience }, company_name)
    this.props.history.push('/') 
  }
    componentWillMount () {
        let job_object = JSON.parse(this.props.match.params.job)
        console.log(job_object)
        this.setState({
            position: job_object.position,
            contact: job_object.contact,
            Experience: job_object.Experience,
            city:job_object.city
        })
      }
      render() {
        return (

            <div>
                <form className='form-group' onSubmit={this.handleFormSubmit}>
                        <div className="default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className="companyformComponents">

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
                                value={this.state.Experience}
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
                                title={'Submit'}
                                action={this.handleFormSubmit}
                                type={'submit'}
                            /> 
                        </div>
            </form>
            </div>
        )
    }
    

}
export default UpdateJob