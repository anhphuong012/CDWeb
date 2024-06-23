import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "./managerProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { useRef, useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descreption, setDescreption] = useState("");
  const [selectCategory, setSelectCategory] = useState(null);

  const [loadCate, setIsLoadCate] = useState(false);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);

      // Tạo URL để xem trước ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      console.log("chooose file");
    } else {
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (name == "" || price == "") {
      toast.error("Tên sản phẩm, giá và hình ảnh không được để trống!");
    } else {
      // const formData = new FormData();
      // console.log(
      //   name +
      //     "-" +
      //     price +
      //     "-" +
      //     selectedFile +
      //     "-" +
      //     selectCategory +
      //     "-" +
      //     selectedFile.name
      // );
      // formData.append("file\n", selectedFile, selectedFile.name);
      // formData.append(
      //   "productDTO",
      //   // `{
      //   // \n
      //   // name: ${name},
      //   // price: ${price},
      //   // descreption: ${descreption},
      //   // image: "",
      //   // category_id: ${selectCategory}
      //   // }`
      //   '{\n    "name":"Sản phẩm mới",\n    "price":"1200000",\n    "descreption":"",\n    "image" :"",\n    "category_id":1\n}'
      // );

      const formData = axios.toFormData({
        file: selectedFile,
        productDTO: `{\n    "name":"${name}",\n    "price":"${price}",\n    "descreption":"${descreption}",\n    "image" :"",\n    "category_id":${selectCategory}\n}`,
      });
      for (const value of formData.values()) {
        console.log(value);
      }
      console.log(selectedFile);
      const token = sessionStorage.getItem("");

      await axios({
        method: "put",
        maxBodyLength: Infinity,
        url: "/api/products/product/" + id,

        headers: {
          "Content-Type": `multipart/form-data boundary=${formData._boundary}`,
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },
        mode: "cors",
        data: formData,
      }).then(function (response) {
        if (response.status == 200) {
          window.location.href = "/admin/products";
        }
      });
    }
  };

  const fetchData = async () => {
    const response = await axios.get(`/api/categories`);
    console.log(response.data);

    if (response.status == 200) {
      console.log(response.data);
      if (response.data.status == "OK") {
        setCategory(response.data.data);

        console.log(category);
      }
    }
  };

  const fetchItem = async () => {
    const response = await axios.get(`/api/products/product/${id}`);
    console.log(response.data);

    if (response.status == 200) {
      console.log(response.data);
      if (response.data.status == "OK") {
        setSelectCategory(response.data.data.category);
        setName(response.data.data.name);
        setPrice(response.data.data.price);
        setDescreption(response.data.data.descreption);
        setPreview(response.data.data.image);
        setIsLoadCate(true);
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    } else {
      fetchData();
      fetchItem();
    }
  }, []);
  console.log(selectCategory);
  return (
    <div className="container-main mb-5">
      <HeaderAdmin></HeaderAdmin>

      <div className="main-content">
        <h3 className="title-manager">Thêm sản phẩm</h3>
        <div className="form-add">
          <Box
            sx={{
              width: "60%",
              maxWidth: "100%",
            }}
          >
            <div>
              <TextField
                fullWidth
                label="Tên Sản Phẩm"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mt-3">
              <TextField
                fullWidth
                label="Giá"
                id="price"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </Box>
          <div className="mt-3">
            <div
              style={{
                marginLeft: "-50%",
                color: "#000",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              <span>Hình sản phẩm</span>
            </div>
            <div className={"d-flex"} style={{ margin: "0px 10%" }}>
              <div
                style={{
                  flex: 1,
                  width: "150px",
                  height: "180px",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "50%", height: "100%" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="fileImage"
                />
              </div>
              {/* {preview && (
                  <div>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                  </div>
                )} */}
            </div>
          </div>

          <Box
            sx={{
              width: "60%",
              maxWidth: "100%",
            }}
          >
            <div className="mt-3">
              <TextField
                fullWidth
                label="Mô tả"
                id="descreption"
                multiline
                rows={4}
                value={descreption}
                onChange={(e) => {
                  setDescreption(e.target.value);
                }}
              />
            </div>

            <div className="mt-3">
              {category != null && loadCate && (
                <TextField
                  id="category"
                  select
                  label="Loại"
                  defaultValue={selectCategory == null ? 1 : selectCategory}
                  fullWidth
                  onChange={(e) => {
                    setSelectCategory(e.target.value);
                  }}
                >
                  {category != null &&
                    category.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            </div>
          </Box>

          <div className="mt-4 mb-5">
            <button className="btn btn-success mr-4" onClick={handleSubmit}>
              Sửa
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              Trở về
            </button>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}
