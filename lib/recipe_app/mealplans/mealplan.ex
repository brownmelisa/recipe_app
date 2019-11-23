defmodule RecipeApp.Mealplans.Mealplan do
  use Ecto.Schema
  import Ecto.Changeset

  schema "mealplans" do
    field :meal_plan_name, :string
    #field :user_id, :id

    belongs_to :user, RecipeApp.Users.User
    has_many :dayplans, RecipeApp.Dayplans.Dayplan

    timestamps()
  end

  @doc false
  def changeset(mealplan, attrs) do
    mealplan
    |> cast(attrs, [:meal_plan_name, :user_id])
    |> validate_required([:meal_plan_name, :user_id])
  end
end
