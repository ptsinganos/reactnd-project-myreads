import React, { Component } from 'react'
import { Link } from "react-router-dom";


class SearchForm extends Component {

	onChange = (event) => {
		const value = event.target.value;
		this.props.onChange(value);
	}

	render() {
		return (
			<div className="search-books-bar">
				<Link className="close-search" to='/'>Close</Link>
				<div className="search-books-input-wrapper">
					{/*
						NOTES: The search from BooksAPI is limited to a particular set of search terms.
						You can find these search terms here:
						https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

						However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
						you don't find a specific author or title. Every search is limited by search terms.
					*/}
					<input type="text" placeholder="Search by title or author" value={this.props.query} onChange={this.onChange}/>

				</div>
			</div>
		);
	}
}

export default SearchForm;