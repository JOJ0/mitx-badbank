import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import NavBar from './navbar.jsx';
import { UserContext } from './common.jsx';
import Home from './home.jsx'
import CreateAccount from './createaccount.jsx'
import Withdraw from './withdraw.jsx'
import Deposit from './deposit.jsx'
import AllData from './alldata.jsx'
import Login from './login.jsx'
import Logout from './logout.jsx'

// Import bootstrap SCSS (which only includes bootstrap from install-dir)
import './bootstrap.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import our actual CSS
import './styles.css';


function Spa() {
  const [userData, setUserData] = useState({
    email: '',
    loggedIn: false,
    firebase: false
  });

  return (
      <>
      <UserContext.Provider value={userData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />}/>
              <Route path="/createaccount/" element={<CreateAccount />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/admin/" element={<AllData />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/logout/" element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Spa />
  </StrictMode>,
)
