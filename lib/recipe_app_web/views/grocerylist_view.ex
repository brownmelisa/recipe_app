defmodule RecipeAppWeb.GrocerylistView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.GrocerylistView
  alias RecipeAppWeb.GroceryitemView

  def render("show.json", %{grocerylist: grocerylist}) do
    %{data: render_one(grocerylist, GrocerylistView, "grocerylist.json")}
  end

  def render("grocerylist.json", %{grocerylist: grocerylist}) do
    %{
      mealPlanName: grocerylist.mealPlanName,
      approxMinCost: grocerylist.approxMinCost,
      groceryItems: render_many(grocerylist.groceryItems, GroceryitemView, "groceryitem.json")
    }
  end
end
