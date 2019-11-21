defmodule RecipeAppWeb.InstructionView do
  use RecipeAppWeb, :view
  alias RecipeAppWeb.InstructionView

  def render("instructions.json", %{instruction: instruction}) do
    %{
      step_number: instruction.step_number,
      step: instruction.step,
    }
  end

end
