import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./component/HomePage/HomePage";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import FilProduct from "./component/FilProduct/FilProduct";
import Login from "./component/login/Login.js";
import Register from "./component/Register/Register.js";
import SearchKey from "./component/Search/Search.js";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/detail/:id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="/category/:id" element={<FilProduct></FilProduct>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/search/:keyword"
          element={<SearchKey></SearchKey>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
