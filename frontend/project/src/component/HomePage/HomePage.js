import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./homepage.css";
import Card from "./CardProduct";
import Footer from "../Footer/Footer";
import Carousel1 from "../image/c1.jpg";
import Carousel0 from "../image/c0.jpg";
import Carousel2 from "../image/c2.jpg";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Bot from "../image/bg-bot.jpg";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HomePage() {
  const [value, setValue] = React.useState(0);

  const [indexNew, setIndexNew] = React.useState(0);

  const [data, setData] = useState(null);

  const [product, setProduct] = useState(null);

  const listCategory = [
    "Áo Nam",
    "Quần Nam",
    "Áo Nữ",
    "Quần Nữ",
    "Set bộ nữ",
    "Váy-đầm Nữ",
    "Áo trẻ em",
    "Quần trẻ em",
  ];

  const handleChange = (event, newValue) => {
    inputRef.current = 1;
    setValue(newValue);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const selectIndex = (event, newValue) => {
    setIndexNew(newValue);
  };
  const inputRef = useRef(1);

  const fetchData = async () => {
    const response = await axios.get(`/api/products`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        console.log(data);
      }
    }
  };

  console.log("Current:" + inputRef.current);
  console.log("Data:" + data);
  return (
    <div>
      <Header></Header>
      <div className={"container mb-5 "} style={{ marginTop: "7rem" }}>
        <div className={"nav-infor d-flex"}>
          <div className={"nav-item-infor nav-left"}>
            <a href="#">SALE OFF 50%</a>
          </div>
          <div className={"nav-item-infor nav-center"}>
            <a href="#">SALE OFF 75%</a>
          </div>
          <div className={"nav-item-infor nav-right"}>
            <a href="#">SALE OFF 30%</a>
          </div>
        </div>

        <div className={"carousel-wrap"}>
          <Carousel>
            <div>
              <img src={Carousel0} />
            </div>
            <div>
              <img src={Carousel1} />
            </div>
            <div>
              <img src={Carousel2} />
            </div>
          </Carousel>
        </div>

        <section className={"home-new-prod"}>
          <div className={"title-section"}>NEW ARRIVAL</div>
          <div className={"exclusive-tabs"}>
            <div className={"exclusive-head"}>
              {/** */}
              <Box sx={{ width: "100%", margin: "0px auto" }}>
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="inherit"
                    centered
                  >
                    <Tab
                      label="IVY moda"
                      {...a11yProps(0)}
                      sx={{ mx: 2, fontSize: 20 }}
                    />
                    <Tab
                      label="IVY men"
                      {...a11yProps(1)}
                      sx={{ mx: 2, fontSize: 20 }}
                    />
                    <Tab
                      label="IVY kids"
                      {...a11yProps(2)}
                      sx={{ mx: 2, fontSize: 20 }}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div className="row list-card">
                    {data != null &&
                      data
                        .filter(
                          (item) =>
                            item.category == 6 ||
                            item.category == 5 ||
                            item.category == 4 ||
                            item.category == 3
                        )
                        .slice(0, 4)
                        .map((item, index) => {
                          return (
                            <Card product={item} type="New" bg="bg-warning" />
                          );
                        })}
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div className="row list-card">
                    {data != null &&
                      data
                        .filter(
                          (item) => item.category == 1 || item.category == 2
                        )
                        .slice(0, 4)
                        .map((item, index) => {
                          return (
                            <Card product={item} type="New" bg="bg-warning" />
                          );
                        })}
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div className="row list-card">
                    {data != null &&
                      data
                        .filter(
                          (item) => item.category == 7 || item.category == 8
                        )
                        .slice(0, 4)
                        .map((item, index) => {
                          return (
                            <Card product={item} type="New" bg="bg-warning" />
                          );
                        })}
                  </div>
                </CustomTabPanel>
              </Box>

              {/** */}
              {/* <ul className="exclusive-wrap">
                <li
                  class="exclusive-tab arrival-tab exclusive-item active"
                  data-cate-slug="hang-nu-moi-ve"
                  data-tab="tab-women"
                >
                  IVY moda
                </li>
                <li
                  class="exclusive-tab arrival-tab exclusive-item"
                  data-cate-slug="hang-nam-moi-ve"
                  data-tab="tab-men"
                >
                  IVY men
                </li>

                <li
                  class="exclusive-tab arrival-tab exclusive-item"
                  data-cate-slug="hang-nam-moi-ve"
                  data-tab="tab-men"
                >
                  IVY kids
                </li>
              </ul> */}
            </div>
          </div>
          {/* <div className="row list-card">
            <Card
              title="What is Lorem Ipsum?"
              images="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/467a20e0d092334cb796d81c30881d75.JPG"
              old_price="9,999"
              newPrice="9999"
              dollar="$"
              alt="batman"
              exp_date="10-08-2022"
            />
            <Card
              title="What is Lorem Ipsum?"
              images="../images/blackpanter.png"
              old_price="599"
              newPrice="500"
              dollar="$"
              alt="blackpanter"
              exp_date="10-08-2022"
            />
            <Card
              title="What is Lorem Ipsum?"
              images="../images/arthur.png"
              old_price="7999"
              newPrice="7000"
              dollar="$"
              alt="arthur"
              exp_date="10-08-2022"
            />
            <Card
              title="What is Lorem Ipsum?"
              images="../images/kashima.png"
              old_price="999"
              newPrice="500"
              dollar="$"
              alt="kashima"
              exp_date="10-08-2022"
            />
          </div> */}

          <div className="justify-content-center mt-5 ">
            <button type="button" class="btn btn-outline-dark btn-black">
              Xem tất cả
            </button>
          </div>
        </section>

        <section style={{ marginTop: "10%" }}>
          <div className={"title-section"}>
            DEAL HỜI THÁNG 4 - SĂN ƯU ĐÃI LỚN - CHỈ CÓ TẠI ONLINE
          </div>
          <div className={"exclusive-tabs"}>
            <div className={"exclusive-head"}>
              {/** */}
              <Box sx={{ width: "100%", margin: "0px auto" }}>
                <Box>
                  <Tabs
                    value={indexNew}
                    onChange={selectIndex}
                    aria-label="basic tabs example"
                    textColor="inherit"
                    centered
                  >
                    <Tab
                      label="IVY moda"
                      {...a11yProps(0)}
                      sx={{ mx: 2, fontSize: 20 }}
                    />
                    <Tab
                      label="IVY Kids"
                      {...a11yProps(1)}
                      sx={{ mx: 2, fontSize: 20 }}
                    />
                  </Tabs>
                </Box>
                <CustomTabPanel value={indexNew} index={0}>
                  <div className="row list-card">
                    {/* <Card
                      title="What is Lorem Ipsum?"
                      images="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/467a20e0d092334cb796d81c30881d75.JPG"
                      old_price="9,999"
                      newPrice="9999"
                      dollar="$"
                      alt="batman"
                      exp_date="10-08-2022"
                      type="Hot"
                      bg="bg-danger"
                    />
                    <Card
                      title="What is Lorem Ipsum?"
                      images="../images/blackpanter.png"
                      old_price="599"
                      newPrice="500"
                      dollar="$"
                      alt="blackpanter"
                      exp_date="10-08-2022"
                      type="Hot"
                      bg="bg-danger"
                    />
                    <Card
                      title="What is Lorem Ipsum?"
                      images="../images/arthur.png"
                      old_price="7999"
                      newPrice="7000"
                      dollar="$"
                      alt="arthur"
                      exp_date="10-08-2022"
                      type="Hot"
                      bg="bg-danger"
                    />
                    <Card
                      title="What is Lorem Ipsum?"
                      images="../images/kashima.png"
                      old_price="999"
                      newPrice="500"
                      dollar="$"
                      alt="kashima"
                      exp_date="10-08-2022"
                      type="Hot"
                      bg="bg-danger"
                    /> */}
                  </div>
                </CustomTabPanel>
                <CustomTabPanel value={indexNew} index={1}>
                  Item Two Đây nè
                </CustomTabPanel>
              </Box>

              {/** */}
              {/* <ul className="exclusive-wrap">
                <li
                  class="exclusive-tab arrival-tab exclusive-item active"
                  data-cate-slug="hang-nu-moi-ve"
                  data-tab="tab-women"
                >
                  IVY moda
                </li>
                <li
                  class="exclusive-tab arrival-tab exclusive-item"
                  data-cate-slug="hang-nam-moi-ve"
                  data-tab="tab-men"
                >
                  IVY men
                </li>

                <li
                  class="exclusive-tab arrival-tab exclusive-item"
                  data-cate-slug="hang-nam-moi-ve"
                  data-tab="tab-men"
                >
                  IVY kids
                </li>
              </ul> */}
            </div>
          </div>
          {/* <div className="row list-card">
            <Card
              title="What is Lorem Ipsum?"
              images="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/467a20e0d092334cb796d81c30881d75.JPG"
              old_price="9,999"
              newPrice="9999"
              dollar="$"
              alt="batman"
              exp_date="10-08-2022"
            />
            <Card
              title="What is Lorem Ipsum?"
              images="../images/blackpanter.png"
              old_price="599"
              newPrice="500"
              dollar="$"
              alt="blackpanter"
              exp_date="10-08-2022"
            />
            <Card
              title="What is Lorem Ipsum?"
              images="../images/arthur.png"
              old_price="7999"
              newPrice="7000"
              dollar="$"
              alt="arthur"
              exp_date="10-08-2022"
            />
            <Card
              title="What is Lorem Ipsum?"
              images="../images/kashima.png"
              old_price="999"
              newPrice="500"
              dollar="$"
              alt="kashima"
              exp_date="10-08-2022"
            />
          </div> */}
          <ToastContainer position="bottom-right" />
          <div className="justify-content-center mt-5 ">
            <button type="button" class="btn btn-outline-dark btn-black">
              Xem tất cả
            </button>
          </div>
        </section>

        <section>
          <div className="wrap-bot">
            <img src={Bot} className="img-bot"></img>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
