import React, { Component } from 'react';
import BookList from './BookList'


class Shelf extends Component {
	
	filterBooks = (books, shelf) => {
		return books.filter(book => book.shelf === shelf);
	}
	
	render() {
		
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<BookList
						books={this.filterBooks(this.props.books, this.props.shelf)}
						onChangeShelf={this.props.onChangeShelf}
					/>
				</div>
			</div>
		);
	}
}

export default Shelf;
