import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
 //redux
 import { connect } from 'react-redux';
import { likeMail, unlikeMail } from '../../redux/actions/dataactions';


export class LikeButton extends Component {
     likedMail = () => {
          if(this.props.user.likes && 
               this.props.user.likes.find(
                    like => like.mailId === this.props.mailId
                    )
               )
               return true
               else return false
     }
likeMail = () => {
     this.props.likeMail(this.props.mailId)
}
unlikeMail = () => {
     this.props.unlikeMail(this.props.mailId)
}
     render() {
          const { authenticated } = this.props.user;
          const likeButton = !authenticated ? (
        <Link to='/login' >
          <MyButton tip='like'>
             <FavoriteBorder color='primary'/>
          </MyButton>
        </Link>
     ) : (
          this.likedMail() ? (
               <MyButton tip='undo like' onClick={this.unlikeMail} >
                <FavoriteIcon color='primary' />
               </MyButton>
          ) : (
          <MyButton tip='like' onClick={this.likeMail} >
                <FavoriteBorder color='primary' />
          </MyButton>
      )
     )
          return likeButton
     }
}
LikeButton.propTypes = {
     user: PropTypes.object.isRequired,
     mailId: PropTypes.string.isRequired,
     likeMail: PropTypes.func.isRequired,
     unlikeMail: PropTypes.func.isRequired
}
const mapStateToProps = (state) =>({
     user:state.user
})
const mapActionToProps = {
     likeMail,
     unlikeMail
}

export default connect(mapStateToProps, mapActionToProps)(LikeButton)
