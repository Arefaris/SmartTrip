import { pexels_client } from "../config/pexels";
import { PhotosWithTotalResults, ErrorResponse } from "pexels";

export interface PhotoResult {
  url: string;
  photographer: string;
  photographer_url: string;
}
`{
  "total_results": 10000,
  "page": 1,
  "per_page": 1,
  "photos": [
    {
      "id": 3573351,
      "width": 3066,
      "height": 3968,
      "url": "https://www.pexels.com/photo/trees-during-day-3573351/",
      "photographer": "Lukas Rodriguez",
      "photographer_url": "https://www.pexels.com/@lukas-rodriguez-1845331",
      "photographer_id": 1845331,
      "avg_color": "#374824",
      "src": {
        "original": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png",
        "large2x": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
      },
      "liked": false,
      "alt": "Brown Rocks During Golden Hour"
    }
  ],
  "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=1&query=nature"
}
`

export const getPhotos = async(location: string): Promise<PhotoResult> => {
    try {
        const response = await pexels_client.photos.search({query: location, per_page: 1, orientation: "landscape"});
        
        if ('photos' in response && response.photos.length > 0) {
            const photo = response.photos[0];
            
            //Sanitize photographer data to remove problematic characters
            const cleanPhotographer = photo.photographer
                .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
                .replace(/\u0000/g, '') // Remove null characters
                .trim();
            
            const cleanPhotographerUrl = photo.photographer_url
                .replace(/[\x00-\x1F\x7F-\x9F]/g, '')// Remove control characters
                .replace(/\u0000/g, '') // Remove null characters
                .trim();
            
            return {
                url: photo.src.large,
                photographer: cleanPhotographer,
                photographer_url: cleanPhotographerUrl
            };
        } else {
            
            throw new Error('No photos found for location');
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Failed to fetch photos for ${location}`);
    }
}