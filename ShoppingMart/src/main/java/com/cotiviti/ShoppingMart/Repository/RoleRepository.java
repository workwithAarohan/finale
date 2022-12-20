package com.cotiviti.ShoppingMart.Repository;

import com.cotiviti.ShoppingMart.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findRoleByRoleCode(String user);

    Role findRoleById(Long id);
}
