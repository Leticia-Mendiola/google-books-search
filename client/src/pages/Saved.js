function Saved(){
return (
<Container fluid>
<Row>
<Col size="md-6 sm-12">
<Jumbotron>
<h1>Books On My List</h1>
</Jumbotron>
{books.length ? (
<List>
{books.map(book => (
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

export default Saved;