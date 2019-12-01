import React from "react";
import {Button, Card, Carousel, Col} from "react-bootstrap";
import _ from 'lodash';

export default function CarouselDisplay({ recipes }) {
  let triplets_array = _.chunk(recipes, 2);
  console.log("recipes in carousel display", recipes);

  let recipes_formatted = _.map(triplets_array, (triplet) => {
    return (
      <Carousel.Item key={triplet[0].id}>
        <div className="row">
          {/*<Col md="2"/>*/}
          <Card className="col-3 carouselCard">
            <Card.Img src={triplet[0].image_url}/>
            {/*onClick={() => this.handleClickPicture(recipe.id)}/>*/}
            <Card.Text>
              {triplet[0].title + " " + triplet[0].calories + " Cal"}
            </Card.Text>
            <div className="card_buttons">
              <Button variant="primary"
                // onClick={() =>
                //   this.props.onAddRecipe( {[mealType]: recipe.id.toString()}, recipe.title, mealType)
                // }
              >
                Add to Meal Plan
              </Button>
            </div>
          </Card>

          <Card className="col-3 carouselCard">
            <Card.Img src={triplet[1].image_url}/>
            {/*onClick={() => this.handleClickPicture(recipe.id)}/>*/}
            <Card.Text>
              {triplet[1].title + " " + triplet[1].calories + " Cal"}
            </Card.Text>
            <div className="card_buttons">
              <Button variant="primary"
                // onClick={() =>
                //   this.props.onAddRecipe( {[mealType]: recipe.id.toString()}, recipe.title, mealType)
                // }
              >
                Add to Meal Plan
              </Button>
            </div>
          </Card>
        </div>
      </Carousel.Item>
    )
  });


  return (
    <div>
      {recipes_formatted};
    </div>
  )
}
