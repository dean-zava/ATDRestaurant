import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Row, Col, Container } from 'reactstrap'
import { connect } from 'react-redux';
import { getItems, delete_review, edit_review } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { get_pic, update_user } from '../actions/authActions';
import { MDBDataTable } from 'mdbreact';
import StarRatingComponent from 'react-star-rating-component';

var qs = require('qs');

class MyProfile extends Component {
    state = {
        is_editable: false,
        username: null,
        location: null,
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        modal: false,
        oldRev: null,
        restaurant_name: '',
        new_bathroom_raiting: 3,
        new_staff_kindness: 3,
        new_cleanliness: 3,
        new_food_quality: 3
        
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

    deleteReview = (review, rest_name) => {
        const review_to_delete = {
            review,
            rest_name
        }
        this.props.delete_review(review_to_delete)
        window.location.reload()
    }

    editToggle = (review, rest_name) => {
        //this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
            restaurant_name: rest_name,
            oldRev: review })
        
    }

    editReview = () => {
        const { new_bathroom_raiting, new_staff_kindness, new_cleanliness, new_food_quality, oldRev, restaurant_name} = this.state;
        const review_to_edit = {
            oldRev,
            restaurant_name,
            new_bathroom_raiting,
            new_staff_kindness,
            new_cleanliness,
            new_food_quality
        } 
        this.props.edit_review(review_to_edit)
        window.location.reload()
    }

    onBathroomClick(nextValue) {
        this.setState({new_bathroom_raiting: nextValue});
      }

    onStaffClick(nextValue) {
        this.setState({new_staff_kindness: nextValue});
      }

    onCleanlinessClick(nextValue) {
        this.setState({new_cleanliness: nextValue});
      }

    onFoodQualityClick(nextValue) {
        this.setState({new_food_quality: nextValue});
      }

    render() {
        const { items } = this.props.item;
        const { user_pic } = this.props.auth;
        const { new_bathroom_raiting, new_staff_kindness, new_cleanliness, new_food_quality } = this.state;
        let auth_user = this.props.auth.user;
        let qs_user = qs.parse(this.props.location.search);
        let user = qs_user.location ? 
            {
                name: qs_user['?name'],
                location: qs_user.location
            }
            : auth_user;
        if(user && !user_pic) { this.get_pic_path(user.name) }

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
   

        const reviews_by_username =user && items.length ? items.map( ({reviews}) => reviews.filter( ({username}) => username === user.name )) :'';
        
        const restaurant_names = user && items.length? items.map( ({name}) => name )  :'';
        var zipped_restaurant_arr = Array.isArray(reviews_by_username) ? reviews_by_username.map(function(e, i) {
            return [e, restaurant_names[i]]
        }) :'';


        const reviews = Array.isArray(zipped_restaurant_arr) ? zipped_restaurant_arr.map(rev_list => rev_list[0].map( rev=> {return {...rev, username: rev_list[1],
                        delete: <Button onClick={() => this.deleteReview(rev, rev_list[1])}>Delete</Button>,
                        edit:  <Button onClick={() => this.editToggle(rev, rev_list[1])}>Edit</Button>} })).flat() : '';
 

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
                                label: 'Restaurant Name',
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
                                {
                                label: 'delete',
                                field: 'delete',
                                sort: 'asc',
                                width: 150
                                },
                                {
                                label: 'edit',
                                field: 'edit',
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
            <div>
            <Modal
            isOpen={this.state.modal}
            toggle={this.editToggle}
            >
                <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.editReview}>
                        <FormGroup>
                        <Container>
                            <Row><Col> <Label for="item">Review</Label> </Col></Row>
                            <Row>
                            <Col><Label for="Bathroom">Bathroom Quality:</Label></Col>
                        <Col>
                        <div>   
                            <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={new_bathroom_raiting}
                            onStarClick={this.onBathroomClick.bind(this)}
                            />
                        </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col><Label for="Staff Kindness">Staff Kindness:</Label></Col>
                        <Col>
                        <div>   
                            <StarRatingComponent 
                            name="rate2" 
                            starCount={5}
                            value={new_staff_kindness}
                            onStarClick={this.onStaffClick.bind(this)}
                            />
                        </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col><Label for="Cleanliness">Cleanliness:</Label></Col>
                        <Col>
                        <div>   
                            <StarRatingComponent 
                            name="rate3" 
                            starCount={5}
                            value={new_cleanliness}
                            onStarClick={this.onCleanlinessClick.bind(this)}
                            />
                        </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col><Label for="Food Quality">Food Quality:</Label></Col>
                        <Col>
                        <div>   
                            <StarRatingComponent 
                            name="rate4" 
                            starCount={5}
                            value={new_food_quality}
                            onStarClick={this.onFoodQualityClick.bind(this)}
                            />
                        </div>
                        </Col>
                        </Row>
                        </Container>
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >Edit Review</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
        </Modal>
           { this.state.is_editable ?
            editable_page  :
            view_page
           }
           </div>
           );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    update_user: state.upadte_user,
    item: state.item,
    delete_review: state.delete_review,
    edit_review: state.edit_review
});

export default connect(mapStateToProps, { get_pic, update_user, getItems, delete_review, edit_review })(MyProfile);
