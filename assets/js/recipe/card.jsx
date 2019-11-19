import React from 'react';
import ReactDOM from 'react-dom';

import { Card } from 'react-bootstrap';

export default function RecipeCard({ recipe }) {
    return (
        <Card className="col-4">
            <Card.Img src={recipe.photo} />
            <Card.Text>
                {recipe.desc}
            </Card.Text>
        </Card>
    );
}