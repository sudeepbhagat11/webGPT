import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

import logo from "../webgpt-logo.png";

function Header() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // await logOutApiCall().unwrap();

      const response = await logOutApiCall();

      // Check if the response is a JSON object
      if (response.error) {
        // If it's not a JSON object, treat it as a success
        console.log(response.data); // "Logged out successfully"
      } else {
        // If it's a JSON object, unwrap it as usual
        await response.unwrap();
      }

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="bg-body-tertiary"
      style={{ marginBottom: "50px" }}
    >
      <Container>
        <Navbar.Brand>
          {" "}
          <Avatar sx={{ ml: "0" }}>
            <img src={logo} alt="openai" width={"65px"} />
          </Avatar>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto me-3">
            {userInfo ? (
              <Nav.Link href="/dalle">DALLE</Nav.Link>
            ) : (
              <Nav.Link></Nav.Link>
            )}

            {userInfo ? (
              <Nav.Link href="/chat">GPT-3.5</Nav.Link>
            ) : (
              <Nav.Link></Nav.Link>
            )}

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
