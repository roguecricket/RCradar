import {put, call, takeEvery, apply, select, take} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import Stream from '../rest/event';

function getTourmonentMarkers(lat, lon, radious){
   const stream = Stream('/point', {
     event: 'fetch',
     lat: lat,
     lon: lon,
     radious: radious
   });
   return eventChannel((emitter) => {
     const on_err = (err) => {emitter({
       type: 'FETCH_MARKER_ERROR',
       error: err
     })}
     const on_msg = (msg) => {
       emitter({
         type: 'FETCH_MARKER_SUCCESS',
         msg: msg
       })
     }
     const on_close = (e) => {
       e.target.close();
       emitter({
         type: "FETCH_MARKERS_COMPLETE"
       })
     }
     const on_open = (msg) => {
       emitter({
         type: 'FETCH_MARKER_START'
       })
     }
     stream(on_open, on_msg, on_close, on_err);
     return () => {};
   })
}

function* whatsHappening(){
    const position = yield select((s) => (s.home));
    console.log(position);
    const {lat, lon} = position;
    const radious = 500;
    const streamChannel = yield call(getTourmonentMarkers, lat, lon, radious);
    while(true){
      let action = yield take(streamChannel);
      console.log(action);
      yield put(action);
    }
}

export function* initMarkerPositions(){
  yield takeEvery('INIT_MARKERS', whatsHappening);
}
