import React from "react";
import "./home.css";
import { Table, Button } from "react-bootstrap";
function Home() {
  return (
    <div className="content">
      <div className="wrap">
        <h1>Your Devices</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Device</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Samsung Galaxy S10+</td>
              <td>
                <Button variant="warning">VIEW</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
