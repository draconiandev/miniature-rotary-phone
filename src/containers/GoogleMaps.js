/* eslint-disable no-undef */

import React from "react";
import { render } from "react-dom";
import { moveConfig } from '../config.js';
import MapInfo from '../components/MapInfo';

const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose( 
  withProps({
    //googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCzOgGjAMTutXyxQYR1D8Rr3MSZyuTpZ_8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),  
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },   
    onMarkerClick: () => (marker) => {
      marker.showInfo = !marker.showInfo;
      alert("Price: $ " + marker.priceDisplay + "  Address:  " + marker.address + 
      "  Status:  " + marker.status+ "  Type:  " + marker.type + "  County:  " + marker.county);    
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: 34.052235, lng: -118.243683 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={100}
    >
      {props.markers.map(marker => (        
         
        <Marker          
          key={marker.ukey}
          position={{ lat: marker.position.coordinates[0], lng: marker.position.coordinates[1] }}          
          onClick={props.onMarkerClick.bind(this,marker)}
        >          
        
         </Marker>
      ))}
	  
    </MarkerClusterer>
  </GoogleMap>  
);


class GoogleMaps extends React.PureComponent {  

  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {

    fetch(moveConfig.apiSearchPropertyPostUrl, {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: moveConfig.apiSearchPropertyInputData,
    }) 
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.data });
      });
  }

  render() {
    if(this.state.markers != null && this.state.markers != undefined && this.state.markers.length >0)
    {      
      return (
        <MapWithAMarkerClusterer markers={this.state.markers} />        
      )      
    }
    else
    { 
      return (<div style={{width:'100%', color:'blue', height:'400px', fontSize:'35px',backgroundImage:'url(defaultmapimage.png)'}}>
        {"Fetching data from Realtors DB..please wait..."} 
        <img  style={{position:'relative', width:'150px', top:'10%'}} src="loader.gif"/>
    </div>);
    }
    
  }
}

export default GoogleMaps