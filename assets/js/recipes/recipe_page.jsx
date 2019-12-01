import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CommentInput from '../comments/input'
import CommentList from '../comments/list'
import { VictoryPie } from "victory";

function recipePage({ match, location, recipes, recipe }) {
  let local_id = location.state.id;
  let recipe_local = recipes[local_id];
  console.log("in recipe page search resp", recipe_local)
  console.log("in recipe page search recipe by id", recipe);

  return (
    <div>
      <h2>Recipe Name: {recipe.title}</h2>
      <img src={recipe.image_url} />
      <p>Total cooking time(min): {recipe.cookingMinutes + recipe.preparationMinutes + recipe.readyInMinutes}</p>
      <p>Servings(person): {recipe.servings}</p>
      <p>Calories: {recipe.calories}</p>
      <p>Carbs: {recipe.carbs}</p>
      <p>Fats: {recipe.fats}</p>
      <p>Protein: {recipe.protein}</p>
      <div className="rm-3">
        <NutritionPie fats={recipe.percentFat} carbs={recipe.percentCarbs} protein={recipe.percentProtein} />
      </div>
      <div className="ingr_and_instruction">
        <Ingredients ingredients={recipe.ingredients} />
        <Instruction instructions={recipe.instructions} />
      </div>
      <div className="comments">
        <CommentList recipe_id={recipe_local.recipe_id} />
        <CommentInput recipe_id={recipe_local.recipe_id} />
      </div>

    </div>
  )
}

function Ingredients({ ingredients }) {
  let ingr_list = _.map(ingredients, (item, index) => {
    return <li key={"ingred" + index}>
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

function NutritionPie({ fats, carbs, protein }) {
  console.log("nutrition", fats, carbs, protein)
  return (
    <div style={{ height: 300 }, { width: 300 }}>
      <VictoryPie
        width={200}
        height={200}
        labelRadius={({ innerRadius }) => innerRadius + 60}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        data={[
          { x: "Fat", y: fats },
          { x: "Carbonhydrate", y: carbs },
          { x: "Protein", y: protein }
        ]}
        style={{ labels: { fill: "black", fontSize: 10 } }}
      />
    </div>
  )
}

// function NutritionPie({ fats, carbs, protein }) {
//   let data = {
//     labels: [
//       'Carbonhydrate',
//       'Fat',
//       'Protein'
//     ],
//     datasets: [
//       {
//         values: [carbs, fats, protein]
//       },
//     ]
//   };
//   return (
//     <div>
//       <FrappeChart title="Nutrition chart"
//         type="pie"
//         axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
//         data={data}
//         colors={["#3480eb", "#c93412", "#aeff62"]}
//         height={400}
//         width={400}
//       />

//     </div>)
// }

let RecipePage = connect(({ recipes }) => ({ recipes: recipes.search_resp, recipe: recipes.get_recipe_by_id_resp }))(recipePage)
export default RecipePage;
