import { createContext } from 'react';

export const ItineraryContext = createContext({
    jsonResponse: {},
    setJsonResponse: () => {},
});