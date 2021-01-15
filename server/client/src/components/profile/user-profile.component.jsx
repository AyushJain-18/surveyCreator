import React from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './user-profile.styles.scss'
import {selectLogedInUserData, selectUserCredits,selectIsUserLogedIn} from '../../store/authReducers/auth.selector'; 
 
const UserProfile =({isLoggedIn,userCredit,userData, history})=>{
        if(!isLoggedIn){
            history.push('/');
            return null;
        }
        return (
            <div className ='profile-container'>
                    <img src={userData.profile_picture} alt="user_profile_picture" className='profile-picture'/>
                    <div className='user-content'>
                        <div className='user-field'>  
                                <div>Name</div>
                                <div className='user'>{userData.display_name}</div>  
                        </div>
                        <div className='user-field'>  
                                    <div>Email</div>
                                    <div  className='user'> {userData.email_id}</div>  
                        </div>
                        <div className='user-field'> 
                                    <div> Credit</div>
                                    <div className='user' > {userCredit}</div>    
                        </div>
                    </div>
            </div>
        )
}
const mapStateToProps = state => ({
    isLoggedIn: selectIsUserLogedIn(state),
    userCredit: selectUserCredits(state),
    userData  : selectLogedInUserData(state)

});
export default compose(
    withRouter,
    connect(mapStateToProps)
)(UserProfile)