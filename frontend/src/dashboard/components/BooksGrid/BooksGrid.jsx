import { useEffect } from 'react';
import { useBooks } from '../../../hooks';
import { BookCard } from './BookCard';

export const BooksGrid = () => {

    const { books, startGetBooks } = useBooks();

    useEffect(() => {
        startGetBooks();
    }
    , [])


    return (
        <>
            {
                books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))
            }
        </>

    )
}
