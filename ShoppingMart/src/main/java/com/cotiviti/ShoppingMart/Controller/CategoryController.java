package com.cotiviti.ShoppingMart.Controller;

import com.cotiviti.ShoppingMart.DTO.CategoryDTO;
import com.cotiviti.ShoppingMart.Model.Category;
import com.cotiviti.ShoppingMart.Service.CategoryService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("category")
public class CategoryController
{
    @Autowired
    private final CategoryService categoryService;


    @PostMapping()
    public ResponseEntity<CategoryDTO> addCategory(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category) throws JsonParseException, JsonMappingException, IOException
    {

        String path = "D:/Project/Final_Project/ShoppingMart-Front/src/assets/images/category/";

        CategoryDTO categoryDTO = new ObjectMapper().readValue(category, CategoryDTO.class);

        boolean isExist = new File(path).exists();
        if(!isExist)
        {
            new File(path).mkdir();
        }

        String filename = file.getOriginalFilename();
        String newFilename = FilenameUtils.getBaseName(filename)
                + "_" + System.currentTimeMillis()
                + "." + FilenameUtils.getExtension(filename);

        File serverFile = new File(path + File.separator + newFilename);

        try
        {
            FileUtils.writeByteArrayToFile(serverFile, file.getBytes());
        }catch (Exception e) {
            e.printStackTrace();
        }

        categoryDTO.setImageUrl(newFilename);

        CategoryDTO newCategory = categoryService.addCategory(categoryDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory()
    {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long id)
    {
        Category category = categoryService.findCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<CategoryDTO> updateCategory(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category) throws JsonParseException, JsonMappingException, IOException
    {
        CategoryDTO categoryDTO = new ObjectMapper().readValue(category, CategoryDTO.class);
        String path = "D:/Project/Final_Project/ShoppingMart-Front/src/assets/images/category/";

        boolean isExist = new File(path).exists();
        if(!isExist)
        {
            new File(path).mkdir();
        }

        String filename = file.getOriginalFilename();
        String newFilename = FilenameUtils.getBaseName(filename)
                + "_" + System.currentTimeMillis()
                + "." + FilenameUtils.getExtension(filename);

        File serverFile = new File(path + File.separator + newFilename);

        try
        {
            FileUtils.writeByteArrayToFile(serverFile, file.getBytes());
        }catch (Exception e) {
            e.printStackTrace();
        }

        categoryDTO.setImageUrl(newFilename);
        CategoryDTO updatedCategory = categoryService.updateCategory(categoryDTO);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteEmployee(@PathVariable("id") Long id)
    {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/childCategories/{id}")
    public ResponseEntity<List<Category>> getCategoriesByParentId(@PathVariable("id") Long id)
    {
        List<Category> categories = categoryService.getCategoryByParentId(id);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
