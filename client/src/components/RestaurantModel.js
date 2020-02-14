import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        location: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onChangeLoc = (e) => {
        this.setState({location: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        const {name, location} = this.state
        const newItem = {
            name,
            location
        }

        this.props.addItem(newItem);
        this.toggle();
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ?

                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >Add Restaurant</Button>
                :
                <h4 className="mb-3 ml-4">Please log in to manage items</h4>
                }
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Review List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Review</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Restaurant's name"
                                    onChange={this.onChange}
                                ></Input>
                                <Input
                                    type="text"
                                    style={{marginTop: '1rem'}}
                                    locaion="locaion"
                                    id="item"
                                    placeholder="Restaurant's location"
                                    onChange={this.onChangeLoc}
                                ></Input>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Review</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);