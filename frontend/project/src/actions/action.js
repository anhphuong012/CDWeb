import * as actionType from "./actionType.js";

export const buyProduct = (product) => {
  return {
    type: actionType.BUY_PRODUCT,
    payload: product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: actionType.DELETE_PRODUCT,
    payload: product,
  };
};
export const increaProduct = (product) => {
  return {
    type: actionType.INCREAMENT_PRODUCT,
    payload: product,
  };
};

export const decreaProduct = (product) => {
  return {
    type: actionType.DEREAMENT_PRODUCT,
    payload: product,
  };
};
