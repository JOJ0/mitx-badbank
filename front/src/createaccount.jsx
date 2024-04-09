import { useState } from 'react';
import { NavLink } from 'react-router-dom'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Card, apiPostRequest } from './common.jsx'
import useCreateAccountForm from './createaccounthook.jsx'


function CreateAccount(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState('');
  const {formFields, handleChange, resetForm} = useCreateAccountForm({
    name: '',
    email: '',
    password: '',
  });

  function validate(field, label) {
    if (!field) {
      const errMsg = `Field '${label}' is empty!`;
      console.log(errMsg);
      setStatus('Error: ' + errMsg);
      //setTimeout(() => setStatus('', 3000));
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log("handleCreate received:", name, email, password);
    if (!validate(formFields.name, 'name')) return;
    if (!validate(formFields.email, 'email')) return;
    if (!validate(formFields.password, 'password')) return;
    // If we made it to here, no errors noted.
    setStatus('');
    // Create new user in App DB
    let created = apiPostRequest('/api/account', {
      name: formFields.name,
      email: formFields.email,
      password: formFields.password
    });
    console.log("In handleCreate apiPostRequest returned:", created);
    // Create new user in Firebase
    // FIXME
    setShow(false);
  }

  function clearForm() {
    // Since we are using a custom hook for saving our form values we are
    // required to provide a reset functionality within that hook. (see
    // destructuring statement on top of this file)
    resetForm({
      name: '',
      email: '',
      password: '',
    });
    setStatus('');
    setShow(true);
  }

  function styleSubmitButton() {
    let classes = "btn btn-light";
    if (formFields.name == '' && formFields.email == '' && formFields.password == '') {
      console.log("Warning in styleSubmitButton: All input fields empty. Submit disabled.");
      // Note that this could easily be changed to disable if at least one
      // input field is empty by using OR (||) instead of AND (&&).
      classes += " disabled"
    }
    console.log("In styleSubmitButton classes is: " + classes)
    return classes
  }

  return (
    <Card
      showComponent={true}  // CreateAccount should always be visible!
      bgcolor="primary"
      header="Sign Up"
      status={status}
      body={show ? (
        <>
        <form className="">
          Name<br/>
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={formFields.name} onChange={handleChange} /><br/>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={formFields.email} onChange={handleChange} /><br/>
          Password<br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={formFields.password} onChange={handleChange} /><br/>

          <button type="submit" className={styleSubmitButton()} onClick={handleCreate}>Create account</button>
        </form>
        <div className="">
          <p className="mt-2 card-note">
            Already have an account?{' '}
            <NavLink to="/login" >
                Sign in
            </NavLink>
          </p>
        </div>
        </>
      ):(
        <>
        <form>
          <h5>Account created!</h5>
          <NavLink to="/login" >
              Login and waste your money?
          </NavLink>
        </form>
        </>
      )}
    / >
  );
}

export default CreateAccount;