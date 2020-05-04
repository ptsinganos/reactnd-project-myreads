import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddBook from './components/AddBook';
import Shelf from './components/Shelf';
import * as BooksAPI from './api/BooksAPI'
import './App.css';


class BooksApp extends Component {
	state = {
		books:[],
		currentlyReading: [],
		wantToRead: [],
		read: []
	};
	
	shelves = {
		currentlyReading: 'Currently Reading',
		wantToRead: 'Want to Read',
		read: 'Read'
	}
	
	// filterBooks = () => {
		// let currReadIds = [];
		// let wantReadIds = [];
		// let readIds = [];
		
		// this.state.books.forEach(book => {
			// switch (book.shelf) {
				// case 'currentlyReading':
					// currReadIds.concat(book.id);
				// case 'wantToRead':
					// wantReadIds.concat(book.id);
				// case 'read':
					// readIds.concat(book.id);
			// }
		// });
		
		// this.setState( currState => ({
			// currentlyReading: currReadIds,
			// wantToRead: wantReadIds,
			// read: readIds
		// }));
	// }
	
	reRenderScreen = () => {
		BooksAPI.getAll()
		.then( (books) => {
			this.setState(currentState => ({
        books: books
      }))
		});
		// .then(this.filterBooks);
	}
	
	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf)
    .then(()=>{
      book.shelf = shelf;
      this.setState(currentState => ({
        books: currentState.books.filter(b => b.id !== book.id).concat([book])
      }))
		});
		// .then(this.filterBooks)
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
								{Object.keys(this.shelves).map((k) =>
									<Shelf
										books={this.state.books}
										key={k}
										shelf={k}
										title={this.shelves[k]}
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
