import React, { useEffect, useState } from 'reactn'

// Libraries
import useDimensions from '../Config/Dimensions'

type FeaturedType = {
    url: string,
    text: string
}

/**
 * Return an image component with the featured image. It automatically adapts the image at the user device
 * @returns {JSX}
 */
const Featured = ({
    url,
    text
} : FeaturedType) => {

    /**** HOOKS ****/
    const { height, width } = useDimensions()

    return(
        <div
            className='img-background featured-img'
            style={{
                backgroundImage: 'url(' + url + ')',
                height: height / 2
            }}
        >
            <div className='sheer-layer'>
                <h1>{text}</h1>
            </div>
        </div>
    )
}

export default Featured