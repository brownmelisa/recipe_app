defmodule RecipeAppWeb.IngredientView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.IngredientView

  def render("ingredients.json", %{ingredient: ingredient}) do
    %{
      ingr_id: ingredient.ingr_id,
      ingr_image_url: ingredient.ingr_image_url,
      ingr_name: ingredient.ingr_name,
      ingr_amount: ingredient.ingr_amount,
      ingr_unit: ingredient.ingr_unit,
    }
  end

end
