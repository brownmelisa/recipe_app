defmodule RecipeAppWeb.MealplanController do
  use RecipeAppWeb, :controller

  alias RecipeApp.Mealplans
  alias RecipeApp.Mealplans.Mealplan
  alias RecipeApp.GetRecipesBulkApi
  alias RecipeApp.RecipeCache

  action_fallback RecipeAppWeb.FallbackController

  plug RecipeAppWeb.Plugs.RequireAuth when action in [:create, :update, :delete, :index]

  def index(conn, _params) do
    #mealplans = Mealplans.list_mealplans()
    #render(conn, "index.json", mealplans: mealplans)

    currentUser = conn.assigns[:current_user]
    mealplans = Mealplans.getMealPlansByUser(currentUser.id)

    idsSet = getRecipeIdsFromMealplans(mealplans)
    recipeMap = fetchRecipes(idsSet)

    mealplans = Enum.reduce(mealplans, [], fn mp, acc ->
      acc = acc ++ [loadRecipesInMealPlan(recipeMap, mp)]
    end)

    render(conn, "indexWithDayPlans.json", mealplans: mealplans)
  end

  def create(conn, %{"mealplan" => mealplan_params}) do
    currentUser = conn.assigns[:current_user]
    mealplan_params = Map.put(mealplan_params, "user_id", to_string(currentUser.id))
    with {:ok, %Mealplan{} = mealplan} <- Mealplans.create_mealplan(mealplan_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.mealplan_path(conn, :show, mealplan))
      |> render("show.json", mealplan: mealplan)
    end
  end

    def show(conn, %{"id" => id}) do
      mealplan = Mealplans.get_mealplan!(id)

      idsSet = getRecipeIdsFromMealplans([mealplan])
      recipeMap = fetchRecipes(idsSet)

      mealplan = loadRecipesInMealPlan(recipeMap, mealplan)

      render(conn, "showWithDayPlans.json", mealplan: mealplan)
    end

  def update(conn, %{"id" => id, "mealplan" => mealplan_params}) do
    mealplan = Mealplans.get_mealplan!(id)

    with {:ok, %Mealplan{} = mealplan} <- Mealplans.update_mealplan(mealplan, mealplan_params) do
      render(conn, "show.json", mealplan: mealplan)
    end
  end

  def delete(conn, %{"id" => id}) do
    IO.puts("Inside mp delete controller")
    mealplan = Mealplans.get_mealplan!(id)

    with {:ok, %Mealplan{}} <- Mealplans.delete_mealplan(mealplan) do
      #send_resp(conn, :no_content, "")
      index(conn, %{})
    end
  end

  ## helpers
  def fetchRecipes(idsSet) do

    IO.puts("Recipe Ids to fetch: ")
    IO.inspect idsSet

    # get from cache
    keySet = RecipeCache.getCacheKeySet()
    recipeIdsCache = MapSet.intersection(keySet, idsSet)

    #IO.puts("keys to get from cache")
    #IO.inspect recipeIdsCache

    recipeMapFromCache = if MapSet.size(recipeIdsCache) > 0 do
      RecipeCache.getManyFromCache(recipeIdsCache)
    else
      %{}
    end

    IO.puts("Recipes fetched from cache")
    IO.inspect Map.keys(recipeMapFromCache)

    recipeIdsApi = MapSet.difference(idsSet, recipeIdsCache)

    idsString = convertIdSetIntoString(recipeIdsApi)
    recipeMapFromApi = if String.length(idsString) != 0 do
      GetRecipesBulkApi.getRecipesBulk(idsString)
    else
      %{}
    end

    IO.puts("Recipes fetched through api")
    IO.inspect Map.keys(recipeMapFromApi)

    # combine results
    Map.merge(recipeMapFromCache, recipeMapFromApi)
  end

  # get comma sep string
  def convertIdSetIntoString(idsSet) do
    commaSepIdStr = Enum.reduce(idsSet, "", fn idStr, acc ->
      acc = acc <> "," <> idStr
    end)

    String.slice(commaSepIdStr, 1, String.length(commaSepIdStr))
  end

  # from dps in given mp list, get comma separated string of recipe ids to
  # fetch through the bulk api
  def getRecipeIdsFromMealplans(mealplanList) do

    # collect all recipe_ids into a set to remove duplicates
    idsSet = Enum.reduce(mealplanList, MapSet.new(), fn mp, acc ->
      mpIdsSet = getRecipeIdSetFromMealPlan(mp)
      acc = MapSet.union(acc, mpIdsSet)
    end)
    idsSet = MapSet.delete(idsSet, nil)

    idsSet
  end

  # for each dp in given mp, get all recipes ids in a set
  def getRecipeIdSetFromMealPlan(mealplan) do
    dayPlanList = mealplan.dayplans

    idsSet = Enum.reduce(dayPlanList, MapSet.new(), fn dp, acc ->
      acc = MapSet.put(acc, dp.breakfast)
      acc = MapSet.put(acc, dp.lunch)
      acc = MapSet.put(acc, dp.dinner)
      acc = MapSet.put(acc, dp.snack)
    end)
  end

  # returns the same mp with recipe_id in each dp replaced by complete
  # recipe details
  def loadRecipesInMealPlan(recipeMap, mealplan) do
    dayPlanList = mealplan.dayplans

    newDayPlanList = Enum.map(dayPlanList, fn dp ->
      dp = %RecipeApp.Dayplans.Dayplan{dp | breakfast: recipeMap[dp.breakfast]}
      dp = %RecipeApp.Dayplans.Dayplan{dp | lunch: recipeMap[dp.lunch]}
      dp = %RecipeApp.Dayplans.Dayplan{dp | dinner: recipeMap[dp.dinner]}
      dp = %RecipeApp.Dayplans.Dayplan{dp | snack: recipeMap[dp.snack]}
    end)

    mealplan = %RecipeApp.Mealplans.Mealplan{mealplan | dayplans: newDayPlanList}
    mealplan
  end
  ## changes end
end
