defmodule RecipeApp.Recipes.Recipe do
  use Ecto.Schema
  import Ecto.Changeset

  schema "recipes" do
    field :calories, :integer
    field :carbs, :string
    field :fats, :string
    field :image_url, :string
    field :protein, :string
    field :recipe_id, :integer
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:recipe_id, :title, :image_url, :calories, :fats, :carbs, :protein])
    |> validate_required([:recipe_id, :title, :image_url, :calories, :fats, :carbs, :protein])
  end
end
