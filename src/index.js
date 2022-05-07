import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from 'src/App';
import reportWebVitals from 'src/reportWebVitals';
import favoritesReducers from 'src/store/reducers/movie-favorites';
import searchReducer from 'src/store/reducers/movie-reducer';

const rootReducer = combineReducers({
  movie: searchReducer,
  favorites: favoritesReducers
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
