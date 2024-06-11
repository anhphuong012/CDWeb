import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import axios from 'axios';

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import { Button } from "react-bootstrap";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = 0;
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [rePassword, setRePassword] = useState('');

  const [isCustomerAgree, setIsCustomerAgree] = useState(false);

  const [message, setMessage] = useState('');

  const handleCustomerAgreeChange = () => {
    setIsCustomerAgree(!isCustomerAgree);
  };



  ////
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleCityChange = (event) => {
    const selectedCityId = event.target.options[event.target.selectedIndex].dataset.id;
    setCity(event.target.value);
    setDistrict('');
    setWard('');
    if (selectedCityId) {
      const cityData = cities.find(city => city.Id === selectedCityId);
      setDistricts(cityData.Districts);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.options[event.target.selectedIndex].dataset.id;
    setDistrict(event.target.value);
    setWard('');
    if (selectedDistrictId) {
      const districtData = districts.find(district => district.Id === selectedDistrictId);
      setWards(districtData.Wards);
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (event) => {
    setWard(event.target.value);
  };

  const [errors, setErrors] = useState({})

  const validateAll = () => {
    const validationErrors = {}
    if (!username.trim()) {
      validationErrors.username = "username is required"
    }

    if (!email.trim()) {
      validationErrors.email = "email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "email is not valid"
    }

    if (!password.trim()) {
      validationErrors.password = "password is required"
    } else if (password.length < 6) {
      validationErrors.password = "password should be at least 6 char"
    }
    if (!ward.trim()) {
      validationErrors.ward = "Ward is required";
    }

    // District
    if (!district.trim()) {
      validationErrors.district = "District is required";
    }

    // City
    if (!city.trim()) {
      validationErrors.city = "City is required";
    }

    // Address
    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }

    if (rePassword !== password) {
      validationErrors.rePassword = "password not matched"
    }
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return false
    return true

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("aaaaa")

    const isValid = validateAll()
    if (!isValid) return

    try {
      console.log("aaaaa")
      await axios.post('/api/user/register', {
        username,
        fullname: username,
        email,
        password, phone, ward, district, city, address, role: 1
      });
      // Đăng ký thành công, chuyển hướng hoặc thực hiện các hành động khác
      navigate('/login');
      console.log('Registration successful', email);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Xử lý lỗi xung đột (email đã tồn tại)
        setMessage('Register failed ', error.response);
      } else {
        // Xử lý các lỗi khác
        setMessage('Register failed', error.response);
      }
    }
  };




  return (

    <div>

      <Header></Header>
      <section style={{ marginTop: "7rem", marginBottom: "7rem" }}>
        <div class="containerRegis">
          <div class="order-block__title justify-content-center pt-4 pb-2">
            <h3 class="text-uppercase">Đăng ký</h3>
          </div>
          <div class="authRegis auth-forgotpass">
            <div class="rowRegis">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="register-summary__overview">
                  <h4>Thông tin khách hàng</h4>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label>
                        Họ và Tên<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        name="customer_display_name"
                        placeholder="Họ và Tên"
                        style={{ width: "100%" }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {errors.username && <span>{errors.username}</span>}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label>
                        Email:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="email"
                        class="form-control"
                        type="email"
                        name="customer_email"
                        placeholder="Email..."
                        style={{ width: "100%" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <span>{errors.email}</span>}
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label>
                        Điện thoại:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        name="customer_phone"
                        placeholder="Điện thoại..."
                        style={{ width: "100%" }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && <span>{errors.phone}</span>}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label>
                        Tỉnh/TP:<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        class="form-control"
                        name="register_region_id"
                        id="register_region_id"
                        style={{ width: "100%" }}
                        value={city}
                        onChange={handleCityChange}
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city.Id} value={city.Name} data-id={city.Id}>{city.Name}</option>
                        ))}
                      </select>
                      {errors.city && <span>{errors.city}</span>}
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                      <label>
                        Quận/Huyện:<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="register_city_id"
                        id="register_city_id"
                        style={{ width: "100%" }}
                        class="form-control"
                        value={district}
                        onChange={handleDistrictChange}
                      >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map(district => (
                          <option key={district.Id} value={district.Name} data-id={district.Id}>{district.Name}</option>
                        ))}
                      </select>
                      {errors.district && <span>{errors.district}</span>}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label>
                        Phường/Xã:<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="vnward_id"
                        id="vnward_id"
                        style={{ width: "100%" }}
                        class="form-control"
                        value={ward}
                        onChange={handleWardChange}
                      >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map(ward => (
                          <option key={ward.Id} value={ward.Name} data-id={ward.Id}>{ward.Name}</option>
                        ))}
                      </select>
                      {errors.ward && <span>{errors.ward}</span>}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label>
                        Địa chỉ:<span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea class="form-control" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                      {errors.address && <span>{errors.address}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="register-summary__overview">
                  <h4>Thông tin mật khẩu</h4>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label>
                        Mật khẩu:<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="password"
                        name="customer_pass1"
                        placeholder="Mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <span>{errors.password}</span>}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label>
                        Nhập lại mật khẩu:
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="password"
                        value={rePassword}
                        name="customer_pass2"
                        placeholder="Nhập lại mật khẩu..."
                        onChange={(e) => setRePassword(e.target.value)}
                      ></input>
                      {errors.rePassword && <span>{errors.rePassword}</span>}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label>
                        Mời nhập các ký tự trong hình vào ô sau:
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        name="captcha"
                      ></input>
                    </div>
                    <p class="img_capcha">
                      <img
                        src="https://ivymoda.com/ajax/captcha"
                        border="0"
                        class="img-responsive"
                      ></img>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-check">
                      <input
                        class="form-check-input checkboxs"
                        type="checkbox"
                        name="customer_agree"
                        value="1"
                        id="defaultCheck1"
                        checked={isCustomerAgree}
                        onChange={(e) => setIsCustomerAgree(e.target.checked)}
                      ></input>
                      <label
                        style={{ marginTop: "4px", marginLeft: "3px" }}
                        class="form-check-label"
                        for="defaultCheck1"
                      >
                        <span>
                          {" "}
                          Đồng ý với các{" "}
                          <a
                            style={{ color: "#f31f1f" }}
                            href="https://ivymoda.com/about/chinh-sach-bao-hanh"
                          >
                            điều khoản
                          </a>{" "}
                          của IVY{" "}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-check">
                      <input
                        class=" form-check-input checkboxs"
                        type="checkbox"
                        value="1"
                        name="customer_subscribe"
                        id="defaultCheck2"

                      ></input>
                      <label
                        style={{ marginTop: "4px", marginLeft: "3px" }}
                        class="form-check-label"
                        for="defaultCheck2"
                      >
                        <span>Đăng ký nhận bản tin</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <button
                      id="bnt_register"
                      class="btn btn--large"
                      type="submit"
                      style={{ width: "100%", marginTop: "15px" }}
                      disabled={!isCustomerAgree}
                      onClick={handleSubmit}
                    >
                      Đăng ký
                    </button>
                    {message && <p>{message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
