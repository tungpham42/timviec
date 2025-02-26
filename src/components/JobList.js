import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import JobSearch from "./JobSearch";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const jobsData = await fetchJobs(page, level);
      setJobs(jobsData);
      setLoading(false);
    };
    loadJobs();
  }, [page, level]);

  return (
    <Container>
      <h2 className="my-4 text-center">Job Listings</h2>

      <JobSearch
        onSearch={(lvl) => {
          setLevel(lvl);
          setPage(1); // Reset to first page on new search
        }}
      />

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Col xl={3} lg={3} md={6} sm={6} key={job.id} className="mb-4">
                <Card className="mb-3 h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{job.name}</Card.Title>
                    <Card.Text>
                      🏢 {job.company?.name || "Unknown Company"}
                    </Card.Text>
                    <Card.Text>
                      📍{" "}
                      {job.locations?.map((loc) => loc.name).join(", ") ||
                        "Location not specified"}
                    </Card.Text>
                    <Card.Text>
                      🏆{" "}
                      {job.levels?.map((lvl) => lvl.name).join(", ") || "N/A"}
                    </Card.Text>
                    <Link
                      to={`/job/${job.id}`}
                      className="btn btn-primary mt-auto"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No jobs found.</p>
          )}
        </Row>
      )}

      <div className="d-flex justify-content-center my-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span className="mx-3">Page {page}</span>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </Container>
  );
};

export default JobList;
