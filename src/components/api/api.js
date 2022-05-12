import React from "react";
import axios from "axios";


const baseUrl = `http://www.omdbapi.com/?`;

export const fetchMoviesList = (page, searchValue) => {
    console.log("here in ");

    return axios
        .get(`${baseUrl}s=${searchValue}&apikey=e4e6e50f&page=${page}`)
        .then((response) => {
            console.log(response, "response");
            
            return response?.data;
        })
        .catch((error) => {

            console.log(error, "error");
            
        });
};




