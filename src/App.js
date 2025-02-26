import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import { Container, Navbar, Nav } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Job Board</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/job/:id" element={<JobDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
