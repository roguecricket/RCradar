import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';


var Box = React.createClass({ // eslint-disable-line
  /**
   * Render the example app
   * @return {Function} React render function
   */
  render: function() {
    var fixtures = [];
    return ( // eslint-disable-line
      <div className="searchBox">
         <div className="searchBox__title">Enter your place:</div>
         <Geosuggest
           location={new google.maps.LatLng(52.363632, 4.926588)}
           radius="20"
           placeholder="Let play?"
           inputClassName="searchBox__input"
           onSuggestSelect={this.props.onSelect}
         />
       </div>
    );
  },
});

export default Box;
