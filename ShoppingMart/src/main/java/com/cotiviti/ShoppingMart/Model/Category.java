package com.cotiviti.ShoppingMart.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "category")
public class Category
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String imageUrl;

    @ManyToOne(cascade = CascadeType.DETACH,fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_category_id", nullable = true)
    private Category parentCategory;

    @JsonIgnore
    @OneToMany(mappedBy="category",cascade=CascadeType.REMOVE)
    private Set<Product> products;

//    @JsonManagedReference
//    public Set<Product> getProducts(){
//        return products;
//    }

//    @OneToMany(mappedBy = "subCategory")
//    private List<Category> childCategory = new ArrayList<Category>();

    @JsonIgnore
    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.REMOVE)
    private Set<Category> child = new LinkedHashSet<Category>();
}
