import './SignUp.css';
import useForm from './useForm'

const initialUserData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: ''
}

function SignUp(props) {


    // Validate form inputs
    const validate = (values) => {
      let errors = {};

      // validate firstName
      if (!values.firstName) {
        errors.firstName = 'First Name is required';
      }
      // validate lastName
      if (!values.lastName) {
        errors.lastName = 'Last Name is required';
      }
      // validate phoneNumber
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required';
      }
      // validate email
      if (!values.email) {
        errors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
      }
      // validate password
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 or more characters';
      }


      return errors;
    };


    // include props from useForm
    const {
      values,
      errors,
      handleChange,
      setErrors,
      setIsSubmitting
    } = useForm(initialUserData, login, validate);



    // Format Phone Number
    const isNumericInput = (event) => {
    	const key = event.keyCode;
    	return ((key >= 48 && key <= 57) || // Allow number line
    		(key >= 96 && key <= 105) // Allow number pad
    	);
    };

    const isModifierKey = (event) => {
    	const key = event.keyCode;
    	return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
    		(key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
    		(key > 36 && key < 41) || // Allow left, up, right, down
    		(
    			// Allow Ctrl/Command + A,C,V,X,Z
    			(event.ctrlKey === true || event.metaKey === true) &&
    			(key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
    		)
    };

    const enforceFormat = (event) => {
    	// Input must be of a valid number format, and not longer than ten digits
    	if(!isNumericInput(event) && !isModifierKey(event)){
    		event.preventDefault();
    	}
    };

    const formatToPhone = (event) => {
    	if(isModifierKey(event)) {return;}

    	const target = event.target;
    	const input = event.target.value.replace(/\D/g,'').substring(0,10);
    	const zip = input.substring(0,3);
    	const middle = input.substring(3,6);
    	const last = input.substring(6,10);

    	if(input.length > 6){target.value = `(${zip}) ${middle} - ${last}`;}
    	else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
    	else if(input.length > 0){target.value = `(${zip}`;}
    };



    // OnSubmit
    const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(validate(values));
      setIsSubmitting(true);
    }

    // Form is successful
    function login() {
      // display success message
      alert('Yay! Form submitted successfully 🎉')
      console.log('No errors, submit callback called!');

      // log values to the console
      const user = values;
      console.log(JSON.stringify(user, null, 2));
    }


    return (
      <form onSubmit={handleSubmit} noValidate>
        <h1>Sign Up</h1>

        <label>
          First Name:
          <input
            name="firstName"
            type="firstName"
            placeholder="Enter your first name"
            value={values.firstName || ''}
            onChange={handleChange} />
            {errors.firstName && (
              <p className="error">{errors.firstName}</p>
            )}
        </label>

        <label>
          Last Name:
          <input
            name="lastName"
            type="lastName"
            placeholder="Enter your last name"
            value={values.lastName || ''}
            onChange={handleChange} />

            {errors.lastName && (
              <p className="error">{errors.lastName}</p>
            )}
        </label>

        <label>
          Phone Number:
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
            value={values.phoneNumber || ''}
            onChange={handleChange}
            onKeyDown={enforceFormat}
            onKeyUp={formatToPhone}
            maxLength="16" />

            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}
        </label>

        <label>
          Email:
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={values.email || ''}
            onChange={handleChange} />

            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
        </label>

        <label>
          Password:
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password || ''}
            onChange={handleChange} />

            {errors.password && (
              <p className="error">{errors.password}</p>
            )}
        </label>

        <button>Submit</button>

      </form>
    );
}

export default SignUp;
