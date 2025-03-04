import { createSlice } from '@reduxjs/toolkit';


export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                image: '../../../public/cover_book.png',
                description: 'The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 2,
                title: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                image: '../../../public/cover_book.png',
                description: 'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945-1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 3,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                image: '../../../public/cover_book.png',
                description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 4,
                title: '1984',
                author: 'George Orwell',
                image: '../../../public/cover_book.png',
                description: 'Nineteen Eighty-Four: A Novel, often referred to as 1984, is a dystopian social science fiction novel by the English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 5,
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                image: '../../../public/cover_book.png',
                description: 'Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 6,
                title: 'The Diary of a Young',
                author: 'Anne Frank',
                image: '../../../public/cover_book.png',
                description: 'The Diary of a ',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 7,
                title: 'The Book Thief',
                author: 'Markus Zusak',
                image: '../../../public/cover_book.png',
                description: 'The Book Thief is a historical novel by Australian author Markus Zusak, and is his most popular work.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 8,
                title: 'The Lord of the Rings',
                author: 'J.R.R. Tolkien',
                image: '../../../public/cover_book.png',
                description: 'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien\'s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 9,
                title: 'The Kite Runner',
                author: 'Khaled Hosseini',
                image: '../../../public/cover_book.png',
                description: 'The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003 by Riverhead Books, it tells the story',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 10,
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                image: '../../../public/cover_book.png',
                description: 'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.',
                category: ['Novel', 'Fiction', 'Classic']
            }
        ],
        userBooks: [
            {
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                image: '../../../public/cover_book.png',
                description: 'The Great Gatsby is a novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 3,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                image: '../../../public/cover_book.png',
                description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, widely read in high schools and middle schools in the United States, it has become a classic of modern American literature, winning the Pulitzer Prize.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 6,
                title: 'The Diary of a Young',
                author: 'Anne Frank',
                image: '../../../public/cover_book.png',
                description: 'The Diary of a ',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 8,
                title: 'The Lord of the Rings',
                author: 'J.R.R. Tolkien',
                image: '../../../public/cover_book.png',
                description: 'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien\'s 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.',
                category: ['Novel', 'Fiction', 'Classic']
            },
            {
                id: 9,
                title: 'The Kite Runner',
                author: 'Khaled Hosseini',
                image: '../../../public/cover_book.png',
                description: 'The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003 by Riverhead Books, it tells the story',
                category: ['Novel', 'Fiction', 'Classic']
            }
        ],
        book: {},
        loading: false,
        error: null
    },
    reducers: {
        onLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        onGetBooks: (state, { payload }) => {
            state.books = payload;
            state.loading = false;
        },
        onGetBook: (state, { payload }) => {
            state.book = payload;
            state.loading = false;
        },
        onGetUserBooks: (state, { payload }) => {
            state.userBooks = payload;
            state.loading = false;
        },
        onError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        }
    }
});

export const { onLoading, onGetBooks, onGetBook, onGetUserBooks, onError } = bookSlice.actions;