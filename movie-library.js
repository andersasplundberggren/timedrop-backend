// ========================
// Movie Library för TimeDrop
// ========================

export const movieCategories = {
  // Decennier
  '1970s': [
    { id: 'mov1', title: 'Gudfadern', year: 1972, director: 'Francis Ford Coppola', youtubeId: 'UaVTIH8mujA' },
    { id: 'mov2', title: 'Stjärnornas krig', year: 1977, director: 'George Lucas', youtubeId: 'vZ734NWnAHA' },
    { id: 'mov3', title: 'Taxi Driver', year: 1976, director: 'Martin Scorsese', youtubeId: 'W4BkFtn3mh4' },
    { id: 'mov4', title: 'Rocky', year: 1976, director: 'John G. Avildsen', youtubeId: '3VUblDwa648' },
  ],
  
  '1980s': [
    { id: 'mov5', title: 'E.T.', year: 1982, director: 'Steven Spielberg', youtubeId: 'qYAETtIIClk' },
    { id: 'mov6', title: 'Tillbaka till framtiden', year: 1985, director: 'Robert Zemeckis', youtubeId: 'qvsgGtivCgs' },
    { id: 'mov7', title: 'Blade Runner', year: 1982, director: 'Ridley Scott', youtubeId: 'eogpIG53Cis' },
    { id: 'mov8', title: 'Die Hard', year: 1988, director: 'John McTiernan', youtubeId: 'QIOX44m8ktc' },
    { id: 'mov9', title: 'Indiana Jones och de fördömdas tempel', year: 1984, director: 'Steven Spielberg', youtubeId: 'WBdyLXVJZJQ' },
  ],
  
  '1990s': [
    { id: 'mov10', title: 'Jurassic Park', year: 1993, director: 'Steven Spielberg', youtubeId: 'lc0UehYemQA' },
    { id: 'mov11', title: 'Matrix', year: 1999, director: 'Wachowski Sisters', youtubeId: 'vKQi3bBA1y8' },
    { id: 'mov12', title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino', youtubeId: 's7EdQ4FqbhY' },
    { id: 'mov13', title: 'Titanic', year: 1997, director: 'James Cameron', youtubeId: 'kVrqfYjkTdQ' },
    { id: 'mov14', title: 'Forrest Gump', year: 1994, director: 'Robert Zemeckis', youtubeId: 'bLvqoHBptjg' },
    { id: 'mov15', title: 'Fight Club', year: 1999, director: 'David Fincher', youtubeId: 'qtRKdVHc-cE' },
  ],
  
  '2000s': [
    { id: 'mov16', title: 'Inception', year: 2010, director: 'Christopher Nolan', youtubeId: 'YoHD9XEInc0' },
    { id: 'mov17', title: 'Avatar', year: 2009, director: 'James Cameron', youtubeId: '5PSNL1qE6VY' },
    { id: 'mov18', title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', youtubeId: 'EXeTwQWrcwY' },
    { id: 'mov19', title: 'WALL-E', year: 2008, director: 'Andrew Stanton', youtubeId: 'CZ1CATNbXg0' },
  ],
  
  '2010s': [
    { id: 'mov20', title: 'Interstellar', year: 2014, director: 'Christopher Nolan', youtubeId: 'zSWdZVtXT7E' },
    { id: 'mov21', title: 'Mad Max: Fury Road', year: 2015, director: 'George Miller', youtubeId: 'hEJnMQG9ev8' },
    { id: 'mov22', title: 'Dunkirk', year: 2017, director: 'Christopher Nolan', youtubeId: 'F-eMt3SrfFU' },
    { id: 'mov23', title: 'Parasite', year: 2019, director: 'Bong Joon-ho', youtubeId: '5xH0HfJHsaY' },
  ],
  
  // Svenska filmer
  'svenska': [
    { id: 'mov24', title: 'Fucking Åmål', year: 1998, director: 'Lukas Moodysson', youtubeId: 'gXnHO2W4X9I' },
    { id: 'mov25', title: 'Låt den rätte komma in', year: 2008, director: 'Tomas Alfredson', youtubeId: 'ICp4g9p_rgo' },
    { id: 'mov26', title: 'Kopps', year: 2003, director: 'Josef Fares', youtubeId: 'n1BVHvuB6fk' },
    { id: 'mov27', title: 'Jägarna', year: 1996, director: 'Kjell Sundvall', youtubeId: 'tVF6_zq3IjA' },
  ],
  
  // Pixar/Animation
  'animation': [
    { id: 'mov28', title: 'Toy Story', year: 1995, director: 'John Lasseter', youtubeId: 'v-PjgYDrg70' },
    { id: 'mov29', title: 'Upp', year: 2009, director: 'Pete Docter', youtubeId: 'ORFWdXl_zJ4' },
    { id: 'mov30', title: 'Hitta Nemo', year: 2003, director: 'Andrew Stanton', youtubeId: 'wZdpNglLbt8' },
  ],
};

// Funktion för att hämta slumpmässiga filmer från valda kategorier
export function getRandomMovies(categoryIds, count) {
  const selectedMovies = [];
  
  // Samla alla filmer från valda kategorier
  categoryIds.forEach(catId => {
    if (movieCategories[catId]) {
      selectedMovies.push(...movieCategories[catId]);
    }
  });
  
  // Om inga kategorier valda eller för få filmer, returnera allt
  if (selectedMovies.length === 0) {
    // Samla ALLA filmer från alla kategorier
    Object.values(movieCategories).forEach(catMovies => {
      selectedMovies.push(...catMovies);
    });
  }
  
  // Ta bort dubbletter (samma film kan finnas i flera kategorier)
  const uniqueMovies = Array.from(
    new Map(selectedMovies.map(m => [m.id, m])).values()
  );
  
  // Blanda och välj rätt antal
  const shuffled = uniqueMovies
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, uniqueMovies.length));
  
  return shuffled;
}

// Export för backend att använda
export default {
  movieCategories,
  getRandomMovies
};
