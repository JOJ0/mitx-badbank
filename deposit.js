function Deposit() {
  const ctx = React.useContext(UserContext);

  return (
    <Card
      header="Deposit"
      title="Throw money at us!"
      text={"User: " + JSON.stringify(ctx.users[0].name)}
      body="Card Body"
      txtcolor="black"
    />
  );
}
