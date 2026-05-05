import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./components/main/Main"
import Menu from "./components/Menu"
import Catalog from "./components/catalog/Catalog"
import Product from "./components/product/Product"
import Registration from "./components/profile/Registration"
import Auth from "./components/profile/Auth"
import Profile from "./components/profile/Profile"
import { CookiesProvider } from "react-cookie"
import Blog from "./components/blog/Blog"
import Basket from "./components/basket/Basket"


function App() {
    return (
        <>
            <CookiesProvider>
                <BrowserRouter>
                    <Menu />

                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/products/:id" element={<Product />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/basket" element={<Basket/>} />
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>


        </>
    )
}

export default App
