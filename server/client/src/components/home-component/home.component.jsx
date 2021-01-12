import React from 'react';
import './home.styles.scss';

import {Link} from 'react-router-dom'

import {selectIsUserLogedIn, selectUserCredits} from '../../store/authReducers/auth.selector'

import {connect} from 'react-redux';

const HomeDashboard =({isUserLoggedIn, userCredit}) =>{
    const startLogin = ()=>window.open('/auth/google',"_self");
    return (
        <div className={'background-image'} style={{backgroundImage: 'url(/survey-background.jpg)'}}>
            <div className='home-header' >Welcome to Survey Generator</div>
            <div className='home-subheader'> 
                    we will help you to create your surveys <br/>
                    Buy credit and we will create surveys 
            </div>
            <ul className='home-content'>
                {isUserLoggedIn? <li> <Link to='/surveys'>Surveys Dashboard</Link></li> : <li onClick={startLogin}>'Please Login to continue !'</li>}
                {isUserLoggedIn? <li><Link to='/Profile'>Profile Dashboard</Link> </li>: ''}
            </ul>
        </div>
    ) 
}
const mapStateToProps = state =>({
    isUserLoggedIn  : selectIsUserLogedIn(state),
    userCredit      : selectUserCredits(state) 

});
export default connect(mapStateToProps)(HomeDashboard);