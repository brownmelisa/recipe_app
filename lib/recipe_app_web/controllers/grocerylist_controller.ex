defmodule RecipeAppWeb.GrocerylistController do
  use RecipeAppWeb, :controller
  alias RecipeApp.GetRecipesBulkApi
  alias RecipeApp.Mealplans
  alias RecipeApp.Mealplans.Mealplan

  # Custom controller for viewing grocery lists for meal plans

  action_fallback RecipeAppWeb.FallbackController

  plug RecipeAppWeb.Plugs.RequireAuth when action in [:show]

  # Grocery list -
  #
  # mealPlanName,
  # approxMinCost,
  # groceryItems: {
  # id, name, amount(quantity), units, aisle, image_url
  # }

  # show gc by meal plan id
  def show(conn, %{"id" => id}) do
    mealplan = Mealplans.get_mealplan!(id)

    idsList = getRecipeIdListFromMealPlan(mealplan)
    idsString = getCommaSepRecipeIdString(idsList)

    recipeMap = if String.length(idsString) != 0 do
      GetRecipesBulkApi.getRecipesBulk(idsString)
    else
      %{}
    end

    # groceryMap -> id => {name, amount, ...}

    groceryMap = Enum.reduce(idsList, %{}, fn id, acc ->
      acc = getGroceryItemsFromRecipe(recipeMap[id], acc)
    end)

    groceryItemsList = generateGroceryItemsListFromMap(groceryMap)

    # calc price
    minPrice = getApproxMinPrice(idsList, recipeMap)
    minPrice = if is_float(minPrice) do
      Float.round(minPrice, 2)
    else
      minPrice
    end

    grocerylist = %{
      mealPlanName: mealplan.meal_plan_name,
      approxMinCost: minPrice,
      groceryItems: groceryItemsList,
    }

    render(conn, "show.json", grocerylist: grocerylist)
  end

  # for each recipe:
  # (pricePerServing * serving) * nRecipeOccurence
  def getApproxMinPrice(recipeIdList, recipeMap) do
    Enum.reduce(recipeIdList, 0, fn recId, acc ->
      recipe = recipeMap[recId]
      pricePerServing = if (nil != recipe[:pricePerServing]), do:
        recipe[:pricePerServing], else: 0
      servings = if (nil != recipe[:servings]), do:
        recipe[:servings], else: 1
      acc = acc + (pricePerServing * servings)
    end)
  end

  # convert into what view needs to render
  def generateGroceryItemsListFromMap(groceryMap) do
    Enum.reduce(groceryMap, [], fn {grocId, val}, acc ->
      groceryItem = Map.new()
      |> Map.put(:id, grocId)
      |> Map.put(:name, val[:name])
      |> Map.put(:amount, val[:amount])
      |> Map.put(:unit, val[:unit])
      |> Map.put(:aisle, val[:aisle])
      |> Map.put(:image_url, val[:image_url])
      acc = acc ++ [groceryItem]
    end)
  end

  # adds/updates grocery items in map as ingr in recipe
  def getGroceryItemsFromRecipe(recipe, groceryMap) do
    # add every ingredient to groceryMap, updating amounts wherever needed
    ingredientsList = recipe[:ingredients]

    Enum.reduce(ingredientsList, groceryMap, fn ingr, acc ->
      updCond = (Map.has_key?(acc, ingr[:ingr_id])) and
        (acc[ingr[:ingr_id]][:unit] == ingr[:ingr_unit])
      acc = if updCond do
        # update entry
        groceryItem = acc[ingr[:ingr_id]]
        updatedAmount = groceryItem[:amount] + ingr[:ingr_amount]
        groceryItem = Map.put(groceryItem, :amount, updatedAmount)
        Map.put(acc, ingr[:ingr_id], groceryItem)
      else
        # add entry
        groceryItem = %{}
        |> Map.put(:name, ingr[:ingr_name])
        |> Map.put(:amount, ingr[:ingr_amount])
        #|> Map.put(:unit, ingr[:ingr_us_measure])
        |> Map.put(:unit, ingr[:ingr_unit])
        |> Map.put(:aisle, ingr[:ingr_aisle])
        |> Map.put(:image_url, ingr[:ingr_image_url])

        Map.put(acc, ingr[:ingr_id], groceryItem)
      end
    end)
  end


  # returns a list of recipe ids from the meal plan
  # need duplicates as well for the grocery list amounts
  def getRecipeIdListFromMealPlan(mealplan) do
    idsList = Enum.reduce(mealplan.dayplans, [], fn dp, acc ->
      acc = acc ++ [dp.breakfast]
      acc = acc ++ [dp.lunch]
      acc = acc ++ [dp.dinner]
      acc = acc ++ [dp.snack]
    end)

    # remove nils if any
    Enum.reduce(idsList, [], fn id, acc ->
      acc = if nil != id do
        acc ++ [id]
      else
        acc
      end
    end)
  end

  # returns unique recipe ids
  def getCommaSepRecipeIdString(idsList) do
    idsSet = MapSet.new(idsList)
    commaSepIdStr = Enum.reduce(idsSet, "", fn idStr, acc ->
      acc = acc <> "," <> idStr
    end)
    String.slice(commaSepIdStr, 1, String.length(commaSepIdStr))
  end

  def getFloat(str) do
    {floatVal, _} = Float.parse(str)
    floatVal
  end
end
