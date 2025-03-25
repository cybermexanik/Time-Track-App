import * as React from "react";
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import './App.css';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
