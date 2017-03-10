import {
    put,
    call,
    takeEvery
} from 'redux-saga/effects';
import API from '../rest/api';

export function* createNew(action) {
    try {
        const result = yield call(API.new, action.payload);
        yield put({
            type: "HIDE_MODEL"
        })
    }
    catch(e){
        console.error(e);
    }

}


export function* createTournaments() {
    yield takeEvery('SUBMIT_FORM', createNew);
}