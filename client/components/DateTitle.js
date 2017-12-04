import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const DateTitle = ({ date }) => {
    const nativeDate = new Date(date);
    const formatedDate = moment(nativeDate).format('dddd, MMM Do, YYYY');

    return (
        <h5 className="date">{formatedDate}</h5>
    );
};

DateTitle.propTypes = {
    date: PropTypes.string.isRequired,
};

export default DateTitle;
