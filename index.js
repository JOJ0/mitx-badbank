function Spa() {

  return (
    <HashRouter>
      <div>
        <h1>Welcome to Bad Bank</h1>
        <NavBar />
        <hr />
        <UserContext.Provider value={
			{users: [
				{name:"abel",email:"abel@mit.edu",password:"secret",balance:100}
			]} 
		}>
          <Route path="/" exact component={Home} />
          <Route path="/createaccount/" exact component={CreateAccount} />
          <Route path="/login/" exact component={Login} />
          <Route path="/deposit/" exact component={Deposit} />
          <Route path="/withdraw/" exact component={Withdraw} />
          <Route path="/balance/" exact component={Balance} />
          <Route path="/alldata/" exact component={AllData} />
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));