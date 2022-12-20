package com.cotiviti.ShoppingMart.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Role
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String role;

    private String roleCode;

    @Column(name = "role_description")
    private String roleDescription;

//    @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL)
//    private Set<User> users = new HashSet<>();
}
