package com.cotiviti.ShoppingMart.DTO;

import lombok.Data;

@Data
public class CartDTO
{
    private Long id;

    private Long product;

    private Long user;

    private Long quantity;
}
