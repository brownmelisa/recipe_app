import React, {useState} from 'react';
import {Button, Carousel, Card, Row, Col} from "react-bootstrap";
import {connect} from "react-redux";
import _ from 'lodash';
import {getRecipe} from "../ajax";
import RecipeDetails from "./recipe_details";
import CarouselDisplay from "./carousel_display";

// a dispatch function that send events from component to the redux store
function state2props(state) {
  return state.recipes;
}

class RecipesCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayRecipe: false,
    };
    this.handleClickPicture = this.handleClickPicture.bind(this);
    this.handleCloseRecipeDetails = this.handleCloseRecipeDetails.bind(this);
  }

  // update store with the recipe name and id
  changed(data) {
    alert('meal added ' + name + id);
    this.props.dispatch(
      {
        type: 'CHANGE_NEW_DAY_PLAN_NAME',
        data: data,
      });
  }

  searchTermChanged(ev) {
    let input = ev.target.value;
    let searchTerm = null;
    if (input.length > 0) {
      searchTerm = input;
    }
    // add to state
    this.changed({ searchTerm: searchTerm });
  }


  // show recipe information when picture is clicked
  handleClickPicture(id) {
    // COMMENT THIS OUT FOR DESIGNING CAROUSEL WITHOUT PINGING API
    this.props.dispatch(
      {
        type: 'CHANGE_GET_RECIPE_TEST',
        data: { recipeId: id },
      });
    getRecipe();
    ///////////////////////////////////
    this.setState({displayRecipe: true});
  }

  // close the recipe display and go back to carousel results
  handleCloseRecipeDetails(ev) {
    this.setState({displayRecipe: false});
  }

  render() {
    let recipes = this.props.search_resp;
    let details = this.props.get_recipe_by_id_resp;
    console.log("printing out props in recipes", this.props);
    let mealType = this.props.mealType;

    // let recipes_formatted = _.map(recipes, (recipe) => {
    //   return (
    //     <Carousel.Item key={recipe.id}>
    //       <div className="row">
    //         <Col md="2"/>
    //         <Card className="col-3 carouselCard">
    //           <Card.Img src={recipe.image_url}
    //                     onClick={() => this.handleClickPicture(recipe.id)}/>
    //           <Card.Text>
    //             {recipe.title + " " + recipe.calories + " Cal"}
    //           </Card.Text>
    //           <div className="card_buttons">
    //             <Button variant="primary"
    //                     onClick={() =>
    //                       this.props.onAddRecipe( {[mealType]: recipe.id.toString()}, recipe.title, mealType)
    //                     }
    //             >
    //               Add to Meal Plan
    //             </Button>
    //           </div>
    //         </Card>
    //       </div>
    //     </Carousel.Item>
    //   )
    // });

    if (this.state.displayRecipe === true) {
      return (
        <RecipeDetails
          // UNCOMMENT THIS FOR DESIGNING CAROUSEL WITHOUT PINGING API
          // recipeInfo = {test_data}
          recipeInfo = {this.props.get_recipe_by_id_resp}
          handleClose = {this.handleCloseRecipeDetails}
        />);
    }
    return (
      <Carousel activeIndex={controlCarousel.index}
                direction={controlCarousel.direction}
                onSelect={controlCarousel.handleSelect}
                interval="300000"
                id="carouselMain">"
        {/*{recipes_formatted}*/}
        <CarouselDisplay recipes={recipes}/>
      </Carousel>
    )}
}
// connects a React component to a Redux store
// It provides its connected component with the pieces of the data it needs from the store,
// and the functions it can use to dispatch actions to the store.
export default connect(state2props)(RecipesCarousel);


// function using React hooks to control the movement of the carousel
// not actually a React Component since it doesn't return an element
function controlCarousel() {
  // use React hooks to control movement of carousel.
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  // const testResult = [];

  const handleSelect = (selectedIndex, e) => {

    setIndex(selectedIndex);
    console.log("selectedIndex", selectedIndex);
    setDirection(e.direction);
    console.log("direction", e.direction);
  };
}


let test_data = {
  calories: 404.67,
  carbs: "12.32g",
  cookingMinutes: null,
  fats: "22.5g",
  glutenFree: false,
  id: 775925,
  image_url: "https://spoonacular.com/recipeImages/775925-556x370.jpg",
  ingredients: [
    {
      ingr_amount: 1,
      ingr_id: 11011,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/asparagus.png",
      ingr_name: "asparagus",
      ingr_unit: "pound"
    },
    {ingr_amount: 0.5,
      ingr_id: 1002030,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/pepper.jpg",
      ingr_name: "black pepper",
      ingr_unit: "teaspoon",
    },
    {
      ingr_amount: 2,
      ingr_id: 2041,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/tarragon.jpg",
      ingr_name: "fresh tarragon",
      ingr_unit: "tablespoons",
    },
    {
      ingr_amount: 0.75,
      ingr_id: 1082047,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/salt.jpg",
      ingr_name: "kosher salt",
      ingr_unit: "teaspoon",
    },
    {
      ingr_amount: 3,
      ingr_id: 4053,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/olive-oil.jpg",
      ingr_name: "olive oil",
      ingr_unit: "tablespoons",
    },
    {
      ingr_amount: 3,
      ingr_id: 10018079,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/panko.jpg",
      ingr_name: "panko",
      ingr_unit: "tablespoons",
    },
    {
      ingr_amount: 24,
      ingr_id: 15076,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/salmon.png",
      ingr_name: "salmon fillets",
      ingr_unit: "ounce",
    },
    {ingr_amount: 0.25,
      ingr_id: 1012028,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/paprika.jpg",
      ingr_name: "smoked paprika",
      ingr_unit: "teaspoon",
    },
    {
      ingr_amount: 8,
      ingr_id: 1012046,
      ingr_image_url: "https://spoonacular.com/cdn/ingredients_250x250/whole-grain-mustard.png",
      ingr_name: "whole grain dijon mustard",
      ingr_unit: "teaspoons"},
  ],
  percentCarbs: 12.14,
  percentFat: 49.89,
  percentProtein: 37.97,
  preparationMinutes: null,
  pricePerServing: 5.4036,
  protein: "38.52g",
  readyInMinutes: 8,
  recipe_id: 775925,
  servings: 4,
  title: "Baked Mustard-Crusted Salmon With Asparagus and Tarragon",
  vegan: false,
  vegetarian: false
};
