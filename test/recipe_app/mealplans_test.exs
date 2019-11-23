defmodule RecipeApp.MealplansTest do
  use RecipeApp.DataCase

  alias RecipeApp.Mealplans

  describe "mealplans" do
    alias RecipeApp.Mealplans.Mealplan

    @valid_attrs %{meal_plan_name: "some meal_plan_name"}
    @update_attrs %{meal_plan_name: "some updated meal_plan_name"}
    @invalid_attrs %{meal_plan_name: nil}

    def mealplan_fixture(attrs \\ %{}) do
      {:ok, mealplan} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Mealplans.create_mealplan()

      mealplan
    end

    test "list_mealplans/0 returns all mealplans" do
      mealplan = mealplan_fixture()
      assert Mealplans.list_mealplans() == [mealplan]
    end

    test "get_mealplan!/1 returns the mealplan with given id" do
      mealplan = mealplan_fixture()
      assert Mealplans.get_mealplan!(mealplan.id) == mealplan
    end

    test "create_mealplan/1 with valid data creates a mealplan" do
      assert {:ok, %Mealplan{} = mealplan} = Mealplans.create_mealplan(@valid_attrs)
      assert mealplan.meal_plan_name == "some meal_plan_name"
    end

    test "create_mealplan/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Mealplans.create_mealplan(@invalid_attrs)
    end

    test "update_mealplan/2 with valid data updates the mealplan" do
      mealplan = mealplan_fixture()
      assert {:ok, %Mealplan{} = mealplan} = Mealplans.update_mealplan(mealplan, @update_attrs)
      assert mealplan.meal_plan_name == "some updated meal_plan_name"
    end

    test "update_mealplan/2 with invalid data returns error changeset" do
      mealplan = mealplan_fixture()
      assert {:error, %Ecto.Changeset{}} = Mealplans.update_mealplan(mealplan, @invalid_attrs)
      assert mealplan == Mealplans.get_mealplan!(mealplan.id)
    end

    test "delete_mealplan/1 deletes the mealplan" do
      mealplan = mealplan_fixture()
      assert {:ok, %Mealplan{}} = Mealplans.delete_mealplan(mealplan)
      assert_raise Ecto.NoResultsError, fn -> Mealplans.get_mealplan!(mealplan.id) end
    end

    test "change_mealplan/1 returns a mealplan changeset" do
      mealplan = mealplan_fixture()
      assert %Ecto.Changeset{} = Mealplans.change_mealplan(mealplan)
    end
  end
end
