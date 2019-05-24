import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getBooks } from 'actions/booksAction/';
import { BASE_URL, TOKEN } from 'utils/url.js';
import BookImg from 'images/book_stack.png';

class BooksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book_id: this.props.match.params.book_id
        };
    };

    componentDidMount() {
        // to get all the books from API
        this.props.getBooks();
    };

    handleDelete(book) {
        let bookId = book.book_id;
        // console.log(bookId);

        let { books } = this.props;
        // console.log(books);

        let confirmation = window.confirm('Do you want to delete this book from list?');
        if(confirmation === true) {
            books.filter((b) => {
                  if(b.book_id === bookId) {
                      // console.log('inside if');
                      fetch(`${BASE_URL}/Books?token=${TOKEN}&book_id=${bookId}`, {
                          method: 'DELETE'
                      })
                      .then( (response) => {
                          return response.json();
                      })
                      .then( ({m}) => {
                          // console.log(m);
                          if (m && m.length) {
                              alert(`${m} - ${b.title} by ${b.author}`)
                          }
                          // To get the updated list of books after delete
                          this.props.getBooks();
                      })
                  }
                return b;
            })
        }
        // console.log(books);
        return books;
    }

    render() {
        let { books } = this.props;
        // console.log(books);

        return (
            <div className={'container-fluid mt-3'}>
                <p className={'mb-0 text-center'}>
                    {'Books Available'}
                    <Link to={'/AddBooks'} className={'ml-3 btn btn-sm btn-info float-right'}>
                        <i className={'fas fa-plus mr-2'}></i>
                        {'Add new'}
                    </Link>
                </p>

                <hr />

                <div className={'row'}>
                    {books && books.map((book, ind) =>
                        <div className={'col-xs-12 col-md-4 my-3'} key={ind}>
                            <div className={'card shadow'}>
                                <div className={'card-header'}>
                                    <h5 className={'mb-0'}>{book.title}</h5>
                                </div>
                                <div className={'card-body py-3'}>
                                    <p className={'card-text'}>{book.description}</p>
                                    <p className={'card-text font-italic text-muted mb-1'}>{`By: ${book.author}`}</p>
                                </div>
                                <div className={'card-footer'}>
                                    <Link
                                        to={`EditBook/${book.book_id}`}
                                        className={'btn btn-sm btn-outline-secondary mr-2'}
                                        title={'Edit this book'} >
                                            <i className={'fas fa-pen'}></i>
                                            {/* {'Edit'} */}
                                    </Link>

                                    <button
                                        // to={`DeleteBook/${book.book_id}`}
                                        onClick={this.handleDelete.bind(this, book)}
                                        className={'btn btn-sm btn-outline-secondary'}
                                        title={'Delete this book'} >
                                            <i className={'fas fa-trash'}></i>
                                            {/* {'Delete'} */}
                                    </button>

                                    <Link
                                        to={`/ViewBook/${book.book_id}`}
                                        className={'card-link float-right'}
                                        title={'View more about this book'} >
                                            <i className={'fas fa-eye'}></i>
                                            {/* {'View more'} */}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {!books && <div className={'d-flex align-items-center ml-3'}>
                                <span>{'Loading'}</span>
                                <div className={'ml-2 spinner-border spinner-border-sm text-primary'} role={'status'}></div>
                            </div>
                    }

                    {books && !books.length && <div className={'no-stock'}>
                            <img src={BookImg} alt={'book img'} className={'mr-3'}/>
                            <h3>{'No Stock :('}</h3>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect((state) =>
    {
        return {
            books: state.booksData
        }
    },
    {
        getBooks
    }
)(BooksList);
