import React from 'react';
import MoviesList from './components/Movies/MovieList';
import DesignLayout from './components/Layout';

function App() {
  return (
    <DesignLayout content={<MoviesList/>}></DesignLayout>
  );
}


export default App;
