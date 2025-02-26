import { Container, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  return (
    <Container>
      <h2>Saved Jobs</h2>
      {savedJobs.length === 0 && <p>No saved jobs.</p>}
      {savedJobs.map((job) => (
        <Card key={job.id} className="mb-3">
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {job.company_name}
            </Card.Subtitle>
            <Button variant="danger" onClick={() => removeJob(job.id)}>
              Remove
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default SavedJobs;
