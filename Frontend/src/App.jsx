import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';
import UpdateBook from './pages/UpdateBook';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/book/create' element={<CreateBook/>} /> 
      <Route path='/book/details/:id' element={<ShowBook/>} /> 
      <Route path='/book/update/:id' element={<UpdateBook/>} /> 
      <Route path='/book/delete/:id' element={<DeleteBook/>} /> 
    </Routes>
  )
}

export default App