import React, { Component } from 'react';
import { Container, Button, ListGroup, ListGroupItem, Form, FormGroup, Input, Label } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavBar';
import Restaurant from './Restaurant';
import { get_pic, update_user } from '../actions/authActions';

var qs = require('qs');

class MyProfile extends Component {
    state = {
        is_editable: false,
        username: null,
        location: null
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        update_user: PropTypes.object.isRequired
    }

    get_pic_path(username) {
        this.props.get_pic(username);
    }

    update_user = e => {
        const {username, location} = this.state
        const { user } = this.props.auth;
        const { name } = user
        const update_details = {username, location, current_username: name}
        this.props.update_user(update_details);

        this.setState({
            is_editable: false
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    edit_page = () => {
        this.setState({
            is_editable: true
        });
    }

    render() {
        const { isAuthenticated, user_pic } = this.props.auth;
        let auth_user = this.props.auth.user;
        let qs_user = qs.parse(this.props.location.search);
        let user = qs_user.location ? 
            {
                name: qs_user['?name'],
                location: qs_user.location
            }
            : auth_user;
        console.log('start here')
        console.log(this.props.auth)
        console.log(user)
        console.log(auth_user)
        console.log(qs_user)
        console.log('end here')
        let dummy = user && !user_pic ? this.get_pic_path(user.name) : '';
        
        const editable_page  = (
        <Form>
 <FormGroup>
        <Label for="Username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Location">Location</Label>
        <Input
          type="text"
          name="location"
          id="location"
          placeholder="Enter Location"
          onChange={this.onChange}
        />
      </FormGroup>
                    <Button variant="primary" type="submit" onClick={this.update_user}>
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
    update_user: state.upadte_user
});

export default connect(mapStateToProps, { get_pic, update_user })(MyProfile);
