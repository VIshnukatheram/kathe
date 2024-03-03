const PROFILEOBJ = "profileObj";

const profileObj=(payload)=>{
    return{
        type:PROFILEOBJ,
        payload
    }
}
let initialState = {
    user: null,
    deviceToken: null,
    profileObj:{}
};
const ProfileReducer = (state, action) => {
    if (!state) {
        state = {
          ...initialState,
          ...state
        }
      }
    switch (action.type) {
       
        case PROFILEOBJ:
            return { ...state, profileObj: action.payload };
        default:
            return state;
    }
}

export default ProfileReducer;
export { profileObj };