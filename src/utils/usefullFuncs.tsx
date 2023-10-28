import { Component } from "react";
import axios from "axios";

export function getAllCharacters(component: Component) {
  return axios
    .get("https://rickandmortyapi.com/api/character/?page=1")
    .then((response) => {
      component.setState({
        searchResults: response.data.results,
      });
    });
}

export function getCharactersByName(component: Component, searchTerm: string) {
  return axios
    .get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
    .then((response) => {
      component.setState({ searchResults: response.data.results });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        component.setState({ badRequest: true });
      }
    });
}
