package com.cotiviti.ShoppingMart.Repository;

import com.cotiviti.ShoppingMart.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(Long id);

    User findByUserName(String username);
}
