import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Card, apiGetRequest } from './common.jsx'

function AllData() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch all accounts via API endpoint /api/account/all and set state.
    let apiResult;
    async function fetchData() {
      apiResult = await apiGetRequest("/api/account/all");
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

export default AllData;