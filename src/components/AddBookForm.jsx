import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            publisher: '',
            genre: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            //Perform some operation here
            this.setState({
                title: '',
                author: '',
                publisher: '',
                genre: ''
            });
        }
    }

    addTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    addAuthor(event) {
        this.setState({
            author: event.target.value
        })
    }

    addPublisher(event) {
        this.setState({
            publisher: event.target.value
        })
    }

    addGenre(event) {
        this.setState({
            genre: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showAdd} onHide={this.props.handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="reset">
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" onChange={(event) => this.addTitle(event)} required="true" />
                            </Form.Group>

                            <Form.Group controlId="formBasicAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Author" onChange={(event) => this.addAuthor(event)} required="true" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPublisher">
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control type="text" placeholder="Publisher" onChange={(event) => this.addPublisher(event)} required="true" />
                            </Form.Group>

                            <Form.Group controlId="formBasicGenre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control type="text" placeholder="Genre" onChange={(event) => this.addGenre(event)} required="true" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleCloseAdd}>Close</Button>
                        <Button onClick={(event) => this.props.handleAdd(this.state.title, 
                            this.state.author, this.state.publisher, this.state.genre, event)}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}