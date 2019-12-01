defmodule RecipeApp.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :recipe_id, :integer
      add :user_id, :integer
      add :comments, :text

      timestamps()
    end

  end
end
