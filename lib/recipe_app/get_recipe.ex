defmodule RecipeApp.GetRecipeApi do
  use HTTPoison.Base

  alias RecipeApp.RecipeCache

  @apiKey "bade8991b27847e2ae7bb94267b2c229"
  #@apiKey "39df7e856b3042a78356c7e7b8479c73"
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

    # TODO eror handling when status code != 200
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
    Map.put(params, "apiKey", @apiKey)
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

  def testData() do
    %{
      "spoonacularSourceUrl" => "https://spoonacular.com/silver-dollar-buttermilk-pecan-pancakes-with-bourbon-molasses-butter-and-maple-syrup-324694",
      "imageType" => "jpeg",
      "aggregateLikes" => 0,
      "nutrition" => %{
        "caloricBreakdown" => %{
          "percentCarbs" => 36.34,
          "percentFat" => 58.81,
          "percentProtein" => 4.85
        },
        "ingredients" => "",
        "nutrients" => [
          %{
            "amount" => 758.04,
            "percentOfDailyNeeds" => 37.9,
            "title" => "Calories",
            "unit" => "cal"
          },
          %{
            "amount" => 47.19,
            "percentOfDailyNeeds" => 72.59,
            "title" => "Fat",
            "unit" => "g"
          },
          %{
            "amount" => 25.38,
            "percentOfDailyNeeds" => 158.64,
            "title" => "Saturated Fat",
            "unit" => "g"
          },
          %{
            "amount" => 65.61,
            "percentOfDailyNeeds" => 21.87,
            "title" => "Carbohydrates",
            "unit" => "g"
          },
          %{
            "amount" => 38.77,
            "percentOfDailyNeeds" => 43.08,
            "title" => "Sugar",
            "unit" => "g"
          },
          %{
            "amount" => 173.3,
            "percentOfDailyNeeds" => 57.77,
            "title" => "Cholesterol",
            "unit" => "mg"
          },
          %{
            "amount" => 678.21,
            "percentOfDailyNeeds" => 29.49,
            "title" => "Sodium",
            "unit" => "mg"
          },
          %{
            "amount" => 6.91,
            "percentOfDailyNeeds" => 38.39,
            "title" => "Alcohol",
            "unit" => "g"
          },
          %{
            "amount" => 8.76,
            "percentOfDailyNeeds" => 17.52,
            "title" => "Protein",
            "unit" => "g"
          },
          %{
            "amount" => 1.26,
            "percentOfDailyNeeds" => 63.14,
            "title" => "Manganese",
            "unit" => "mg"
          },
          %{
            "amount" => 0.63,
            "percentOfDailyNeeds" => 37.03,
            "title" => "Vitamin B2",
            "unit" => "mg"
          },
          %{
            "amount" => 21.31,
            "percentOfDailyNeeds" => 30.44,
            "title" => "Selenium",
            "unit" => "µg"
          },
          %{
            "amount" => 1326.63,
            "percentOfDailyNeeds" => 26.53,
            "title" => "Vitamin A",
            "unit" => "IU"
          },
          %{
            "amount" => 0.36,
            "percentOfDailyNeeds" => 24.2,
            "title" => "Vitamin B1",
            "unit" => "mg"
          },
          %{
            "amount" => 208.37,
            "percentOfDailyNeeds" => 20.84,
            "title" => "Phosphorus",
            "unit" => "mg"
          },
          %{
            "amount" => 72.47,
            "percentOfDailyNeeds" => 18.12,
            "title" => "Folate",
            "unit" => "µg"
          },
          %{
            "amount" => 174.86,
            "percentOfDailyNeeds" => 17.49,
            "title" => "Calcium",
            "unit" => "mg"
          },
          %{
            "amount" => 2.63,
            "percentOfDailyNeeds" => 14.58,
            "title" => "Iron",
            "unit" => "mg"
          },
          %{
            "amount" => 56.1,
            "percentOfDailyNeeds" => 14.02,
            "title" => "Magnesium",
            "unit" => "mg"
          },
          %{
            "amount" => 452.36,
            "percentOfDailyNeeds" => 12.92,
            "title" => "Potassium",
            "unit" => "mg"
          },
          %{
            "amount" => 0.25,
            "percentOfDailyNeeds" => 12.38,
            "title" => "Copper",
            "unit" => "mg"
          },
          %{
            "amount" => 1.83,
            "percentOfDailyNeeds" => 12.2,
            "title" => "Vitamin D",
            "unit" => "µg"
          },
          %{
            "amount" => 2.16,
            "percentOfDailyNeeds" => 10.78,
            "title" => "Vitamin B3",
            "unit" => "mg"
          },
          %{
            "amount" => 1.43,
            "percentOfDailyNeeds" => 9.53,
            "title" => "Vitamin E",
            "unit" => "mg"
          },
          %{
            "amount" => 1.34,
            "percentOfDailyNeeds" => 8.9,
            "title" => "Zinc",
            "unit" => "mg"
          },
          %{
            "amount" => 0.87,
            "percentOfDailyNeeds" => 8.67,
            "title" => "Vitamin B5",
            "unit" => "mg"
          },
          %{
            "amount" => 0.52,
            "percentOfDailyNeeds" => 8.67,
            "title" => "Vitamin B12",
            "unit" => "µg"
          },
          %{
            "amount" => 0.16,
            "percentOfDailyNeeds" => 7.82,
            "title" => "Vitamin B6",
            "unit" => "mg"
          },
          %{
            "amount" => 1.75,
            "percentOfDailyNeeds" => 6.99,
            "title" => "Fiber",
            "unit" => "g"
          },
          %{
            "amount" => 3.79,
            "percentOfDailyNeeds" => 3.61,
            "title" => "Vitamin K",
            "unit" => "µg"
          }
        ],
        "weightPerServing" => %{"amount" => 234, "unit" => "g"}
      },
      "title" => "Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup",
      "winePairing" => %{},
      "sustainable" => false,
      "image" => "https://spoonacular.com/recipeImages/324694-556x370.jpeg",
      "vegetarian" => true,
      "veryPopular" => false,
      "id" => 324694,
      "readyInMinutes" => 55,
      "spoonacularScore" => 27.0,
      "weightWatcherSmartPoints" => 33,
      "vegan" => false,
      "sourceUrl" => "http://www.foodnetwork.com/recipes/bobby-flay/silver-dollar-buttermilk-pecan-pancakes-with-bourbon-molasses-butter-and-maple-syrup.html",
      "diets" => ["lacto ovo vegetarian"],
      "occasions" => [],
      "instructions" => "Preheat the oven to 200 degrees F.                          Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl. Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl. Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix. Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using.                          Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer. Transfer the pancakes to a platter and keep warm in a 200 degree F oven.                          Serve 6 pancakes per person, top each with some of the bourbon butter. Drizzle with warm maple syrup and dust with confectioners' sugar. Garnish with fresh mint sprigs and more toasted pecans, if desired.                          Bourbon Molasses Butter:                          Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool.                          Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth. Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld. Remove from the refrigerator about 30 minutes before using to soften.",
      "ketogenic" => false,
      "veryHealthy" => false,
      "cheap" => false,
      "gaps" => "no",
      "extendedIngredients" => [
        %{
          "aisle" => "Baking",
          "amount" => 1.0,
          "consitency" => "solid",
          "id" => 18371,
          "image" => "white-powder.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 1.0,
              "unitLong" => "teaspoon",
              "unitShort" => "tsp"
            },
            "us" => %{
              "amount" => 1.0,
              "unitLong" => "teaspoon",
              "unitShort" => "tsp"
            }
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "baking powder",
          "original" => "1 teaspoon baking powder",
          "originalName" => "baking powder",
          "originalString" => "1 teaspoon baking powder",
          "unit" => "teaspoon"
        },
        %{
          "aisle" => "Baking",
          "amount" => 0.5,
          "consitency" => "solid",
          "id" => 18372,
          "image" => "white-powder.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 0.5,
              "unitLong" => "teaspoons",
              "unitShort" => "tsps"
            },
            "us" => %{
              "amount" => 0.5,
              "unitLong" => "teaspoons",
              "unitShort" => "tsps"
            }
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "baking soda",
          "original" => "1/2 teaspoon baking soda",
          "originalName" => "baking soda",
          "originalString" => "1/2 teaspoon baking soda",
          "unit" => "teaspoon"
        },
        %{
          "aisle" => "Alcoholic Beverages",
          "amount" => 0.5,
          "consitency" => "liquid",
          "id" => 10014037,
          "image" => "bourbon.png",
          "measures" => %{
            "metric" => %{
              "amount" => 118.294,
              "unitLong" => "milliliters",
              "unitShort" => "ml"
            },
            "us" => %{"amount" => 0.5, "unitLong" => "cups", "unitShort" => "cups"}
          },
          "meta" => ["to taste"],
          "metaInformation" => ["to taste"],
          "name" => "bourbon",
          "original" => "1/2 cup good quality bourbon, or more to taste",
          "originalName" => "good quality bourbon, or more to taste",
          "originalString" => "1/2 cup good quality bourbon, or more to taste",
          "unit" => "cup"
        },
        %{
          "aisle" => "Milk, Eggs, Other Dairy",
          "amount" => 1.5,
          "consitency" => "solid",
          "id" => 1230,
          "image" => "buttermilk.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 354.882,
              "unitLong" => "milliliters",
              "unitShort" => "ml"
            },
            "us" => %{"amount" => 1.5, "unitLong" => "cups", "unitShort" => "cups"}
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "buttermilk",
          "original" => "1 1/2 cups, plus 3 tablespoons buttermilk",
          "originalName" => ", plus 3 tablespoons buttermilk",
          "originalString" => "1 1/2 cups, plus 3 tablespoons buttermilk",
          "unit" => "cups"
        },
        %{
          "aisle" => "Baking",
          "amount" => 6.0,
          "consitency" => "solid",
          "id" => 19336,
          "image" => "powdered-sugar.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            },
            "us" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            }
          },
          "meta" => ["for garnish"],
          "metaInformation" => ["for garnish"],
          "name" => "confectioners' sugar",
          "original" => "Confectioners' sugar, for garnish",
          "originalName" => "Confectioners' sugar, for garnish",
          "originalString" => "Confectioners' sugar, for garnish",
          "unit" => "servings"
        },
        %{
          "aisle" => "Milk, Eggs, Other Dairy",
          "amount" => 2.0,
          "consitency" => "solid",
          "id" => 1123,
          "image" => "egg.png",
          "measures" => %{
            "metric" => %{
              "amount" => 2.0,
              "unitLong" => "larges",
              "unitShort" => "large"
            },
            "us" => %{
              "amount" => 2.0,
              "unitLong" => "larges",
              "unitShort" => "large"
            }
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "eggs",
          "original" => "2 large eggs",
          "originalName" => "eggs",
          "originalString" => "2 large eggs",
          "unit" => "large"
        },
        %{
          "aisle" => "Baking",
          "amount" => 1.5,
          "consitency" => "solid",
          "id" => 20081,
          "image" => "flour.png",
          "measures" => %{
            "metric" => %{
              "amount" => 354.882,
              "unitLong" => "milliliters",
              "unitShort" => "ml"
            },
            "us" => %{"amount" => 1.5, "unitLong" => "cups", "unitShort" => "cups"}
          },
          "meta" => ["all-purpose"],
          "metaInformation" => ["all-purpose"],
          "name" => "flour",
          "original" => "1 1/2 cups all-purpose flour",
          "originalName" => "all-purpose flour",
          "originalString" => "1 1/2 cups all-purpose flour",
          "unit" => "cups"
        },
        %{
          "aisle" => "Baking",
          "amount" => 2.0,
          "consitency" => "solid",
          "id" => 19335,
          "image" => "sugar-in-bowl.png",
          "measures" => %{
            "metric" => %{
              "amount" => 2.0,
              "unitLong" => "Tbsps",
              "unitShort" => "Tbsps"
            },
            "us" => %{
              "amount" => 2.0,
              "unitLong" => "Tbsps",
              "unitShort" => "Tbsps"
            }
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "granulated sugar",
          "original" => "2 tablespoons granulated sugar",
          "originalName" => "granulated sugar",
          "originalString" => "2 tablespoons granulated sugar",
          "unit" => "tablespoons"
        },
        %{
          "aisle" => "Spices and Seasonings",
          "amount" => 6.0,
          "consitency" => "solid",
          "id" => 1082047,
          "image" => "salt.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            },
            "us" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            }
          },
          "meta" => ["to taste"],
          "metaInformation" => ["to taste"],
          "name" => "kosher salt",
          "original" => "Kosher salt, to taste",
          "originalName" => "Kosher salt, to taste",
          "originalString" => "Kosher salt, to taste",
          "unit" => "servings"
        },
        %{
          "aisle" => "Baking",
          "amount" => 1.0,
          "consitency" => "solid",
          "id" => 19334,
          "image" => "dark-brown-sugar.png",
          "measures" => %{
            "metric" => %{
              "amount" => 1.0,
              "unitLong" => "Tbsp",
              "unitShort" => "Tbsp"
            },
            "us" => %{"amount" => 1.0, "unitLong" => "Tbsp", "unitShort" => "Tbsp"}
          },
          "meta" => ["light"],
          "metaInformation" => ["light"],
          "name" => "light brown sugar",
          "original" => "1 tablespoon light brown sugar",
          "originalName" => "light brown sugar",
          "originalString" => "1 tablespoon light brown sugar",
          "unit" => "tablespoon"
        },
        %{
          "aisle" => "Cereal",
          "amount" => 6.0,
          "consitency" => "liquid",
          "id" => 19911,
          "image" => "maple-syrup.png",
          "measures" => %{
            "metric" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            },
            "us" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            }
          },
          "meta" => ["warmed", "pure"],
          "metaInformation" => ["warmed", "pure"],
          "name" => "maple syrup",
          "original" => "Pure maple syrup, warmed",
          "originalName" => "Pure maple syrup, warmed",
          "originalString" => "Pure maple syrup, warmed",
          "unit" => "servings"
        },
        %{
          "aisle" => "Baking",
          "amount" => 3.0,
          "consitency" => "solid",
          "id" => 19304,
          "image" => "molasses.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 3.0,
              "unitLong" => "Tbsps",
              "unitShort" => "Tbsps"
            },
            "us" => %{
              "amount" => 3.0,
              "unitLong" => "Tbsps",
              "unitShort" => "Tbsps"
            }
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "molasses",
          "original" => "3 tablespoons molasses",
          "originalName" => "molasses",
          "originalString" => "3 tablespoons molasses",
          "unit" => "tablespoons"
        },
        %{
          "aisle" => "Nuts;Baking",
          "amount" => 0.5,
          "consitency" => "solid",
          "id" => 12142,
          "image" => "pecans.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 118.294,
              "unitLong" => "milliliters",
              "unitShort" => "ml"
            },
            "us" => %{"amount" => 0.5, "unitLong" => "cups", "unitShort" => "cups"}
          },
          "meta" => ["toasted", "finely chopped"],
          "metaInformation" => ["toasted", "finely chopped"],
          "name" => "pecans",
          "original" => "1/2 cup finely chopped toasted pecans",
          "originalName" => "finely chopped toasted pecans",
          "originalString" => "1/2 cup finely chopped toasted pecans",
          "unit" => "cup"
        },
        %{
          "aisle" => "Nuts;Baking",
          "amount" => 6.0,
          "consitency" => "solid",
          "id" => 12142,
          "image" => "pecans.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            },
            "us" => %{
              "amount" => 6.0,
              "unitLong" => "servings",
              "unitShort" => "servings"
            }
          },
          "meta" => ["toasted", "coarsely chopped", "for garnish, optional"],
          "metaInformation" => ["toasted", "coarsely chopped",
            "for garnish, optional"],
          "name" => "pecans",
          "original" => "Coarsely chopped toasted pecans, for garnish, optional",
          "originalName" => "Coarsely chopped toasted pecans, for garnish, optional",
          "originalString" => "Coarsely chopped toasted pecans, for garnish, optional",
        },
        %{
          "aisle" => "Spices and Seasonings",
          "amount" => 0.75,
          "consitency" => "solid",
          "id" => 1012047,
          "image" => "salt.jpg",
          "measures" => %{
            "metric" => %{
              "amount" => 0.75,
              "unitLong" => "teaspoons",
              "unitShort" => "tsps"
            },
            "us" => %{
              "amount" => 0.75,
              "unitLong" => "teaspoons",
              "unitShort" => "tsps"
            }
          },
          "meta" => ["fine"],
          "metaInformation" => ["fine"],
          "name" => "sea salt",
          "original" => "3/4 teaspoon fine sea salt",
          "originalName" => "fine sea salt",
        },
        %{
          "aisle" => "Baking",
          "amount" => 1.0,
          "consitency" => "solid",
          "id" => 19335,
          "image" => "sugar-in-bowl.png",
          "measures" => %{
            "metric" => %{
              "amount" => 1.0,
              "unitLong" => "Tbsp",
              "unitShort" => "Tbsp"
            },
            "us" => %{"amount" => 1.0, "unitLong" => "Tbsp"}
          },
          "meta" => [],
          "metaInformation" => [],
          "name" => "sugar",
          "original" => "1 tablespoon sugar",
        },
      ],
      "analyzedInstructions" => [
        %{
          "name" => "",
          "steps" => [
            %{
              "equipment" => [
                %{
                  "id" => 404784,
                  "image" => "oven.jpg",
                  "name" => "oven",
                  "temperature" => %{"number" => 200.0, "unit" => "Fahrenheit"}
                }
              ],
              "ingredients" => [],
              "number" => 1,
              "step" => "Preheat the oven to 200 degrees F."
            },
            %{
              "equipment" => [
                %{"id" => 404661, "image" => "whisk.png", "name" => "whisk"},
                %{"id" => 404783, "image" => "bowl.jpg", "name" => "bowl"}
              ],
              "ingredients" => [
                %{
                  "id" => 19334,
                  "image" => "light-brown-sugar.jpg",
                  "name" => "light brown sugar"
                },
                %{
                  "id" => 19335,
                  "image" => "sugar-in-bowl.png",
                  "name" => "granulated sugar"
                },
                %{
                  "id" => 18371,
                  "image" => "white-powder.jpg",
                  "name" => "baking powder"
                },
                %{
                  "id" => 18372,
                  "image" => "white-powder.jpg",
                  "name" => "baking soda"
                },
                %{"id" => 12142, "image" => "pecans.jpg", "name" => "pecans"},
                %{
                  "id" => 20081,
                  "image" => "flour.png",
                  "name" => "all purpose flour"
                },
                %{"id" => 2047, "image" => "salt.jpg", "name" => "salt"}
              ],
              "number" => 2,
              "step" => "Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl."
            },
            %{
              "equipment" => [
                %{"id" => 404661, "image" => "whisk.png", "name" => "whisk"},
                %{"id" => 404783, "image" => "bowl.jpg", "name" => "bowl"}
              ],
              "ingredients" => [
                %{
                  "id" => 2050,
                  "image" => "vanilla-extract.jpg",
                  "name" => "vanilla extract"
                },
                %{"id" => 93622, "image" => "vanilla.jpg", "name" => "vanilla bean"},
                %{"id" => 1230, "image" => "buttermilk.jpg", "name" => "buttermilk"},
                %{"id" => 1123, "image" => "egg.png", "name" => "egg"}
              ],
              "number" => 3,
              "step" => "Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl."
            },
            %{
              "equipment" => [],
              "ingredients" => [
                %{"id" => 1123, "image" => "egg.png", "name" => "egg"}
              ],
              "number" => 4,
              "step" => "Add the egg mixture to the dry mixture and gently mix to combine. Do not overmix."
            },
            %{
              "equipment" => [],
              "ingredients" => [],
              "length" => %{"number" => 15, "unit" => "minutes"},
              "number" => 5,
              "step" => "Let the batter sit at room temperature for at least 15 minutes and up to 30 minutes before using."
            },
            %{
              "equipment" => [
                %{"id" => 404779, "image" => "griddle.jpg", "name" => "griddle"},
                %{"id" => 404645, "image" => "pan.png", "name" => "frying pan"}
              ],
              "ingredients" => [],
              "length" => %{"number" => 3, "unit" => "minutes"},
              "number" => 6,
              "step" => "Heat a cast iron or nonstick griddle pan over medium heat and brush with melted butter. Once the butter begins to sizzle, use 2 tablespoons of the batter for each pancake and cook until the bubbles appear on the surface and the bottom is golden brown, about 2 minutes, flip over and cook until the bottom is golden brown, 1 to 2 minutes longer."
            },
            %{
              "equipment" => [
                %{
                  "id" => 404784,
                  "image" => "oven.jpg",
                  "name" => "oven",
                  "temperature" => %{"number" => 200.0, "unit" => "Fahrenheit"}
                }
              ],
              "ingredients" => [],
              "number" => 7,
              "step" => "Transfer the pancakes to a platter and keep warm in a 200 degree F oven."
            },
            %{
              "equipment" => [],
              "ingredients" => [
                %{"id" => 10014037, "image" => "bourbon.png", "name" => "bourbon"}
              ],
              "number" => 8,
              "step" => "Serve 6 pancakes per person, top each with some of the bourbon butter."
            },
            %{
              "equipment" => [],
              "ingredients" => [
                %{
                  "id" => 19336,
                  "image" => "powdered-sugar.jpg",
                  "name" => "powdered sugar"
                },
                %{
                  "id" => 19911,
                  "image" => "maple-syrup.png",
                  "name" => "maple syrup"
                }
              ],
              "number" => 9,
              "step" => "Drizzle with warm maple syrup and dust with confectioners' sugar."
            },
            %{
              "equipment" => [],
              "ingredients" => [
                %{"id" => 12142, "image" => "pecans.jpg", "name" => "pecans"}
              ],
              "number" => 10,
              "step" => "Garnish with fresh mint sprigs and more toasted pecans, if desired."
            }
          ]
        },
        %{
          "name" => "Bourbon Molasses Butter",
          "steps" => [
            %{
              "equipment" => [
                %{"id" => 404669, "image" => "sauce-pan.jpg", "name" => "sauce pan"}
              ],
              "ingredients" => [
                %{"id" => 10014037, "image" => "bourbon.png", "name" => "bourbon"},
                %{"id" => 19335, "image" => "sugar-in-bowl.png", "name" => "sugar"}
              ],
              "number" => 1,
              "step" => "Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool."
            },
            %{
              "equipment" => [
                %{
                  "id" => 404771,
                  "image" => "food-processor.png",
                  "name" => "food processor"
                }
              ],
              "ingredients" => [
                %{"id" => 19304, "image" => "molasses.jpg", "name" => "molasses"},
                %{"id" => 10014037, "image" => "bourbon.png", "name" => "bourbon"},
                %{"id" => 2047, "image" => "salt.jpg", "name" => "salt"}
              ],
              "number" => 2,
              "step" => "Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth."
            },
            %{
              "equipment" => [
                %{
                  "id" => 404730,
                  "image" => "plastic-wrap.jpg",
                  "name" => "plastic wrap"
                },
                %{"id" => 404783, "image" => "bowl.jpg", "name" => "bowl"}
              ],
              "ingredients" => [],
              "number" => 3,
              "step" => "Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld."
            },
            %{
              "equipment" => [],
              "ingredients" => [],
              "length" => %{"number" => 30, "unit" => "minutes"},
              "number" => 4,
              "step" => "Remove from the refrigerator about 30 minutes before using to soften."
            }
          ]
        }
      ],
      "cookingMinutes" => 35,
      "lowFodmap" => false,
      "dishTypes" => [],
      "preparationMinutes" => 20,
      "dairyFree" => false,
      "servings" => 6,
      "sourceName" => "Foodnetwork",
      "creditsText" => "Foodnetwork",
      "whole30" => false,
      "pricePerServing" => 277.09,
      "healthScore" => 5.0,
      "glutenFree" => false,
      "cuisines" => []
    }

  end

end
