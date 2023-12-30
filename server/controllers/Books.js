import db from "../config/Database.js";

export const getAllBooks = async (count, genre) => { // done
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` LIMIT ?', 
            [count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getReadingBooks = async (handle, count) => { // done
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` INNER JOIN (SELECT book_id FROM  `reading` WHERE ? = `reading`.handle) as V2 ON `book`.id = V2.book_id LIMIT ?', 
            [handle, count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const  getCompletedBooks = async (handle, count) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` INNER JOIN (SELECT book_id FROM `reading` WHERE `reading`.progress > 98) AS V2 ON `book`.id = V2.book_id LIMIT ?', 
            [count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBucketBooks = async (handle, count) => { // done
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` INNER JOIN (SELECT book_id FROM  `wishlist` WHERE ? = `wishlist`.handle) as V2 ON `book`.id = V2.book_id LIMIT ?', 
            [handle, count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getRecentBooks = async (count) => { // done
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` ORDER BY `book`.added_on ASC LIMIT ?', 
            [count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getTrendingBooks = async (count) => { // done
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` INNER JOIN (SELECT book_id FROM  `reading` GROUP BY book_id ORDER BY COUNT(*) DESC LIMIT ?) AS V2 ON `book`.id = V2.book_id',
            [count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getEditorsPickBooks = async (count) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` LIMIT ?', 
            [count], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {string} title 
 * @returns array of strings
 * get all books containing `title`
 */
export const getLikeBooks = async (title, genre) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` WHERE `title` LIKE ?', 
            ['%'+title+'%'], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// search is done on the basis of title, author, isbn, topic
export const getBooksBasedOnTitle = async (title) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `book`.title LIKE ?', 
            ['%'+title+'%'], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBooksBasedOnAuthor = async (authorName) => {
    try {
        console.log(authorName);
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `book`.id IN (SELECT book_id FROM  `author_book` WHERE `author_book`.author_id IN (SELECT id FROM  `author` WHERE `author`.name LIKE ?))', 
            ['%'+authorName+'%'], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBooksBasedOnISBN = async (isbn) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `book`.isbn LIKE ?', 
            ['%'+isbn+'%'], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBooksBasedOnTopic = async (topicName) => {
    try {
        topicName = topicName.toLowerCase();
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `book`.id IN (SELECT book_id FROM  `book_genre` WHERE `book_genre`.genre_id IN (SELECT id FROM  `genre` WHERE `genre`.name LIKE ?))', 
            ['%'+topicName+'%'], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBooksBasedOnLanguage = async (language) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `book`.language = ?', 
            [language], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBooksBasedOnEdition = async (edition) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `book`.edition = ?', 
            [edition], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// search is done on the basis of title, author, isbn, topic

export const checkExistingBook = async (book) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `book` WHERE `title`=? AND `isbn`=? AND `edition`=? AND `publisher`=? AND `publishing_year`=?', 
            [book.title, book.isbn, book.edition, book.publisher, book.publishing_year], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addNewBook = async (book) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('INSERT INTO  `book` (`title`, `added_on`, `rating`, `language`, `publisher`, `isbn`, `publishing_year`, `edition`) VALUES (?, now(), ?, ? , ? , ? , ?, ?)', 
            [book.title, null, book.language, book.publisher, book.isbn, book.publishing_year, book.edition], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const checkExistingAuthor = async (author) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `author` WHERE `name`=?', 
            [author], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addNewAuthor = async (author) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('INSERT INTO `author` (`name`) VALUES (?)', 
            [author], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addBookAuthor = async (author_id, book_id) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('INSERT INTO `author_book` VALUES (?, ?)', 
            [author_id, book_id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const checkExistingGenre = async (genre) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM `genre` WHERE `name`=?', 
            [genre], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addNewGenre = async (genre) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('INSERT INTO `genre` (`name`) VALUES (?)', 
            [genre], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addBookGenre = async (book_id, genre_id) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('INSERT INTO `book_genre` VALUES (?, ?)', 
            [book_id, genre_id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBookInfo = async (id) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT * FROM  `book` WHERE `id` = ?', 
            [id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBookGenre = async (id) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT name FROM `genre` INNER JOIN `book_genre` ON `genre`.id = `book_genre`.genre_id WHERE book_id = ?', 
            [id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBookAuthors = async (id) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT name FROM `author` INNER JOIN `author_book` ON `author`.id = `author_book`.author_id WHERE book_id = ?', 
            [id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getBookId = async (title) => {
    try {
        const response = await new Promise((resolve, reject) => {
            db.execute('SELECT id FROM `book` WHERE title = ?', 
            [title], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}