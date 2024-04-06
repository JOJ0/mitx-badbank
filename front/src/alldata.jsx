import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Card } from './common.jsx'

function AllData() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetch all accounts from DB via API endpoint /account/all
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log("AllData component useEffect hook received:");
        console.log(data);
        if (data.msgType == 'success') {
          console.log('Received success.');
          setUsers(data.data);
        }
        else {
          console.error('Received API error.');
        }
      })
      .catch(error => console.log('Catched error while fetching from API', error))

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