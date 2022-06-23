const userArgs = process.argv.slice(2);

const async = require('async');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const Chapter = require('./models/chapter');
const Club = require('./models/club');
const Comment = require('./models/comment');
const Discussion = require('./models/discussion');
const Member = require('./models/member');
const Genre = require('./models/genre');
const Tag = require('./models/tag');

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const authors = [];
const genres = [];
const tags = [];
const books = [];
const chapters = [];
const comments = [];
const clubs = [];
const members = [];
const discussions = [];

const createAuthor = async (name, photoURL) => {
  try {
    const author = new Author({
      name,
      photoURL
    });
    const result = await author.save();
    console.log('Author has been created', result);
    authors.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createGenre = async (name) => {
  try {
    const genre = new Genre({
      name
    });
    const result = await genre.save();
    console.log('Genre has been created', result);
    genres.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createTag = async (name) => {
  try {
    const tag = new Tag({
      name
    });
    const result = await tag.save();
    console.log('Tag has been created', result);
    tags.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createBook = async (title, photoURL, author, price, summary, genre, tag) => {
  try {
    const book = new Book({
      title,
      summary,
      photoURL,
      author,
      price,
      genre,
      tag
    });
    const result = await book.save();
    console.log('Book has been created', result);
    books.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createChapter = async (title, text, book) => {
  try {
    const chapter = new Chapter({
      title,
      text,
      book
    });
    const result = await chapter.save();
    console.log('Chapter has been created', result);
    chapters.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createComment = async (name, text, book) => {
  try {
    const comment = new Comment({
      name,
      comment: text,
      book
    });
    const result = await comment.save();
    console.log('Comment has been created', result);
    comments.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createClub = async (name, book) => {
  try {
    const club = new Club({
      name,
      book
    });
    const result = await club.save();
    console.log('Club has been created', result);
    clubs.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createMember = async (name, club) => {
  try {
    const member = new Member({
      name,
      club
    });
    const result = await member.save();
    console.log('Member has been created', result);
    members.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createDiscussion = async (comment, club) => {
  try {
    const discussion = new Discussion({
      comment,
      club
    });
    const result = await discussion.save();
    console.log('Discussions has been created', result);
    discussions.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createAuthors = async () => {
  await Promise.all([
    createAuthor('nevz', 'https://picsum.photos/536/354'),
    createAuthor('Alex', 'https://picsum.photos/536/354'),
    createAuthor('Max', 'https://picsum.photos/536/354'),
    createAuthor('Frank', 'https://picsum.photos/536/354')
  ]);
};

const createGenres = async () => {
  await Promise.all([
    createGenre('Fantasy'),
    createGenre('Eastern'),
    createGenre('Modern'),
    createGenre('Action'),
    createGenre('Martial Arts'),
    createGenre('Tragedy'),
    createGenre('Mature'),
    createGenre('Xianxia'),
    createGenre('Wuxia'),
    createGenre('Xuanhuan')
  ]);
};

const createTags = async () => {
  await Promise.all([
    createTag('Game Elements'),
    createTag('Calm Protagonist'),
    createTag('Male Protagonist'),
    createTag('Female Protagonist'),
    createTag('Weak to Strong'),
    createTag('Roantic Subplot'),
    createTag('Pets'),
    createTag('Modern Day')
  ]);
};

const createBooks = async () => {
  await Promise.all([
    createBook(
      'Test Book 1',
      'https://picsum.photos/536/354',
      authors[0],
      54,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      [genres[0], genres[1]],
      [tags[0]]
    ),
    createBook(
      'Test Book 2',
      'https://picsum.photos/536/354',
      authors[1],
      99,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      [genres[0], genres[1], genres[2]],
      [tags[0], tags[1], tags[2]]
    )
  ]);
};

const createChapters = async () => {
  await Promise.all([
    createChapter(
      'Test Chapter 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      books[0]
    ),
    createChapter(
      'Test Chapter 2',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      books[0]
    ),
    createChapter(
      'Another Test Chapter 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      books[1]
    )
  ]);
};

const createComments = async () => {
  await Promise.all([
    createComment('nevz', 'This is my book buy it pls', books[0]),
    createComment('anon', 'This book sucks', books[0]),
    createComment('i_love_novels', 'This is so great!', books[1])
  ]);
};

const createClubs = async () => {
  await Promise.all([
    createClub('Test Book 1 Fan Club', books[0]),
    createClub('Test Book 1 Super Fans', books[0]),
    createClub('Test Book 2 Club', books[1])
  ]);
};

const createMembers = async () => {
  await Promise.all([createMember('nevz', clubs[0]), createMember('book_enjoyer', clubs[0])]);
};

const createDiscussions = async () => {
  await Promise.all([
    createDiscussion('Im excited for the next chapter!', clubs[0]),
    createDiscussion('So am I!', clubs[0])
  ]);
};

async.series(
  [
    createAuthors,
    createGenres,
    createTags,
    createBooks,
    createChapters,
    createComments,
    createClubs,
    createMembers,
    createDiscussions
  ],
  (err, result) => {
    if (err) {
      console.error('Final:' + err);
    }
    console.log('Done');
    mongoose.connection.close();
  }
);
