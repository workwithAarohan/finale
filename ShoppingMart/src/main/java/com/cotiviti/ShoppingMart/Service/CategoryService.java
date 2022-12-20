package com.cotiviti.ShoppingMart.Service;

import com.cotiviti.ShoppingMart.DTO.CategoryDTO;
import com.cotiviti.ShoppingMart.Model.Category;
import com.cotiviti.ShoppingMart.Repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService
{
    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDTO addCategory(CategoryDTO categoryDTO)
    {
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);

        Long id = categoryDTO.getParent_category_id();
        if(id != null)
        {
            category.setParentCategory(categoryRepository.findById(id).get());
        }

        Category cat = categoryRepository.save(category);
        return categoryDTO;
    }

    public List<Category> getAllCategories()
    {
        return categoryRepository.findAll();
    }

    public Category findCategoryById(Long id)
    {
        return categoryRepository.findCategoryById(id);
    }

    public CategoryDTO updateCategory(CategoryDTO categoryDTO)
    {
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);

        Long id = categoryDTO.getParent_category_id();
        if(id != null)
        {
            category.setParentCategory(categoryRepository.findById(id).get());
        }

        Category cat = categoryRepository.save(category);
        return categoryDTO;
    }

    public void deleteCategory(Long id)
    {
        categoryRepository.deleteById(id);
    }

    public List<Category> getCategoryByParentId(Long id)
    {
        return categoryRepository.findCategoryByParentCategoryId(id);
    }

}
