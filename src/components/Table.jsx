import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import Axios from 'axios';
import AddBookForm from './AddBookForm';
import EditBookForm from './EditBookForm';
import { Button } from 'react-bootstrap';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Author',
                    field: 'author',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Publisher',
                    field: 'publisher',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Genre',
                    field: 'genre',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action'
                }
            ],
            rows: [],
            showEdit: false,
            showAdd: false
        }

        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
    }

    handleShowEdit(index, id) {
        this.setState({
            showEdit: true,
            index: index,
            id: id
        });
    }

    handleShowAdd() {
        this.setState({ showAdd: true });
    }

    handleCloseEdit() {
        this.setState({ showEdit: false });
    }

    handleCloseAdd() {
        this.setState({ showAdd: false });
    }


    getBooks() {
        Axios
            .get('http://localhost:8080/books')
            .then(res => {
                const resp = res.data.map((data, index) => {
                    return {
                        title: data.title,
                        author: data.author,
                        publisher: data.publisher,
                        genre: data.genre,
                        action: <div>
                            <Button value={data.id} onClick={() => this.handleShowEdit(index, data.id)}>Edit</Button>
                            <Button value={data.id} onClick={(event) => this.deleteBook(event)}>Delete</Button>
                        </div>
                    }
                })
                const newState = Object.assign({}, this.state, {
                    rows: resp
                })
                document.getElementsByClassName('dataTable')[0].children[2].remove();

                this.setState(newState);
            })
            .catch(err => {
                console.log(err);
            })
    }

    addBook(title, author, publisher, genre) {
        Axios
            .post('http://localhost:8080/books', {
                'title': title,
                'author': author,
                'publisher': publisher,
                'genre': genre
            })
            .then(res => {
                this.getBooks();
            })
            .catch(error => {
                console.log(error);
            });
    }

    editBook(id, title, author, publisher, genre) {
        Axios
            .post('http://localhost:8080/books/' + id, {
                'title': title,
                'author': author,
                'publisher': publisher,
                'genre': genre
                }
            )
            .then(res => {
                this.getBooks();
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteBook(event) {
        Axios
            .delete('http://localhost:8080/books/' + event.target.value)
            .then(res => {
                this.getBooks();
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getBooks();
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Book Inventory</span>
                    <form className="form-inline my-2 my-lg-0">
                        <Button onClick={this.handleShowAdd.bind(this)} handleAdd={(event) => this.addBook(event)}>Add Book</Button>
                    </form>
                </nav>
                <div className="container">
                    <AddBookForm
                        showAdd={this.state.showAdd}
                        handleCloseAdd={this.handleCloseAdd}
                        handleAdd={this.addBook}
                    />
                    <EditBookForm 
                        id={this.state.id}
                        showEdit={this.state.showEdit} 
                        handleCloseEdit ={this.handleCloseEdit}
                        handleEdit = {this.editBook}
                        data={this.state.rows[this.state.index]}
                    />
                </div>
                <div className="container">
                    <MDBDataTable
                        striped
                        bordered
                        small
                        data={this.state}
                        key={this.state.rows.id}
                    />
                </div>
            </div>
        );
    }
}