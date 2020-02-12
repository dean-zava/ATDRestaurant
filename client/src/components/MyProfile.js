import React, { Component } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavBar';
import Restaurant from './Restaurant';
import { get_pic } from '../actions/authActions';
// import ListGroup from 'react-bootstrap/ListGroup'

class MyProfile extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    get_pic_path(username) {
        this.props.get_pic(username);
    }

    render() {
        const { isAuthenticated, user, user_pic } = this.props.auth;
        let dummy = user ? this.get_pic_path(user.name) : ''

        return(
            <div>
                <ListGroup>
                <img src={ user_pic ? `http://localhost:5000/${user_pic.file.replace("public\\", "")}` : '' }
                                 width="200" height="100"/>
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

export default connect(mapStateToProps, { get_pic })(MyProfile);
