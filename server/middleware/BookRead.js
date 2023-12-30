import { EPub } from 'epub2';
import { parse } from "node-html-parser";
import { getBookId } from '../controllers/Books.js';
import { addUserProgress, addUserWishlist, getUserProgress, updateUserProgress } from '../controllers/Users.js';

/**
 * @query {book_name} book
 * @query {chapter_id} chapter
 * get list of chapters of a book
 * list sent as json
 * all chapters including no title chapters
 */
export const getContents = async (req, res) => {

  // check for user authentication
  if(!req.user) {
    console.log("Not Authorized");
    return res.status(401).json({error: "User unauthenticated"});
  }

  const book = req.query.book;
  const userHandle = req.user.handle;
  const bookId = (await getBookId(book))[0].id;


  if(! req.query.chapter){  // book contents
    try {

      const userProgress = await getUserProgress(userHandle, bookId);
      if (userProgress.length === 0) {
        const response = await addUserProgress(userHandle, bookId);
        console.log(response);
      }

      const epub = await EPub.createAsync("files/" + book + ".epub");
      return res.status(200).json({
        'contents' : epub.toc,  // for sidebar navigation
        'pages': epub.flow,  // for page navigation
        'progress': userProgress
      });  

    } catch (error) {
      return res.status(404).json({error: error});
    }
  } else { // chapter contents
    const chapter = req.query.chapter;
    try {
      const epub = await EPub.createAsync("files/" + book + ".epub");


      // update users book progress
      let chapterIndex;
      const foundChapter = epub.flow.find((c, i) => {
        if (c.id === chapter) {
          chapterIndex = i;
          return true;
        }
        return false;
      });

      if (!foundChapter) {
  // Handle the case where the chapter is not found in epub.flow
        console.error(`Chapter ${chapter} not found in the book`);
        return res.status(404).json({ error: "Chapter not found" });
      }
const progress = (chapterIndex+1)/epub.flow.length;
//const progress = book?.progress || 0; // Set a default value if progress is undefined
const response = await updateUserProgress(userHandle, bookId, chapterIndex, progress);
console.log(response);

      // get style as string from all the css files in the epub

let stylesheet = '';
const styles = Object.values(epub.manifest).filter(o => o["media-type"] === 'text/css');
for(let i=0; i<styles.length; i++){
  const [cssBuffer, mimeType] = await epub.getFileAsync(styles[i].id);
  stylesheet += cssBuffer.toString('utf-8');
}

      // get chapter from epub and parse
const chapterString = await epub.getChapterAsync(chapter);
const chapterElement = parse(chapterString);

      // replace all the image tag src with actual base64 buffer
const images = chapterElement.getElementsByTagName('img');
for(let i=0; i<images.length; i++) {
  const imgId = Object.values(epub.manifest).find(o => images[i].attrs.src.endsWith(o.href)).id;
  const [imageBuffer, mimeType] = await epub.getFileAsync(imgId);
  images[i].setAttribute("src", "data:" + mimeType + ";base64," + imageBuffer.toString('base64'));
}

      // replace all anchor tags with text
const links = chapterElement.getElementsByTagName('a');
for(let i=0; i<links.length; i++) {
  const text = links[i].innerHTML;
  links[i].replaceWith(text);
}

const retHTML = `
<!DOCTYPE html>
<head>
<style>
${stylesheet}
</style>
</head>
<body>
${chapterElement.innerHTML}
</body>
</html>
`;

return res.status(200).json({'chapter' : retHTML });

} catch (error) {
  return res.status(404).json({error: "Resource not found"});
}

}

};


// localhost:3050/wishlist?book=abc
export const wishlist = async (req, res, next) => {
  // check for user authentication
  if(!req.user) {
    console.log("Not Authorized");
    return res.status(401).json({error: "User unauthenticated"});
  }

  try {
    const book = req.query.book;
    const userHandle = req.user.handle;
    const bookId = (await getBookId(book))[0].id;

    const response = await addUserWishlist(userHandle, bookId);
    console.log(response);

    return res.status(200).json("success");

  } catch (e) {
    res.status(400).json({error: e})
  }  

}
