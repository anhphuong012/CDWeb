import * as actionType from "../actions/actionType";

// const initState = {
//   cartAr: JSON.parse(sessionStorage.getItem("cart")) || [],
// };

// const cartReducer = (state = initState, action) => {
//   switch (action.type) {
//     case actionType.BUY_PRODUCT:
//       const productInCart = state.cartAr.find((p) => p.id == action.payload.id);
//       if (!productInCart) {
//         return {
//           cartAr: [...state.cartAr, action.payload],
//         };
//       } else {
//         let newCart = state.cartAr;
//         const objIndex = newCart.findIndex(
//           (obj) => obj.id == action.payload.id
//         );
//         newCart[objIndex].quanlity = newCart[objIndex].quanlity + 1;
//         return { cartAr: [...newCart] };
//       }
//     case actionType.DELETE_PRODUCT:
//       return state;

//     default:
//       return state;
//   }
// };
// export default cartReducer;

const loadCartFromSessionStorage = () => {
  const savedCart = sessionStorage.getItem("cart");
  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Error parsing cart from sessionStorage", e);
    return [];
  }
};

const initState = {
  cartAr: loadCartFromSessionStorage(),
};
const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.BUY_PRODUCT:
      const productInCart = state.cartAr.find(
        (p) => p.id === action.payload.id && p.size == action.payload.size
      );
      if (!productInCart) {
        const newState = {
          cartAr: [...state.cartAr, action.payload],
        };
        sessionStorage.setItem("cart", JSON.stringify(newState.cartAr));
        return newState;
      } else {
        let newCart = state.cartAr.map((item) => {
          if (
            item.id === action.payload.id &&
            item.size == action.payload.size
          ) {
            return { ...item, quanlity: item.quanlity + 1 };
          }
          return item;
        });
        const newState = { cartAr: newCart };
        sessionStorage.setItem("cart", JSON.stringify(newState.cartAr));
        return newState;
      }
    case actionType.DELETE_PRODUCT:
      const newCart = state.cartAr;
      const objIndex = newCart.findIndex(
        (obj) => obj.id == action.payload.id && obj.size == action.payload.size
      );
      newCart.splice(objIndex, 1);
      const newState = { cartAr: newCart };
      sessionStorage.setItem("cart", JSON.stringify(newState.cartAr));
      console.log("delete");
      return newState;

    case actionType.INCREAMENT_PRODUCT:
      console.log("Ping");
      const cartTemp = state.cartAr.map((item) => {
        if (item.id === action.payload.id && item.size == action.payload.size) {
          console.log("Ping");
          return { ...item, quanlity: item.quanlity + 1 };
        }
        return item;
      });
      const newStateIncree = { cartAr: cartTemp };
      sessionStorage.setItem("cart", JSON.stringify(newStateIncree.cartAr));
      return newStateIncree;
    case actionType.DEREAMENT_PRODUCT:
      const cartTemp2 = state.cartAr.map((item) => {
        if (item.id === action.payload.id && item.size == action.payload.size) {
          if (action.payload.quanlity > 1) {
            return { ...item, quanlity: item.quanlity - 1 };
          } else {
            return item;
          }
        }
        return item;
      });
      const newStateDecree = { cartAr: cartTemp2 };
      sessionStorage.setItem("cart", JSON.stringify(newStateDecree.cartAr));
      return newStateDecree;

    default:
      return state;
  }
};

export default cartReducer;
