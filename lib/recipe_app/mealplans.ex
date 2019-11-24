defmodule RecipeApp.Mealplans do
  @moduledoc """
  The Mealplans context.
  """

  import Ecto.Query, warn: false
  alias RecipeApp.Repo

  alias RecipeApp.Mealplans.Mealplan

  @doc """
  Returns the list of mealplans.

  ## Examples

      iex> list_mealplans()
      [%Mealplan{}, ...]

  """
  def list_mealplans do
    Repo.all(Mealplan)
  end

  def getMealPlansByUser(userId) do
    Repo.all from m in Mealplan,
      where: m.user_id == ^userId,
      preload: [:user, :dayplans]
  end

  @doc """
  Gets a single mealplan.

  Raises `Ecto.NoResultsError` if the Mealplan does not exist.

  ## Examples

      iex> get_mealplan!(123)
      %Mealplan{}

      iex> get_mealplan!(456)
      ** (Ecto.NoResultsError)

  """
  #def get_mealplan!(id), do: Repo.get!(Mealplan, id)
  def get_mealplan!(id) do
    Repo.one! from m in Mealplan,
      where: m.id == ^id,
      preload: [:user, :dayplans]
  end

  def get_mealplan_by_userid_name!(userId, mealPlanName) do
    {userId, _} = Integer.parse(userId)
    Repo.one! from m in Mealplan,
      where: m.user_id == ^userId and m.meal_plan_name == ^mealPlanName
  end

  @doc """
  Creates a mealplan.

  ## Examples

      iex> create_mealplan(%{field: value})
      {:ok, %Mealplan{}}

      iex> create_mealplan(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mealplan(attrs \\ %{}) do
    #{status, createdMealPlan} = %Mealplan{}
    %Mealplan{}
    |> Mealplan.changeset(attrs)
    |> Repo.insert()
    #|> Repo.preload [:user, :dayplans]

    #mp = RecipeApp.Mealplans.get_mealplan!(createdMealPlan.id)
    #IO.inspect mp
    #{:ok, mp}
  end

  @doc """
  Updates a mealplan.

  ## Examples

      iex> update_mealplan(mealplan, %{field: new_value})
      {:ok, %Mealplan{}}

      iex> update_mealplan(mealplan, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mealplan(%Mealplan{} = mealplan, attrs) do
    mealplan
    |> Mealplan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Mealplan.

  ## Examples

      iex> delete_mealplan(mealplan)
      {:ok, %Mealplan{}}

      iex> delete_mealplan(mealplan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mealplan(%Mealplan{} = mealplan) do
    Repo.delete(mealplan)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mealplan changes.

  ## Examples

      iex> change_mealplan(mealplan)
      %Ecto.Changeset{source: %Mealplan{}}

  """
  def change_mealplan(%Mealplan{} = mealplan) do
    Mealplan.changeset(mealplan, %{})
  end
end
