// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from "./components/main/Main";
// import Menu from "./components/Menu";
// import Catalog from "./components/catalog/Catalog";
// import Product from "./components/product/Product";
// import Registration from "./components/profile/Registration";
// import Auth from "./components/profile/Auth";
// import { CookiesProvider } from "react-cookie";
// import Blog from "./components/blog/Blog";
// import Basket from "./components/basket/Basket";
// import Footer from "./components/Footer";
// import ProfileLayout from "./components/profile/Profile";
// import MyProfile from "./components/profile/pages/MyProfile";
// import Favorites from "./components/profile/pages/Favourites";
// import Cart from "./components/profile/pages/Cart";

// function App() {
//   return (
//     <>
//       <CookiesProvider>
//         <BrowserRouter>
//           <Menu />
//           <Routes>
//             <Route path="/" element={<Main />} />
//             <Route path="/catalog" element={<Catalog />} />
//             <Route path="/catalog/products/:id" element={<Product />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/profile" element={<ProfileLayout />}>
//               <Route path="me" element={<MyProfile />} />
//               <Route path="favorites" element={<Favorites />} />
//               <Route path="cart" element={<Cart />} />
//             </Route>
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/basket" element={<Basket />} />
//           </Routes>
//           <Footer />
//         </BrowserRouter>
//       </CookiesProvider>
//     </>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Main from "./components/main/Main";
import Menu from "./components/Menu";
import Catalog from "./components/catalog/Catalog";
import Product from "./components/product/Product";
import Registration from "./components/profile/Registration";
import Auth from "./components/profile/Auth";
import Blog from "./components/blog/Blog";
import Basket from "./components/basket/Basket";
import Footer from "./components/Footer";

import ProfileLayout from "./components/profile/Profile";
import MyProfile from "./components/profile/pages/MyProfile";
import Favorites from "./components/profile/pages/Favourites";
import Cart from "./components/profile/pages/Cart";

import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Menu />

        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/catalog" element={<Catalog />} />

          <Route path="/catalog/products/:id" element={<Product />} />

          <Route path="/registration" element={<Registration />} />

          <Route path="/auth" element={<Auth />} />

          {/* PROFILE */}

          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Navigate to="me" replace />} />

            <Route path="me" element={<MyProfile />} />

            <Route path="favorites" element={<Favorites />} />

            <Route path="cart" element={<Cart />} />
          </Route>

          <Route path="/blog" element={<Blog />} />

          <Route path="/basket" element={<Basket />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
