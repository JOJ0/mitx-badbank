import { useState, useContext, useEffect } from 'react';
import { Card, apiPostRequest } from './common.jsx'

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
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

  function handleLogin() {
    console.log("handleLogin received:", email, password);
    props.setStatus('');
    // Create new user in App DB
    let loggedIn = apiPostRequest('/api/account/login', {
      email: email,
      password: password
    });
    console.log("In handleLogin apiPostRequest returned:", loggedIn);
    // Create new user in Firebase
    // FIXME
    // setShow(false);

    // fetch(`/account/login/${email}/${password}`)
    //   .then((response) => response.text())
    //   .then((text) => {
    //     try {
    //       const data = JSON.parse(text);
    //       props.setStatus("");
    //       props.setShow(false);
    //       console.log("JSON:", data);
    //     } catch (err) {
    //       props.setStatus(text);
    //       console.log("err:", text);
    //     }
    //   });
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