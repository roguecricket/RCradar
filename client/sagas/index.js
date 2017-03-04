import {homepositionSaga} from './homepositionSaga';
import {initMarkerPositions} from './markerPositionSaga';

export default function* rootSaga(){
  yield [
    homepositionSaga(),
    initMarkerPositions()
  ]
}
