defmodule RecipeApp.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    has_many :mealplans, RecipeApp.Mealplans.Mealplan

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :name])
#    |> validate_confirmation(:password, message: "Password doesn't match up!")
    |> hash_password()
    |> validate_required([:email, :password_hash, :name])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end
