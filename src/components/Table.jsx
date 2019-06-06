import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import Axios from 'axios';

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
            rows: [
                {
                    title: 'qwerty',
                    author: 'yuiop',
                    publisher: 'asdf',
                    genre: 'zxcvb',
                    action: <button>test</button>
                }
            ]
        }
    }

    getBooks() {
        Axios
            .get('http://localhost:8080/books')
            .then(res => {
                const resp = res.data.map(data => {
                    return {
                        title: data.title,
                        author: data.author,
                        publisher: data.publisher,
                        genre: data.genre,
                        action: <div>
                            <button id={data.id}>Edit</button>
                            <button id={data.id}>Delete</button>
                        </div>
                    }
                })
                const newState = Object.assign({}, this.state, {
                    rows: resp
                })
                this.setState(newState);
            })
            .catch(err => {
                console.log(err);
            })
    }

    addBooks() {
        Axios
            .post('http://localhost:8080/books', {
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

    editBooks() {
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

    deleteBooks() {
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

    componentDidMount() {
        this.getBooks();
    }


    render() {
        return (
            <div className="container">
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={this.state}
                />
            </div>
        );
    }
}