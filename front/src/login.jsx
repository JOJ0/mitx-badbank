import { useState, useContext } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { Card, apiPostRequest, UserContext } from './common.jsx'
import { auth } from './firebase_auth.jsx';


function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState('error');  // 'success' styles Card status green instead of red

  return (
    <Card
      showComponent={true} // Login should always be shown.
      bgcolor="secondary"
      header="Login"
      status={status}
      statusType={statusType}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} setStatusType={setStatusType}/>
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} setStatusType={setStatusType} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useContext(UserContext);


  async function handleFirebaseLogin(e) {
    e.preventDefault();
    let fbAuthResponse = null;
    let token = null;

    try {
      fbAuthResponse = await signInWithEmailAndPassword(auth, email, password)
      console.log("In handleFirebaseLogin signIn method responded:", fbAuthResponse);
      token = await fbAuthResponse.user.getIdToken();
      console.log("In handleFirebaseLogin getIdToken responded:", token);
    }
    catch (err) {
      console.log("Error in handleFirebaseLogin", err);
      props.setStatusType("error");
      props.setStatus("Error authenticating with Firebase: " + err);
    }

    // If for some other reason we don't have a token, fail gracefully
    if (! token) {
      props.setStatusType("error");
      props.setStatus("Access denied.");
    }
    else {
      props.setStatusType("success");
      props.setStatus("Successfully logged in via Firebase Auth");
      props.setShow(false);
      ctx.email = "FIXME";
      ctx.loggedIn = true;
      console.log("We've set ctx to user data:", ctx);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    let loggedIn = await apiPostRequest('/api/account/login', {
      email: email,
      password: password
    });
    console.log("In handleLogin apiPostRequest returned:", loggedIn);
    if (loggedIn.msgType === "error") {
      props.setStatus("Access denied.");
    }
    else {
      props.setStatus("");
      props.setShow(false);
      ctx.email = loggedIn.data.email;
      ctx.loggedIn = true;
      console.log("We've set ctx to user data:", ctx);
    }
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handleLogin}>
        Login
      </button>
      <button type="submit" className="btn btn-light" onClick={handleFirebaseLogin}>
        Login with Firebase
      </button>
    </>
  );
}

export default Login;