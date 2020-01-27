import { SET_MAILS, LOADING_DATA, LIKE_MAIL, UNLIKE_MAIL } from '../types';
import axios from 'axios';

//Get all mails
export const getMails = () => dispatch => {
	dispatch({ type: LOADING_DATA })
	axios.get('/mails')
	 .then(res => {
	 	dispatch({
	 		type: SET_MAILS,
	 		payload: res.data
	 	})
	 })
	 .catch(err => {
	 	dispatch({
	 		type: SET_MAILS,
	 		payload:[]
	 	})
	 })
}

//like mail
export const likeMail = (mailId)=>(dispatch)=> {
	axios.get(`/mail/${mailId}/like`)
	 .then(res => {
	 	dispatch({
	 		type: LIKE_MAIL,
	 		payload: res.data
	 	})
	 })
	 .catch(err => console.log(err))

}
//unlike mail
export const unlikeMail = (mailId) => (dispatch) => {
	axios.get(`/mail/${mailId}/unlike`)
	 .then(res => {
	 	dispatch({
	 		type: UNLIKE_MAIL,
	 		payload: res.data
	 	})
	 })
	 .catch(err => console.log(err))

}

