import React, { Component } from "react";
import styled from "styled-components";
import { Container, DropdownDivider, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, isLoggedIn } from "../actions";
import { Dropdown } from "semantic-ui-react";

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
  // margin-left: 20px;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

// const Dropdown = styled.div`
//   position: relative;
//   display: inline-block;

//   :hover div {
//     display: block;
//   }
// `;
const DropdownContent = styled.div`
  display: none;
  position: absolute;
`;

const LinksContainer = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  list-style: none;
  // float: right;
  align-items: center;
`;

const NavItem = styled.li`
  margin-left: 20px;
  display: flex;
  align-items: center;
`;

const MyContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
`;

const UserPhoto = styled.img`
  border-radius: 50%;
  height: 40px;
`;

class Header extends Component {
  handleLogout = () => {
    this.props.history.push("/logout");
  };

  render() {
    const { user, logout } = this.props;
    const options = [
      {
        key: "user",
        text: "Account",
        icon: "user",
        as: Link,
        to: "/my-account"
      },
      { key: "settings", text: "Settings", icon: "settings" },
      { key: "sign-out", text: "Sign Out", icon: "sign out" }
    ];
    // const trigger = (
    //   <span>
    //     <Image avatar src={user.photo} /> {user.firstName}
    //   </span>
    // );
    return (
      <Navbar>
        <Container>
          <Logo>
            <NavLink to="/">Logo</NavLink>
          </Logo>
          {user ? (
            <Dropdown
              text={`${user.firstName}`}
              icon={user.photo}
              style={{ color: "white" }}
            >
              <Dropdown.Menu style={{ zIndex: "20" }}>
                <Dropdown.Item as={NavLink} to="/profile" text="Profile" />
                <Dropdown.Item
                  as={NavLink}
                  to="/post/new-topic"
                  text="New Topic"
                />
                <DropdownDivider />
                <Dropdown.Item
                  as={NavLink}
                  to="/"
                  text="Logout"
                  onClick={logout}
                />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            // <LinksContainer>
            //   <NavItem>
            //     <NavLink to="/" onClick={logout}>
            //       Logout
            //     </NavLink>
            //   </NavItem>
            //   <NavItem>
            //     <NavLink to="/post/new-topic">New Topic</NavLink>
            //   </NavItem>
            //   <NavItem>
            //     <NavLink to="/profile">{user.firstName}</NavLink>
            //     <NavLink to="/profile">
            //       <UserPhoto
            //         src={`${user.photo}`}
            //         alt={`${user.firstName}'s`}
            //       ></UserPhoto>
            //     </NavLink>
            //   </NavItem>
            // </LinksContainer>
            <LinksContainer>
              <NavItem>
                <NavLink to="/login">Log In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </NavItem>
            </LinksContainer>
          )}
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { logout, isLoggedIn })(Header);
