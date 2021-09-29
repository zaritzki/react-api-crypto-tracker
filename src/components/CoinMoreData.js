import React from 'react';
import parse from 'html-react-parser';

import DetailedSummary from '../components/DetailedSummary';
import DetailedInfo from '../components/DetailedInfo';

const CoinMoreData = ({ data }) => {

    const [details, detailsMore] = data;
    // console.log(details);
    // console.log(detailsMore);

    return (
        <div className="data-container">
            {details ? (
                <DetailedSummary data={details} />
            ): ''}

            {detailsMore ? (
                <DetailedInfo data={detailsMore} />
            ): ''}
        </div>
    )
}

export default CoinMoreData;
