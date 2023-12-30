import db from "../config/Database.js";

export const getAllUsers = async(count) => {
  try {
    const response = await new Promise((resolve, reject) => {
        db.execute('SELECT * FROM `user` LIMIT ?', 
        [count], (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
        })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async(emailOrHandle) => {
  try {
    const user = await new Promise((resolve, reject) => {
      db.execute('SELECT * FROM `user` WHERE `handle`=? OR `email`=?',
      [emailOrHandle, emailOrHandle],
      (err, results) => {
        if(err) reject (err.message);
        resolve(results);
      })
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export const addUser = async(handle, email, firstName, lastName, password) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.execute(
        'INSERT INTO `user` (`handle`, `email`, `password`, `first_name`, `last_name`) VALUES (?, ?, ?, ?, ?)',
        [handle, email, password, firstName, lastName], 
        (err, results) => {
        if (err) {
            reject(err.message);
        }
        resolve(results);
      })
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const addUserProgress = async (handle, bookId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.execute(
        'INSERT INTO `reading` VALUES (?, ?, ?, ?)',
        [handle, bookId, 0, 0],
        (err, results) => {
          if (err) {
            reject(err.message);
          }
          resolve(results);
        }
      )
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const getUserProgress = async (handle, bookId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.execute(
        'SELECT * FROM `reading` WHERE handle = ? AND book_id = ?',
        [handle, bookId],
        (err, results) => {
          if (err) {
            reject(err.message);
          }
          resolve(results);
        }
      )
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const updateUserProgress = async (handle, bookId, chapterIndex, progress) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.execute(
        'UPDATE `reading` SET current_index = ?, progress = ? WHERE handle = ? AND book_id = ?',
        [chapterIndex, progress, handle, bookId],
        (err, results) => {
          if (err) {
            reject(err.message);
          }
          resolve(results);
        }
      )
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const addUserWishlist = async (handle, bookId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.execute(
        'INSERT INTO `wishlist` VALUES (?, ?)',
        [handle, bookId],
        (err, results) => {
          if (err) {
            reject(err.message);
          }
          resolve(results);
        }
      )
    });
    return response;
  } catch (error) {
    throw error;
  }
}