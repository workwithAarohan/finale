package com.cotiviti.ShoppingMart.Controller;

import com.cotiviti.ShoppingMart.DTO.CartDTO;
import com.cotiviti.ShoppingMart.Model.Cart;
import com.cotiviti.ShoppingMart.Service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("cart")
public class CartController
{
    private final CartService cartService;

    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<Cart>> getCartsByUser(@PathVariable("user_id") Long user_id)
    {
        List<Cart> carts = cartService.getCartByUser(user_id);
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CartDTO> addCart(@RequestBody CartDTO cartDTO)
    {
        CartDTO newCartDTO = cartService.addCart(cartDTO);
        return new ResponseEntity<>(newCartDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Cart> deleteCart(@PathVariable("id") Long id)
    {
        cartService.deleteCart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
