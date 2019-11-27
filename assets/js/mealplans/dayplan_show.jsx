import React from 'react';
import {ListGroup} from 'react-bootstrap';

/**
 *
 * @param meals   a list of json objects that contain recipes information
 * @returns {*}   displays a list of recipe names by meal type
 */

export default function DayPlanShow({meals}) {
  // get the recipe names categorized by meals
  function getMealsByType(type) {
    let result = meals.map( (recipe) => {
      if (recipe.meal === type) {
        return <ListGroup.Item key={recipe.id}>{recipe.title}</ListGroup.Item>;
      }
    });
    return result;
  }

  let breakfast = "";
  let lunch = "";
  let dinner = "";

  if (meals) {
    breakfast = getMealsByType("breakfast");
    lunch = getMealsByType("lunch");
    dinner = getMealsByType("dinner");
  }

  return (
    <div>
      <ListGroup>
        <ListGroup.Item variant="info" className="mpHeadingItem">
          Breakfast
        </ListGroup.Item>
        {breakfast}
        <ListGroup.Item variant="info" className="mpHeadingItem">
          Lunch
        </ListGroup.Item>
        {lunch}
        <ListGroup.Item variant="info" className="mpHeadingItem">
          Dinner
        </ListGroup.Item>
        {dinner}
      </ListGroup>
    </div>
  );
}
