defmodule RecipeApp.GetRecipeApi do
  use HTTPoison.Base

  alias RecipeApp.RecipeCache
  alias RecipeApp.SpoonacularKey

  @getRecipeUrl "https://api.spoonacular.com/recipes/putRecipeId/information?"
  @ingImageUrlPrefix "https://spoonacular.com/cdn/ingredients_"
  @ingImageSize "250x250"


  def getRecipeDetails(recipeId) do

    params = validateParams()
    url = String.replace(@getRecipeUrl, "putRecipeId", recipeId)
    url = url <> URI.encode_query(params)
    IO.inspect url

    response = HTTPoison.get!(URI.encode(url))
    #IO.inspect response

    req = Poison.decode!(response.body)
    #IO.inspect req

    recipe = parseResponse(req)

    # add recipe to cache
    RecipeCache.putInCache(recipeId, recipe)

    recipe
  end

  # handle api specific params
  def validateParams() do
    params = Map.new()
    Map.put(params, "apiKey", SpoonacularKey.getApiKey())
    |> Map.put("includeNutrition", true)
  end

  def parseResponse(result) do
    #result = testData()
    recipe = Map.new()
             |> Map.put(:id, result["id"]) # dont use this field
             |> Map.put(:recipe_id, result["id"])
             |> Map.put(:title, result["title"])
             |> Map.put(:image_url, result["image"])
      # misc
             |> Map.put(:vegetarian, result["vegetarian"])
             |> Map.put(:vegan, result["vegan"])
             |> Map.put(:glutenFree, result["glutenFree"])
             |> Map.put(:readyInMinutes, result["readyInMinutes"])
             |> Map.put(:cookingMinutes, result["cookingMinutes"])
             |> Map.put(:preparationMinutes, result["preparationMinutes"])
             |> Map.put(:servings, result["servings"])
             |> Map.put(:pricePerServing, result["pricePerServing"]/100)

    recipe = getNutritionData(result, recipe)
    recipe = getIngredientsData(result, recipe)
    recipe = getInstructionsData(result, recipe)

    #IO.puts("result")
    #IO.inspect(recipe)

    recipe
  end

  def getNutritionData(result, recipe) do
    nutritionData = result["nutrition"]
    nutritionList = nutritionData["nutrients"]
    recipe = Enum.reduce(nutritionList, recipe, fn nutMap, acc ->
      cond do
        nutMap["title"] == "Calories" ->
          acc = Map.put(acc, :calories, nutMap["amount"]) # unit always cal
        nutMap["title"] == "Protein" ->
          acc = Map.put(acc, :protein, to_string(nutMap["amount"])<>nutMap["unit"])
        nutMap["title"] == "Fat" ->
          acc = Map.put(acc, :fats, to_string(nutMap["amount"])<>nutMap["unit"])
        nutMap["title"] == "Carbohydrates" ->
          acc = Map.put(acc, :carbs, to_string(nutMap["amount"])<>nutMap["unit"])
        true -> acc
      end
    end)

    caloricBreakdown = nutritionData["caloricBreakdown"]
    recipe = Map.put(recipe, :percentCarbs, caloricBreakdown["percentCarbs"])
             |> Map.put(:percentFat, caloricBreakdown["percentFat"])
             |> Map.put(:percentProtein, caloricBreakdown["percentProtein"])
  end

  def getIngredientsData(result, recipe) do
    ingredientsList = result["extendedIngredients"]
    ingList = if length(ingredientsList) > 0 do
      Enum.reduce(ingredientsList, [], fn ing, acc ->
        ingMap = Map.new()
                 |> Map.put(:ingr_id, ing["id"])
                 |> Map.put(:ingr_image_url, @ingImageUrlPrefix<>@ingImageSize<>"/"<>ing["image"])
                 |> Map.put(:ingr_name, ing["name"])
                 |> Map.put(:ingr_amount, ing["amount"])
                 |> Map.put(:ingr_unit, ing["unit"])
          # below 2 needed for grocery list
                 |> Map.put(:ingr_aisle, ing["aisle"])
        msr = ing["measures"]
        ingMap = if (msr != nil and is_map(msr)) do
          if (msr["us"] != nil and is_map(msr["us"])) do
            msrUs = msr["us"]
            if (msrUs["unitLong"] != nil) do
              Map.put(ingMap, :ingr_us_measure, msrUs["unitLong"])
            else
              Map.put(ingMap, :ingr_us_measure, "")
            end
          else
            Map.put(ingMap, :ingr_us_measure, "")
          end
        else
          Map.put(ingMap, :ingr_us_measure, "")
        end

        acc = acc ++ [ingMap]
      end)
    else
      []
    end
    Map.put(recipe, :ingredients, ingList)
  end

  # analyzedinstructions sometimes returns a list of maps where each
  # map contains instr for a recipe. I.e it may contains instructions for 2
  # recipes. Ex "Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup"
  # -> "Buttermilk-Pecan Pancakes" and "Bourbon Molasses Butter"
  # parsing just the first for now
  def getInstructionsData(result, recipe) do
    instructionsList = result["analyzedInstructions"]
    instrList = if length(instructionsList) > 0 do
      instrData = hd(instructionsList)
      instrStepsList = instrData["steps"]
      #IO.puts("instrStepsList")
      #IO.inspect instrStepsList
      Enum.reduce(instrStepsList, [], fn instrStep, acc ->
        instrMap = Map.new()
                   |> Map.put(:step_number, instrStep["number"])
                   |> Map.put(:step, instrStep["step"])
        acc = acc ++ [instrMap]
      end)
    else
      []
    end
    Map.put(recipe, :instructions, instrList)
  end

end
