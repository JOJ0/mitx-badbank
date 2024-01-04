function Withdraw() {
  const ctx = React.useContext(UserContext);

  return (
    <Card
      header="Withdraw"
      title="Request money from us but don't receive it!"
      text={"User: " + JSON.stringify(ctx.users[0].name)}
      body="Card Body"
      txtcolor="black"
    />
  );
}
