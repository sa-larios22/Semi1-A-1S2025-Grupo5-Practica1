import { Route, Routes } from "react-router-dom"
import { AdminBooks, Book, Books, Home, Profile } from "../pages"
import { Layout } from "../Layout"
export const DashboardRoutes = () => {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-books" element={<AdminBooks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book" element={<Book />} />
                <Route path="/books" element={<Books />} />
            </Routes>
        </Layout>
    )
}