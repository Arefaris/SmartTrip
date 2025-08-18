import './GridBackground.css';

const popularLocations = [
  { name: 'Paris', image: './images/backgrounds/paris.jpg' },
  { name: 'Tokyo', image: './images/backgrounds/tokyo.jpg' },
  { name: 'New York', image: './images/backgrounds/New-York.jpg' },
  { name: 'Kyiv', image: './images/backgrounds/Kyiv.jpg' },
  { name: 'Rome', image: './images/backgrounds/Rome.jpg' },
  {name: 'Beijing', image: './images/backgrounds/Beijing.jpg'},
  {name: 'Tel Aviv', image: './images/backgrounds/Tel-Aviv.jpg'},
  {name: 'Barcelona', image: './images/backgrounds/Barcelona.jpg'}
];

export default function GridBackground() {
  return (
    <div className="grid-background">
      {popularLocations.map((location) => (
        <div
          key={location.name}
          className="grid-image"
          style={{
            backgroundImage: `url(${location.image})`
          }}
        >
          <div className="location-overlay">
            <span className="location-name">{location.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}