defmodule RecipeApp.RecipeCache do

# References for caching:
# https://hexdocs.pm/cachex/Cachex.html
# https://elixirforum.com/t/using-cachex-in-phoenix-working-example/12458

  @cacheName :my_cache
  @defaultExpireTime 21600

  # do get key set first to check if all keys are present
  def getManyFromCache(keySet) do
    Enum.reduce(keySet, %{}, fn key, acc ->
      acc = Map.put(acc, key, getFromCache(key))
    end)
  end

  def getFromCache(key) do
    {status, value} = Cachex.get(@cacheName, key)
    cond do
      status == :ok ->
        IO.puts("Returning " <> to_string(key) <> " from cache")
        value
      true ->
        IO.puts("Key not found " <> to_string(key) <> " in cache")
        value
    end
  end

  def putInCache(key, value) do
    {status, resp} = Cachex.put(@cacheName, key, value)
    if status == :ok do
      Cachex.expire(@cacheName, key, :timer.seconds(@defaultExpireTime))
      IO.puts("Key: " <> key <> " added to cache")
    end
  end

  def keyExistsInCache?(key) do
    {_, val} = Cachex.exists?(@cacheName, key)
    val
  end

  # get key set
  def getCacheKeySet() do
    {status, keys} = Cachex.keys(:my_cache)
    if status == :ok do
      MapSet.new(keys)
    else
      MapSet.new()
    end
  end


end
