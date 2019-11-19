defmodule RecipeApp.Repo.Migrations.CreateRecipes do
  use Ecto.Migration

  def change do
    create table(:recipes) do
      add :recipe_id, :integer
      add :title, :string
      add :image_url, :text
      add :calories, :integer
      add :fats, :string
      add :carbs, :string
      add :protein, :string

      timestamps()
    end

  end
end
