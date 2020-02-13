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
    Row
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ItemModal from './RestaurantModel';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';


class Restaurant extends Component {
    state = {
        modal: false,
        bathroom_raiting: 3,
        staff_kindness: 3,
        cleanliness: 3,
        drive_thru: 3,
        delivery_speed: 3,
        food_quality: 3
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    
    componentDidMount() {
        this.props.getItems();
    }

    onClick = () => {
        // this.props.deleteItem(id);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
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

    render() {
        
        const { items } = this.props.item;
        const { bathroom_raiting, staff_kindness, cleanliness, food_quality } = this.state;
        return(
            <Container>
                    <ItemModal/>
                    <ListGroup>
                        <TransitionGroup className="Reviews">
                            {items.map(({ _id, name, location }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                <div>
                                <Container style={{marginBottom: '1rem'}}> {name}</Container> 
                                <Container style={{marginBottom: '1rem'}}> {location}</Container> 
                                
                                    <Button color="info" id={`toggler${_id}`} style={{ marginBottom: '1rem' }}>
                                    Toggle
                                    </Button>
                                    <Button onClick={this.toggle} color="primary" style={{marginBottom: '1rem', marginLeft: '1rem'}}>
                                        Add Review
                                    </Button>

                                    <Modal
                                    isOpen={this.state.modal}
                                    toggle={this.toggle}
                                    >
                                        <ModalHeader toggle={this.toggle}>Add To Review List</ModalHeader>
                                        <ModalBody>
                                            <Form onSubmit={this.onSubmit}>
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
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                                        similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                                        dignissimos esse fuga! Minus, alias.
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
    )(Restaurant);