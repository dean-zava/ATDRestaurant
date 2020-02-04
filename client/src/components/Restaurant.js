import React, {Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

class Restaurant extends Component {
    state = {
        restaurants: [
            {id: uuid(), name: "shushi1"},
            {id: uuid(), name: "shushi2"},
            {id: uuid(), name: "shushi3"},
            {id: uuid(), name: "shushi4"}
        ]
    }
    
    render() {
        const { restaurants } = this.state;
        return(
            <Container>
                <Button 
                 color = "dark"
                 style = {{marginBottom: '2rem'}}
                 onClick = {()=> {
                     const name = prompt('Enter name');
                     if (name) {
                         this.setState(state => ({
                            restaurants: [...state.restaurants, {id: uuid(), name}]
                         }));
                     }
                 }}
                >Add Restaurant
                </Button>

                <ListGroup>
                    <TransitionGroup className="restaurants-list" >
                        {restaurants.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button
                                 className="remove-btn"
                                 color="danger"
                                 size="sm"
                                 onClick={() => {
                                     this.setState(state => ({
                                         restaurants: state.restaurants.filter(restaurant => restaurant.id !== id)
                                     }));
                                 }}
                                >
                                &times;
                                </Button>
                                {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

export default Restaurant;