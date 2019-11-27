defmodule RecipeAppWeb.RecipeView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.RecipeView
  alias RecipeAppWeb.IngredientView
  alias RecipeAppWeb.InstructionView

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

  def render("recipe_details.json", %{recipe: recipe}) do
    #IO.puts("inside recipe details view")
    %{id: recipe.id,
      recipe_id: recipe.recipe_id,
      title: recipe.title,
      image_url: recipe.image_url,
      calories: recipe.calories,
      fats: recipe.fats,
      carbs: recipe.carbs,
      protein: recipe.protein,
      percentCarbs: recipe.percentCarbs,
      percentFat: recipe.percentFat,
      percentProtein: recipe.percentProtein,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenFree: recipe.glutenFree,
      readyInMinutes: recipe.readyInMinutes,
      cookingMinutes: recipe.cookingMinutes,
      preparationMinutes: recipe.preparationMinutes,
      servings: recipe.servings,
      pricePerServing: recipe.pricePerServing,
      ingredients: render_many(recipe.ingredients, IngredientView, "ingredients.json"),
      instructions: render_many(recipe.instructions, InstructionView, "instructions.json")
    }
  end

  def render("recipe_with_ingredients.json", %{recipe: recipe}) do
    # ignore id for now
    %{id: recipe.id,
      recipe_id: recipe.recipe_id,
      title: recipe.title,
      image_url: recipe.image_url,
      calories: recipe.calories,
      fats: recipe.fats,
      carbs: recipe.carbs,
      protein: recipe.protein,
      ingredients: render_many(recipe.ingredients, IngredientView, "ingredients.json")}
  end
end
