const NavLink = ReactRouterDOM.NavLink;
const Navigate = ReactRouterDOM.useNavigate;
// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// require ("firebase/auth");
// import firebaseauth from 'firebase/auth';
//import { createUserWithEmailAndPassword } from "./firebase_auth";
// firebase = require("firebase");
// import 'firebase/compat/auth';

function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
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

  async function handleCreate() {
    console.log("handleCreate received:", name, email, password);
    if (!validate(formFields.name, 'name')) return;
    if (!validate(formFields.email, 'email')) return;
    if (!validate(formFields.password, 'password')) return;
    // If we made it to here, no errors noted.
    setStatus('');
    const url = `/account/create/${formFields.name}/${formFields.email}/${formFields.password}`;
    console.log("In handleCreate url is:" + url);

    // Create new user in App DB
    let created = apiGetRequest(url);
    console.log("Created is:", created);
    // Create new user in Firebase
    console.log("This is createUserWithEmailAndPassword:", createUserWithEmailAndPassword)

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user is", user);
            Navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error is", errorCode, errorMessage);
            // ..
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
      bgcolor="primary"
      header="Create Account"
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