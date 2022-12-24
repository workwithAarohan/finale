package com.cotiviti.ShoppingMart.Controller;

import com.cotiviti.ShoppingMart.Model.JwtRequest;
import com.cotiviti.ShoppingMart.Model.JwtResponse;
import com.cotiviti.ShoppingMart.Model.User;
import com.cotiviti.ShoppingMart.Repository.UserRepository;
import com.cotiviti.ShoppingMart.Service.UserService;
import com.cotiviti.ShoppingMart.Utility.JwtUtility;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class UserController
{
    @Autowired
    private JwtUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private final UserService userService;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("forAdmin")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "This URL isn only accessible to admin";
    }

    @GetMapping("forUser")
    @PreAuthorize("hasRole('Customer')")
    public String forUser() {
        return "This URL isn only accessible to user";
    }

    @PostMapping("authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception
    {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid Credential", e);
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(jwtRequest.getUsername());

        final String token =
                jwtUtility.generateToken(userDetails);

        User user = userRepository.findByUserName(jwtRequest.getUsername());

        return new JwtResponse(token, user);
    }



    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public ResponseEntity<User> registerNewUser(@RequestBody User user)
    {
        User newUser = userService.registerNewUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers()
    {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id)
    {
        User User = userService.getUserById(id);
        return new ResponseEntity<>(User, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User User)
    {
        User updatedUser = userService.updateUser(User);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id)
    {
        userService.deleteUser(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
}
