defmodule RecipeAppWeb.CommentView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      recipe_id: comment.recipe_id,
      user_id: comment.user_id,
      comments: comment.comments}
  end
end
