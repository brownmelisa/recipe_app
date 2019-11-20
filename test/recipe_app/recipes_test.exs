defmodule RecipeApp.RecipesTest do
  use RecipeApp.DataCase

  alias RecipeApp.Recipes

  describe "recipes" do
    alias RecipeApp.Recipes.Recipe

    @valid_attrs %{calories: 42, carbs: "some carbs", fats: "some fats", image_url: "some image_url", protein: "some protein", recipe_id: 42, title: "some title"}
    @update_attrs %{calories: 43, carbs: "some updated carbs", fats: "some updated fats", image_url: "some updated image_url", protein: "some updated protein", recipe_id: 43, title: "some updated title"}
    @invalid_attrs %{calories: nil, carbs: nil, fats: nil, image_url: nil, protein: nil, recipe_id: nil, title: nil}

    def recipe_fixture(attrs \\ %{}) do
      {:ok, recipe} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Recipes.create_recipe()

      recipe
    end

    test "list_recipes/0 returns all recipes" do
      recipe = recipe_fixture()
      assert Recipes.list_recipes() == [recipe]
    end

    test "get_recipe!/1 returns the recipe with given id" do
      recipe = recipe_fixture()
      assert Recipes.get_recipe!(recipe.id) == recipe
    end

    test "create_recipe/1 with valid data creates a recipe" do
      assert {:ok, %Recipe{} = recipe} = Recipes.create_recipe(@valid_attrs)
      assert recipe.calories == 42
      assert recipe.carbs == "some carbs"
      assert recipe.fats == "some fats"
      assert recipe.image_url == "some image_url"
      assert recipe.protein == "some protein"
      assert recipe.recipe_id == 42
      assert recipe.title == "some title"
    end

    test "create_recipe/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Recipes.create_recipe(@invalid_attrs)
    end

    test "update_recipe/2 with valid data updates the recipe" do
      recipe = recipe_fixture()
      assert {:ok, %Recipe{} = recipe} = Recipes.update_recipe(recipe, @update_attrs)
      assert recipe.calories == 43
      assert recipe.carbs == "some updated carbs"
      assert recipe.fats == "some updated fats"
      assert recipe.image_url == "some updated image_url"
      assert recipe.protein == "some updated protein"
      assert recipe.recipe_id == 43
      assert recipe.title == "some updated title"
    end

    test "update_recipe/2 with invalid data returns error changeset" do
      recipe = recipe_fixture()
      assert {:error, %Ecto.Changeset{}} = Recipes.update_recipe(recipe, @invalid_attrs)
      assert recipe == Recipes.get_recipe!(recipe.id)
    end

    test "delete_recipe/1 deletes the recipe" do
      recipe = recipe_fixture()
      assert {:ok, %Recipe{}} = Recipes.delete_recipe(recipe)
      assert_raise Ecto.NoResultsError, fn -> Recipes.get_recipe!(recipe.id) end
    end

    test "change_recipe/1 returns a recipe changeset" do
      recipe = recipe_fixture()
      assert %Ecto.Changeset{} = Recipes.change_recipe(recipe)
    end
  end
end
