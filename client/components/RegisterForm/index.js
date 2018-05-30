// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import Input from '../common/Input';
import Select from '../common/Select';
import Radio from '../common/Radio';

import countries from '../../const/countries';

class RegisterForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <fieldset>
          <Field component={Input} required name="username" label="User Name" placeholder="Enter username..." type="text" />
          <Field component={Input} required name="password" label="Password" placeholder="Enter password..." type="password" />
          <Field component={Input} required name="repassword" label="Repeat Password" placeholder="Enter password again..." type="password" />
          <hr />
          <div className="row">
            <div className="col-md-6">
              <Field component={Input} required name="fname" label="First Name" placeholder="Enter first name..." type="text" />
            </div>
            <div className="col-md-6">
              <Field component={Input} required name="lname" label="Last Name" placeholder="Enter last name..." type="text" />
            </div>
          </div>
          <Field component={Input} required name="email" label="Email" placeholder="Enter email..." type="email" />
          <Field name="country" required component={Select} label="Country"
            defaultValue="select">
            <option disabled value="select">Select Country</option>
            {countries.map(({ name, code }) => <option value={code} key={code}>{name}</option>)}
          </Field>
          <Field component={Radio} required name="gender" label="Gender" options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]} />
        </fieldset>

        <button className="btn btn-primary mt-3">Register</button>
        <Link to="/login" className="btn btn-link mt-3">Login</Link>
      </form>
    );
  }

  submitForm(value) {
    console.log(value)
  }
}

const validate = ({ username, password, repassword, fname, lname, email, country, gender }) => {
  const error = {};

  if (!username) {
    error.username = 'User name is required!';
  }
  if (!password) {
    error.password = 'Password is required!';
  } else if(password.length < 6) {
    error.password = 'Password must be atleast 6 character long!';
  }

  if (password !== repassword) {
    error.repassword = 'Passwrod does not match!';
  }

  if (!email) {
    error.email = 'Email is required!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error.email = 'Please enter valid email!';
  }

  if (!fname) {
    error.fname = 'First name required!';
  }

  if (!lname) {
    error.lname = 'Last name required!';
  }

  if (!country) {
    error.country = 'Please select a country!';
  }

  if (!gender) {
    error.gender = 'Please select  gender!';
  }

  return error;
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(
  reduxForm({
    form: 'RegisterForm',
    validate,
  })(RegisterForm)
);
