function AllData() {
  const ctx = React.useContext(UserContext);
  const Table = ReactBootstrap.Table;

  const TableBody = () => {
    const rows = ctx.users.map((row, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{row.name}</td>
          <td>{row.email}</td>
          <td>redacted</td>
          <td>{row.balance}</td>
        </tr>
      );
    });
    return rows;
  };

  return (
    <Card
      header="All Data"
      title="Your personal termination overview."
      text={"Money loss guaranteed!"}
      body={
        <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Password</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <TableBody />
          </tbody>
        </Table>
        </>
      }
      txtcolor="black"
    />
  );
}
