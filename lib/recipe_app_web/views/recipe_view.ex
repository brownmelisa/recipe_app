defmodule RecipeAppWeb.RecipeView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.RecipeView

  def render("index.json", %{recipes: recipes}) do
    %{data: render_many(recipes, RecipeView, "recipe.json")}
  end

  def render("show.json", %{recipe: recipe}) do
    %{data: render_one(recipe, RecipeView, "recipe.json")}
  end

  def render("recipe.json", %{recipe: recipe}) do
    # ignore id for now
    %{id: recipe.id,
      recipe_id: recipe.recipe_id,
      title: recipe.title,
      image_url: recipe.image_url,
      calories: recipe.calories,
      fats: recipe.fats,
      carbs: recipe.carbs,
      protein: recipe.protein}
  end
end
