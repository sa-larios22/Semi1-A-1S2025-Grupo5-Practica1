import { useDispatch, useSelector } from 'react-redux';
import { onError, onGetBook, onLoading, onGetUserBooks, onGetBooks } from '../store';
import appApi from '../api/appApi';
import { useNavigate } from 'react-router-dom';

export const useBooks = () => {

    const { books, book, loading, error, userBooks } = useSelector(state => state.books);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startGetBook = async(id, slugBook) => {

        try {
            const { data } = await appApi.get(`/books/${id}`);

            console.log(data);

            dispatch( onGetBook(data));

            navigate(`/book/${slugBook}`);

        } catch (error) {
            dispatch(onError(error));
        }
    }

    const startReadBook = async(id) => {
        try {
            const { data } = await appApi.get(`/books/${id}`);

            console.log(data);

            dispatch( onGetBook(data));

            navigate(`/view-book`);

        } catch (error) {
            dispatch(onError(error));
        }
    }

    const startGetUserBooks = async() => {
        
        dispatch(onLoading());

        try {
            const { data } = await appApi.get(`/purchases/${user.id}`);

            const myBooks = data.map(purchase => purchase.book.id);

            const userBooks = books.filter(book => myBooks.includes(book.id));


            dispatch(
                onGetUserBooks(userBooks)
            );

        } catch (error) {
            dispatch(onError(error));
        }
    }

    const startGetBooks = async() => {
        dispatch(onLoading());

        try {
            const { data } = await appApi.get("/books");

            dispatch( 
                onGetBooks(data)
            );

        } catch (error) {
            dispatch(onError(error))
        }
    }

    const startBook = async({ title, author, coverImage, synopsis, categories = [], year, pdfUrl }) => {
        
        dispatch(onLoading());

        try {
            const formDataPdf = new FormData();
            formDataPdf.append("file", pdfUrl);
            const responsePdf = await appApi.post("auth/upload-profile-picture", formDataPdf, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (responsePdf.data.status !== 201) {
                return;
            }

            const formDataImage = new FormData();
            formDataImage.append("file", coverImage);
            const responseImage = await appApi.post("auth/upload-profile-picture", formDataImage, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (responseImage.data.status !== 201) {
                return;
            }

            const response = await appApi.post("books", {
                title,
                author,
                coverImage: responseImage.data.url,
                synopsis,
                categories: categories[0],
                year: Number(year),
                pdfUrl: responsePdf.data.url
            }); 

            if (response.data.message !== "Book added successfully") {
                return;
            }

            navigate('/books')

        } catch (error) {
            dispatch(onError(error));
        }
    }

    const onEditBook = async() => {}

    const onDeleteBook = async(id) => {
        dispatch(onLoading());

        try {
            const { data } = await appApi.delete(`/books/${id}`);

            if (data.message !== "Book deleted successfully") {
                return;
            }

            const newBooks = books.filter(book => book.id !== id);

            dispatch(
                onGetBooks(newBooks)
            );

            navigate('/books');

        } catch (error) {
            dispatch(onError(error));
        }
    }

    const startBuyBook = async(id) => {
        try {
            const { data } = await appApi.post(`/purchases`, {
                userId: user.id,
                bookId: id
            });

            if (data.message !== "Purchase successful") {
                return;
            }

            navigate('/books');


        } catch (error) {
            dispatch(onError(error));
        }
    }


    return {
        books,
        book,
        loading,
        userBooks,
        error,
        startGetBook,
        startGetUserBooks,
        startGetBooks,
        startBook,
        startReadBook,
        onEditBook,
        onDeleteBook,
        startBuyBook
    }
}