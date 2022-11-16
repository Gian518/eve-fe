import React from 'reactn'

// Custom components
import Menu from './Menu'

// Libraries
import { Outlet, useRouteError } from 'react-router-dom'

/**
 * Root element for React Router
 * @param props Props:
 *  items: Menu elements to pass to Menu component
 * @returns {React.Component}
 */
const Root = (
    {items}: any
) => {
    const error = useRouteError()

    return(
        <>
            <Menu items={items}/>
            <div id="detail">
                <Outlet/>
            </div>
        </>
    )
}

export default Root