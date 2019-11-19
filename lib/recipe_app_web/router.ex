defmodule RecipeAppWeb.Router do
  use RecipeAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", RecipeAppWeb do
    pipe_through :ajax
    resources "/users", UserController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", RecipeAppWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

end
