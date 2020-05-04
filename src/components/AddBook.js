import React, { Component } from 'react';
import SearchForm from './SearchForm';
import BookList from './BookList';
import * as BooksAPI from '../api/BooksAPI'


class AddBook extends Component {
	
	state = {
		booksShowing: []
	};
	
  searchTerms=['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
	
	updateBooks=(query) => {
		query = query.trim().toLowerCase()
		const queryFilter = this.searchTerms.filter(term => term.toLowerCase() === query);
		if ( query.length > 0 && queryFilter.length > 0 ) {
			BooksAPI.search(queryFilter[0])
			.then((res) => {

				if (!res.error) {
					res = res.map( b => ( {...b, shelf: 'none'} ));
					for (let i=0; i<res.length; i++) {
						let foundBook = this.props.shelfBooks.filter(sb => sb.id === res[i].id);
						if (foundBook.length === 1) {
							res[i].shelf = foundBook[0].shelf;
						}
					}

					this.setState({booksShowing: res})
				}
			})
		}
		else {
			this.setState({booksShowing: []})
		}
	}
	
	render() {
		
		return (
			<div className="search-books">
				<SearchForm onChange={this.updateBooks} />
				<div className="search-books-results">
					<BookList
						books={this.state.booksShowing}
						onChangeShelf={this.props.onChangeShelf}
					/>
				</div>
			</div>
		);
	}
}

export default AddBook;