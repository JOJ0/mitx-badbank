import React from 'react'
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

// Import bootstrap SCSS (which only includes bootstrap from install-dir)
import './bootstrap.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
// Import our actual CSS
import './styles.css';


function Spa() {

  return (
      <>
      <div>
        <hr />
        <UserContext.Provider value={
          {users: [
            {name:"Abel",email:"abel@mit.edu",password:"secret",balance:100}
          ]}
        }>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />}/>
              <Route path="/createaccount/" element={<CreateAccount />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              <Route path="/alldata/" element={<AllData />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </UserContext.Provider>
      </div>
      </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Spa />
  </React.StrictMode>,
)
