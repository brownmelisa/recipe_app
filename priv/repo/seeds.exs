# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     RecipeApp.Repo.insert!(%RecipeApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias RecipeApp.Repo
alias RecipeApp.Users.User
alias RecipeApp.Comments.Comment


pw = Argon2.hash_pwd_salt("password1234")

Repo.insert!(%User{name: "Alice Anderson", email: "alice@acme.com", password_hash: pw})
Repo.insert!(%User{name: "Bob Anderson", email: "bob@acme.com", password_hash: pw})
Repo.insert!(%User{name: "Carol Anderson", email: "carol@acme.com", password_hash: pw})
Repo.insert!(%User{name: "Dave Anderson", email: "dave@acme.com", password_hash: pw})
Repo.insert!(%User{name: "Peter Anderson", email: "peter@acme.com", password_hash: pw})
Repo.insert!(%User{name: "Danie Hao", email: "danie@acme.com", password_hash: pw})

Repo.insert!(%Comment{recipe_id: 573591, user_id: 5, comments: "It is good!"})
Repo.insert!(%Comment{recipe_id: 573591, user_id: 3, comments: "It is excellent!"})
Repo.insert!(%Comment{recipe_id: 573590, user_id: 5, comments: "It is good!"})