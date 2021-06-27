const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  googleBooksId: { type: String },
    googleBooksLink: { type: String },
    volumeInfo: {
        title: { type: String },
        authors: [{ type: String }],
        publisher: { type: String },
        publishedDate: { type: String },
        description: { type: String },
        categories: [{ type: String }],
        imageLinks: {
            smallThumbnail: { type: String },
            thumbnail: { type: String }
        },
        previewLink: { type: String }
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
