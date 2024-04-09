import { useState, useContext } from 'react';

import { Card, apiPostRequest,  UserContext } from './common.jsx'


function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      showComponent={true} // Login should always be shown.
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
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

  async function handleLogin() {
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
    </>
  );
}

export default Login;