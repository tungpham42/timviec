import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJobs } from "../services/jobService";
import { Container, Spinner } from "react-bootstrap";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      const jobs = await fetchJobs();
      const jobDetails = jobs.find((job) => job.id.toString() === id);
      setJob(jobDetails);
      setLoading(false);
    };
    loadJob();
  }, [id]);

  return (
    <Container className="my-4">
      {loading ? (
        <Spinner animation="border" />
      ) : job ? (
        <>
          <h2>{job.name}</h2>
          <h5>Company: {job.company?.name || "Unknown"}</h5>
          <div dangerouslySetInnerHTML={{ __html: job.contents }} />
          <a
            href={job.refs.landing_page}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success"
          >
            Apply Now
          </a>
          <div className="mt-3">
            <Link to="/" className="btn btn-secondary">
              Back to Jobs
            </Link>
          </div>
        </>
      ) : (
        <p>Job not found.</p>
      )}
    </Container>
  );
};

export default JobDetail;
