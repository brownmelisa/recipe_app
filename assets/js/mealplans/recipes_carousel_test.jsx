import React, {useState} from 'react';
import {Button, Carousel, Card, Row} from "react-bootstrap";
import {connect} from "react-redux";
import _ from 'lodash';
import {getRecipe} from "../ajax";

// let RecipesCarousel = connect(({ recipes }) => ({ recipes: recipes.search_resp
// }))(recipesCarousel)
function state2props(state) {
  return state.recipes;
}


class RecipesCarouselTest extends React.Component {
  constructor(props) {
    super(props);

    console.log("props contains", props);
    this.state = {
      displayRecipe: false,
    };
    this.handleAddMeal = this.handleAddMeal.bind(this);
    this.handleClickPicture = this.handleClickPicture.bind(this);
    this.handleCloseRecipeDetails = this.handleCloseRecipeDetails.bind(this);
  }

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  //   setDirection(e.direction);
  // };


  handleAddMeal(name, id) {
    alert('meal added ' + name + id);
  }

  handleClickPicture(id) {
    this.props.dispatch({
                          type: 'CHANGE_GET_RECIPE_TEST',
                          data: { recipeId: id },
                        });
    getRecipe();
    console.log("inside click picture",  this.state.displayRecipe);
    this.setState({displayRecipe: true});
  }

  handleCloseRecipeDetails(ev) {
    console.log("close button clicked");
    this.setState({displayRecipe: false});
  }

  render() {
    let recipes = this.props.search_resp;
    let details = this.props.get_recipe_by_id_resp;
    console.log("details are", details);
    console.log("display setting", this.state.displayRecipe);

    let recipes_formatted = _.map(recipes, (recipe) => {
      return (
        <Carousel.Item key={recipe.id}>
          <div className="row">
            <Card className="col-6 carouselCard">
              <Card.Img src={recipe.image_url}
                        onClick={() => this.handleClickPicture(recipe.id)}/>
              <Card.Text>
                {recipe.title + " " + recipe.calories + " Cal"}
              </Card.Text>
              <div className="card_buttons">
                <Button variant="primary">Favorite</Button>
                <Button variant="primary" onClick={() => this.handleAddMeal(recipe.title, recipe.id)}>Add
                  to Meal Plan</Button>
              </div>
            </Card>
          </div>
        </Carousel.Item>
      )
    });

    if (this.state.displayRecipe === true) {
      return (
        <RecipeDetails
          recipeInfo = {this.props.get_recipe_by_id_resp}
          handleClose = {this.handleCloseRecipeDetails}
        />);
    }
    return (
      <Carousel activeIndex={controlCarousel.index}
                direction={controlCarousel.direction}
                onSelect={controlCarousel.handleSelect}
                interval="300000">
        {recipes_formatted}
      </Carousel>
    )}
}
export default connect(state2props)(RecipesCarouselTest);


// functional component using react hooks to control the movement of the carousel
function controlCarousel() {
  // use React hooks to control movement of carousel.
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const testResult = [];

  const handleSelect = (selectedIndex, e) => {

    setIndex(selectedIndex);
    console.log("selectedIndex", selectedIndex);
    setDirection(e.direction);
    console.log("direction", e.direction);
  };
}

function RecipeDetails({recipeInfo, handleClose}) {
  return(
    <div>
      <Card className="col-6 carouselCard">
      <h2>THE RECIPE DETAILS</h2>
        <h4>Recipe Name: {recipeInfo.title}</h4>
        <img src={recipeInfo.image_url} />
        <p>Calories: {recipeInfo.calories}</p>
        <p>Carbs: {recipeInfo.carbs}</p>
        <p>Fats: {recipeInfo.fats}</p>
        <p>Protein: {recipeInfo.protein}</p>
        <Button onClick={handleClose}>X</Button>
      </Card>
    </div>
  );

}
