package com.example.webbanhang.model;

import com.example.webbanhang.Entity.CartEntity;
import com.example.webbanhang.Entity.CartItemEntity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class CartModel implements Serializable {

    private List<CartItemModel> listCartItem;

    public List<CartItemModel> getListCartItem() {
        return listCartItem;
    }

    public void setListCartItem(List<CartItemModel> listCartItem) {
        this.listCartItem = listCartItem;
    }

    public static CartModel convert(CartEntity cart) {
        List<CartItemModel> result = new ArrayList<>();
        List<CartItemEntity> entityItem = cart.getCartItems();
        CartItemModel temp;
        for (CartItemEntity item : entityItem
        ) {
            temp = CartItemModel.convert(item);
            temp.getProduct().setImage("http://localhost:8081" + "/api/file/" + temp.getProduct().getImage() + ".jpg");
            result.add(temp);

        }
        CartModel cartModel = new CartModel();
        cartModel.setListCartItem(result);
        return cartModel;
    }
}
