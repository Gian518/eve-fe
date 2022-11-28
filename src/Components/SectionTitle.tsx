import React, { useEffect, useState } from 'reactn'
import { CSSProperties } from 'react'

type SectionTitleType = {
    title: string,
    type?: 'elegant'|'standard',
    size?: 'big'|'normal'|'small',
    bottom?: number
    style?: CSSProperties
}

const SectionTitle = ({
    title,
    type = 'elegant',
    size = 'normal',
    bottom = 20,
    style
}: SectionTitleType) => {

    /**** STATE VARIABLES ****/
    const [fontSize, setFontSize] = useState<number>(50)
    const [hrWidth, setHrWidth] = useState<number>(50)
    const [hrBorder, setHrBorder] = useState<number>(4)
    const [classes, setClasses] = useState<Array<string>>(['sectiontitle-h1'])

    useEffect(() => {
        // Setting size
        if(size == 'big'){
            setFontSize(60)
            setHrWidth(60)
            setHrBorder(6)
        } else if(size == 'normal') {
            setFontSize(50)
            setHrWidth(50)
            setHrBorder(4)
        } else if(size == 'small') {
            setFontSize(25)
            setHrWidth(30)
            setHrBorder(3)
        }

        // Setting additional classes for h1 element
        if(type == 'standard'){
            setClasses([...classes, 'sectiontitle-h1-alt'])
        }
    }, [])


    return(
        <div style={style}>
            <h1
                className={classes.join(' ')}
                style={{
                    fontSize
                }}
            >
                {title}
            </h1>
            <hr className='sectiontitle-hr' style={{ width: hrWidth, borderWidth: hrBorder, marginBottom: bottom }}/>
        </div>
    )
}

export default SectionTitle