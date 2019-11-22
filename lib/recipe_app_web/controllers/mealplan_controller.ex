defmodule RecipeAppWeb.MealplanController do
  use RecipeAppWeb, :controller

  alias RecipeApp.Mealplans
  alias RecipeApp.Mealplans.Mealplan

  action_fallback RecipeAppWeb.FallbackController

  def index(conn, _params) do
    mealplans = Mealplans.list_mealplans()
    render(conn, "index.json", mealplans: mealplans)
  end

  def create(conn, %{"mealplan" => mealplan_params}) do
    with {:ok, %Mealplan{} = mealplan} <- Mealplans.create_mealplan(mealplan_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.mealplan_path(conn, :show, mealplan))
      |> render("show.json", mealplan: mealplan)
    end
  end

  def show(conn, %{"id" => id}) do
    mealplan = Mealplans.get_mealplan!(id)
    render(conn, "show.json", mealplan: mealplan)
  end

  def update(conn, %{"id" => id, "mealplan" => mealplan_params}) do
    mealplan = Mealplans.get_mealplan!(id)

    with {:ok, %Mealplan{} = mealplan} <- Mealplans.update_mealplan(mealplan, mealplan_params) do
      render(conn, "show.json", mealplan: mealplan)
    end
  end

  def delete(conn, %{"id" => id}) do
    mealplan = Mealplans.get_mealplan!(id)

    with {:ok, %Mealplan{}} <- Mealplans.delete_mealplan(mealplan) do
      send_resp(conn, :no_content, "")
    end
  end
end
