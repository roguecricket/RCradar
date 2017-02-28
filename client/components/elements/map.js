import React, {Component, PropTypes} from 'react';
import L from 'leaflet';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Control from 'react-leaflet-control';
import Box from './placebox';
import Fab from './fabutton';
import PopOver from './createForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions';

let MAX_RADIOUS = 5000;

class OpenMap extends Component {
    constructor(props) {
        super(props);
        this.markers = {
            active: L.icon({
                iconUrl: '/assets/images/to_start.svg',
                iconSize: [38, 45]
            }),
            home: L.icon({
                iconUrl: '/assets/images/pin.svg',
                iconSize: [38, 95]
            })
        }
    }

    componentWillMount(){

    }

    render(){
      const {position, zoom, markers} = this.props;
      return (<Map center={position}
                 ref={m => { this.leafletMap = m; }}
                 zoom={zoom}
                 animate={true}>
              <TileLayer
               url='http://c.tiles.mapbox.com/v3/trashgenerator.ih4locjo/{z}/{x}/{y}.png'
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             />
           <Marker icon={this.markers.home} position={position} />
           {
             markers.map((mark) => (<Marker icon={this.markers.active} position={mark.cords}>
               <Popup>
              <div>
                 <p><b>Title:</b>{" " +mark.data.name}</p>
                 <p><b>Contact:</b>{" " +mark.data.contact_no}</p>
                 <p><b>Registration closes on:</b>{" " +new Date(mark.data.closes_on*1000).toDateString()}</p>
              </div>
              </Popup>
             </Marker>))
           }
          <Fab />
          <Box />
      </Map>)
    }
}

OpenMap.defaultProps = {
  position: [0, 0],
  zoom: 20,
  markers: []
}

let mapStateToProps = (state) => ({
  position: [state.home.lat, state.home.lon],
  zoom: 20,
  markers: []
})

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

OpenMap = connect(mapStateToProps, mapDispatchToProps)(OpenMap);

export default OpenMap;
