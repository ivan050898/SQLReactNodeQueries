import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marcador from './252025.svg';
const AnyReactComponent = ({ text }) => (
  <div>
    {
      <img
        src={Marcador}
        alt='React Logo'
        height={'50px'}
        width={'30px'}
        text={text}
      />
    }
  </div>
);

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 40.5723,
      lng: -74.6849,
    },
    zoom: 17,
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '1500px', marginBottom: '50px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAdzr0Y-6527SBGwbLhiLn9qtYZu50w7V8' }}
          center={{
            lat: parseFloat(this.props.coordenadas.latitud),
            lng: parseFloat(this.props.coordenadas.longitud),
          }}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.coordenadas.latitud}
            lng={this.props.coordenadas.longitud}
            text='My Marker'
          />

          {console.log(this.props.coordenadas.latitud)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
