import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Form, FormGroup, Input, Label } from 'reactstrap'
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { get_pic, update_user } from '../actions/authActions';
import { MDBDataTable } from 'mdbreact';

var qs = require('qs');

class MyProfile extends Component {
    state = {
        is_editable: false,
        username: null,
        location: null,
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        update_user: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getItems();
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
        const { items } = this.props.item;
        const { user_pic } = this.props.auth;
        let auth_user = this.props.auth.user;
        let qs_user = qs.parse(this.props.location.search);
        let user = qs_user.location ? 
            {
                name: qs_user['?name'],
                location: qs_user.location
            }
            : auth_user;
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
        const reviews = user && items.length ? items.map( ({reviews}) => reviews.filter( ({username}) => username === user.name )).flat() :''; 
        // console.log(reviews) 
        // console.log(Array.isArray(reviews))
        let zbib = Array.isArray(reviews) ? console.log(reviews.map((review) => review)): '';
        const view_page = (
                <div>
                <ListGroup>
                <img src={ user_pic ? `http://localhost:5000/${user_pic.file.replace("public\\", "")}` : '' }
                                 width="200" height="100"/>
                <ListGroupItem>{user ? `username: ${user.name}` : '' }</ListGroupItem>
                <ListGroupItem>{user ? `location: ${user.location}` : '' }</ListGroupItem>
              </ListGroup>
              
              {!qs_user.location ? 
              <Button
              color="dark"
              style={{margin: '1rem'}}
              onClick={this.edit_page}
              >Edit
              </Button>
              : ''
            }
            <h4>Reviews List:</h4>
                {Array.isArray(reviews)?  
                    
                    <MDBDataTable striped bordered order data  ={
                        
                        {
                        columns: [
                            {
                                label: 'Review Creator',
                                field: 'username',
                                sort: 'asc',
                                width: 150
                                },
                            {
                                label: 'Bathroom Raiting',
                                field: 'bathroom_raiting',
                                sort: 'asc',
                                width: 150
                                },
                                {
                                label: 'Staff Kindness',
                                field: 'staff_kindness',
                                sort: 'asc',
                                width: 150
                                },
                                {
                                label: 'Cleanliness',
                                field: 'cleanliness',
                                sort: 'asc',
                                width: 150
                                },
                                {
                                label: 'Food Quality',
                                field: 'food_quality',
                                sort: 'asc',
                                width: 150
                                },
                        ],
                        
                        rows: reviews
                    }
                } /> 
                 :''}

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
    update_user: state.upadte_user,
    item: state.item
});

export default connect(mapStateToProps, { get_pic, update_user, getItems })(MyProfile);
