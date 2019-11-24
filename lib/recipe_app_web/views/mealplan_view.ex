defmodule RecipeAppWeb.MealplanView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.MealplanView
  alias RecipeAppWeb.DayplanView

  def render("index.json", %{mealplans: mealplans}) do
    %{data: render_many(mealplans, MealplanView, "mealplan.json")}
  end

  def render("indexWithDayPlans.json", %{mealplans: mealplans}) do
    %{data: render_many(mealplans, MealplanView, "showWithDayPlans.json")}
  end

  def render("show.json", %{mealplan: mealplan}) do
    %{data: render_one(mealplan, MealplanView, "mealplan.json")}
  end

  def render("mealplan.json", %{mealplan: mealplan}) do
    %{id: mealplan.id,
      meal_plan_name: mealplan.meal_plan_name}
  end

  def render("showWithDayPlans.json", %{mealplan: mealplan}) do
    %{id: mealplan.id,
      meal_plan_name: mealplan.meal_plan_name,
      dayPlans: render_many(mealplan.dayplans, DayplanView, "dayplanWithRecipes.json")
    }
  end
end
