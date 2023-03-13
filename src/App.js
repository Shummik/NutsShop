import { Navigate, Route, Routes } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog";
import Home from "./pages/Home/Home";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Basket from "./pages/Basket/Basket";
import Delivery from "./pages/Delivery/Delivery";
import CatalogCategory from "./pages/CatalogCategory/CatalogCategory";
import Layout from "./pages/Layout/Layout";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:categoryName" element={<CatalogCategory />} />
          <Route path="basket" element={<Basket />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
