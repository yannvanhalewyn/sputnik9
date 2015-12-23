var submit_btn = $('#submit_signup');

var input = {
  pswd: $('#password'),
  pswd_conf: $('#password_confirmation'),
  email: $('#email'),
  first_name: $('#first_name'),
  last_name: $('#last_name')
}

var nomatch = {
  pswd: $('#nomatch_password'),
  email: $('#nomatch_email'),
  first_name: $('#nomatch_first_name'),
  last_name: $('#nomatch_last_name')
}

var validations = {
  pswd: false,
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

input.pswd_conf.on('focus', function() {
  input.pswd.on('keyup', validateMatchingPasswords);
  input.pswd_conf.on('keyup', validateMatchingPasswords);
  input.pswd_conf.off('blur');
  validateMatchingPasswords();
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

submit_btn.prop('disabled', true);
