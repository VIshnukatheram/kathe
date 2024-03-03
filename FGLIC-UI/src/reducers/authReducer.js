const { USER_FOUND, USER_EXPIRING, USER_EXPIRED, SILENT_RENEW_ERROR } = require("redux-oidc");
const USER_LOG_OUT = "userLogout";
const GET_PROFILE_SUCCESS = "getProfileSuccess";
const SET_DEVICE_TOKEN = "setDeviceToken";
const userLogout = () => {
    return {
        type: USER_LOG_OUT
    }
};
const profileSuccess = (info) => {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: info
    }
}
const setToken = (payload) => {
    return {
        type: SET_DEVICE_TOKEN,
        payload
    }
}
let initialState = {
    user: null,
    deviceToken: null
};
const authReducer = (state, action) => {
    if (!state) {
        state = {
          ...initialState,
          ...state
        }
      }
    switch (action.type) {
        case USER_FOUND:
            return { ...state, user: action.payload }
        case USER_EXPIRING:
            return state;
        case USER_LOG_OUT:
            return { user: null, profile: null };
        case USER_EXPIRED:
            return { user: null, profile: null };
        case GET_PROFILE_SUCCESS:
            return { ...state, profile: action.payload };
        case SET_DEVICE_TOKEN:
            return { ...state, deviceToken: action.payload };
        case SILENT_RENEW_ERROR:
            console.log("Silent renew Error" + action.payload);
            return state;
        default:
            return state;
    }
}

export default authReducer;
export { userLogout, profileSuccess, setToken };