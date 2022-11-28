import React, { useGlobal, useState, useEffect } from 'reactn'

/**
 * Hook used to return colors by current user theme
 * @returns {{
 *  background: string,
 *  base: string,
 *  secondary: string,
 *  primary: string,
 *  text: string
 * }}
 */
const useColors = (): {
    background: string
    base: string
    secondary: string
    primary: string
    text: string
} => {

    /**** GLOBAL STATES ****/
    const [colorScheme, setColorScheme] = useGlobal<any>('colorScheme')

    /**** STATE VARIABLES ****/
    const [colors, setColors] = useState<any>()

    useEffect(() => {
        if(colorScheme == 'light'){
            setColors({
                background: "#FCF0F4",
                base: "#F7D4E0",
                secondary: "#6F4653",
                primary: "#DE8CA7",
                text: "#000000"
            })
        } else if(colorScheme == 'dark') {
            setColors({
                background: "#1F1C1C",
                base: "#60142A",
                secondary: "#C12854",
                primary: "#F23269",
                text: "#E9E8EA"
            })
        }
    }, [colorScheme])

    return colors

}

export default useColors