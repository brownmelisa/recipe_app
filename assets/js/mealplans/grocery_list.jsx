import React from 'react';
import {Col, ListGroup, Table} from 'react-bootstrap';
import {getGroceryList} from '../ajax';
import {connect} from "react-redux";

/**
 *
 */

function state2props(state) {
  return state;
}

class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
    // getGroceryList(this);
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }

    console.log("props in grocery list", this.props);
    console.log("id in props", this.props.id);
    let grocery_data = this.props.mealplans.get_gl_by_mpid_resp.data;
    let groceries = grocery_data.groceryItems.map(item => {
                                                    return (
                                                      <tr key={item.id}>
                                                        <td>{item.name} <img className="glImage" src={item.image_url}/></td>
                                                        <td>{Math.round(item.amount * 100) / 100} {item.unit}</td>
                                                        <td>{item.aisle}</td>
                                                      </tr>
                                                    )
                                                  }
    );

    return (
      <div>
        <h3>Grocery List for Meal Plan: {grocery_data.mealPlanName}</h3>
        <Table striped bordered hover size="sm">
          <thead>
          <tr>
            <th>Item Name</th>
            <th>Amount</th>
            <th>Aisle</th>
          </tr>
          </thead>
          <tbody>
          {groceries}
          <tr>
            <td colSpan="2">Minimum Total Cost</td>
            <td>${grocery_data.approxMinCost}</td>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(state2props)(GroceryList);
