defmodule RecipeAppWeb.GroceryitemView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.GroceryitemView

  def render("show.json", %{groceryitem: groceryitem}) do
    %{data: render_one(groceryitem, GroceryitemView, "groceryitem.json")}
  end

  def render("index.json", %{groceryitems: groceryitems}) do
    %{data: render_many(groceryitems, GroceryitemView, "groceryitem.json")}
  end

  def render("groceryitem.json", %{groceryitem: groceryitem}) do
    %{
      id: groceryitem.id,
      name: groceryitem.name,
      amount: groceryitem.amount,
      unit: groceryitem.unit,
      aisle: groceryitem.aisle,
      image_url: groceryitem.image_url
    }
  end



end
