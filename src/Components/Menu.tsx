import React, { useEffect, useState, useGlobal } from 'reactn'

// Third-party components
import { Menu as Graph } from 'antd'

// Libraries
import { Link, useLocation } from 'react-router-dom'

const Menu = (
    {items}: any
) => {

    /**** STATE VARIABLES ****/
    const [loaded, setLoaded] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>('')

    /**** HOOKS ****/
	const location = useLocation()

    /**** BOOT ****/
    useEffect(() => {
        // Saving current location
        const currentRoute = location.pathname.replace('/', '')
        setSelected(currentRoute)

        // Menu is loaded
        setLoaded(true)
    }, [])

    return(
        loaded
        ?
        <Graph
            mode='horizontal'
            defaultSelectedKeys={[selected]}
        >
            {
                items.map((item: any) => {
                    return(
                        <Graph.Item
                            key={item.key}
                            
                        >
                            <Link to={item.key}>{item.title}</Link>
                        </Graph.Item>
                    )
                })
            }
        </Graph>
        :
        null
    )

}

export default Menu