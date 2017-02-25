import React, {Component, PropTypes} from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import Box from './placebox';
import Api from '../../rest/api';

let MAX_RADIOUS = 5000;

class OpenMap extends Component{
  constructor(props){
    super(props);
    this.state = {
      position: [0, 0],
      markers: [],
      zoom: 30
    }

    this.markers = {
      active: L.icon({iconUrl: '/assets/images/to_start.svg',
                         iconSize: [38, 45]}),
      home: L.icon({iconUrl: '/assets/images/pin.svg',
                         iconSize: [38, 95]})
    }
  }

  componentWillMount(){

    navigator.geolocation.getCurrentPosition((cords) => {
       const {latitude, longitude} = cords.coords;
       this.setState({
         position: [latitude, longitude]
       });
       Api.nearBy(latitude, longitude, 500).then((vals) => {
         const mks = vals.data.map((pt) => (pt.location.coordinates));
         console.log(mks);
         this.setState({
           markers: mks
         })
       });
     });
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('zoomend', () => {
      this.setState({
        zoom: leafletMap.getZoom()
      })
    });
  }

  render(){
    return (<Map center={this.state.position}
                 ref={m => { this.leafletMap = m; }}
                 zoom={this.state.zoom}
                 animate={true}>
      <TileLayer
            url='http://c.tiles.mapbox.com/v3/trashgenerator.ih4locjo/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
      <Marker icon={this.markers.home} position={this.state.position} />
      {
        this.state.markers.map((mark) => (<Marker icon={this.markers.active} position={mark} />))
      }
      <Box onSelect={this.setCursor.bind(this)}/>
  </Map>)
  }

  setCursor(suggest){
    console.log(suggest);
    this.setState({
      position: [suggest.location.lat, suggest.location.lng]
    })
  }

}

export default OpenMap;
