package com.cotiviti.ShoppingMart.Service;

import com.cotiviti.ShoppingMart.DTO.ProductDTO;
import com.cotiviti.ShoppingMart.Model.Product;
import com.cotiviti.ShoppingMart.Repository.CategoryRepository;
import com.cotiviti.ShoppingMart.Repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService
{
    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    public ProductDTO addProduct(ProductDTO productDTO)
    {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        Long id = productDTO.getCategory_id();
        if(id != null)
        {
            product.setCategory(categoryRepository.findById(id).get());
        }

        Product prod = productRepository.save(product);
        return productDTO;
    }

    public List<Product> getAllProducts()
    {
        return productRepository.findAll();
    }

//    public List<Product> getProductByCategory(Long cat_id)
//    {
//        Category category =
//    }

    public List<Product> getProductByCategoryId(Long cat_id)
    {
        return productRepository.findProductByCategoryId(cat_id);
    }

    public ProductDTO updateProduct(ProductDTO productDTO)
    {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        Long id = productDTO.getCategory_id();
        if(id != null)
        {
            product.setCategory(categoryRepository.findById(id).get());
        }
        Product prod = productRepository.save(product);
        return productDTO;
    }


    public void deleteProductById(Long id)
    {
        productRepository.deleteById(id);
    }

    public Product findProductById(Long id) {
        return productRepository.findProductById(id);
    }
}
