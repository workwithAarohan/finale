package com.cotiviti.ShoppingMart.DTO;

import com.cotiviti.ShoppingMart.Model.Category;
import lombok.Data;

import javax.persistence.*;

@Data
public class ProductDTO
{
    private Long id;

    private Long category_id;

    private String name;

    private Long price;

    private Long quantity;

    private String imageUrl;

    private String description;
}
