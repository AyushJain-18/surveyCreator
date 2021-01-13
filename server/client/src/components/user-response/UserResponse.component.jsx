import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

const UserResponse = (props) => {
    let params = queryString.parse(props.location.search);
    console.log( 'params', params)
    return (
        <div>
            Hello
        </div>
    )
};

export default withRouter(UserResponse);