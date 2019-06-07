import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            publisher: '',
            genre: '',
            id: 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            //Perform some operation here
            this.setState({
                title: this.props.data.title,
                author: this.props.data.author,
                publisher: this.props.data.publisher,
                genre: this.props.data.genre,
                id: this.props.id
            });
        }
    }

    editTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    editAuthor(event) {
        this.setState({
            author: event.target.value
        })
    }

    editPublisher(event) {
        this.setState({
            publisher: event.target.value
        })
    }

    editGenre(event) {
        this.setState({
            genre: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showEdit} onHide={this.props.handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" value={this.state.title} onChange={(event) => this.editTitle(event)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Author" value={this.state.author} onChange={(event) => this.editAuthor(event)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPublisher">
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control type="text" placeholder="Publisher" value={this.state.publisher} onChange={(event) => this.editPublisher(event)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicGenre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control type="text" placeholder="Genre" value={this.state.genre} onChange={(event) => this.editGenre(event)} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.handleCloseEdit}>Close</Button>
                        <Button onClick={(event) => this.props.handleEdit(this.state.title, 
                            this.state.author, this.state.publisher, this.state.genre, this.props.id)}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}