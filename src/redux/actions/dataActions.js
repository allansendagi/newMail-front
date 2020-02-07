import { SET_MAILS,
		SET_MAIL,
	    LOADING_DATA, 
	    LIKE_MAIL, 
	    UNLIKE_MAIL,
	    DELETE_MAIL,
	    SET_ERRORS,
	    POST_MAIL,
	    CLEAR_ERRORS,
	    LOADING_UI,
	    STOP_LOADING_UI
	} from '../types';

import axios from 'axios';

//Get all mails
export const getMails = () => (dispatch) => {
	dispatch({ type: LOADING_DATA })
	axios
	 .get('/mails')
	 .then(res=> {
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

export const getMail = (mailId) => dispatch=> {
dispatch({ type: LOADING_UI })
axios.get(`/update/${mailId}`)
.then(res => {
	dispatch({
		type: SET_MAIL,
		payload: res.data
	})
	dispatch({ type: STOP_LOADING_UI})
})
.catch(err => console.log(err))
}

//post a scream
export const postMail = (newMail) => (dispatch) => {
	dispatch({type: LOADING_UI});
	axios
	  .post('/mail', newMail)
	  .then(res => {
	 	dispatch({
	 		type: POST_MAIL,
	 		payload: res.data
	 	})
	 	dispatch(clearErrors())
	 })
	 .catch(err => {
	 	dispatch({
	 		type: SET_ERRORS,
	 		payload: err.response.data
	 	})
	 }) 
} 

//like mail
export const likeMail = (mailId)=>(dispatch)=> {
	axios
	 .get(`/update/${mailId}/like`)
	 .then((res) => {
	 	dispatch({
	 		type: LIKE_MAIL,
	 		payload: res.data
	 	})
	 })
	 .catch((err) => console.log(err))

}
//unlike mail
export const unlikeMail = (mailId) => (dispatch) => {
	axios
	 .get(`/update/${mailId}/unlike`)
	 .then(res => {
	 	dispatch({
	 		type: UNLIKE_MAIL,
	 		payload: res.data
	 	})
	 })
	 .catch(err => console.log(err))

}
export const deleteMail = (mailId) => (dispatch)=> {
	axios.delete(`/mail/&{mailId}`)
	.then(() => {
		dispatch({ type: DELETE_MAIL, payload: mailId})
	})
	.catch(err => console.log(err))
}

export const clearErrors =() => dispatch=> {
	dispatch({ type: CLEAR_ERRORS})
}











