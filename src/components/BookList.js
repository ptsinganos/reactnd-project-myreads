import React, { Component } from 'react';
import Book from './Book'


class BookList extends Component {
	
	renderBook = (book) => <Book key={book.id} book={book} onChangeShelf={this.props.onChangeShelf}/>;
	
	render() {
		return (
			<ol className="books-grid">
				{this.props.books.map(this.renderBook)}
			</ol>
		);
	}
}

export default BookList;
