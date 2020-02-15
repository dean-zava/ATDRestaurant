import React, { Component } from 'react';
import { Container,
    ListGroup,
    ListGroupItem,
    Button,
    UncontrolledCollapse,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Table,
    Col,
    Row
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, add_review } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ItemModal from './RestaurantModel';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import { MDBDataTable } from 'mdbreact';


class Restaurant extends Component {
    state = {
        modal: {},
        bathroom_raiting: 3,
        staff_kindness: 3,
        cleanliness: 3,
        food_quality: 3,
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired
    }
    
    componentDidMount() {
        this.props.getItems();
    }

    toggle = (id) => {
        let modal  = this.state.modal;
        modal[id] = !modal[id]
        this.setState({
            modal: modal
        });
    }

    onBathroomClick(nextValue, prevValue, name) {
        this.setState({bathroom_raiting: nextValue});
      }

    onStaffClick(nextValue, prevValue, name) {
        this.setState({staff_kindness: nextValue});
      }

    onCleanlinessClick(nextValue, prevValue, name) {
        this.setState({cleanliness: nextValue});
      }

    onFoodQualityClick(nextValue, prevValue, name) {
        this.setState({food_quality: nextValue});
      }

      onSubmit = (id) => {
        const {name} = this.props.user;

        const new_review = {bathroom_raiting: this.state.bathroom_raiting, staff_kindness: this.state.staff_kindness,
            cleanliness: this.state.cleanliness, food_quality: this.state.food_quality, username: name, id}

        this.props.add_review(new_review);
    }

    render() {
        
        const { items } = this.props.item;
        console.log(items.filter(({restaurant_name}) => restaurant_name === "Some"))
        const { bathroom_raiting, staff_kindness, cleanliness, food_quality } = this.state;
        return(
            <Container>
                    <ItemModal/>
                    <ListGroup>
                        <TransitionGroup className="Reviews">
                            {items.map(({ _id, name, location, reviews }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                <div>
                                <Container style={{marginBottom: '1rem'}}> {name}</Container> 
                                <Container style={{marginBottom: '1rem'}}> {location}</Container> 
                                
                                    <Button color="info" id={`toggler${_id}`} style={{ marginBottom: '1rem' }}>
                                    Show Reviews
                                    </Button>
                                    { this.props.isAuthenticated ? 
                                    <Button onClick={this.toggle.bind(this, _id)} color="primary" style={{marginBottom: '1rem', marginLeft: '1rem'}}>
                                        Add Review
                                    </Button> :'' }

                                    <Modal
                                    isOpen={this.state.modal[_id]}
                                    toggle={this.toggle.bind(this, _id)}
                                    >
                                        <ModalHeader toggle={this.toggle.bind(this, _id)}>Add To Review List</ModalHeader>
                                        <ModalBody>
                                            <Form onSubmit={this.onSubmit.bind(this, _id)}>
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
                                                    value={bathroom_raiting}
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
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={staff_kindness}
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
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={cleanliness}
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
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={food_quality}
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
                                                    >Add Review</Button>
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                    </Modal>

                                    <UncontrolledCollapse toggler={`#toggler${_id}`}>
                                    <Card>
                                        <CardBody>

                                        <MDBDataTable striped bordered order data={
                                            {
                                            columns: [
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
                                                    width: 270
                                                  },
                                                  {
                                                    label: 'Cleanliness',
                                                    field: 'cleanliness',
                                                    sort: 'asc',
                                                    width: 200
                                                  },
                                                  {
                                                    label: 'Food Quality',
                                                    field: 'food_quality',
                                                    sort: 'asc',
                                                    width: 100
                                                  },
                                            ],
                                            
                                            rows: reviews,
                                        }
                                        } />

                                        <MDBDataTable striped bordered order data={
                                            {
                                            columns: [
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
                                                    width: 270
                                                  },
                                                  {
                                                    label: 'Cleanliness',
                                                    field: 'cleanliness',
                                                    sort: 'asc',
                                                    width: 200
                                                  },
                                                  {
                                                    label: 'Food Quality',
                                                    field: 'food_quality',
                                                    sort: 'asc',
                                                    width: 100
                                                  },
                                            ],
                                            rows: reviews.map((review) => {
                                                let {bathroom_raiting, staff_kindness, cleanliness, food_quality} = review;
                                                return {
                                                    bathroom_raiting:
                                                        <StarRatingComponent 
                                                        name="rate1" 
                                                        starCount={5}
                                                        value={bathroom_raiting}
                                                        editing="false"
                                                       />,
                                                    staff_kindness:
                                                        <StarRatingComponent 
                                                        name="rate1" 
                                                        starCount={5}
                                                        value={staff_kindness}
                                                        editing="false"
                                                      />,
                                                    cleanliness:
                                                        <StarRatingComponent 
                                                        name="rate1" 
                                                        starCount={5}
                                                        value={cleanliness}
                                                        editing="false"
                                                        />,
                                                    food_quality:
                                                        <StarRatingComponent 
                                                        name="rate1" 
                                                        starCount={5}
                                                        value={food_quality}
                                                        editing="false"
                                                        />,
                                                    }
                                                })
                                            }}/>

                                        <Table id="dtOrderExample" striped bordered responsive class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                            <thead>
                                            <tr>
                                                <th sm><Label for="Bathroom">Bathroom Quality:</Label></th>
                                                <th sm><Label for="Staff Kindness">Staff Kindness:</Label></th>
                                                <th sm><Label for="Cleanliness">Cleanliness:</Label></th>
                                                <th sm><Label for="Food Quality">Food Quality:</Label></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr> 
                                            <th>
                                            <div>   
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={bathroom_raiting}
                                                    editing="false"
                                                />
                                            </div>
                                            </th>
                                            </tr>
                                            <tr>
                                            <th>
                                            <div>   
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={staff_kindness}
                                                    editing="false"
                                                />
                                            </div>
                                            </th>
                                            </tr>
                                        </tbody>
                                        </Table>

                                        <Container>
                                        <Row>
                                            <Col><Label for="Bathroom">Bathroom Quality:</Label></Col>
                                            <Col><Label for="Staff Kindness">Staff Kindness:</Label></Col>
                                            <Col><Label for="Cleanliness">Cleanliness:</Label></Col>
                                            <Col><Label for="Food Quality">Food Quality:</Label></Col>
                                        </Row>
                                        {reviews.map(({bathroom_raiting, staff_kindness, cleanliness, food_quality}) =>
                                        <Row>
                                        <Col>
                                            <div>   
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={bathroom_raiting}
                                                    editing="false"
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>   
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={staff_kindness}
                                                    editing="false"
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>   
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={cleanliness}
                                                    editing="false"
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>   
                                                <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={food_quality}
                                                    editing="false"
                                                />
                                            </div>
                                        </Col>
                                        </Row>
                                            )}
                                        </Container>
                                    </CardBody>
                                    </Card>
                                    </UncontrolledCollapse>
                                </div>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem, add_review }
    )(Restaurant);