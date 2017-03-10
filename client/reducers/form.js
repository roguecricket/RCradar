export default function form(state={}, action){
    switch(action.type){
        case 'SHOW_MODEL':
           return {
               visible: true
           }
        case 'HIDE_MODEL':
          return {
              visible: false
          }
        default:
          return {
              visible: false
          }
    }
}