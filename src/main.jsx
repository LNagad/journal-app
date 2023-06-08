import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { JournalApp } from './JournalApp';

import './styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
import { store } from './store';

const root = createRoot(document.getElementById('root'));

root.render(
   
   <Provider store={ store }>
      <BrowserRouter>
         <JournalApp />
      </BrowserRouter>
   </Provider>
   
);
