import { createContext, useContext, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: '',
};

function reducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case 'loading': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'cities/loaded': {
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    }
    case 'city/loaded': {
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad,
      };
    }
    case 'city/added': {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payLoad],
        currentCity: action.payLoad,
      };
    }
    case 'city/deleted': {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
      };
    }
    case 'rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    }
    default: {
      throw new Error('Action type is unknown');
    }
  }
}

function CitiesProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function loadCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payLoad: data });
      } catch {
        dispatch({ type: 'rejected', payload: 'Error in fetch cities' });
      }
    }
    loadCities();
  }, []);

  async function getCity(id) {
    console.log(id, currentCity.id);
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payLoad: data });
    } catch {
      dispatch({ type: 'rejected', payload: 'Error in fetch city' });
    }
  }

  async function addCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/added', payLoad: data });
    } catch {
      dispatch({ type: 'rejected', payload: 'Error in add city' });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payLoad: id });
    } catch {
      dispatch({ type: 'rejected', payload: 'Error in delete city' });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        addCity,
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
    throw new Error('CitiesContext was used outside of the CitiesProvider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
