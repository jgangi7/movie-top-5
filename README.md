# Movie Top 5 - Interactive Movie Showcase

A sleek, modern web application that showcases your top 5 movies with an immersive user interface. Features include dynamic video backgrounds, smooth hover transitions, and detailed movie information panels.

![Movie Top 5 Preview](preview.png)

## Features

- **Dynamic Video Backgrounds**: Each movie features a background video clip from its trailer
- **Interactive UI**: Hover over movie titles to switch between movies
- **Detailed Information**: Click on any movie title to view comprehensive details including:
  - Runtime
  - Director
  - Cast members
  - Rating
  - Movie description
  - Movie poster

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: ASP.NET Core Web API
- **Styling**: Custom CSS with modern animations and transitions
- **Video Integration**: YouTube IFrame API

## Prerequisites

- Node.js (v14 or higher)
- .NET 6.0 SDK or higher
- A modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-top-5.git
cd movie-top-5
```

2. Install frontend dependencies:
```bash
cd MovieTop5.Web
npm install
```

3. Install backend dependencies:
```bash
cd ../MovieTop5.Api
dotnet restore
```

## Running the Application

1. Start the backend API:
```bash
cd MovieTop5.Api
dotnet run
```
The API will start running on `http://localhost:5072`

2. In a new terminal, start the frontend:
```bash
cd MovieTop5.Web
npm start
```
The frontend will start running on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
movie-top-5/
├── MovieTop5.Web/          # Frontend React application
│   ├── src/
│   │   ├── App.tsx        # Main application component
│   │   ├── App.css        # Main styles
│   │   └── types/         # TypeScript interfaces
├── MovieTop5.Api/          # Backend .NET API
│   ├── Controllers/       # API endpoints
│   └── Models/           # Data models
```

## Customization

To customize the movie selection:
1. Update the movie list in `MovieTop5.Api/Controllers/MoviesController.cs`
2. Each movie requires:
   - Title
   - Description
   - Video URL (YouTube)
   - Image URL
   - Year
   - Director
   - Rating
   - Runtime
   - Stars (cast members)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Movie data sourced from IMDB
- Video content from YouTube
- Design inspired by modern streaming platforms 