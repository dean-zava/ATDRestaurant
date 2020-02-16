import React, { Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button

} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModel from './auth/RegisterModel'
import LoginModel from './auth/LoginModel'
import Logout from './auth/Logout';
import MyProfile from './MyProfile';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
                < NavItem>
                    <NavLink href="/MyProfile">My Profile</NavLink>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModel/>
                </NavItem>
                <NavItem>
                    <LoginModel/>
                </NavItem>
            </Fragment>
        );
        
        return (
        <div>
            <Navbar color="dark" dark className="mb-5">
                <Container>
                    <NavbarBrand href="/">Restaurant Reviews</NavbarBrand>
                    <NavbarBrand style={{marginLeft: 500}}>
           
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="text" name="search_user" id="search_user" placeholder="Search a User" />
                        </FormGroup>
                        </Form>

                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);