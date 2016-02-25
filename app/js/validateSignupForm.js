var submit_btn = $('#submit_signup');

var input = {
  pswd: $('#password'),
  pswd_conf: $('#password_confirmation'),
  email: $('#email'),
  first_name: $('#first_name'),
  last_name: $('#last_name'),
  terms_and_conditions: $('#accept_terms')
}

var nomatch = {
  pswd: $('#nomatch_password'),
  pswd_length: $('#nomatch_password_length'),
  email: $('#nomatch_email'),
  first_name: $('#nomatch_first_name'),
  last_name: $('#nomatch_last_name'),
  terms_and_conditions: $('#accept_terms')
}

var validations = {
  pswd: false,
  pswd_length: false,
  email: false,
  first_name: false,
  last_name: false
}

var checkMatchingPasswords = function() { return input.pswd.val() == input.pswd_conf.val(); }
var checkLength = function(elem) { return elem.val().length >= 2; }
var checkEmail = function(email) { return /^.+@.+\..+$/.test(email.val()); }

function validateMatchingPasswords() {
  var match = checkMatchingPasswords();
  validations.pswd = match;
  nomatch.pswd.toggle(!match);
  validateForm();
}

function validatePasswordLength() {
  var match = input.pswd.val().length > 6;
  validations.pswd_length = match;
  nomatch.pswd_length.toggle(!match);
  validateForm();
}

function validateFirstName() {
  var valid = checkLength(input.first_name);
  validations.first_name = valid;
  nomatch.first_name.toggle(!valid);
  validateForm();
}

function validateLastName() {
  var valid = checkLength(input.last_name);
  validations.last_name = valid;
  nomatch.last_name.toggle(!valid);
  validateForm();
}

function validateEmail() {
  var valid = checkEmail(input.email)
  validations.email = valid;
  nomatch.email.toggle(!valid);
  validateForm();
}

function validateForm() {
  if (!input.terms_and_conditions[0].checked)
    return submit_btn.prop('disabled', true)

  // Would love to have lodash's "some" here
  var valid = true;
  for (i in validations) {
    if (validations[i] == false) {
      valid = false;
      break;
    }
  }
  submit_btn.prop('disabled', !valid);
}

input.pswd.on('blur', function() {
  input.pswd.on('keyup', validatePasswordLength);
  input.pswd.off('blur');
  validatePasswordLength();
})

input.pswd_conf.on('keyup', function() {
  if (input.pswd.val().length == input.pswd_conf.val().length) {
    input.pswd.on('keyup', validateMatchingPasswords);
    input.pswd_conf.off('keyup')
    input.pswd_conf.on('keyup', validateMatchingPasswords);
    validateMatchingPasswords();
  }
});

input.first_name.on('blur', function() {
  input.first_name.on('keyup', validateFirstName);
  input.first_name.off('blur');
  validateFirstName();
})

input.last_name.on('blur', function() {
  input.last_name.on('keyup', validateLastName);
  input.last_name.off('blur');
  validateLastName();
})

input.email.on('blur', function() {
  input.email.on('keyup', validateEmail);
  input.email.off('blur');
  validateEmail();
})

input.terms_and_conditions.on('change', validateForm);

submit_btn.prop('disabled', true);
