package com.cotiviti.ShoppingMart.Domain;


public class Response
{
    private String message;

    public Response(String message)
    {
        super();
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
