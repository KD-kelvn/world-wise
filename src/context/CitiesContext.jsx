import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { citiesReducer } from "./citiesReducer";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    citiesReducer,
    initialState
  );

  useEffect(function () {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function fetchCities() {
      dispatch({ type: "LOADING" });

      try {
        const res = await fetch(`${BASE_URL}/cities`, { signal: signal });
        const data = await res.json();

        dispatch({ type: "CITIES_LOADED", payload: data });
      } catch (error) {
        dispatch({
          type: "REJECTED",
          payload: "There was an error loading cities...",
        });
      }
    }

    fetchCities();
    return function () {
      abortController.abort();
    };
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "CITY_LOADED", payload: data });
      } catch (error) {
        console.error(error.message);
        dispatch({
          type: "REJECTED",
          payload: "There was an error loading city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "LOADING" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      const data = await res.json();
      dispatch({ type: "CITY_CREATED", payload: data });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: "REJECTED",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "LOADING" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "CITY_DELETED", payload: id });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: "REJECTED",
        payload: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
