import React from 'react';
import {
  Circle,
  Map, Marker, Popup, TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const myIcon = new L.DivIcon({
  className: '  RoutingMap__container',
  html: '<div class="RoutingMap__icon fa fa-3x fas fa-map-marker-alt"/>',
});

const center = [39.223841, 9.121661];
class RouitingMap extends React.Component {
  mapRef = React.createRef();

  refMarker = [React.createRef(), React.createRef()];

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.state = {
      count: 0,
      route: [],
    };
  }

  handleClick(evt) {
    // console.log('handleClick', evt.latlng);
    const map = this.mapRef.current;
    const { count, route } = this.state;
    if (map != null) {
      if (count === 0) {
        route.push({ ...evt.latlng });
        this.setState({
          count: 1,
          route,
        });
      } else if (count === 1) {
        route.push({ ...evt.latlng });
        this.setState({
          count: 2,
          route,
        });
      }
    }
  }

  updatePosition(evt) {
    const { routeIndex } = evt.target.options;
    const marker = this.refMarker[routeIndex].current;

    if (marker != null) {
      this.setState((prevState) => {
        const { route } = prevState;
        route[routeIndex] = { ...marker.leafletElement.getLatLng() };
        return {
          route,
        };
      });
    }
  }

  render() {
    // console.log('state', this.state);
    const { route } = this.state;
    return (
      <div className="RoutingMap">
        <i className=" fas fa-map-marker-alt" />
        <Map
          className="RoutingMap__map"
          center={center}
          zoom={17}
          ref={this.mapRef}
          onClick={this.handleClick}
        >
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {route.map((m, index) => (
            <div key={m.lat}>
              <Circle key={m.lng} center={m} fillColor="blue" radius={5} color="red" />
              <Marker
                ref={this.refMarker[index]}
                routeIndex={index}
                key={m.lat}
                position={m}
                draggable
                onDragend={(evt) => this.updatePosition(evt)}
                icon={myIcon}
              >
                <Popup>
                  <span>
                    {`coordinate [${m.lat}, ${m.lng}]`}
                  </span>
                </Popup>
              </Marker>
            </div>
          ))}


        </Map>
      </div>
    );
  }
}


export default RouitingMap;
