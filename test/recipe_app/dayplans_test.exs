defmodule RecipeApp.DayplansTest do
  use RecipeApp.DataCase

  alias RecipeApp.Dayplans

  describe "dayplans" do
    alias RecipeApp.Dayplans.Dayplan

    @valid_attrs %{breakfast: "some breakfast", date: ~D[2010-04-17], dinner: "some dinner", lunch: "some lunch", snack: "some snack"}
    @update_attrs %{breakfast: "some updated breakfast", date: ~D[2011-05-18], dinner: "some updated dinner", lunch: "some updated lunch", snack: "some updated snack"}
    @invalid_attrs %{breakfast: nil, date: nil, dinner: nil, lunch: nil, snack: nil}

    def dayplan_fixture(attrs \\ %{}) do
      {:ok, dayplan} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Dayplans.create_dayplan()

      dayplan
    end

    test "list_dayplans/0 returns all dayplans" do
      dayplan = dayplan_fixture()
      assert Dayplans.list_dayplans() == [dayplan]
    end

    test "get_dayplan!/1 returns the dayplan with given id" do
      dayplan = dayplan_fixture()
      assert Dayplans.get_dayplan!(dayplan.id) == dayplan
    end

    test "create_dayplan/1 with valid data creates a dayplan" do
      assert {:ok, %Dayplan{} = dayplan} = Dayplans.create_dayplan(@valid_attrs)
      assert dayplan.breakfast == "some breakfast"
      assert dayplan.date == ~D[2010-04-17]
      assert dayplan.dinner == "some dinner"
      assert dayplan.lunch == "some lunch"
      assert dayplan.snack == "some snack"
    end

    test "create_dayplan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Dayplans.create_dayplan(@invalid_attrs)
    end

    test "update_dayplan/2 with valid data updates the dayplan" do
      dayplan = dayplan_fixture()
      assert {:ok, %Dayplan{} = dayplan} = Dayplans.update_dayplan(dayplan, @update_attrs)
      assert dayplan.breakfast == "some updated breakfast"
      assert dayplan.date == ~D[2011-05-18]
      assert dayplan.dinner == "some updated dinner"
      assert dayplan.lunch == "some updated lunch"
      assert dayplan.snack == "some updated snack"
    end

    test "update_dayplan/2 with invalid data returns error changeset" do
      dayplan = dayplan_fixture()
      assert {:error, %Ecto.Changeset{}} = Dayplans.update_dayplan(dayplan, @invalid_attrs)
      assert dayplan == Dayplans.get_dayplan!(dayplan.id)
    end

    test "delete_dayplan/1 deletes the dayplan" do
      dayplan = dayplan_fixture()
      assert {:ok, %Dayplan{}} = Dayplans.delete_dayplan(dayplan)
      assert_raise Ecto.NoResultsError, fn -> Dayplans.get_dayplan!(dayplan.id) end
    end

    test "change_dayplan/1 returns a dayplan changeset" do
      dayplan = dayplan_fixture()
      assert %Ecto.Changeset{} = Dayplans.change_dayplan(dayplan)
    end
  end
end
