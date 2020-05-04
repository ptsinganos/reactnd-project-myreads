import React, { Component } from 'react' ;

class Book extends Component {
	
	renderAuthor = (a, idx) => <span key={a} style={{display:'block'}}>{a}</span>;
	
	handleShelfChange = event => {
		event.preventDefault();
		this.props.onChangeShelf(this.props.book, event.target.value);
	}
	
	render() {
		const { book } = this.props;
		
		return (
			<li>
				<div className="book">
					<div className="book-top">
						{book.imageLinks && book.imageLinks.thumbnail && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
						<div className="book-shelf-changer">
							<select onChange={this.handleShelfChange} value={book.shelf}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
						{Array.isArray(book.authors) && book.authors.length > 0 && <div className="book-authors">{book.authors.map(this.renderAuthor)}</div>}
				</div>
			</li>
		);
	}
}

export default Book;