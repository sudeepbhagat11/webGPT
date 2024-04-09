import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const redirect = "/chat";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password not matched");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toastStyle = {
    color: "white",
    background: "#0f1b21",
    fontFamily: "serif",
  };

  return (
    <div>
      <FormContainer>
        <h1
          className="my-4 text-center"
          style={{ color: "grey", fontFamily: "serif" }}
        >
          Sign Up
        </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="text" className="my-4">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              style={{
                background: "transparent",
                color: "white",
                borderRadius: "20px",
                height: "50px",
              }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-4 ">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              style={{
                background: "transparent",
                color: "white",
                borderRadius: "20px",
                height: "50px",
              }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-4 ">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              style={{
                background: "transparent",
                color: "white",
                borderRadius: "20px",
                height: "50px",
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              style={{
                background: "transparent",
                color: "white",
                borderRadius: "20px",
                height: "50px",
              }}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="text-center  mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              variant="outline-primary"
              className="mt-4"
              style={{ width: "140px", borderRadius: "20px", padding: "10px" }}
            >
              Sign Up
            </Button>
            <ToastContainer toastStyle={toastStyle} />
          </Form.Group>
        </Form>

        <Row className="py-3 text-center mt-4">
          <Col style={{ color: "grey", fontFamily: "serif" }}>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default SignUp;
