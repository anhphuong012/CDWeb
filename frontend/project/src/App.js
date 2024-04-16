import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./component/HomePage/HomePage";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import FilProduct from "./component/FilProduct/FilProduct";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/detail" element={<ProductDetail></ProductDetail>}></Route>
        <Route path="/category" element={<FilProduct></FilProduct>}></Route>
      </Routes>
    </div>
  );
}

export default App;
