defmodule RecipeAppWeb.MealplanView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.MealplanView

  def render("index.json", %{mealplans: mealplans}) do
    %{data: render_many(mealplans, MealplanView, "mealplan.json")}
  end

  def render("show.json", %{mealplan: mealplan}) do
    %{data: render_one(mealplan, MealplanView, "mealplan.json")}
  end

  def render("mealplan.json", %{mealplan: mealplan}) do
    IO.inspect mealplan
    %{id: mealplan.id,
      meal_plan_name: mealplan.meal_plan_name}
  end
end
