import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {submit_comments} from '../ajax';
import {Form, Button, Alert} from 'react-bootstrap';

function state2props(state, props){
    return {recipe_id: props.recipe_id, user: {id: state.session.user_id, name: state.session.user_name}, form: state.forms.new_comments}
}

//class CommentInput extends Component
class  CommentInput extends Component{
    changed(data){
        this.props.dispatch({
            type: 'CHANGE_COMMENTS',
            data: data,
        });
    }

    clearInputBox(){
        document.getElementById("comments_input").value = "";
    }

    render (){
        let {recipe_id, user, form} = this.props;
        console.log("user", user);
        console.log("new_comment", form)

        if (recipe_id != form.recipe_id){
            this.changed({recipe_id: recipe_id});
        }
        if (user.id != form.user_id){
            this.changed({user_id: user.id});
        }
        let error_msg = null;
        if (form.errors){
            error_msg = <Alert variant="danger">{form.errors}</Alert>;
        }
        return (
            <div className = 'comment-input'>
                <Form.Group controlId="comments_input">
                    <Form.Label id = 'username'>User Name:&nbsp; &nbsp;{user.name}</Form.Label>
                    <br></br>
                    <Form.Control as="textarea" rows="3"
                                  onChange={(ev) => this.changed({comments: ev.target.value}) }/>
                </Form.Group>
                {error_msg}
                <Form.Group controlId="submit">
                    <button class="btn btn-primary float-right"
                            onClick={() => submit_comments(this)}>
                        Submit</button>
                </Form.Group>
            </div>
        )
    }
}

export default connect(state2props)(CommentInput);