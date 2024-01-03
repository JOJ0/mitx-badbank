function Spa() {

  return (
    <HashRouter>
      <div>
        <NavBar />
        <hr />
        <UserContext.Provider value={
			{users: [
				{name:"abel",email:"abel@mit.edu",password:"secret",balance:100}
			]} 
		}>
          <Route path="/" exact component={Home} />
          <Route path="/createaccount/" exact component={CreateAccount} />
          <Route path="/deposit/" exact component={Deposit} />
          <Route path="/withdraw/" exact component={Withdraw} />
          <Route path="/alldata/" exact component={AllData} />
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));