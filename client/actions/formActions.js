export function hideModel() {
    return {
        type: "HIDE_MODEL"
    }
}

export function showModel() {
    return {
        type: "SHOW_MODEL"
    }
}

export function submitForm(param){
    return {
        type: 'SUBMIT_FORM',
        payload: param
    }
}