import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
  const [isHoveringCreate, setIsHoveringCreate] = useState(false);
  const [isHoveringDeposit, setIsHoveringDeposit] = useState(false);
  const [isHoveringWithdraw, setIsHoveringWithdraw] = useState(false);
  const [isHoveringData, setIsHoveringData] = useState(false);

  const handleMouseOver = (event, navItem) => {
    console.log("handleMouseOver received:", navItem);
    if (navItem == "nav-create") setIsHoveringCreate(true);
    if (navItem == "nav-deposit") setIsHoveringDeposit(true);
    if (navItem == "nav-withdraw") setIsHoveringWithdraw(true);
    if (navItem == "nav-data") setIsHoveringData(true);
  };

  const handleMouseOut = (event, navItem) => {
    console.log("handleMouseOut received:", navItem);
    if (navItem == "nav-create") setIsHoveringCreate(false);
    if (navItem == "nav-deposit") setIsHoveringDeposit(false);
    if (navItem == "nav-withdraw") setIsHoveringWithdraw(false);
    if (navItem == "nav-data") setIsHoveringData(false);
  };


  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">TermBank</NavLink>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item" name="nav-create"
              onMouseOver={() => handleMouseOver(event, 'nav-create')}
              onMouseOut={() => handleMouseOut(event, 'nav-create')}
            >
              <NavLink className="nav-link" to="/createaccount/">CreateAccount</NavLink>
            </li>
            <li className="nav-item" name="nav-deposit"
              onMouseOver={() => handleMouseOver(event, 'nav-deposit')}
              onMouseOut={() => handleMouseOut(event, 'nav-deposit')}
            >
              <NavLink className="nav-link" to="/deposit/">Deposit</NavLink>
            </li>
            <li className="nav-item" name="nav-withdraw"
              onMouseOver={() => handleMouseOver(event, 'nav-withdraw')}
              onMouseOut={() => handleMouseOut(event, 'nav-withdraw')}
            >
              <NavLink className="nav-link" to="/withdraw/">Withdraw</NavLink>
            </li>
            <li className="nav-item" name="nav-data"
              onMouseOver={() => handleMouseOver(event, 'nav-data')}
              onMouseOut={() => handleMouseOut(event, 'nav-data')}
            >
              <NavLink className="nav-link" to="/alldata/">AllData</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className={isHoveringCreate ? "nav-tooltip-visible" : "nav-tooltip-hidden"}>
          This page lets you create user accounts.
        </div>
        <div className={isHoveringDeposit ? "nav-tooltip-visible" : "nav-tooltip-hidden"}>
          This page let's you throw money at us.
        </div>
        <div className={isHoveringWithdraw ? "nav-tooltip-visible" : "nav-tooltip-hidden"}>
          This page lets you withdraw money.
        </div>
        <div className={isHoveringData ? "nav-tooltip-visible" : "nav-tooltip-hidden"}>
          This page lists all users data.
        </div>
      </div>

    </nav>
  );
}

export default NavBar;
