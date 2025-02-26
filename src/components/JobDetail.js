import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_FINDWORK_API_KEY;

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  });

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get("https://findwork.dev/api/jobs/", {
        headers: { Authorization: `Token ${API_KEY}` },
        params: { id: id },
      });
      setJob(response.data.results[0]);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.company_name}
          </Card.Subtitle>
          <Card.Text>{job.description}</Card.Text>
          <Button href={job.url} target="_blank" variant="success">
            Apply Now
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetail;
