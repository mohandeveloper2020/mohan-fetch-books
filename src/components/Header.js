import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import Logo from 'images/brand_logo.svg';

class Header extends Component {
    render() {
        let { books } = this.props;
        // console.log(books);

        return (
            <div>
                <nav className={'navbar py-0'}>
                    <ul className={'nav'}>
                        <Link to={'/'} className={'navbar-brand'}>
                            <img src={Logo} alt={'brand logo'} className={'mr-2'}/>
                            {'Mohan Books'}
                        </Link>           
                    
                        <Link to={'/'} className={'nav-link'}>
                            {'List'}
                        </Link>

                        {/* <Link to={'/AddBooks'} className={'nav-link'}>
                            {'Add New'}
                        </Link> */}
                    </ul>

                    <ul className={'nav'}>
                        <li>
                            {`Stock (${books ? books.length : 'Loading'})`}
                        </li>
                    </ul>                    
                </nav>
            </div>
        );
    }
};

export default connect( (state)=> 
    {
        return {
            books: state.booksData
        };
    }, {} 
)(Header);