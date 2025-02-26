import React, { useState } from "react";
import { Form, InputGroup, Row, Col } from "react-bootstrap";

const JobSearch = ({ onSearch }) => {
  const [level, setLevel] = useState("");

  const handleChange = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    onSearch(newLevel); // Submit immediately on change
  };

  return (
    <Form className="mb-4">
      <Row>
        <Col md={12}>
          <InputGroup>
            <Form.Select value={level} onChange={handleChange}>
              <option value="">All Levels</option>
              <option value="Internship">Internship</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default JobSearch;
