defmodule RecipeApp.Repo do
  use Ecto.Repo,
    otp_app: :recipe_app,
    adapter: Ecto.Adapters.Postgres
end
