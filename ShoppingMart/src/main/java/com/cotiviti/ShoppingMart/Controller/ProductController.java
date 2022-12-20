package com.cotiviti.ShoppingMart.Controller;

import com.cotiviti.ShoppingMart.DTO.ProductDTO;
import com.cotiviti.ShoppingMart.Model.Product;
import com.cotiviti.ShoppingMart.Service.CategoryService;
import com.cotiviti.ShoppingMart.Service.ProductService;
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

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("product")
public class ProductController
{
    @Autowired
    private final ProductService productService;

    @Autowired
    private final CategoryService categoryService;

    @Autowired
    ServletContext context;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts()
    {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Store Image byte in database
//    @PostMapping("/add")
//    public ResponseEntity<ProductDTO> addProduct(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("user") String user) throws JsonParseException, JsonMappingException, IOException {
//        ProductDTO productDTO = new ObjectMapper().readValue(user, ProductDTO.class);
//        productDTO.setImageFile(file.getBytes());
//        productDTO.setImageUrl(file.getOriginalFilename());
//        ProductDTO dbProductDTO = productService.addProduct(productDTO);
//        return new ResponseEntity<ProductDTO>(dbProductDTO, HttpStatus.CREATED);
//    }


    @PostMapping("/add")
    public ResponseEntity<ProductDTO> addProduct(
            @RequestParam("file") MultipartFile file,
            @RequestParam("product") String product) throws JsonParseException, JsonMappingException, IOException {
        ProductDTO productDTO = new ObjectMapper().readValue(product, ProductDTO.class);

        String path = "D:/Project/Final_Project/ShoppingMart-Front/src/assets/images/product/";
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

        productDTO.setImageUrl(newFilename);

        ProductDTO dbProductDTO = productService.addProduct(productDTO);
        return new ResponseEntity<ProductDTO>(dbProductDTO, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ProductDTO> updateProduct(
            @RequestParam("file") MultipartFile file,
            @RequestParam("product") String product) throws JsonParseException, JsonMappingException, IOException
    {
        String path = "D:/Project/Final_Project/ShoppingMart-Front/src/assets/images/product/";
        ProductDTO productDTO = new ObjectMapper().readValue(product, ProductDTO.class);
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

        productDTO.setImageUrl(newFilename);

        ProductDTO dbProductDTO = productService.updateProduct(productDTO);
        return new ResponseEntity<ProductDTO>(dbProductDTO, HttpStatus.OK);
    }

    @GetMapping("/{cat_id}")
    public ResponseEntity<List<Product>> getProductByCategoryId(@PathVariable("cat_id") Long cat_id)
    {
        List<Product> products = productService.getProductByCategoryId(cat_id);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id)
    {
        Product product = productService.findProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")

    public ResponseEntity<Product> deleteProductById(@PathVariable("id") Long id)
    {
        productService.deleteProductById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
