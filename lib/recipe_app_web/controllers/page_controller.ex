defmodule RecipeAppWeb.PageController do
  use RecipeAppWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
