package com.cotiviti.ShoppingMart.Service;

import com.cotiviti.ShoppingMart.Model.Role;
import com.cotiviti.ShoppingMart.Model.User;
import com.cotiviti.ShoppingMart.Repository.RoleRepository;
import com.cotiviti.ShoppingMart.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService
{
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public User registerNewUser(User user)
    {
      Role role = roleRepository.findRoleByRoleCode("User");
//      role.UserRole(user);
      user.UserRole(role);
      return userRepository.save(user);
    }

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    public User updateUser(User user)
    {
        return userRepository.save(user);
    }

    public void deleteUser(Long id)
    {
        userRepository.deleteById(id);
    }
}
