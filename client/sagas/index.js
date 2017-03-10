import {homepositionSaga} from './homepositionSaga';
import {initMarkerPositions} from './markerPositionSaga';
import {createTournaments} from './tournamentSaga';

export default function* rootSaga(){
  yield [
    homepositionSaga(),
    initMarkerPositions(),
    createTournaments()
  ]
}
