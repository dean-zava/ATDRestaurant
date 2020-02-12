import React, { Component } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavBar';
import Restaurant from './Restaurant';
// import ListGroup from 'react-bootstrap/ListGroup'

class MyProfile extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return(
            <div>
                <ListGroup>
                <ListGroupItem>{user ? `username: ${user.name}` : '' }</ListGroupItem>
                <ListGroupItem>{user ? `location: ${user.location}` : '' }</ListGroupItem>
              </ListGroup>
              
              <Button
              color="dark"
              style={{margin: '1rem'}}
              onClick={this.toggle}
              >Edit
              </Button>
              </div>
            );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(MyProfile);
