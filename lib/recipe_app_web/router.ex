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
    #plug :protect_from_forgery # TODO: uncomment
    plug :put_secure_browser_headers
  end

  scope "/ajax", RecipeAppWeb do
    pipe_through :ajax
    resources "/sessions", SessionController, only: [:create], singleton: true

    resources "/users", UserController, except: [:new, :edit]
    get "/recipes/search/:searchParams", RecipeController, :search
    resources "/recipes", RecipeController, except: [:new, :edit]
    resources "/users", UserController, except: [:new, :edit]
    resources "/mealplans", MealplanController, except: [:new, :edit]
    resources "/dayplans", DayplanController, except: [:new, :edit]
  end

  scope "/", RecipeAppWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

end
