defmodule RecipeAppWeb.MealplanControllerTest do
  use RecipeAppWeb.ConnCase

  alias RecipeApp.Mealplans
  alias RecipeApp.Mealplans.Mealplan

  @create_attrs %{
    meal_plan_name: "some meal_plan_name"
  }
  @update_attrs %{
    meal_plan_name: "some updated meal_plan_name"
  }
  @invalid_attrs %{meal_plan_name: nil}

  def fixture(:mealplan) do
    {:ok, mealplan} = Mealplans.create_mealplan(@create_attrs)
    mealplan
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all mealplans", %{conn: conn} do
      conn = get(conn, Routes.mealplan_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create mealplan" do
    test "renders mealplan when data is valid", %{conn: conn} do
      conn = post(conn, Routes.mealplan_path(conn, :create), mealplan: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.mealplan_path(conn, :show, id))

      assert %{
               "id" => id,
               "meal_plan_name" => "some meal_plan_name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.mealplan_path(conn, :create), mealplan: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update mealplan" do
    setup [:create_mealplan]

    test "renders mealplan when data is valid", %{conn: conn, mealplan: %Mealplan{id: id} = mealplan} do
      conn = put(conn, Routes.mealplan_path(conn, :update, mealplan), mealplan: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.mealplan_path(conn, :show, id))

      assert %{
               "id" => id,
               "meal_plan_name" => "some updated meal_plan_name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, mealplan: mealplan} do
      conn = put(conn, Routes.mealplan_path(conn, :update, mealplan), mealplan: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete mealplan" do
    setup [:create_mealplan]

    test "deletes chosen mealplan", %{conn: conn, mealplan: mealplan} do
      conn = delete(conn, Routes.mealplan_path(conn, :delete, mealplan))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.mealplan_path(conn, :show, mealplan))
      end
    end
  end

  defp create_mealplan(_) do
    mealplan = fixture(:mealplan)
    {:ok, mealplan: mealplan}
  end
end
