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

export default function AddProduct() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ Open the file input box on click of another element
    inputRef.current.click();
  };
  //   const handleFileChange = (event) => {
  //     const fileObj = event.target.files && event.target.files[0];
  //     if (!fileObj) {
  //       return;
  //     }

  //     console.log("fileObj is", fileObj);

  //     // 👇️ Reset file input
  //     event.target.value = null;

  //     // 👇️ Is now empty
  //     console.log(event.target.files);

  //     // 👇️ Can still access the file object here
  //     console.log(fileObj);
  //     console.log(fileObj.name);
  //   };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descreption, setDescreption] = useState("");
  const [selectCategory, setSelectCategory] = useState(1);

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
    if (!selectedFile || name == "" || price == "") {
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

      await axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/products/product",

        headers: {
          "Content-Type": `multipart/form-data boundary=${formData._boundary}`,
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },
        mode: "cors",
        data: formData,
      }).then(function (response) {
        if (response.status == 201) {
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

  useEffect(() => {
    fetchData();
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
              {/* <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <button onClick={handleClick}>Open file upload box</button> */}
              {/* <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={inputRef}
                />
                <button onClick={handleClick}>Chọn hình ảnh</button> */}

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
              {category != null && (
                <TextField
                  id="category"
                  select
                  label="Loại"
                  defaultValue={category[0].id}
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
              Thêm
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
