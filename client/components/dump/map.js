import React, {Component, PropTypes} from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import Box from './placebox';
import Fab from './fabutton';
import Api from '../../rest/api';
import PopOver from './createForm';

let MAX_RADIOUS = 5000;

class OpenMap extends Component{
  constructor(props){
    super(props);
    this.state = {
      position: [0, 0],
      markers: [],
      zoom: 30,
      onModelShow: false
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
         const mks = vals.data.filter((pt) => (new Date(pt.event_on * 1000) > new Date()))
                              .map((pt) => ({data: pt, cords: pt.location.coordinates}));
         this.setState({
           markers: mks
         })
       });
     }, null, {
       timeout: 5000
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
        this.state.markers.map((mark) => (<Marker icon={this.markers.active} position={mark.cords}>
          <Popup>
              <div>
                 <p><b>Title:</b>{" " +mark.data.name}</p>
                 <p><b>Contact:</b>{" " +mark.data.contact_no}</p>
                 <p><b>Registration closes on:</b>{" " +new Date(mark.data.closes_on*1000).toDateString()}</p>
              </div>
          </Popup>
        </Marker>))
      }
      <Fab onClick={this.onFabClick.bind(this)}/>
      <PopOver isShowingModal={this.state.onModelShow}
             handleClose={this.onModelClose.bind(this)}
             onNew={this.onNew.bind(this)}
             onNewCancel={this.onModelClose.bind(this)}>

      </PopOver>
      <Box onSelect={this.setCursor.bind(this)}/>
  </Map>)
  }

  setCursor(suggest){
    console.log(suggest);
    this.setState({
      position: [suggest.location.lat, suggest.location.lng]
    })
  }

  onModelClose(){
    this.setState({
      onModelShow: false
    })
  }

  onFabClick(){
    this.setState({
      onModelShow: true
    })
  }

  onNew(state){
     const {position} = this.state;
     let new_obj = {...state, lat: position[0], lon: position[1]};
     return Api.new(new_obj).then((res) => {
       this.setState({
         onModelShow: false
       })
     })
  }
}

export default OpenMap;
