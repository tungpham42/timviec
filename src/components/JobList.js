import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_FINDWORK_API_KEY;

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://findwork.dev/api/jobs/", {
        headers: { Authorization: `Token ${API_KEY}` },
        params: { search: search, location: "remote" },
      });
      setJobs(response.data.results);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={fetchJobs}>
            Search
          </Button>
        </Col>
      </Row>
      <Row>
        {jobs.map((job) => (
          <Col key={job.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.company_name}
                </Card.Subtitle>
                <Card.Text>{job.location || "Remote"}</Card.Text>
                <Button as={Link} to={`/job/${job.id}`} variant="primary">
                  Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobList;
