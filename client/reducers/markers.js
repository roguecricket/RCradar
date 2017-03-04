export default function markers(state = {
    isLoading: false,
    msg: []
}, action) {
  switch(action.type){
    case "FETCH_MARKER_START":
        return {...state, isLoading: true, msg: []}
    case "FETCH_MARKER_SUCCESS":
        return {...state, msg: [...state.msg, ...action.msg]}
    case "FETCH_MARKERS_COMPLETE":
        return {...state, isLoading: false}
    default:
        return state
  }
}
