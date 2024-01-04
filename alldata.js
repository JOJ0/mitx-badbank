function AllData() {
  const ctx = React.useContext(UserContext);

  return (
    <Card
      header="All Data"
      title="Your personal termination overview."
      text={"User: " + JSON.stringify(ctx.users[0].name)}
      body={JSON.stringify(ctx.users[0].name)}
      txtcolor="black"
    />
  );
}
