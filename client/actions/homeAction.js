export function initHome(){
  return {type: 'INIT_POSITION'}
}

export function updateHome(location){
  return {type: 'UPDATE_HOME_POSITION', location}
}
