const UserContext = React.createContext(null);
const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;
const Link = ReactRouterDOM.Link;

function Spa() {

  return (
    <HashRouter>
      <div>
        <h1>Routing - Hello World</h1>
        <Nav />
        <hr />
        <UserContext.Provider value={{ users: ["peter"] }}>
          <Route path="/" exact component={Home} />
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));