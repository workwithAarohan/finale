package com.cotiviti.ShoppingMart.Service;

import com.cotiviti.ShoppingMart.Model.Category;
import com.cotiviti.ShoppingMart.Model.Product;
import com.cotiviti.ShoppingMart.Repository.CategoryRepository;
import com.cotiviti.ShoppingMart.Repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HomeService
{
    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final ProductRepository productRepository;


    public List<Category> getRootCategories()
    {
        return categoryRepository.getRootCategories();
    }

    public List<Product> getRandomProducts()
    {
        return productRepository.getRandomProducts();
    }

    public List<Category> getRandomCategories()
    {
        return categoryRepository.getRandomCategories();
    }

    public List<Product> getSearchedProducts(String productName)
    {
        return productRepository.getSearchedProducts(productName);
    }
}
