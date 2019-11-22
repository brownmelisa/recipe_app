import React from 'react';
import { Redirect } from 'react-router';

import { Card, Button } from 'react-bootstrap';
import { getRecipe } from '../ajax';
import store from '../store';
import { connect } from 'react-redux';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        };
    }

    redirect(_local_id, id) {
      console.log("redirect id", id);
      this.props.dispatch({
        type: 'CHANGE_GET_RECIPE_TEST',
        data: { recipeId: id },
      });
      getRecipe();
      this.setState({
        redirect: "/recipepage",
      });
    }

    render() {
        if (this.state.redirect) {
            console.log(this.props.local_id)
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { id: this.props.local_id }
            }} />;
        }


        let recipe = this.props.recipe;
        return (
            <Card className="col-4">
                <Card.Img onClick={() => this.redirect(this.props.local_id)} src={recipe.image_url} />
                <Card.Text>
                    {recipe.title}
                </Card.Text>
                <div className="card_buttons">
                    <Button variant="primary">Favorite</Button>
                    <Button variant="primary">Add to Meal Plan</Button>
                </div>
            </Card>
        );
    }
}

export default connect(({ }) => ({}))(RecipeCard)
