import Home from './pages/Home'
import SingleRecipe from './pages/SingleRecipe';
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom';
import AddRecipe from './pages/AddRecipe';

function App() {

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/singlerecipe/:recipeID' element={<SingleRecipe />} />
          <Route path='/addrecipe' element={<AddRecipe />} />
        </Routes>
      </main>
    </>
  )
}

export default App
