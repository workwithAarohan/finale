package com.cotiviti.ShoppingMart.Service;

import com.cotiviti.ShoppingMart.Model.Role;
import com.cotiviti.ShoppingMart.Model.User;
import com.cotiviti.ShoppingMart.Repository.RoleRepository;
import com.cotiviti.ShoppingMart.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService
{
    private PasswordEncoder passwordEncoder;

    public UserService( @Lazy PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);

        if(user != null)
        {
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getPassword(),
                    getAuthorities(user)
            );
        }
        else {
            throw new UsernameNotFoundException("User not found");
        }

     }

     private Set getAuthorities(User user)
     {
         Set authorities = new HashSet();
         user.getRoles().forEach(role -> {
             authorities.add(new SimpleGrantedAuthority("ROLE_"+ role.getRole()));
         });

         return authorities;
     }


//     private void authentication(String username, String password)
//     {
//         authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//     }

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public User registerNewUser(User user)
    {
        String decodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(decodedPassword);
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
