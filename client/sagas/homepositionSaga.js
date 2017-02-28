import {put, call, takeEvery} from 'redux-saga/effects';
import API from '../rest/api';

function getLocationInfo(){
  return new Promise(function(resolve, reject){
     navigator.geolocation.getCurrentPosition((pos) => {
       console.log(pos.coords);
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
     }, (err) => {
       reject(err);
     })
  });
}

function* where_AM_I(action){
  const location = yield call(getLocationInfo);
  yield put({type: 'UPDATE_HOME_POSITION', location});
}


export function *homepositionSaga(){
    yield takeEvery('INIT_POSITION', where_AM_I);
}
