import { createContext, useState , useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
  const [favorites, setFavorite] = useState([])

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites")
      if(storedFavs ) setFavorite(JSON.parse(storedFavs))

  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },[favorites])

  const addToFavorites = (movie) => {
    setFavorite(prev => [...prev, movie ])

  }

  const removeFromFavorites = (movieId) =>{
    setFavorite(prev => prev.filter(movie => movie.id !== movieId))

  }

  const isFavorites = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const value = {
    favorites ,
    addToFavorites,
    removeFromFavorites,
    isFavorites
  }

  return <MovieContext.Provider value={value}>

   {children}

  </MovieContext.Provider>
}