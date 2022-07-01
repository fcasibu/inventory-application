const userArgs = process.argv.slice(2);

const async = require('async');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const Chapter = require('./models/chapter');
const Club = require('./models/club');
const Thread = require('./models/thread');
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
const clubs = [];
const threads = [];

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

const createBook = async (
  title,
  photoURL,
  author,
  price,
  summary,
  genre,
  tag
) => {
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

const createThread = async (title, description, club, comments) => {
  try {
    const thread = new Thread({
      title,
      description,
      club,
      comments
    });
    const result = await thread.save();
    console.log('Thread has been created', result);
    threads.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createClub = async (name) => {
  try {
    const club = new Club({
      name
    });
    const result = await club.save();
    console.log('Club has been created', result);
    clubs.push(result);
  } catch (err) {
    console.error(err);
  }
};

const createAuthors = async () => {
  await Promise.all([
    createAuthor(
      'nevz',
      'https://cdn-icons-png.flaticon.com/512/1160/1160326.png?w=740'
    ),
    createAuthor(
      'Bevan',
      'https://cdn-icons-png.flaticon.com/512/1160/1160326.png?w=740'
    ),
    createAuthor(
      'Stone',
      'https://cdn-icons-png.flaticon.com/512/1160/1160326.png?w=740'
    ),
    createAuthor(
      'Blair',
      'https://cdn-icons-png.flaticon.com/512/1160/1160326.png?w=740'
    )
  ]);
};

const createGenres = async () => {
  await Promise.all([
    createGenre('Fantasy'),
    createGenre('Eastern'),
    createGenre('Harem'),
    createGenre('Shounen'),
    createGenre('Romance'),
    createGenre('Modern'),
    createGenre('Action'),
    createGenre('Martial Arts'),
    createGenre('Psychological'),
    createGenre('Adventure'),
    createGenre('Mystery'),
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
    createTag('Anti Hero'),
    createTag('Calm Protagonist'),
    createTag('Ruthless Protagonist'),
    createTag('Orphans'),
    createTag('Mind Control'),
    createTag('Mercenaries'),
    createTag('Merchants'),
    createTag('Magical Beasts'),
    createTag('Male Protagonist'),
    createTag('Female Protagonist'),
    createTag('Weak to Strong'),
    createTag('Romantic Subplot'),
    createTag('Soul Power'),
    createTag('Spatial Manipulation'),
    createTag('Time Skip'),
    createTag('Trickster'),
    createTag('Pets'),
    createTag('Modern Day')
  ]);
};

const createBooks = async () => {
  await Promise.all([
    createBook(
      'Test Book 1',
      'https://fivebooks.com/app/uploads/2010/09/no_book_cover.jpg',
      authors[0],
      10,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      [genres[0], genres[1]],
      [tags[0]]
    ),
    createBook(
      'Test Book 2',
      'https://fivebooks.com/app/uploads/2010/09/no_book_cover.jpg',
      authors[1],
      30,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      [genres[0], genres[1], genres[2]],
      [tags[0], tags[1], tags[2]]
    )
  ]);
};

const createChapters = async () => {
  await Promise.all([
    createChapter(
      'Chapter 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      books[0]
    ),
    createChapter(
      'Chapter 2',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      books[0]
    ),
    createChapter(
      'Chapter 1',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      books[1]
    )
  ]);
};

const createThreads = async () => {
  await Promise.all([
    createThread('About Chapter 1', 'Did you like it?', clubs[0], [
      'No',
      'Not really',
      'Chapter 1 and it is already bad LOL'
    ])
  ]);
};

const createClubs = async () => {
  await Promise.all([
    createClub('Test Book 1 Fan Club'),
    createClub('Test Book 1 Super Fans'),
    createClub('Test Book 2 Club')
  ]);
};

async.series(
  [
    createAuthors,
    createGenres,
    createTags,
    createClubs,
    createThreads,
    createBooks,
    createChapters
  ],
  (err, result) => {
    if (err) {
      console.error('Final:' + err);
    }
    console.log('Done');
    mongoose.disconnect();
  }
);
