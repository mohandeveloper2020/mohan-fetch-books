import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { BASE_URL, TOKEN } from 'utils/url.js';

class AddBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book_id: this.props.match.params.book_id,
            title: '',
            description: '',
            author: '',
            busy: false
        };
    };

    componentDidMount() {
        let { book_id } = this.state;

        if (book_id) {

            fetch(`${BASE_URL}/Books?token=${TOKEN}&book_id=${book_id}`, {
                method: 'GET'
            })
            .then( (response) => {
                return response.json();
            })
            .then( ({ s, d }) => {
                if(s === 's') {
                    let { title, description, author } = d;

                    this.setState({
                        title, description, author
                    })
                }
            })
        }
    };

    handleChange(field, { target }) {
        this.setState({
            [field]: target.value
        });
    };

    handleAddEdit(m, s) {
        let { title } = this.state;

        if (m && m.length) {
            // console.log(title);
            alert(`${m.join(', ')} - ${title}`);

            this.setState({
                busy: false
            })

            // to highlight the empty field with foucs
            let { titleInput, descInput, authorInput } = this.refs;

            if(titleInput.value === '') {
                ReactDOM.findDOMNode(titleInput).focus();
            } else if(descInput.value === '') {
                ReactDOM.findDOMNode(descInput).focus();
            } else if(authorInput.value === '') {
                ReactDOM.findDOMNode(authorInput).focus();
            }

            if (s === 's') {
                this.setState({
                    title: '',
                    description: '',
                    author: ''
                });

                this.props.history.push(`/`);
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let { book_id, title, description, author } = this.state;

        this.setState({
            busy: true
        });

        if (book_id) {

            let editData = { book_id, title, description, author };
            editData.token = TOKEN;
            // console.log(editData);
            
            fetch(`${BASE_URL}/Books`, {
                method: 'PUT',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(editData)
            })
            .then( (response) => {
                return response.json();
            })
            .then(({ m, s }) => {
                this.handleAddEdit(m, s);
            })

        } else {

            let newData = { title, description, author };
            newData.token = TOKEN;
            // console.log(newData);
            
            fetch(`${BASE_URL}/Books`, {
                method: 'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(newData)
            })
            .then( (response) => {
                return response.json();
            })
            .then(({ m, s }) => {
                this.handleAddEdit(m, s);
            })
        }
    };

    render() {
        let { book_id, title, description, author, busy } = this.state;

        return (
            <div className={'container-fluid mt-4'}>
                <Link
                    to={'/'}
                    className={'btn btn-sm btn-outline-secondary float-right d-none d-md-block'}>
                        <i className={'fas fa-arrow-left mr-2'}></i>
                        {'Back to List'}
                </Link>

                <div className={'col-xs-12 col-md-4 mx-auto bg-white p-3 rounded-lg shadow'}>
                    <h4 className={'text-center'}>
                        {book_id ? 'Update this book' : 'Add new book'}
                    </h4>

                    <hr className={'my-1'}/>
                    
                    <small className={'text-muted'}>{'All fields are mandatory'}</small>

                    <form 
                        className={'mt-3'}
                        onSubmit={this.handleSubmit.bind(this)}>
                        
                        <div className={'form-group mb-4'}>
                            <label>{'Book Title'}</label>
                            <input 
                                type={'text'}
                                value={title}
                                autoFocus
                                ref={'titleInput'}
                                disabled={busy} 
                                className={'form-control'} 
                                placeholder={'Enter book title'}
                                onChange={this.handleChange.bind(this, 'title')} />
                        </div>

                        <div className={'form-group mb-4'}>
                            <label>
                                {'Book Description '}
                                <small className={'text-muted font-italic'}>{'(max 150 chars)'}</small>
                            </label>
                            <textarea 
                                className={'form-control'}
                                value={description}
                                ref={'descInput'}
                                disabled={busy} 
                                rows={'3'}
                                maxLength={'150'} 
                                placeholder={'Enter book description'}
                                onChange={this.handleChange.bind(this, 'description')} >
                            </textarea>
                        </div>

                        <div className={'form-group mb-4'}>
                            <label>{'Author Name'}</label>
                            <input 
                                type={'text'}
                                value={author}
                                ref={'authorInput'}
                                disabled={busy} 
                                className={'form-control'} 
                                placeholder={'Enter author name'} 
                                onChange={this.handleChange.bind(this, 'author')} />
                        </div>

                        <button 
                            type={'submit'} 
                            disabled={busy} 
                            className={'btn btn-primary mr-3'}>
                                {book_id ? 'Update Book' : 'Add Book'}
                        </button>

                        <Link 
                            to={'/'}                           
                            className={'btn btn-light'}>
                                {'Cancel'}
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBooks;