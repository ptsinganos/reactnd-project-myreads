import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddBook from './components/AddBook';
import Shelf from './components/Shelf';
import * as BooksAPI from './api/BooksAPI'
import './App.css';


class BooksApp extends Component {
	state = {
		books:[]
	};

	SHELVES = {
		currentlyReading: 'Currently Reading',
		wantToRead: 'Want to Read',
		read: 'Read'
	}

	reRenderScreen = () => {
		BooksAPI.getAll()
		.then( (books) => {
			this.setState(currentState => ({
        books: books
      }))
		});
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf)
    .then(()=>{
      book.shelf = shelf;
      this.setState(currentState => ({
        books: currentState.books.filter(b => b.id !== book.id).concat([book])
      }))
		});
	}

	componentDidMount() {
		this.reRenderScreen();
	}

  render() {
    return (
      <div className="app">
				<Router>
					<Route exact path='/search' render={()=>(
						<AddBook
							shelfBooks={this.state.books}
							onChangeShelf={this.changeShelf}
						/>
					)} />

					<Route exact path='/' render={()=>(
						<div className="list-books">
							<div className="list-books-title">
								<h1>MyReads</h1>
							</div>
							<div className="list-books-content">
								<div>
								{Object.keys(this.SHELVES).map((k) =>
									<Shelf
										books={this.state.books}
										key={k}
										shelf={k}
										title={this.SHELVES[k]}
										onChangeShelf={this.changeShelf}
									/>

								)}

								</div>
							</div>
							<div className="open-search">
								<Link to='/search'>Add a book</Link>
							</div>
						</div>
					)} />
				</Router>
      </div>
    )
  }
}

export default BooksApp
