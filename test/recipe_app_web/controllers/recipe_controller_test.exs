defmodule RecipeAppWeb.RecipeControllerTest do
  use RecipeAppWeb.ConnCase

  alias RecipeApp.Recipes
  alias RecipeApp.Recipes.Recipe

  @create_attrs %{
    calories: 42,
    carbs: "some carbs",
    fats: "some fats",
    image_url: "some image_url",
    protein: "some protein",
    recipe_id: 42,
    title: "some title"
  }
  @update_attrs %{
    calories: 43,
    carbs: "some updated carbs",
    fats: "some updated fats",
    image_url: "some updated image_url",
    protein: "some updated protein",
    recipe_id: 43,
    title: "some updated title"
  }
  @invalid_attrs %{calories: nil, carbs: nil, fats: nil, image_url: nil, protein: nil, recipe_id: nil, title: nil}

  def fixture(:recipe) do
    {:ok, recipe} = Recipes.create_recipe(@create_attrs)
    recipe
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all recipes", %{conn: conn} do
      conn = get(conn, Routes.recipe_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create recipe" do
    test "renders recipe when data is valid", %{conn: conn} do
      conn = post(conn, Routes.recipe_path(conn, :create), recipe: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.recipe_path(conn, :show, id))

      assert %{
               "id" => id,
               "calories" => 42,
               "carbs" => "some carbs",
               "fats" => "some fats",
               "image_url" => "some image_url",
               "protein" => "some protein",
               "recipe_id" => 42,
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.recipe_path(conn, :create), recipe: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update recipe" do
    setup [:create_recipe]

    test "renders recipe when data is valid", %{conn: conn, recipe: %Recipe{id: id} = recipe} do
      conn = put(conn, Routes.recipe_path(conn, :update, recipe), recipe: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.recipe_path(conn, :show, id))

      assert %{
               "id" => id,
               "calories" => 43,
               "carbs" => "some updated carbs",
               "fats" => "some updated fats",
               "image_url" => "some updated image_url",
               "protein" => "some updated protein",
               "recipe_id" => 43,
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, recipe: recipe} do
      conn = put(conn, Routes.recipe_path(conn, :update, recipe), recipe: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete recipe" do
    setup [:create_recipe]

    test "deletes chosen recipe", %{conn: conn, recipe: recipe} do
      conn = delete(conn, Routes.recipe_path(conn, :delete, recipe))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.recipe_path(conn, :show, recipe))
      end
    end
  end

  defp create_recipe(_) do
    recipe = fixture(:recipe)
    {:ok, recipe: recipe}
  end
end
