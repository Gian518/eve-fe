import React, { useEffect, useState } from 'reactn'

const getDimensions = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

/**
 * Function that return current width and height
 */
const useDimensions = () : {
    width: number,
    height: number
} => {

    /**** STATE VARIABLES ****/
    const [dimensions, setDimensions] = useState<any>(getDimensions())

    
    useEffect(() => {
        const resize = () => {
            setDimensions(getDimensions())
        }

        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    return dimensions
}

export default useDimensions