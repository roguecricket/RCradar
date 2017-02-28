export default function home(state={lat: 0, lon: 0}, action){
  switch(action.type){
      case "UPDATE_HOME_POSITION":
          const {lat, lon} = action.location;
          return {...state, lat: lat, lon: lon}
      default:
        return state;
  }
}
