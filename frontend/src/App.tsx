import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from "./components/main/Main"
import Menu from "./components/Menu"
import Catalog from "./components/catalog/Catalog"
import Product from "./components/product/Product"


function App() {
  return (
      <>
        <BrowserRouter>
            <Menu />
            
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/catalog/products/:id" element={<Product />} />
              </Routes>
        </BrowserRouter>
          
    </>
  )
}

export default App
