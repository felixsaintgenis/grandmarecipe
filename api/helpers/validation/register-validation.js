import Validator from 'validator';
import isEmpty from './is-empty';

module.exports = function validatorRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';


  if(!Validator.isLength(data.name, { min: 2, max: 30 })){
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if(!Validator.isLength(data.password, { min: 2, max: 100 })){
    errors.password = 'Password must be at least 6 characters';
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'confirmed password field is required';
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
