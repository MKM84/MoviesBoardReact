import React from 'react';

const MoviesContext = React.createContext([]);

export const MoviesProvider = MoviesContext.Provider;
export const MoviesConsumer = MoviesContext.Consumer;
export default MoviesContext;