import React from 'react';
import parse from 'html-react-parser';

const DetailedInfo = ({data}) => {
    return (
        <div className="coin-more-details">
            {data.description.en ? (
                <p>
                    <strong>Description</strong>
                    {parse(data.description.en)}
                </p>
            ):''}
            {data.links.homepage[0] ? (
                <p>
                    <strong>Homepage</strong>
                    <a href={data.links.homepage[0]} target="_blank">{data.links.homepage[0]}</a>
                </p>
            ):''}
            {data.links.blockchain_site[0] ? (
                <p>
                    <strong>Blockchain Site</strong>
                    <a href={data.links.blockchain_site[0]} target="_blank">{data.links.blockchain_site[0]}</a>
                </p>
            ):''}
        </div>
    )
}

export default DetailedInfo;
