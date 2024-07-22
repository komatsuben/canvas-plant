import React from 'react';

const DateTimeFormat = ({ timestamp }) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Asia/Jakarta',
    };

    const formattedDate = new Date(timestamp).toLocaleString('en-US', options);
    return formattedDate;
};

export default DateTimeFormat;
