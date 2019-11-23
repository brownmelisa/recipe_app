defmodule RecipeAppWeb.DayplanView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.DayplanView

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
end
