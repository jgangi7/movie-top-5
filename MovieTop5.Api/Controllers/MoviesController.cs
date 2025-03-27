using Microsoft.AspNetCore.Mvc;
using MovieTop5.Api.Models;

namespace MovieTop5.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private static readonly List<Movie> _movies = new()
    {
        new Movie
        {
            Id = 1,
            Title = "Parasite",
            Description = "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            ImageUrl = "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
            VideoUrl = "https://www.youtube.com/embed/5xH0HfJHsaY?start=20&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3",
            Year = 2019,
            Director = "Bong Joon Ho",
            Rating = 8.6
        },
        new Movie
        {
            Id = 2,
            Title = "Iron Man",
            Description = "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
            ImageUrl = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg",
            VideoUrl = "https://www.youtube.com/embed/8ugaeA-nMTc?start=15&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3",
            Year = 2008,
            Director = "Jon Favreau",
            Rating = 7.9
        },
        new Movie
        {
            Id = 3,
            Title = "Gone Girl",
            Description = "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
            ImageUrl = "https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_.jpg",
            VideoUrl = "https://www.youtube.com/embed/2-_-1nJf8Vg?start=15&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3",
            Year = 2014,
            Director = "David Fincher",
            Rating = 8.1
        },
        new Movie
        {
            Id = 4,
            Title = "The Girl with the Dragon Tattoo",
            Description = "A journalist is aided by a young female hacker in his search for the killer of a woman who has been dead for forty years.",
            ImageUrl = "https://m.media-amazon.com/images/M/MV5BMTk2NDc3MTAzN15BMl5BanBnXkFtZTcwNTAyNDY3Nw@@._V1_.jpg",
            VideoUrl = "https://www.youtube.com/embed/DqQe3OrsMKI?start=15&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3",
            Year = 2011,
            Director = "David Fincher",
            Rating = 7.8
        },
        new Movie
        {
            Id = 5,
            Title = "Focus",
            Description = "In the midst of veteran con man Nicky's latest scheme, a woman from his past - now an accomplished femme fatale - shows up and throws his plans for a loop.",
            ImageUrl = "https://m.media-amazon.com/images/M/MV5BMTUwODg2OTA4OF5BMl5BanBnXkFtZTgwOTE5MTE4MzE@._V1_.jpg",
            VideoUrl = "https://www.youtube.com/embed/MxCRgtdAuBo?start=15&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3",
            Year = 2015,
            Director = "Glenn Ficarra, John Requa",
            Rating = 6.6
        }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Movie>> GetTopMovies()
    {
        return Ok(_movies);
    }
} 