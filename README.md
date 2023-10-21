# Travel Planner✈️

Welcome to the Travel Planner repository! This web application allows users to seamlessly plan their journeys, offering a range of features to enhance the travel planning experience.

<div align="center">
<a href="http://46.72.127.251:2999/" target="_blank" style="text-decoration:none;" >VIEW THE RUNNING APP</a>
</div>

## Features

### 1. Trip Management

-   **Add Trips**: Create personalized trips by specifying the destination, start date, and end date.
-   **Delete Trips**: Remove unwanted trips effortlessly.
-   **Edit Trips**: Modify trip details such as destination, dates, etc.

### 2. Itinerary Planning

-   **Add Itinerary Items**: For each trip, you can create a detailed itinerary by adding plan items.
-   **Delete Itinerary Items**: Remove or modify itinerary items as your plans evolve.
-   **Sort by Date**: Itinerary items are automatically sorted based on the date.

### 3. Location Assistance

-   **OpenStreetMap Integration**: When creating a trip or itinerary item, the OpenStreetMap Nominatim API suggests locations as you type, ensuring accuracy.
-   **Google Custom Search API**: Upon creating a trip or itinerary item, the Google Custom Search API fetches and adds an image of the selected location, enhancing your planning with visual inspiration.

## Getting Started

1.  #### Clone the repository:  
       `git clone https://github.com/JulKoroleva/TravelPlanner.git`  
2.   #### Navigate to the project directory:
      `cd TravelPlanner`
3.  #### Deploy with Docker Compose    
     `docker-compose -f docker-compose.yml up -d` 
5.   #### Open your web browser and navigate to:
      `http://localhost:2999/` 
    
## Contributing
I welcome contributions! Feel free to open issues, submit pull requests, or provide feedback.


## Acknowledgments
-   OpenStreetMap Nominatim API
-   Google Custom Search API

Happy travels! 🌍✈️
