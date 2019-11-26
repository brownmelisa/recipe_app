import React from 'react';
import {Col, ListGroup, Table} from 'react-bootstrap';

/**
 * Grocery_list is a functional component that renders a list of meals that is passed into the
 * function. The recipe names are displayed underneath the corresponding meal (Breakfast, Lunch,
 * Dinner, Snack). If there are no entries for a meal, the meal type will still display, but with
 * no recipe names listed under it.
 *
 {
          "id":4053,
          "aisle":"Oil, Vinegar, Salad Dressing",
          "name":"olive oil",
          "amount":1,
          "unit":"serving"
        },
 *
 * @param meals   a list of json objects that contain recipes information
 * @returns {*}   displays a list of recipe names by meal type
 */

export default function GroceryList({groceries}) {
  // get the recipe names categorized by meals
  let items = _.map([...groceries], item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.amount + " " + item.unit} </td>
        <td>{item.aisle}</td>
      </tr>
    );
  });

  return (

    <div>
      <h3>Grocery List</h3>
      <Table striped bordered hover id="groceryList">
        <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Aisle</th>
        </tr>
        </thead>
        <tbody>
        {items}
        </tbody>
      </Table>
    </div>
  );
}
