defmodule RecipeApp.Repo.Migrations.CreateMealplans do
  use Ecto.Migration

  def change do
    create table(:mealplans) do
      add :meal_plan_name, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:mealplans, [:user_id])
  end
end
