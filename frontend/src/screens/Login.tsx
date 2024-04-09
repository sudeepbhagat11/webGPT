import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const redirect = "/chat";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log("Login response:", res);

      dispatch(setCredentials({ ...res }));
      console.log("Updated userInfo in Redux store:", userInfo);

      navigate(redirect);
      console.log("Navigated to:", redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
          Log In
        </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-4 ">
            <Form.Label style={{ color: "grey", fontFamily: "serif" }}>
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              style={{
                background: "transparent",
                color: "white",
                borderRadius: "20px",
                height: "50px",
              }}
              value={email}
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
          <Form.Group className="text-center  mt-4">
            <Button
              type="submit"
              variant="outline-primary"
              className="mt-4"
              style={{ width: "140px", borderRadius: "20px", padding: "10px" }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <ToastContainer toastStyle={toastStyle} />
          </Form.Group>
        </Form>

        <Row className="py-3 text-center mt-4">
          <Col style={{ color: "grey", fontFamily: "serif" }}>
            Not registered? <Link to="/signup">SignUp</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Login;
