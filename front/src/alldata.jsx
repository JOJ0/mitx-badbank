import { useState, useEffect, useContext} from 'react';
import { Table } from 'react-bootstrap';

import { UserContext, Card, apiGetRequest, Footer } from './common.jsx'


function AllData() {
  const ctx = useContext(UserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch all accounts via API endpoint /api/account/all and set state.
    let apiResult;
    async function fetchData() {
      apiResult = await apiGetRequest("/api/accounts");
      console.log("In AllData useEffect inside fetchData got:", apiResult);
      setUsers(apiResult.data);
    }
    fetchData();
  }, []);

  const TableBody = () => {
    const rows = users.map((row, index) => {
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
    <>
    <Card
      showComponent={true} // For now AllData should always be shown. We don't have a role system yet
      header="All User accounts (FIXME this will never be shown to a single user)"
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
    <Footer activeUser={ctx.email} />
    </>
  );
}

export default AllData;