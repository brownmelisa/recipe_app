import React,{ Component } from 'react'
import {connect} from 'react-redux';
import {list_users, list_comments} from '../ajax';
import {Form} from "react-bootstrap";

function state2props(state, props){
    return {recipe_id: props.recipe_id, users: state.users, comments: state.comments}
}


class CommentList extends Component {

    render() {
        let {recipe_id, users, comments} = this.props;
        console.log("test in commentslist recipe_id:", recipe_id);
        console.log("test in commentslist users:", users);
        console.log("test in commentslist comments:", comments);
        if (users.size == 0){
            list_users();
        }
        if (comments.size == 0){
            list_comments();
        }
        let com_filtered = [];

        for (let [key,value] of comments){
            if (value.recipe_id == recipe_id){
                com_filtered.push(value);
            }
        }
        console.log("comments filtered", com_filtered);
        let com_show = com_filtered.map((x,index) => <div key={"comment" + index}>
            <h4>
              {(!users.get(x.user_id))? "Test User" : users.get(x.user_id).name}
            </h4>
            <p>{x.comments}</p>
        </div>)
        return (
            <div className = "CommentList">
                <h3>Comments</h3>
                <div className = "List">
                {com_show}
                </div>
            </div>
        )
    }
}
export default connect(state2props)(CommentList);
