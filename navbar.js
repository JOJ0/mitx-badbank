function NavBar() {

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">BadBank</Link>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createaccount/">Create Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login/">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/deposit/">Deposit</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/withdraw/">Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/balance/">Balance</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/alldata/">All Data</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}