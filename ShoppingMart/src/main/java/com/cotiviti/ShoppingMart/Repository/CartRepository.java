package com.cotiviti.ShoppingMart.Repository;

import com.cotiviti.ShoppingMart.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>
{

    List<Cart> findCartByUserId(Long user_id);

    @Query(nativeQuery = true, value = "SELECT Count(1) FROM Cart where user_id = :userId")
    Long getCartCount(@Param("userId") Long userId);
}
