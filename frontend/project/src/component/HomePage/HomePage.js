import React from "react";
import Header from "../Header/Header";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./homepage.css";
import Card from "./CardProduct";
export default function HomePage() {
  return (
    <div>
      <Header></Header>
      <div className={"container mb-5"}>
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
              <img src="https://pubcdn.ivymoda.com/files/news/2024/03/21/8474a5e33bed841dcc44edc14bbdc541.jpg" />
            </div>
            <div>
              <img src="https://pubcdn.ivymoda.com/files/news/2024/03/21/8474a5e33bed841dcc44edc14bbdc541.jpg" />
            </div>
            <div>
              <img src="https://pubcdn.ivymoda.com/files/news/2024/03/21/8474a5e33bed841dcc44edc14bbdc541.jpg" />
            </div>
          </Carousel>
        </div>

        <section className={"home-new-prod"}>
          <div className={"title-section"}>NEW ARRIVAL</div>
          <div className={"exclusive-tabs"}>
            <div className={"exclusive-head"}>
              <ul className="exclusive-wrap">
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
              </ul>
            </div>
          </div>
          <div className="row list-card">
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
          </div>

          <div className="justify-content-center mt-5 ">
            <button type="button" class="btn btn-outline-dark">
              Xem tất cả
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
