import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavBar';
import Restaurant from './Restaurant';

class MyProfile extends Component {

    
    render() {
        const { items } = this.props.item;
        return(
            <AppNavbar/>
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
    )(MyProfile);