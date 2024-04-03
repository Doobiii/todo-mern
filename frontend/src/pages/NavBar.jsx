import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../stores";
import "./Navbar.css";
const NavBar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () => {
    sessionStorage.clear("id");
    sessionStorage.clear("username");
    dispatch(authActions.logout());
    window.location.reload();
  };
  // console.log(isLoggedIn);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="iconsss" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/signin">Login</Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <Nav.Link href="/" onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
