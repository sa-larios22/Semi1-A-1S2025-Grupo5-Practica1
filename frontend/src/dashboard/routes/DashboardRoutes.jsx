import { Route, Routes } from "react-router-dom"
import { AdminBooks, Book, Books, EditBook, Home, Profile, SearchBooks } from "../pages"
import { Layout } from "../Layout"
import { ViewBook } from "../pages/ViewBook"
export const DashboardRoutes = () => {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-books" element={<AdminBooks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book/:id" element={<Book />} />
                <Route path="/edit-book/" element={<EditBook />} />
                <Route path="/search/:term" element={<SearchBooks />} />
                <Route path="/books" element={<Books />} />
                <Route path="/view-book" element={<ViewBook />} />
            </Routes>
        </Layout>
    )
}