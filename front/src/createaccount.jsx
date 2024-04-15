import { useState } from 'react';
import { NavLink } from 'react-router-dom'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Card, apiPostRequest } from './common.jsx'
import useCreateAccountForm from './createaccounthook.jsx'
import { auth } from './firebase_auth.jsx';


function CreateAccount(){
  const [show, setShow]         = useState(true);
  const [status, setStatus]     = useState({
      'msg': '',
      'type': 'error'
  });
  const {formFields, handleChange, resetForm} = useCreateAccountForm({
    name: '',
    email: '',
    password: '',
  });

  function validate(field, label) {
    if (!field) {
      const errMsg = `Field '${label}' is empty!`;
      console.log(errMsg);
      setStatus({
        "msg": "Creating user failed. Validation error: " + errMsg,
        "type": "error"
      });
      //setTimeout(() => setStatus('', 3000));
      return false;
    }
    return true;
  }

  async function handleFirebaseCreate(e) {
    e.preventDefault();
    console.log("handleFirebaseCreate received:", name.value, email.value, "password redacted!");
    let fbCreateResponse = null;
    let firebaseEmail = null;
    let firebaseUID = null;
    if (!validate(formFields.name, 'name')) return;
    if (!validate(formFields.email, 'email')) return;
    if (!validate(formFields.password, 'password')) return;
    // If we made it to here, no validation errors noted.

    // Create new user in Firebase
    try {
      fbCreateResponse = await createUserWithEmailAndPassword(auth, email.value, password.value)
      console.log("In handleFirebaseCreate signIn method responded:", fbCreateResponse);
      firebaseEmail = fbCreateResponse.user.email;
      firebaseUID = fbCreateResponse.user.uid;
      console.log("In handleFirebaseCreate Firebase email/UID are:", firebaseEmail, firebaseUID);
    }
    catch (err) {
      console.log("ErrorCode in handleFirebaseCreate", err.code);
      console.log("ErrorMessage in handleFirebaseCreate", err.message);
      setStatus({
        "msg": "Creating user failed. Firebase Auth returned: " + err,
        "type": "error"
      });
    }

    // Early exit if Firebase user creation was unsuccessful
    if (! firebaseEmail || ! firebaseUID) {
      return;
    }
    else {
      // Create new user in App DB
      let created = apiPostRequest('/account', {
        name: formFields.name,
        email: formFields.email,
        firebaseUID: firebaseUID,
        password: ''  // Empty passwords always deny _local_ login!
      });
      console.log("In handleFirebaseCreate apiPostRequest returned:", created);
      setStatus({
        "msg": "",
        "type": "success"
      });
      setShow(false);
    }
  }

  function handleCreate(e) {
    e.preventDefault();
    console.log("handleCreate received:", name, email, password);
    if (!validate(formFields.name, 'name')) return;
    if (!validate(formFields.email, 'email')) return;
    if (!validate(formFields.password, 'password')) return;
    // If we made it to here, no errors noted.
    // Create new user in App DB
    let created = apiPostRequest('/account', {
      name: formFields.name,
      email: formFields.email,
      password: formFields.password
    });
    console.log("In handleCreate apiPostRequest returned:", created);
    setStatus({
      "msg": "",
      "type": "success"
    });
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
    setStatus({
      "msg": "",
      "type": "success"
    });
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
      status={status.msg}
      statusType={status.type}
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
          <button type="submit" className={styleSubmitButton()} onClick={handleFirebaseCreate}>Create Firebase account</button>
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
