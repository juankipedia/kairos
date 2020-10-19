export default (state, action) => {
    switch (action.type) {
    case "LOGIN":
        console.log("WE MADE IT MOTHERFUCKER ------------------------------- ");
        return {
            ...state,
            ...action.payload
        }
    default:
        return state;
    }
  };