import React from "react";
import "./card.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export default function Card(props) {
  let CardName = `color_bg ${props.alt}`;
  let bg_img = `url(${props.images})`;
  let { title, old_price, newPrice, dollar, exp_date } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="card">
      <div className="wrapper">
        <div className={CardName}></div>
        <div className="card_img" style={{ backgroundImage: bg_img }}></div>
        <div className="heart">
          <svg xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 64 64">
            <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"></path>
          </svg>
        </div>
        <div className="cardInfo">
          <span className=".card-title">{title}</span>
          <div className="action">
            <div className="priceGroup">
              <p className="price old_price">
                {dollar}
                {old_price}
              </p>
              <p className="price newPrice">
                {dollar}
                {newPrice}
              </p>
            </div>
            <div>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                classes={"btn-black"}
              >
                <MedicalServicesIcon color="secondary"></MedicalServicesIcon>
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>M</MenuItem>
                <MenuItem onClick={handleClose}>L</MenuItem>
                <MenuItem onClick={handleClose}>XL</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
