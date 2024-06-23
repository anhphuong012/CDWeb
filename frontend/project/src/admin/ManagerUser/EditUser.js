import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import { Select, InputLabel, FormControl } from '@mui/material';
import "./ManagerUser.css";
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
    const [message, setMessage] = useState("");


    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");


    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();




    const handleSubmit = () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('Token không tồn tại trong sessionStorage');
            return;
        }
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.put(`/api/user/${id}`, {
            role: role
        }, axiosConfig)
            .then(response => {
                console.log('Cập nhật thành công');
                setRole(role);
                window.location.href = "/admin/user";
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật:', error);
                setMessage("Lỗi khi cập nhật", error.response);
            });

    }

    const fetchItem = async () => {
        const response = await axios.get(`/api/user/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
            },
        });

        console.log(response.data);

        if (response.status == 200) {
            console.log(response.data);
            if (response.data.status == "OK") {
                setUsername(response.data.data.username);
                setPhone(response.data.data.phone);
                setRole(response.data.data.role);
            }
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("user") == null) {
            navigate("/login");
        } else {
            fetchItem();
        }
    }, []);
    const handleChange = (event) => {
        setRole(event.target.value);
    };
    return (
        <div className="container-main mb-5">
            <HeaderAdmin></HeaderAdmin>

            <div className="main-content">
                <h3 className="title-manager">Thay đổi tài khoản</h3>
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
                                label="Tên tài khoản"
                                id="username"
                                value={username}
                                disabled
                            />
                        </div>

                        <div className="mt-3">
                            <TextField
                                fullWidth
                                label="Điện thoại"
                                id="phone"
                                type="number"
                                value={phone}
                                disabled
                            />
                        </div>

                        <div className="mt-3">
                            {/* <TextField
                                fullWidth
                                label="role"
                                id="role"
                                type="number"
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                }}
                            /> */}
                            <FormControl fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    value={role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Admin</MenuItem>
                                    <MenuItem value={1}>Người dùng</MenuItem>
                                    <MenuItem value={2}>Khóa</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                    </Box>
                    {message && <p>{message}</p>}

                    <div className="mt-4 mb-5">
                        <button className="btn btn-success mr-4" onClick={handleSubmit}>
                            Sửa
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                navigate("/admin/user");
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
