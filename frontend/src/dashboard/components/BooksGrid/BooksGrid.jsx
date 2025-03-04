import { useBooks } from '../../../hooks';
import { BookCard } from './BookCard';

export const BooksGrid = () => {

    const { books } = useBooks();

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
