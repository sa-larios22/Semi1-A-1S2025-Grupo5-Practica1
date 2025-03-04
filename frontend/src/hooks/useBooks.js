import { useDispatch, useSelector } from 'react-redux';
import { onError, onGetBook, onLoading } from '../store';

export const useBooks = () => {

    const { books, book, loading, error } = useSelector(state => state.books);
    const dispatch = useDispatch();

    const startGetBook = async(id) => {
        
        dispatch(onLoading());

        try {
            // const { data } = await appApi.get(`/books/${id}`);

            const seachedBook = books.find(book => book.id === id);

            dispatch( 
                onGetBook(seachedBook)
        
            );

        } catch (error) {
            dispatch(onError(error));
        }
    }


    return {
        books,
        book,
        loading,
        error,
        startGetBook
    }
}