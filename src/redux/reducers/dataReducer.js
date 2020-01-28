import { 
	 SET_MAILS,
	 LIKE_MAIL, 
	 UNLIKE_MAIL, 
	 LOADING_DATA ,
	 SET_MAIL
	} from '../types';

const initialState ={
	mails:[],
	mail:{},
	loading: false
}

export default function(state=initialState, action) {
	switch(action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			}
		case SET_MAILS:
		    return {
		    	...state,
		    	mails: action.payload,
		    	loading:false
		    }
		case SET_MAIL:
		 return {
		 	...state,
		 	mail: action.payload
		 };
		case LIKE_MAIL:
		case UNLIKE_MAIL:
		let index = state.mails.findIndex(
			(mail)=> mail.mailId===action.payload.mailId
			);
		state.mails[index] = action.payload;
		// if (state.mail.mailId === action.payload.mailId){
		// 	state.mail = action.payload;
		// }
		return {
			...state
		}
		default: 
		return state
	}
}