// import {INCREMENT, DECREMENT} from '../action/';

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: ''
    },
    isAuthenticated: true
}

const userReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'FETCH_USER_LOGIN_SUCCESS':
            return {
                ...state, account :{
                    //tránh lỗi, có thể trả về undefined nếu bất kỳ phần nào không tồn tại
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    image: action.payload?.DT?.image,
                    role: action.payload?.DT?.role
                }
            }
        default:
            return state;
    }
}

export default userReducer;