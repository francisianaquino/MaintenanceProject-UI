import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Book Inventory</span>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-success my-2 my-sm-0">Add Book</button>
                </form>
            </nav >
        );
    }
}