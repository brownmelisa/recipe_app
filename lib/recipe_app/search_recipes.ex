defmodule RecipeApp.SearchRecipesApi do
  use HTTPoison.Base

#  @apiKey "bade8991b27847e2ae7bb94267b2c229"
  @apiKey "39df7e856b3042a78356c7e7b8479c73"
  @searchUrl "https://api.spoonacular.com/recipes/complexSearch?"

  def searchRecipes(params) do
    params = validateParams(params)
    url = @searchUrl <> URI.encode_query(params)
    IO.inspect url
    response = HTTPoison.get!(URI.encode(url))
    #IO.inspect response

    # TODO eror handling when status code != 200
    req = Poison.decode!(response.body)
    #IO.inspect req

    recipes = parseResponse(req)
    IO.inspect recipes

    recipes
  end

  # make api specific changes to params
  def validateParams(params) do
    params = Map.put(params, "apiKey", @apiKey)
             |> Map.put("number", 5) # no of results returned
      # api does not return nutrition information w/o below params
             |> Map.put("minFat", 0)
             |> Map.put("minCarbs", 0)
             |> Map.put("minProtein", 0)
             |> Map.put("minCalories", 0)

    # type of meal for lunch and dinner reqd by api = main course
    params = cond do
      (params["type"] != nil and params["type"] == "Lunch") ->
        Map.put(params, "type", "main course")
      (params["type"] != nil and params["type"] == "Dinner") ->
        Map.put(params, "type", "main course")
      true -> params
    end

    params
  end

  def genQueryParamString(params) do
    paramString = Enum.reduce(params, "", fn {key, value}, acc ->
      acc = acc <> "&" <> key <> "=" <> value
    end)
  end

  def parseResponse(req) do
    #req = getTestData()
    results = req["results"]
    Enum.reduce(results, [], fn result, acc ->
      acc = acc ++ [mapApiObjToRecipe(result)]
    end)
  end

  def mapApiObjToRecipe(result) do
    recipe = Map.new()
    recipe = Map.put(recipe, :id, result["id"]) # dont use this field
    recipe = Map.put(recipe, :recipe_id, result["id"])
    recipe = Map.put(recipe, :title, result["title"])
    recipe = Map.put(recipe, :image_url, result["image"])
    nutritionList = result["nutrition"]
    Enum.reduce(nutritionList, recipe, fn nutMap, acc ->
      cond do
        nutMap["title"] == "Calories" ->
          acc = Map.put(acc, :calories, nutMap["amount"]) # unit always cal
        nutMap["title"] == "Protein" ->
          acc = Map.put(acc, :protein, to_string(nutMap["amount"])<>nutMap["unit"])
        nutMap["title"] == "Fat" ->
          acc = Map.put(acc, :fats, to_string(nutMap["amount"])<>nutMap["unit"])
        nutMap["title"] == "Carbohydrates" ->
          acc = Map.put(acc, :carbs, to_string(nutMap["amount"])<>nutMap["unit"])
      end
    end)
  end

  def getInteger(intStr) do
    {intVal, _} = Integer.parse(intStr)
    intVal
  end

  # test function
  def getTestData() do
    req = %{
      "number" => 5,
      "offset" => 0,
      "results" => [
        %{
          "id" => 224161,
          "image" => "https://spoonacular.com/recipeImages/224161-312x231.jpg",
          "imageType" => "jpg",
          "nutrition" => [
            %{"amount" => 154.666, "title" => "Calories", "unit" => "cal"},
            %{"amount" => 4.69027, "title" => "Protein", "unit" => "g"},
            %{"amount" => 1.2535, "title" => "Fat", "unit" => "g"},
            %{"amount" => 32.0771, "title" => "Carbohydrates", "unit" => "g"}
          ],
          "title" => "Minted potato salad"
        },
        %{
          "id" => 225384,
          "image" => "https://spoonacular.com/recipeImages/225384-312x231.jpg",
          "imageType" => "jpg",
          "nutrition" => [
            %{"amount" => 256.761, "title" => "Calories", "unit" => "cal"},
            %{"amount" => 2.89457, "title" => "Protein", "unit" => "g"},
            %{"amount" => 17.799, "title" => "Fat", "unit" => "g"},
            %{"amount" => 22.7782, "title" => "Carbohydrates", "unit" => "g"}
          ],
          "title" => "Warm potato salad"
        },
        %{
          "id" => 501685,
          "image" => "https://spoonacular.com/recipeImages/501685-312x231.jpg",
          "imageType" => "jpg",
          "nutrition" => [
            %{"amount" => 246.34, "title" => "Calories", "unit" => "cal"},
            %{"amount" => 6.87692, "title" => "Protein", "unit" => "g"},
            %{"amount" => 4.79553, "title" => "Fat", "unit" => "g"},
            %{"amount" => 45.5215, "title" => "Carbohydrates", "unit" => "g"}
          ],
          "title" => "Mediterranean potato salad"
        },
        %{
          "id" => 618782,
          "image" => "https://spoonacular.com/recipeImages/618782-312x231.jpg",
          "imageType" => "jpg",
          "nutrition" => [
            %{"amount" => 388.295, "title" => "Calories", "unit" => "cal"},
            %{"amount" => 12.3468, "title" => "Protein", "unit" => "g"},
            %{"amount" => 23.7168, "title" => "Fat", "unit" => "g"},
            %{"amount" => 34.9909, "title" => "Carbohydrates", "unit" => "g"}
          ],
          "title" => "Warm Potato Salad with Kale Pesto & Bacon"
        },
        %{
          "id" => 1121383,
          "image" => "https://spoonacular.com/recipeImages/1121383-312x231.jpg",
          "imageType" => "jpg",
          "nutrition" => [
            %{"amount" => 314.353, "title" => "Calories", "unit" => "cal"},
            %{"amount" => 4.99541, "title" => "Protein", "unit" => "g"},
            %{"amount" => 18.3984, "title" => "Fat", "unit" => "g"},
            %{"amount" => 34.1698, "title" => "Carbohydrates", "unit" => "g"}
          ],
          "title" => "Instant Pot Potato Salad"
        }
      ],
      "totalResults" => 66
    }
  end
end
