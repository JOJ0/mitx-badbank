function Home() {
  const ctx = React.useContext(UserContext);

  return (
    <div>
      <h3>Home Component</h3>
      <p>
        Welcome to the site - happy to see you
        {JSON.stringify(ctx.users)}
      </p>
    </div>
  );
}
