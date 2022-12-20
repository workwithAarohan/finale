package com.cotiviti.ShoppingMart.Config;

import com.cotiviti.ShoppingMart.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity

public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter
{
//    @Autowired
//    private UserRepository userRepository;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception
//    {
//        auth.userDetailsService(username -> userRepository.findByUserName(username)
//            .orElseThrow(() -> new UsernameNotFoundException("User " + username + "not found"))
//        );
//    }

//    @Override
//    @Bean
//    public AuthenticationManager authenticationManagerBean() throws Exception
//    {
//        return super.authenticationManagerBean();
//    }


    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().anyRequest().permitAll();
    }
}
