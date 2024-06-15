import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./component/HomePage/HomePage";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import FilProduct from "./component/FilProduct/FilProduct";
import Login from "./component/login/Login.js";
import Register from "./component/Register/Register.js";
import SearchKey from "./component/Search/Search.js";
import Payment from "./component/ResultPayment/ResultPayment.js";
import { Provider } from "react-redux";
import store from "./store.js";

import HeaderAdmin from "./admin/HeaderAdmin/HeaderAdmin.js";
import ManagerProduct from "./admin/ManagerProduct/ManagerProduct.js";
import AddProduct from "./admin/ManagerProduct/AddProduct.js";
import EditProduct from "./admin/ManagerProduct/EditProduct.js";
import Order from "./component/Order/Order.js";
import History from "./component/Order/History.js";
import ManagerOrderAccept from "./admin/ManagerOrder/ManagerOrderAccept.js";
import ManagerOrderMove from "./admin/ManagerOrder/ManagerOrderMove.js";
import ManagerOrderFinish from "./admin/ManagerOrder/ManagerOrderFinish.js";
import ManagerOrderCancel from "./admin/ManagerOrder/ManagerOrderCancel.js";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/detail/:id"
            element={<ProductDetail></ProductDetail>}
          ></Route>

          <Route path="/order/payment" element={<Payment></Payment>}></Route>
          <Route
            path="/category/:id"
            element={<FilProduct></FilProduct>}
          ></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/search/:keyword"
            element={<SearchKey></SearchKey>}
          ></Route>
          <Route path="/order" element={<Order></Order>}></Route>
          <Route path="/order/history" element={<History></History>}></Route>

          {/* <Route
            path="/admin"
            element={<HeaderAdmin></HeaderAdmin>}
          ></Route> */}

          <Route
            path="/admin/products"
            element={<ManagerProduct></ManagerProduct>}
          ></Route>

          <Route
            path="/admin/products/add"
            element={<AddProduct></AddProduct>}
          ></Route>

          <Route
            path="/admin/products/edit/:id"
            element={<EditProduct></EditProduct>}
          ></Route>

          <Route
            path="/admin/orders/accept"
            element={<ManagerOrderAccept></ManagerOrderAccept>}
          ></Route>

          <Route
            path="/admin/orders/move"
            element={<ManagerOrderMove></ManagerOrderMove>}
          ></Route>

          <Route
            path="/admin/orders/finish"
            element={<ManagerOrderFinish></ManagerOrderFinish>}
          ></Route>
          <Route
            path="/admin/orders/cancel"
            element={<ManagerOrderCancel></ManagerOrderCancel>}
          ></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
