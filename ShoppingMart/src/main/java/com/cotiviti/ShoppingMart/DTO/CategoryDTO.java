package com.cotiviti.ShoppingMart.DTO;

import lombok.Data;

@Data
public class CategoryDTO
{
    private Long id;

    private String title;

    private String imageUrl;

    private Long parent_category_id;
}
