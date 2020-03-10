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
    Input,
    Col,
    Row,
    Table,
    NavLink
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, add_review, get_users } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ItemModal from './RestaurantModel';
import StarRatingComponent from 'react-star-rating-component';
import { MDBDataTable } from 'mdbreact';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

var qs = require('qs');

class Restaurant extends Component {
    state = {
        modal: {},
        restaurant_filter: '',
        location: '',
        bathroom_raiting: 3,
        staff_kindness: 3,
        cleanliness: 3,
        food_quality: 3,
        drive_quality: 0,
        delivery_quality: 0,
        avgRate: 0
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired
    }
    
    componentDidMount() {
        this.props.get_users();
        this.props.getItems();
    }

    toggle = (id) => {
        let modal  = this.state.modal;
        modal[id] = !modal[id]
        this.setState({
            modal: modal
        });
    }

    onBathroomClick(nextValue) {
        this.setState({bathroom_raiting: nextValue});
      }

    onStaffClick(nextValue) {
        this.setState({staff_kindness: nextValue});
      }

    onCleanlinessClick(nextValue) {
        this.setState({cleanliness: nextValue});
      }

    onFoodQualityClick(nextValue) {
        this.setState({food_quality: nextValue});
      }

    onDriveQualityClick(nextValue) {
        this.setState({drive_quality: nextValue});
    }

    onDeliveryQualityClick(nextValue) {
        this.setState({delivery_quality: nextValue});
    }

      onSubmit = (id) => {
        const {name} = this.props.user;

        const new_review = {bathroom_raiting: this.state.bathroom_raiting, staff_kindness: this.state.staff_kindness,
            cleanliness: this.state.cleanliness, food_quality: this.state.food_quality, drive_quality: this.state.drive_quality,
            delivery_quality: this.state.delivery_quality, username: name, id}

        this.props.add_review(new_review);
    }

    onChangeSearch = (e) => {
        this.setState({ restaurant_filter: e.target.value });
    }

    onChangeAvgStar(nextValue) {
        this.setState({ avgRate: nextValue });
    }

    render() {
        
        const { items, all_users } = this.props.item;
        const { bathroom_raiting, staff_kindness, cleanliness, food_quality, drive_quality, delivery_quality } = this.state;
        const searched_user = qs.parse(this.props.location.search)['?search_user'];

        return( searched_user ? 
        
        <center>
        <Table id="dtOrderExample" style={{width: 1000, }} striped bordered responsive class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
        <thead>
        <tr>
            <th sm><Label for="Username">Username</Label></th>
            <th sm><Label for="Location">Location</Label></th>
        </tr>
        </thead>
        <tbody>
            {all_users.filter(({name, location}) => name.includes(searched_user) || location.includes(searched_user))
            .map(({name, location}) => (
            <tr>
                <th>
                    <div>
                    <NavLink href={`/MyProfile/?name=${name}&location=${location}`}>{name}</NavLink>
                    </div>
                </th>
                <th>
                    <div>
                        {location}
                    </div>
                </th>
            </tr>
            )

        )}   
            
    </tbody>
    </Table>
    </center>
        
        :
            <Container>
                <Row>
                    <Col>
                        <ItemModal/>
                    </Col>
                    <Col>
                    <Autocomplete
                    id="combo-box-demo"
                    options={items}
                    getOptionLabel={option => option.name}
                    style={{ width: 300, marginBottom: '1rem' }}
                    onInputChange={this.onChangeSearch}
                    renderInput={params => (
                        <TextField {...params} label="Search by Restaurant" variant="outlined" fullWidth />
                    )}
                    />
                    </Col>
                    <Col>
                        <Button color="secondary" id={`advance_search_toggler`} style={{ marginBottom: '1rem' }}>
                                Advance Search
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginBottom: '1rem', marginTop: '1rem'}}>
                    <UncontrolledCollapse toggler={`advance_search_toggler`}>
                        <Col>
                        <FormGroup>
                            <Input
                            type="search"
                            size="sm"
                            style={{width: 150, heigth: 200}}
                            bsSize="sm"
                            name="location"
                            id="exampleSearch"
                            placeholder="Search by Location"
                            onChange={(e) => this.setState({ location: e.target.value })}
                            />
                            </FormGroup>
                            </Col>
                            <Col>
                            <StarRatingComponent 
                                name="AvgRate" 
                                starCount={5}
                                value={this.state.avgRate}
                                onStarClick={this.onChangeAvgStar.bind(this)}
                                edit="true"
                            />
                            </Col>
                    </UncontrolledCollapse>
                </Row>
                    <ListGroup>
                        <TransitionGroup className="Reviews">
                            {items.filter(({name}) => name.includes(this.state.restaurant_filter))
                            .filter(({location}) => location.includes(this.state.location))
                            .filter(({reviews}) => 
                                (reviews.map(({bathroom_raiting, staff_kindness, cleanliness, food_quality}) =>
                                    [bathroom_raiting, staff_kindness, cleanliness, food_quality].reduce(
                                        (sum, value) => sum + (value/4), 0))
                                    .reduce(
                                        (sum, value) => sum + (value/reviews.length),
                                        0))
                                        >= this.state.avgRate )
                            .map(({ _id, name, location, reviews }) => (
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
                                                <Row>
                                                    <Col><Label for="Food Quality">Drive-thru Quality:</Label></Col>
                                                <Col>
                                                <div>   
                                                    <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={drive_quality}
                                                    onStarClick={this.onDriveQualityClick.bind(this)}
                                                    />
                                                </div>
                                                </Col>
                                                </Row>
                                                <Row>
                                                    <Col><Label for="Food Quality">Delivery Quality:</Label></Col>
                                                <Col>
                                                <div>   
                                                    <StarRatingComponent 
                                                    name="rate1" 
                                                    starCount={5}
                                                    value={delivery_quality}
                                                    onStarClick={this.onDeliveryQualityClick.bind(this)}
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
                                                  {
                                                    label: 'Drive-thru Quality',
                                                    field: 'drive_quality',
                                                    sort: 'asc',
                                                    width: 150
                                                  },
                                                  {
                                                    label: 'Delivery Quality',
                                                    field: 'delivery_quality',
                                                    sort: 'asc',
                                                    width: 150
                                                  },
                                            ],
                                            
                                            rows: reviews
                                        }
                                        } />

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
    { getItems, deleteItem, add_review, get_users }
    )(Restaurant);