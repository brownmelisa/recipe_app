defmodule RecipeApp.Dayplans do
  @moduledoc """
  The Dayplans context.
  """

  import Ecto.Query, warn: false
  alias RecipeApp.Repo

  alias RecipeApp.Dayplans.Dayplan
  alias RecipeApp.Mealplans

  @doc """
  Returns the list of dayplans.

  ## Examples

      iex> list_dayplans()
      [%Dayplan{}, ...]

  """
  def list_dayplans do
    Repo.all(Dayplan)
  end

  @doc """
  Gets a single dayplan.

  Raises `Ecto.NoResultsError` if the Dayplan does not exist.

  ## Examples

      iex> get_dayplan!(123)
      %Dayplan{}

      iex> get_dayplan!(456)
      ** (Ecto.NoResultsError)

  """
  def get_dayplan!(id), do: Repo.get!(Dayplan, id)

  @doc """
  Creates a dayplan.

  ## Examples

      iex> create_dayplan(%{field: value})
      {:ok, %Dayplan{}}

      iex> create_dayplan(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_dayplan(attrs \\ %{}) do
    # get meal plan id
    mealPlan = Mealplans.get_mealplan_by_userid_name!(attrs["user_id"],
      attrs["meal_plan_name"])
    attrs = Map.put(attrs, "mealplan_id", mealPlan.id)
    %Dayplan{}
    |> Dayplan.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a dayplan.

  ## Examples

      iex> update_dayplan(dayplan, %{field: new_value})
      {:ok, %Dayplan{}}

      iex> update_dayplan(dayplan, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_dayplan(%Dayplan{} = dayplan, attrs) do
    dayplan
    |> Dayplan.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Dayplan.

  ## Examples

      iex> delete_dayplan(dayplan)
      {:ok, %Dayplan{}}

      iex> delete_dayplan(dayplan)
      {:error, %Ecto.Changeset{}}

  """
  def delete_dayplan(%Dayplan{} = dayplan) do
    Repo.delete(dayplan)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking dayplan changes.

  ## Examples

      iex> change_dayplan(dayplan)
      %Ecto.Changeset{source: %Dayplan{}}

  """
  def change_dayplan(%Dayplan{} = dayplan) do
    Dayplan.changeset(dayplan, %{})
  end
end
