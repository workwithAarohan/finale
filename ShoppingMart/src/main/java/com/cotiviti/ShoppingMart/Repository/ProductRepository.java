package com.cotiviti.ShoppingMart.Repository;

import com.cotiviti.ShoppingMart.Model.Category;
import com.cotiviti.ShoppingMart.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>
{
    List<Product> findProductByCategoryId(Long cat_id);

    Product findProductById(Long id);

    @Query(nativeQuery = true, value = "SELECT * FROM Product ORDER BY Rand() LIMIT 12")
    List<Product> getRandomProducts();

    @Query(nativeQuery = true, value = "SELECT * FROM Product WHERE name LIKE %:productName%")
    List<Product> getSearchedProducts(@Param("productName") String productName);

    @Query(nativeQuery = true, value ="SELECT * FROM Product WHERE category_id IN (SELECT id FROM Category WHERE parent_category_id = :parentCategoryId || category_id = :parentCategoryId)")
    List<Product> getAllChildProducts(@Param("parentCategoryId") Long category_id);
}
