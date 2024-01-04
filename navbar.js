const NavLink = ReactRouterDOM.NavLink;

function NavBar() {

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
            <li className="nav-item" onMouseOver={ (event) => { console.log('Mouse Over Event was fired') }}>
              <NavLink className="nav-link" to="/createaccount/">
                CreateAccount
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/deposit/">Deposit</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/withdraw/">Withdraw</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/alldata/">AllData</NavLink>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}