import {Button, Card, Row} from "react-bootstrap";
import React from "react";

export default function RecipeDetails({recipeInfo, handleClose}) {
  return(
    <div>
      <Card className="col-12 carouselCard">
        <div className="row">
          <div className="col-sm-11">
            <h4 className="rdTitle">{recipeInfo.title}</h4>
          </div>
          <div className="col-sm-1">
            <Button className="rdBtn" onClick={handleClose}>X</Button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <img className="rdImage" src={recipeInfo.image_url} />
          </div>
          <div className="col-sm-4 rdNutritionDiv">
            <p className="rdNutrition">Calories: {recipeInfo.calories}</p>
            <p className="rdNutrition">Carbs: {recipeInfo.carbs}</p>
            <p className="rdNutrition">Fats: {recipeInfo.fats}</p>
            <p className="rdNutrition">Protein: {recipeInfo.protein}</p>
          </div>
        </div>

          <Ingredients ingredients={recipeInfo.ingredients} />
          <Instruction instructions={recipeInfo.instructions} />
      </Card>
    </div>

  );
}


function Ingredients({ ingredients }) {
  let ingr_list = _.map(ingredients, (item) => {
    return (
      <div key={item.ingr_id}>
        <div className="row">
          <div className="col-sm-1">
            <img className="rdIngrImage" src={item.ingr_image_url} />
          </div>
          <div className="col-sm-2">
          {Math.round(item.ingr_amount * 100) / 100} {item.ingr_unit}
          </div>
          <div className="col-sm-4">{item.ingr_name}</div>
        </div>
      </div>
    )
  });
  return (
    <div>
      <h3>Ingredients</h3>
        {ingr_list}
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
