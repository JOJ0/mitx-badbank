import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

// import App from './App.jsx'
import NavBar from './navbar.jsx';
import { UserContext } from './common.jsx';
import Home from './home.jsx'
import CreateAccount from './createaccount.jsx'
import Withdraw from './withdraw.jsx'
import Deposit from './deposit.jsx'
import AllData from './alldata.jsx'


function Spa() {

  return (
    <HashRouter>
      <div>
        <NavBar />
        <hr />
        <UserContext.Provider value={
          {users: [
            {name:"Abel",email:"abel@mit.edu",password:"secret",balance:100}
          ]}
        }>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/createaccount/" exact component={CreateAccount} />
          <Route path="/deposit/" exact component={Deposit} />
          <Route path="/withdraw/" exact component={Withdraw} />
          <Route path="/alldata/" exact component={AllData} />
        </Routes>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Spa />
  </React.StrictMode>,
)
