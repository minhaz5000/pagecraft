import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { EPub } from 'epub2';
import Jimp from 'jimp';
import editJsonFile from 'edit-json-file';
import { 
    addBookAuthor,
    addBookGenre, 
    addNewAuthor,
    addNewGenre, 
    addNewBook, 
    checkExistingAuthor, 
    checkExistingBook,
    checkExistingGenre
 } from "../controllers/Books.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_FOLDER = `${__dirname}/../files`;

export const uploadBook = async (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    var book = req.body;
    // check for duplicate book in database
    const response = await checkExistingBook(book);
    if(response.length == 0) {
        // book does not exist
        const response = await addNewBook(book);
        book.id = response.insertId;
    } else {
        book.id = response[0].id;
        return res.status(400).json({error : "Book Already Exists"});
    }
    // check for duplicate author in database
    if(typeof book.author === 'string') {
        book.author = [book.author];
    }   
    for(let author of book.author) {
        let author_id;
        const response = await checkExistingAuthor(author);
        if(response.length == 0) {
            const response = await addNewAuthor(author);
            author_id = response.insertId;
        } else {
            author_id = response[0].id;
        }

        // entry in author_book junction table
        const response2 = await addBookAuthor(author_id, book.id);
        console.log(response2);
    }
    // check for duplicate genre in database
    if(typeof book.genre === 'string') {
        book.genre = [book.genre];
    }   
    for(let genre of book.genre) {
        let genre_id;
        const response = await checkExistingGenre(genre);
        if(response.length == 0) {
            const response = await addNewGenre(genre);
            genre_id = response.insertId;
        } else {
            genre_id = response[0].id;
        }

        // entry in author_book junction table
        const response2 = await addBookGenre(book.id, genre_id);
        console.log(response2);
    }
    console.log(book);

    const ebookFile = req.files.ebook;
    ebookFile.mv(`${UPLOADS_FOLDER}/${book.title}.epub`, async (err) => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }

        // edit bookInfo.json file
        let file = editJsonFile("files/bookInfo.json");

        const epub = await EPub.createAsync("files/" + book.title +'.epub')  // Expensive (>500ms / book)
        const [coverData, mimeType] = await epub.getFileAsync(epub.metadata.cover);
        const img = await Jimp.read(coverData);  // Expensive (>200ms / book)
        const compressedCoverData = await img.resize(250,360).quality(50).getBufferAsync(mimeType); // Expensive (>500ms / book)
        var json = epub.metadata;
        json["summary"] = book.summary;
        json["cover"] = compressedCoverData.toString('base64');
        json["mimeType"] = mimeType;

        // append to bookInfo object
        file.set(book.title,json);

        file.save();

        res.json("success");
    })
}
