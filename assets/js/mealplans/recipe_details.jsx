import {Button, Card} from "react-bootstrap";
import React from "react";

export default function RecipeDetails({recipeInfo, handleClose}) {
  return(
    <div>
      <Card className="col-6 carouselCard">
        <h4>Recipe Name: {recipeInfo.title}</h4>
        <img src={recipeInfo.image_url} />
        <p>Calories: {recipeInfo.calories}</p>
        <p>Carbs: {recipeInfo.carbs}</p>
        <p>Fats: {recipeInfo.fats}</p>
        <p>Protein: {recipeInfo.protein}</p>
        <div className="ingr_and_instruction">
          <Ingredients ingredients={recipeInfo.ingredients} />
          <Instruction instructions={recipeInfo.instructions} />
        </div>
        <Button onClick={handleClose}>X</Button>
      </Card>
    </div>
  );
}


function Ingredients({ ingredients }) {
  let ingr_list = _.map(ingredients, (item) => {
    return <li key={item.ingr_id}>
      <p>
        <img src={item.ingr_image_url} />
        {item.ingr_amount} {item.ingr_unit} {item.ingr_name}</p>
    </li>
  });
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingr_list}
      </ul>
    </div>);
}

function Instruction({ instructions }) {
  let inst_list = _.map(instructions, (inst, id) => {
    return <li key={id}>
      {inst.step}
    </li>
  })
  return (
    <div>
      <h3>Instructions</h3>
      <ol> {inst_list} </ol>
    </div>);
}
