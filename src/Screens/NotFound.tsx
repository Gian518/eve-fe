import React, { useEffect, useState, useGlobal } from 'reactn'

// Libraries
import { useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * ** NOTFOUND **
 * A simple component which renders a not found message, inviting the user to go back to homepage
 * @returns {React.Component}
 */
const NotFound = () => {

    /**** HOOKS ****/
    const { t } = useTranslation()
    const error = useRouteError()

    return(
        <div>
            <h1>{t('ohNo')}</h1>
            <h2>{t('paginaNonTrovata')}</h2>
        </div>
    )
}

export default NotFound