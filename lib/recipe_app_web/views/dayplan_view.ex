defmodule RecipeAppWeb.DayplanView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.DayplanView
  alias RecipeAppWeb.RecipeView

  def render("index.json", %{dayplans: dayplans}) do
    %{data: render_many(dayplans, DayplanView, "dayplan.json")}
  end

  def render("show.json", %{dayplan: dayplan}) do
    %{data: render_one(dayplan, DayplanView, "dayplan.json")}
  end

  def render("dayplan.json", %{dayplan: dayplan}) do
    %{id: dayplan.id,
      date: dayplan.date,
      breakfast: dayplan.breakfast,
      lunch: dayplan.lunch,
      dinner: dayplan.dinner,
      snack: dayplan.snack}
  end

  def render("dayplanWithRecipes.json", %{dayplan: dayplan}) do
    %{id: dayplan.id,
      date: dayplan.date,
      breakfast: render_one(dayplan.breakfast, RecipeView, "recipe_details.json"),
      lunch: render_one(dayplan.lunch, RecipeView, "recipe_details.json"),
      dinner: render_one(dayplan.dinner, RecipeView, "recipe_details.json"),
      snack: render_one(dayplan.snack, RecipeView, "recipe_details.json"),
    }
  end
end
