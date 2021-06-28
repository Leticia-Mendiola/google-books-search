import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Grid } from "@material-ui/core";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
const key = "AIzaSyDJIPOeacNPYCPEACgg0Uwupn5MaM4xSO8"

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [userbooks, setUserBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  useEffect(() => {
    loadBooks()
  }, [])
  
  function loadBooks() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&key=${key}`)
    .then(res => 
      setBooks(res.data)
    )
    .catch(err => console.log(err));
  };

  // Load all books and store them with setBooks
  useEffect(() => {
    loadUserBooks()
  }, [])

  // Loads all books and sets them to books
  function loadUserBooks() {
    API.getBooks()
      .then(res => 
        setUserBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title || formObject.author) {
      // API.saveBook
      loadBooks
      ({
        title: formObject.title,
        author: formObject.author,
        // synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <Grid 
                container 
                alignItem="center"
                justify="center"
                // className={classes.form}
                >
                    <Grid item xs={6}>
                        <SearchForm setBooks={setBooks} />
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {/* map over results render BookCards */}
                    {books.map(book => {
                        return (
                            <Grid item 
                            // className={classes.card}
                            >
                                <Card
                                    googleBooksId={book.id}
                                    volumeInfo={book.volumeInfo} 
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            {/* <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author"
              />
              <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(formObject.author || formObject.title)}
                onClick={handleFormSubmit}
              >
                Search
              </FormBtn>
            </form> */}
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {userbooks.length ? (
              <List>
                {userbooks.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;