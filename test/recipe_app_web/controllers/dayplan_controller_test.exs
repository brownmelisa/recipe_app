defmodule RecipeAppWeb.DayplanControllerTest do
  use RecipeAppWeb.ConnCase

  alias RecipeApp.Dayplans
  alias RecipeApp.Dayplans.Dayplan

  @create_attrs %{
    breakfast: "some breakfast",
    date: ~D[2010-04-17],
    dinner: "some dinner",
    lunch: "some lunch",
    snack: "some snack"
  }
  @update_attrs %{
    breakfast: "some updated breakfast",
    date: ~D[2011-05-18],
    dinner: "some updated dinner",
    lunch: "some updated lunch",
    snack: "some updated snack"
  }
  @invalid_attrs %{breakfast: nil, date: nil, dinner: nil, lunch: nil, snack: nil}

  def fixture(:dayplan) do
    {:ok, dayplan} = Dayplans.create_dayplan(@create_attrs)
    dayplan
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all dayplans", %{conn: conn} do
      conn = get(conn, Routes.dayplan_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create dayplan" do
    test "renders dayplan when data is valid", %{conn: conn} do
      conn = post(conn, Routes.dayplan_path(conn, :create), dayplan: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.dayplan_path(conn, :show, id))

      assert %{
               "id" => id,
               "breakfast" => "some breakfast",
               "date" => "2010-04-17",
               "dinner" => "some dinner",
               "lunch" => "some lunch",
               "snack" => "some snack"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.dayplan_path(conn, :create), dayplan: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update dayplan" do
    setup [:create_dayplan]

    test "renders dayplan when data is valid", %{conn: conn, dayplan: %Dayplan{id: id} = dayplan} do
      conn = put(conn, Routes.dayplan_path(conn, :update, dayplan), dayplan: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.dayplan_path(conn, :show, id))

      assert %{
               "id" => id,
               "breakfast" => "some updated breakfast",
               "date" => "2011-05-18",
               "dinner" => "some updated dinner",
               "lunch" => "some updated lunch",
               "snack" => "some updated snack"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, dayplan: dayplan} do
      conn = put(conn, Routes.dayplan_path(conn, :update, dayplan), dayplan: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete dayplan" do
    setup [:create_dayplan]

    test "deletes chosen dayplan", %{conn: conn, dayplan: dayplan} do
      conn = delete(conn, Routes.dayplan_path(conn, :delete, dayplan))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.dayplan_path(conn, :show, dayplan))
      end
    end
  end

  defp create_dayplan(_) do
    dayplan = fixture(:dayplan)
    {:ok, dayplan: dayplan}
  end
end
