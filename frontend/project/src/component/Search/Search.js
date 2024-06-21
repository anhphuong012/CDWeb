import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Card from "../HomePage/CardProduct";
import RangeSlider from "react-range-slider-input";
import { useParams } from "react-router-dom";

import axios from "axios";
import "react-range-slider-input/dist/style.css";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./searchItem.css";

export default function SearchKey() {
  const [open, setOpen] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("");
  const [price, setPrice] = useState({ min: 0, max: 1000000 });
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [checkboxes, setCheckboxes] = useState({
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });

  const params = useParams();
  const keyword = params.keyword;
  console.log("key:" + keyword);
  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: !checkboxes[checkboxName],
    });
  };

  const fetchData = async (keyword) => {
    const response = await axios.get(`/api/products?name=${keyword}`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        setTemp(response.data.data);
      }
    }
  };

  const handleFilter = () => {
    const trueValues = Object.entries(checkboxes)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => key);

    var result = [];
    data.map((item) => {
      item.sizes.map((size) => {
        if (trueValues.includes(size.size)) {
          if (!result.includes(item)) {
            result.push(item);
          }
        }
      });

      const min = parseInt(minPrice, 10);
      const max = parseInt(maxPrice, 10);

      console.log(min);

      console.log(max);
      if (min == NaN || max == NaN) {
      } else {
        var check =
          minPrice > maxPrice
            ? max <= item.price && item.price <= min
            : min <= item.price && item.price <= max;

        if (check && !result.includes(item)) {
          result.push(item);
        }
      }
    });
    console.log("Result:" + result);
    setData(result);
  };

  useEffect(() => {
    fetchData(keyword);
  }, []);
  return (
    <div>
      <Header></Header>
      <section style={{ marginTop: "7rem", marginBottom: "7rem" }}>
        {/* <div role="presentation" className="mb-3 breadcrum">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div> */}
        <div className="container d-flex mt-5">
          {/* <div className="col-3 mt3">
            <h5>Lọc</h5>
            <div className="filter">
              <span>Theo Size:</span>

              <div className="row">
                <button
                  className={`btn-size mt-3  ${checkboxes.M ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("M")}
                >
                  M
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.L ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("L")}
                >
                  L
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.XL ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("XL")}
                >
                  XL
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.XXL ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("XXL")}
                >
                  XXL
                </button>
              </div>
            </div>

            <div className="filter mt-5">
              <span>Theo Giá:</span>

              <div className="row" style={{ paddingRight: "10%" }}>
                <RangeSlider
                  min={10}
                  max={10000000000}
                  defaultValue={[20, 10000000]}
                  onThumbDragStart={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "40px" }}>
              <button className="btn-shop">Lọc</button>
              <button className="btn-shop ml">Bỏ Lọc</button>
            </div>
          </div> */}
          <div className="col-3 mt3">
            <h5>Lọc</h5>
            <div className="filter">
              <span>Theo Size:</span>

              <div className="row">
                <button
                  className={`btn-size mt-3  ${checkboxes.M ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("M")}
                >
                  M
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.L ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("L")}
                >
                  L
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.XL ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("XL")}
                >
                  XL
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.XXL ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("XXL")}
                >
                  XXL
                </button>
              </div>
            </div>

            <div className="filter mt-5">
              <span>Theo Giá:</span>

              <div className="row" style={{ paddingRight: "10%" }}>
                {/* <RangeSlider
                  min={10}
                  max={10000000000}
                  defaultValue={[20, 10000000]}
                  onThumbDragStart={(value) => {
                    console.log(value);
                  }}
                /> */}
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                ></input>{" "}
                đến
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                ></input>
              </div>
            </div>

            <div style={{ marginTop: "40px" }}>
              <button className="btn-shop" onClick={handleFilter}>
                Lọc
              </button>
              <button
                className="btn-shop ml"
                onClick={() => {
                  setCheckboxes({
                    M: false,
                    L: false,
                    XL: false,
                    XXL: false,
                  });
                  setMinPrice("");
                  setMaxPrice("");
                  setData(temp);
                }}
              >
                Bỏ Lọc
              </button>
            </div>
          </div>
          <div className="col-9 right-element">
            <div className="head">
              {data != null && data.length > 0 && (
                <h3>Tìm kiếm cho " {keyword}"</h3>
              )}

              {data == null ||
                (data.length == 0 && (
                  <h3>Không tìm thấy kết quả cho " {keyword}"</h3>
                ))}
              <div>
                <label>
                  <select
                    name="selectedFruit"
                    className="select-fil"
                    value={selectedFruit}
                    onChange={(e) => {
                      var value = e.target.value;
                      console.log(value);
                      if (value == "" || value == "default") {
                        setData(temp);
                      } else if (value == "priceLow") {
                        console.log("da: priceLow");
                        const sorted = [...data].sort(
                          (a, b) => a.price - b.price
                        );
                        setData(sorted);
                      } else if (value == "priceHigh") {
                        console.log("da: priceHigh");
                        const sorted = [...data].sort(
                          (a, b) => b.price - a.price
                        );
                        setData(sorted);
                      } else if (value == "new") {
                        console.log("da: new");
                        const sorted = [...data].sort((a, b) => b.id - a.id);
                        setData(sorted);
                      }
                      setSelectedFruit(e.target.value);
                    }}
                  >
                    <option value="">Sắp xếp theo</option>
                    <option value="default">Mặc định</option>
                    <option value="new">Mới nhất</option>
                    <option value="priceHigh">Giá :Cao tới thấp</option>
                    <option value="priceLow">Giá :Thấp tới cao</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="row list-card mt-3">
              {data != null &&
                data.map((item) => {
                  return <Card product={item} />;
                })}
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </section>
      <Footer></Footer>
    </div>
  );
}
