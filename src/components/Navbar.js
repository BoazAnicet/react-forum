import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "styled-bootstrap-grid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, isLoggedIn } from "../actions";

const Navbar = styled.nav`
  width: 100$;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Logo = styled.div`
  // height: 20px;
  font-size: 24px;
  // float: left;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Dropdown = styled.div``;

const LinksContainer = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  list-style: none;
  // float: right;
`;

const NavItem = styled.li`
  margin-left: 20px;
`;

const MyContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
`;

const mapStateToProps = ({ user }) => ({ user });

// export default connect(mapStateToProps, { logout, isLoggedIn })(function({
//   user,
//   logout
// }) {
//   return (
//     <Navbar>
//       <MyContainer>
//         <Logo>Logo</Logo>
//         {user ? (
//           <LinksContainer>
//             <NavItem>
//               <div onClick={logout}>Logout</div>
//             </NavItem>
//             <NavItem>
//               <NavLink to="/post/new-topic">New Topic</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink to="/profile">{user.firstName}</NavLink>
//             </NavItem>
//           </LinksContainer>
//         ) : (
//           <LinksContainer>
//             <NavItem>
//               <NavLink to="/login">Log In</NavLink>
//             </NavItem>
//           </LinksContainer>
//         )}
//       </MyContainer>
//     </Navbar>
//   );
// });

class Header extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }

  render() {
    const { user, logout } = this.props;
    return (
      <Navbar>
        <MyContainer>
          <Logo>
            <NavLink to="/">Logo</NavLink>
          </Logo>
          {user ? (
            <LinksContainer>
              <NavItem>
                <NavLink to="/" onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/post/new-topic">New Topic</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile">{user.firstName}</NavLink>
              </NavItem>
            </LinksContainer>
          ) : (
            <LinksContainer>
              <NavItem>
                <NavLink to="/login">Log In</NavLink>
              </NavItem>
            </LinksContainer>
          )}
        </MyContainer>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, { logout, isLoggedIn })(Header);
