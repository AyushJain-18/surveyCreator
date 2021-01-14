import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

const UserResponse = (props) => {
    let params = queryString.parse(props.location.search);
    console.log( 'params', params)
    //surveyGeneratorId
    //reciverMailId
    //response
    return (
        <div>
            Hello
        </div>
    )
};

export default withRouter(UserResponse);