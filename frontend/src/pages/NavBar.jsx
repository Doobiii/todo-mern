import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
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
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="iconsss" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
                <Link to="/signin" className="nav-link">
                  Login
                </Link>
              </>
            )}
            {isLoggedIn && (
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
