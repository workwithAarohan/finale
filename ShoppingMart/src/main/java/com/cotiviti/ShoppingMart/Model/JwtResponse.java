package com.cotiviti.ShoppingMart.Model;

import com.cotiviti.ShoppingMart.DTO.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String jwtToken;
    private UserDTO user;
}
