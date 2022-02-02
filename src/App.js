import React, {useEffect, useState, useRef} from 'react';
import Recipe from './Recipe';
// import './App.css';
import './css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {

  const APP_ID = 'fecd3471';
  const APP_KEY = 'e2dd4210fd1b1239a2d5615d8d1a9e5e';
  
  const searchInputRef = useRef();

  const [recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipies();
  },[query]);

  const getRecipies = async ()=>{
    const responce = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await responce.json();
    console.log(data.hits);
    setRecipies(data.hits);
  }

  const updateSearch = (e)=>{
    setSearch(searchInputRef.current.value); 
  }

  const getSearch = (e)=>{
    e.preventDefault();
    setQuery(search);
    searchInputRef.current.value = null;
  }


  return (
    <div className='App'>
      <form className='search' onSubmit={getSearch}>
        <input type="text" className='search__bar' ref={searchInputRef} onChange={updateSearch}/>
        <button type='submit' className='search__button'><FontAwesomeIcon icon={faSearch} className='search__button__icon'></FontAwesomeIcon></button>
      </form>
      <div className='recipes'>
      {recipies.map(recipe =>(
        <Recipe 
          key={recipe.recipe.label} 
          title = {recipe.recipe.label} 
          calories= {Math.floor(recipe.recipe.calories)} 
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
