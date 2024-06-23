import React, { useState } from "react";
import "./UserMenu.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div class="order-sidemenu block-border">
      <div class="order-sidemenu__user">
        <div class="order-sidemenu__user-avatar"></div>
        <div class="order-sidemenu__user-name">
          <p>Phạm Biên</p>
        </div>
      </div>
      <div class="order-sidemenu__menu" style={{ display: "block" }}>
        <ul>
          <li class="active">
            <a href="https://ivymoda.com/customer/info">
              <span class="icon-ic_avatar-1"></span>Thông tin tài khoản
            </a>
          </li>
          <li class="">
            <a href="/order/history">
              <span class="icon-ic_reload"></span>Quản lý đơn hàng
            </a>
          </li>
          <li class="">
            <a href="https://ivymoda.com/customer/address_list">
              <span class="icon-ic_placeholder"></span>Sổ địa chỉ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
