import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ajax from 'utils/ajax';

class ViewBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book_id: this.props.match.params.book_id,
            book: {}
        };
    };

    componentDidMount() {
        let { book_id } = this.state;
        // console.log(book_id);

        ajax({
            url: '/Books',
            postUrl: `&book_id=${book_id}`
        }).then(({ s, d: book })=> {
            if (s === 's') {
                this.setState({
                    book
                });
            }
        });
    };

    render() {
        let { book } = this.state;
        // console.log(book);

        return (
            <div className={'col-8 mx-auto'}>
                <div className={'jumbotron my-3 pt-4 pb-3 shadow bg-white'}>
                    <h1 className={'display-4'}>{book.title}</h1>
                    <p className={'lead'}>{book.description}</p>
                    <p>
                        <span className={'text-muted'}>{'Author: '}</span> 
                        <span className={'font-weight-bold'}>{book.author}</span>
                    </p>
                    <hr className={'my-4'} />

                    <Link
                        to={'/'}
                        className={'btn btn-sm btn-outline-secondary'}>
                            <i className={'fas fa-arrow-left mr-2'}></i>
                            {'Back to List'}
                    </Link>
                </div>
            </div>
        );
    }
};

export default ViewBook;