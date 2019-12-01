defmodule RecipeApp.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :comments, :string
    field :recipe_id, :integer
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:recipe_id, :user_id, :comments])
    |> validate_required([:recipe_id, :user_id, :comments])
  end
end
