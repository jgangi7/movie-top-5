namespace MovieTop5.Api.Models;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string VideoUrl { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Director { get; set; } = string.Empty;
    public double Rating { get; set; }
} 