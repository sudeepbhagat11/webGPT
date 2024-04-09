import { Container, Row, Col } from "react-bootstrap";

import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          xs={12}
          md={6}
          style={{
            padding: "40px",
            border: "2px solid grey",
            borderRadius: "20px",
          }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
