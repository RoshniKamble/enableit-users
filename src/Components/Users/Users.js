import React, { useState, useEffect } from "react";
import "./Users.css";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  function fetchUsers(page) {
    fetch(`https://give-me-users-forever.vercel.app/api/users/${page}/next?limit=12`)
      .then(response => response.json())
      .then(data => setUsers(data.users.slice(0, 10)));
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  const isFirstPage = page === 0;
  const isLastPage = users.length < 10;

  return (
    <div className="Users">
      <Container>
      <Row>
        <Col>
        <h1 className="text-center">Users</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>JobTitle</th>
            <th>FirstNameLastName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.JobTitle}</td>
              <td>{user.FirstNameLastName}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>{user.Company}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <Button variant="outline-primary" size="lg" onClick={handlePreviousPage} disabled={isFirstPage}>
          Previous
        </Button>{' '}
        <Button  variant="outline-success" size="lg" onClick={handleNextPage} disabled={isLastPage}>
          Next
        </Button>
      </div>
        </Col>
      </Row>
    </Container>
      
    </div>
  );
}

export default Users;
