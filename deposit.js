
function Deposit() {
  const ctx = React.useContext(UserContext);

  return (
    <div>
      <h3>Deposit</h3>
      <p>
        Welcome to the site - happy to see you
        {JSON.stringify(ctx.users)}
      </p>
    </div>
  );
}