import React, { useState } from 'react';
import {Button, Carousel, Card, Row} from "react-bootstrap";
import {connect} from "react-redux";
import _ from 'lodash';
import {getRecipe} from "../ajax";

let RecipesCarousel = connect(({ recipes }) => ({ recipes: recipes.search_resp }))(recipesCarousel)

function recipesCarousel({recipes}) {

  // use React hooks to control movement of carousel.
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  function handleAddMeal(name, id) {
    alert('meal added ' + name + id);
  }

  function handleImageClick (_local_id, id) {
    console.log("image clicked", id, local_d);
    this.props.dispatch({
                          type: 'CHANGE_GET_RECIPE_TEST',
                          data: { recipeId: id },
                        });
    getRecipe();
    this.setState({
                    redirect: "/recipepage",
                  });
  }

  let chunked = _.chunk(recipes, 2);
  console.log("chunked is", chunked[0]);

  let recipes_formatted = _.map(recipes, (recipe) => {
    console.log("item is", recipe);
    return (
        <Carousel.Item key={recipe.id}>
          <div className="row">
          <Card className="col-6 carouselCard">
            <Card.Img src={recipe.image_url}
                      onClick={() => handleImageClick(this.props.local_id, recipe.id)}  />
            <Card.Text>
              {recipe.title + " " + recipe.calories + " Cal"}
            </Card.Text>
            <div className="card_buttons">
              <Button variant="primary">Favorite</Button>
              <Button variant="primary" onClick={() => handleAddMeal(recipe.title, recipe.id)}>Add to Meal Plan</Button>
            </div>
          </Card>
          </div>
        </Carousel.Item>
    )
  });

  console.log("formatted recipes ", recipes_formatted);
  return (
    <Carousel activeIndex={index}
              direction={direction}
              onSelect={handleSelect}
              interval="300000">
      {recipes_formatted}
    </Carousel>
  )
}

export default RecipesCarousel;
//
// <img className="d-block w-100" src={recipe.image_url} alt={recipe.title}/>
// <Carousel.Caption>{recipe.title + " " + recipe.calories + "Cal"}</Carousel.Caption>
