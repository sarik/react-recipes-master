import React from 'react';

const Error = ({error}) => {
    return (
        <div>
        <h3>Error:{error.message}</h3>
        </div>
    )
}

export default Error; 