import React, { Component } from 'react';
import { Container, Button, ListGroup, ListGroupItem, Form, FormGroup, Input, Label } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavBar';
import Restaurant from './Restaurant';
import { get_pic } from '../actions/authActions';
// import ListGroup from 'react-bootstrap/ListGroup'

class MyProfile extends Component {
    state = {
        is_editable: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    get_pic_path(username) {
        this.props.get_pic(username);
    }

    edit_page = () => {
        this.setState({
            is_editable: true
        });
    }

    render() {
        const { isAuthenticated, user, user_pic } = this.props.auth;
        let dummy = user ? this.get_pic_path(user.name) : '';
        const editable_page  = (
        <Form>
 <FormGroup>
        <Label for="Username">Username</Label>
        <Input
          type="text"
          name="Username"
          id="Username"
          placeholder="Enter Username"
        />
      </FormGroup>
      <FormGroup>
        <Label for="Location">Password</Label>
        <Input
          type="text"
          name="Location"
          id="Location"
          placeholder="Enter Location"
        />
      </FormGroup>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
        </Form>)

        const view_page = (
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
              onClick={this.edit_page}
              >Edit
              </Button>
              </div>
        )

        return(
            this.state.is_editable ? 
            editable_page :
            view_page
            );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { get_pic })(MyProfile);
