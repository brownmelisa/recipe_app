defmodule RecipeApp.Repo.Migrations.CreateDayplans do
  use Ecto.Migration

  def change do
    create table(:dayplans) do
      add :date, :date
      add :breakfast, :string
      add :lunch, :string
      add :dinner, :string
      add :snack, :string
      add :mealplan_id, references(:mealplans, on_delete: :nothing)

      timestamps()
    end

    create index(:dayplans, [:mealplan_id])
  end
end
