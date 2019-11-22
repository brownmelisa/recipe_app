defmodule RecipeApp.Dayplans.Dayplan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "dayplans" do
    field :breakfast, :string
    field :date, :date
    field :dinner, :string
    field :lunch, :string
    field :snack, :string
    #field :mealplan_id, :id

    belongs_to :mealplan, RecipeApp.Mealplans.Mealplan

    timestamps()
  end

  @doc false
  def changeset(dayplan, attrs) do
    dayplan
    |> cast(attrs, [:date, :breakfast, :lunch, :dinner, :snack, :mealplan_id])
    |> validate_required([:date, :breakfast, :lunch, :dinner, :mealplan_id])
  end
end
