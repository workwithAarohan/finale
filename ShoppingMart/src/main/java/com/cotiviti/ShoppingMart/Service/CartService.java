package com.cotiviti.ShoppingMart.Service;

import com.cotiviti.ShoppingMart.DTO.CartDTO;
import com.cotiviti.ShoppingMart.Model.Cart;
import com.cotiviti.ShoppingMart.Repository.CartRepository;
import com.cotiviti.ShoppingMart.Repository.ProductRepository;
import com.cotiviti.ShoppingMart.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CartService
{
    @Autowired
    private final CartRepository cartRepository;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final UserRepository userRepository;

    public CartDTO addCart(CartDTO cartDTO)
    {
        Cart cart = new Cart();
        List<Cart> carts = cartRepository.findCartByUserId(cartDTO.getUser());

        boolean isProductExists = false;

        for(Cart cartItem: carts)
        {
            if(cartItem.getProduct().getId().equals(cartDTO.getProduct()))
            {
                isProductExists = true;
                Long newQuantity = cartItem.getQuantity() + cartDTO.getQuantity();
                cartItem.setQuantity(newQuantity);
                BeanUtils.copyProperties(cartItem, cart);
                break;
            }
        }

        if(!isProductExists)
        {
            BeanUtils.copyProperties(cartDTO, cart);
            cart.setProduct(productRepository.findById(cartDTO.getProduct()).get());
            cart.setUser(userRepository.findById(cartDTO.getUser()).get());
        }

        Cart cart1 = cartRepository.save(cart);
        return cartDTO;
    }

    public List<Cart> getCartByUser(Long user_id)
    {
        return cartRepository.findCartByUserId(user_id);
    }

    public void deleteCart(Long id)
    {
        cartRepository.deleteById(id);
    }

    public Long getCartCount(Long user_id)
    {
        return cartRepository.getCartCount(user_id);
    }
}
