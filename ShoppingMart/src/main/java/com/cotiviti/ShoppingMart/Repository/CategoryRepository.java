package com.cotiviti.ShoppingMart.Repository;

import com.cotiviti.ShoppingMart.Model.Category;
import com.cotiviti.ShoppingMart.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>
{

    Category findCategoryById(Long id);

    @Query("SELECT c FROM Category c where parent_category_id is null")
    List<Category> getRootCategories();

    @Query(nativeQuery = true, value = "SELECT * FROM Category ORDER BY Rand() LIMIT 6")
    List<Category> getRandomCategories();

    List<Category> findCategoryByParentCategoryId(Long id);
}
