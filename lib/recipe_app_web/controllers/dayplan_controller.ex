defmodule RecipeAppWeb.DayplanController do
  use RecipeAppWeb, :controller

  alias RecipeApp.Dayplans
  alias RecipeApp.Dayplans.Dayplan

  action_fallback RecipeAppWeb.FallbackController

  def index(conn, _params) do
    dayplans = Dayplans.list_dayplans()
    render(conn, "index.json", dayplans: dayplans)
  end

  def create(conn, %{"dayplan" => dayplan_params}) do
    IO.puts("Inside day plan create contr")
    IO.inspect dayplan_params
    # get meal plan ID
    with {:ok, %Dayplan{} = dayplan} <- Dayplans.create_dayplan(dayplan_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.dayplan_path(conn, :show, dayplan))
      |> render("show.json", dayplan: dayplan)
    end
  end

  def show(conn, %{"id" => id}) do
    dayplan = Dayplans.get_dayplan!(id)
    render(conn, "show.json", dayplan: dayplan)
  end

  def update(conn, %{"id" => id, "dayplan" => dayplan_params}) do
    dayplan = Dayplans.get_dayplan!(id)

    with {:ok, %Dayplan{} = dayplan} <- Dayplans.update_dayplan(dayplan, dayplan_params) do
      render(conn, "show.json", dayplan: dayplan)
    end
  end

  def delete(conn, %{"id" => id}) do
    dayplan = Dayplans.get_dayplan!(id)

    with {:ok, %Dayplan{}} <- Dayplans.delete_dayplan(dayplan) do
      send_resp(conn, :no_content, "")
    end
  end
end
