
import React from 'react';
import {
  Map, Marker, Polyline, Popup, TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  Col, Container, Row,
} from 'reactstrap';

import ROUTE from '../mock/route.js';
import Informations from './Informations';


const myIcon = new L.DivIcon({
  className: '  RoutingMap__container',
  html: '<div class="RoutingMap__icon fa fa-3x fas fa-map-marker-alt"/>',
});

const center = [39.249814699401256, 9.135911464254606];

const Route = ({ route }) => (
  route.map((m) => (
    <div key={m.properties.seq}>
      <Polyline
        key={m.properties.seq}
        fillColor="red"
        color="red"
        positions={
        m.geometry.coordinates.map(
          (coordinate) => (
            [coordinate[1], coordinate[0]]),
        )
      }
      />
    </div>
  )));


class RouitingMap extends React.Component {
  mapRef = React.createRef();

  refMarker = [React.createRef(), React.createRef()];

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.setLoad = this.setLoad.bind(this);
    this.state = {
      count: 0,
      route: [],
      path: [],
      load: false,
    };


  }

  componentDidUpdate() {
    const { count, load } = this.state;
    if (count === 2 && !load) {
      this.fetchData();
      this.setLoad(true);
    }
  }

  setLoad(load) {
    this.setState({ load });
  }

  async fetchData () {
    const path = await Promise.resolve(ROUTE.features);
    this.setState({ path });
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
      this.setLoad(false);
    }
  }

  render() {
    // console.log('state', this.state);
    const { route, path } = this.state;
    return (
      <Container className="RoutingMap p-0">
        <Row noGutters>
          <Col xs={12} md={12}>
            <Map
              className="RoutingMap__map"
              center={center}
              zoom={17}
              minZoom={10}
              maxZoom={30}
              ref={this.mapRef}
              onClick={this.handleClick}
            >

              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {route.map((m, index) => (
                <div key={m.lat}>
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
              <Route route={path} />
            </Map>
          </Col>
        </Row>
        <Row noGutters className="my-5">
          <Col xs={12} md={12}>
            <Informations info={path.map(m => m.properties)} />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default RouitingMap;
