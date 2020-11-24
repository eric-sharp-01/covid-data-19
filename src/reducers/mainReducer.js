const initial = {
  openBackdrop: false
}

const data = (state = initial, { type, payload }) => {
  switch(type){
    case 'OPEN_BACKDROP':
      return {
        ...state,
        openBackdrop: true
      }
    case 'CLOSE_BACKDROP':
      return {
        ...state,
        openBackdrop: false
      }
    default:
      return state
  }
}

export default data