package com.cotiviti.ShoppingMart.Controller;

import com.cotiviti.ShoppingMart.Model.Category;
import com.cotiviti.ShoppingMart.Model.Product;
import com.cotiviti.ShoppingMart.Service.HomeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("")
public class HomeController
{
    @Autowired
    private final HomeService homeService;

    @GetMapping("category/user/root")
    public ResponseEntity<List<Category>> getRootCategories()
    {
        List<Category> categories = homeService.getRootCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("product/user/random")
    public ResponseEntity<List<Product>> getRandomProducts()
    {
        List<Product> products = homeService.getRandomProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category/user/randomCategories")
    public ResponseEntity<List<Category>> getRandomCategories()
    {
        List<Category> categories = homeService.getRandomCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("search")
    @ResponseBody
    public ResponseEntity<List<Product>> getSearchedProducts(@RequestParam String productName)
    {
        List<Product> products = homeService.getSearchedProducts(productName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/product/user/childCategories/{category_id}")
    public ResponseEntity<List<Product>> getAllChildProducts(@PathVariable("category_id") Long category_id)
    {
        List<Product> products = homeService.getAllChildProducts(category_id);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
