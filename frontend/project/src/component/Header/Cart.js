import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";
import "./header.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CloseIcon from "@mui/icons-material/Close";
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const DrawerList = (
    <Box sx={{ width: isMobile ? 300 : 450 }} role="presentation">
      <div class="container-head-cart justify-content-between d-flex">
        <div>
          <span class="cart-title">Giỏ Hàng</span>
          <span className={"badge rounded-pill bg-dark cart-number "}>0</span>
        </div>
        <div>
          <button className={"btn btn-icon"} onClick={toggleDrawer(false)}>
            <CloseIcon></CloseIcon>
          </button>
        </div>
      </div>
      <Divider />

      <div className={"list-product"}>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className={"d-flex justify-content-end total-price"}>
        <span>
          Tổng cộng: <strong>1.600.000 VND</strong>
        </span>
      </div>
      <Divider />
      <div className={"wrap-btn-cart"}>
        <button type="button" class="btn btn-outline-dark btn-cart">
          Xem Giỏ Hàng
        </button>
      </div>

      <div className={"wrap-btn-cart"}>
        <button type="button" class="btn btn-outline-dark btn-cart">
          Đăng Nhập
        </button>
      </div>
    </Box>
  );

  return (
    <div>
      <div class="cart">
        <Button class="btn btn-icon" onClick={toggleDrawer(true)}>
          <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>
          <span class="badge bg-dark">0</span>
        </Button>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
