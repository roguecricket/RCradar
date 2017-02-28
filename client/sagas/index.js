import {homepositionSaga} from './homepositionSaga';

export default function* rootSaga(){
  yield [
    homepositionSaga()
  ]
}
