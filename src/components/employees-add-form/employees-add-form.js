import {Component} from 'react';

import FormErrors from '../employees-add-form-errors/employees-add-form-errors';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            formErrors: {name: '', salary: ''},
            nameValid: false,
            salaryValid: false,
            formValid: false
        }
    }

    onValueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
                      () => { this.validateField(name, value) });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    validateField(fieldName, value) {
        let fieldValidationsErrors = this.state.formErrors;
        let nameValid = this.state.name;
        let salaryValid = this.state.salary;

        switch(fieldName) {
            case 'name':
                nameValid = value.length >= 3 || value.length === 0;
                fieldValidationsErrors.name = nameValid ? '' : "Ім'я повинно мати від 3 символів";
                break;
            case 'salary':
                salaryValid = value > 0 || value.length === 0;
                fieldValidationsErrors.name = salaryValid ? '' : "Зарплата повинна бути від 1$";
                break;
            
                default: break;
        }

 
        this.setState({formErrors: fieldValidationsErrors,
                        nameValid: nameValid,
                        salaryValid: salaryValid}, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.salaryValid && this.state.nameValid});
    }

    render () {
        const {name, salary} = this.state;

        var nameColorZero = name.length === 0 ? "" : name.length >= 3 ? "" : "red";
        var salaryColorZero = salary.length === 0 ? "" : salary > 0 ? "" : "red";

        return (
            <div className="app-add-form">
                <h3>Додай нового співробітника</h3>
                <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                <form className="add-form d-flex"
                        onSubmit={this.handleSubmit}>

                    <input type="text"
                            className="form-control new-post-label"
                            placeholder="Введіть ім'я співробітника"
                            name="name"
                            value={name}
                            onChange={this.onValueChange}
                            style={{borderColor: nameColorZero}}/>
                    <input type="number"
                            className="form-control new-post-label"
                            placeholder="Зарплата в $"
                            name="salary"
                            value={salary}
                            onChange={this.onValueChange}
                            style={ {borderColor: salaryColorZero}}/>
                    <button type="submit"
                            className="btn btn-outline-light"
                            disabled={!this.state.formValid}
                            onClick={() => {this.props.onAdd(name, salary)}}>Додати</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;