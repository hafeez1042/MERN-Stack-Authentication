// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import { Input, Select, Radio, Spinner } from '../common';

import { register } from '../../actions/authActions';

import countries from '../../const/countries';

class RegisterForm extends Component {
  render() {
    if (this.props.auth.user && this.props.auth.user.username) {
      console.log(this.props.auth.user.username)
      return <Redirect to="/dashboard" />;
    }

    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit((value) => this.props.register(value))}>
        {this.props.auth.error && this.props.auth.error.message ?
          <div className="alert alert-danger" role="alert">{this.props.auth.error.message}</div>
          : null
        }
        <fieldset disabled={this.props.auth.loading}>
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

        <button className="btn btn-primary mt-3" disabled={submitting}>Register</button>
        <Link to="/login" className="btn btn-link mt-3">Login</Link>
        {this.props.auth && this.props.auth.loading ? <Spinner overly /> : null}
      </form>
    );
  }
}

const validate = ({ username, password, repassword, fname, lname, email, country, gender }) => {
  const error = {};

  if (!username) {
    error.username = 'User name is required!';
  }
  if (!password) {
    error.password = 'Password is required!';
  } else if (password.length < 6) {
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps, { register })(
  reduxForm({
    form: 'RegisterForm',
    validate,
  })(RegisterForm)
);
