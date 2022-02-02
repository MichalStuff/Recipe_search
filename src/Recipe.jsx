import React from 'react';

export default function Recipe({title, calories, image, ingredients}) {
  return (
  <div className='recipes__recipe'>
      <h1>{title}</h1>
      <p>This meal contains : {calories} Calories</p>
      <img src={image} alt={image} />
      <ol>
        {ingredients.map(ingredient =>(
            <li>{ingredient.text}</li>
        ))}
      </ol>
  </div>
    );
}
