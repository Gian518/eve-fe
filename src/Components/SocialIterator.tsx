import React, { useEffect, useState, useGlobal } from 'reactn'

// Third-party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Libraries
import { IconName, library, SizeProp } from '@fortawesome/fontawesome-svg-core'

library.add(fab)

type SocialIteratorType = {
    size?: SizeProp,
    space?: number
}

const SocialIterator = ({
    size = '1x',
    space = 10
}: SocialIteratorType) => {

    /**** GLOBAL STATE ****/
    const [social, setSocial] = useGlobal<any>('social')

    return(
        social.map((item: { name: string, slug: string, icon: IconName, url: string }) => {
            return(
                <a href={item.url} key={item.slug} style={{ marginRight: space }} target='_blank'>
                    <FontAwesomeIcon icon={{ prefix: 'fab', iconName: item.icon }} size={size}/>
                </a>
            )
        })
    )
}

export default SocialIterator