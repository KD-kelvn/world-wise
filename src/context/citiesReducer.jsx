export function citiesReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CITIES_LOADED":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };

    case "CITY_LOADED":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };

    case "CITY_CREATED":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };

    case "CITY_DELETED":
      return {
        ...state,
        cities: state.cities.filter(function (city) {
          return city.id !== action.payload;
        }),
        currentCity: {},
        isLoading: false,
      };

    case "REJECTED":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
