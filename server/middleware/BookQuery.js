import editJsonFile from "edit-json-file";
import {
  getAllBooks,
  getBookAuthors,
  getBookGenre,
  getBooksBasedOnAuthor,
  getBooksBasedOnISBN,
  getBooksBasedOnTitle,
  getBooksBasedOnTopic,
  getBooksBasedOnLanguage,
  getBooksBasedOnEdition,
  getBucketBooks,
  getCompletedBooks,
  getEditorsPickBooks,
  getLikeBooks,
  getReadingBooks,
  getRecentBooks,
  getTrendingBooks
} from "../controllers/Books.js";
import { getUserProgress } from "../controllers/Users.js";

/**
 *
 * @param {book_table_entry} book
 * @returns book metadata and cover
 * Gets entry from database table and opens the file to get metadata.
 * Opens Book Cover file, compresses and sends as base64 encoded string
 */
async function getBookData(handle, book) {
  let file = editJsonFile("files/bookInfo.json");

  // get book info from database
  book.genre = await getBookGenre(book.id);
  book.authors = await getBookAuthors(book.id);

  // get progress info form database
  book.progress = (await getUserProgress(handle, book.id))[0];

  book.metadata = file.get(book.title);
  if (!book.metadata) console.log(book.title);
  return book;
}


async function getBookDataUnAuth(book) {
  let file = editJsonFile("files/bookInfo.json");

  // get book info from database
  book.genre = await getBookGenre(book.id);
  book.authors = await getBookAuthors(book.id);

  book.metadata = file.get(book.title);
  if (!book.metadata) console.log(book.title);
  return book;
}

/**
 *
 * @param {query_type} qType
 * @param {query_argument} qArg
 * @returns list of books matching criteria
 * Get a list of books following query_type. If searching by string query_argument is a string
 */
async function getBookList(handle, qType, count, genre) {
  const books = await new Promise((resolve, reject) => {
    if (qType === "all") resolve(getAllBooks(count, genre));
    else if (qType === "reading") resolve(getReadingBooks(handle, count));
    else if (qType === "completed") resolve(getCompletedBooks(handle, count));
    else if (qType === "bucket") resolve(getBucketBooks(handle, count));
    else if (qType === "recent") resolve(getRecentBooks(count));
    else if (qType === "trending") resolve(getTrendingBooks(count));
    else if (qType === "editor") resolve(getEditorsPickBooks(count));
    else if (qType === "search") resolve(getLikeBooks(count, genre));
    else reject(new Error("invalid request"));
  });
  return books;
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns json containing book list
 */
export const query = async (req, res) => {
  if (!req.user) {
    console.log("Not Authorized");
    return res.status(401).json({ error: "User unauthenticated" });
  }

  const handle = req.user.handle;
  const qType = req.params.qType; // The type of query (list criteria)
  const count = req.query.count ? req.query.count : "10"; // The number of results returned
  const genre = req.query.genre ? req.query.genre.split(",") : []; // advanced search by filtering genre

  // Initialize empty return JSON
  let retJson = {
    books: [],
  };

  try {
    let books = await getBookList(handle, qType, count, genre);
    for (const book of books) {
      const json = await getBookData(req.user.handle, book);
      retJson["books"].push(json);
    }
    return res.status(200).send(retJson);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns json containing book list
 */
export const search = async (req, res) => {
  
  if (req.query.query) {
    const keyword = req.query.query; // The type of query (list criteria)

    // Initialize empty return JSON
    let retJson = {
      books: [],
    };

    try {
      let authorMatched = await getBooksBasedOnAuthor(keyword);
      let titleMatched = await getBooksBasedOnTitle(keyword);
      let isbnMatched = await getBooksBasedOnISBN(keyword);
      let topicMatched = await getBooksBasedOnTopic(keyword);

      let books = [
        ...authorMatched,
        ...titleMatched,
        ...isbnMatched,
        ...topicMatched,
      ];

      let ids = [];

      for (const book of books) {
        if (!ids.includes(book.id)) {
          ids.push(book.id);
        }
      }

      console.log(ids);

      if (books.length === 0) {
        console.log("No books found");
      }

      for (const book of books) {
        if (ids.includes(book.id)) {
          const json = await getBookDataUnAuth(book);
          retJson["books"].push(json);
          ids.splice(ids.indexOf(book.id), 1);
          console.log(ids);
        }
      }
      

      console.log(retJson);

      return res.status(200).send(retJson);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error });
    }
  } else {
    // Initialize empty return JSON
    let retJson = {
      books: [],
    };

    try {
      let books = [];
      let ids = [];
      if (req.query.author) {
        let authorMatched = await getBooksBasedOnAuthor(req.query.author);
        books = [...books, ...authorMatched];
      }
      if (req.query.title) {
        let titleMatched = await getBooksBasedOnTitle(req.query.title);
        books = [...books, ...titleMatched];
      }
      if (req.query.isbn) {
        let isbnMatched = await getBooksBasedOnISBN(req.query.isbn);
        books = [...books, ...isbnMatched];
      }
      if (req.query.genre) {
        let genreMatched = await getBooksBasedOnTopic(req.query.genre);
        books = [...books, ...genreMatched];
      }

      //Language & edition

      if (req.query.language) {
        let languageMatched = await getBooksBasedOnLanguage(req.query.language);
        books = [...books, ...languageMatched];
      }

      if (req.query.edition) {
        let editionMatched = await getBooksBasedOnEdition(req.query.edition);
        books = [...books, ...editionMatched];
      }

      if (books.length === 0) {
        console.log("No books found");
      }

      for (const book of books) {
        if (!ids.includes(book.id)) {
          ids.push(book.id);
        }
      }

      console.log(ids);

      for (const book of books) {
        if (ids.includes(book.id)) {
          const json = await getBookDataUnAuth(book);
          retJson["books"].push(json);
          ids.splice(ids.indexOf(book.id), 1);
          console.log(ids);
        }
      }

      return res.status(200).send(retJson);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error });
    }
  }
};
