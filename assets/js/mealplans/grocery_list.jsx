import React from 'react';
import {Col, ListGroup, Table} from 'react-bootstrap';
import { getGroceryList } from '../ajax';
/**
 *
 */

export default function GroceryList(props) {
  console.log("props in grocery list", props);

  // get the recipe names categorized by meals
  // let items = _.map([...groceries], item => {
  //   return (
  //     <tr key={item.id}>
  //       <td>{item.name}</td>
  //       <td>{item.amount + " " + item.unit} </td>
  //       <td>{item.aisle}</td>
  //     </tr>
  //   );
  // });

  return (

    <div>
      <h3>Grocery List</h3>
    </div>
  );
}

//
//
//
