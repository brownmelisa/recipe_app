defmodule RecipeApp.CommentsTest do
  use RecipeApp.DataCase

  alias RecipeApp.Comments

  describe "comments" do
    alias RecipeApp.Comments.Comment

    @valid_attrs %{comments: "some comments", recipe_id: 42, user_id: 42}
    @update_attrs %{comments: "some updated comments", recipe_id: 43, user_id: 43}
    @invalid_attrs %{comments: nil, recipe_id: nil, user_id: nil}

    def comment_fixture(attrs \\ %{}) do
      {:ok, comment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Comments.create_comment()

      comment
    end

    test "list_comments/0 returns all comments" do
      comment = comment_fixture()
      assert Comments.list_comments() == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert Comments.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      assert {:ok, %Comment{} = comment} = Comments.create_comment(@valid_attrs)
      assert comment.comments == "some comments"
      assert comment.recipe_id == 42
      assert comment.user_id == 42
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Comments.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{} = comment} = Comments.update_comment(comment, @update_attrs)
      assert comment.comments == "some updated comments"
      assert comment.recipe_id == 43
      assert comment.user_id == 43
    end

    test "update_comment/2 with invalid data returns error changeset" do
      comment = comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Comments.update_comment(comment, @invalid_attrs)
      assert comment == Comments.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{}} = Comments.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Comments.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      comment = comment_fixture()
      assert %Ecto.Changeset{} = Comments.change_comment(comment)
    end
  end
end