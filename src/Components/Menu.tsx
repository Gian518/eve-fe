import React, { useEffect, useState, useGlobal } from 'reactn'

// Thid-party components
import { Button, Drawer } from 'antd'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'

// Libraries
import { Link, useLocation } from 'react-router-dom'
import logoLight from '../assets/placeholder-light.png'
import logoDark from '../assets/placeholder-dark.png'
import useColors from '../Config/Colors'

const Menu = (
    {items}: any
) => {

    /**** GLOBAL VARIABLES ****/
    const [colorScheme, setColorScheme] = useGlobal<any>('colorScheme')

    /**** STATE VARIABLES ****/
    const [loaded, setLoaded] = useState<boolean>(false) // True means menu loaded.
    const [selected, setSelected] = useState<string>('') // Determine the current page location.
    const [baseNumber, setBaseNumber] = useState<number>(100) // It's the width (in percentage) of a single element. Used for <hr> element too.
    const [hrMargin, setHrMargin] = useState<number>(0) // Margin used to move the <hr> element on hover
    const [initialHr, setInitialHr] = useState<number>(0) // Margin used to reset the <hr> element position after the hover action
    const [menuWidth, setMenuWidth] = useState<number>(40) // Percentage used for elements width. It's increased on 
    const [mobileDrawer, setMobileDrawer] = useState<boolean>(false) // True will show the mobile menu

    /**** HOOKS ****/
	const location = useLocation()
    const colors = useColors()

    /**** BOOT ****/
    useEffect(() => {
        // Saving current location
        const currentRoute = location.pathname.replace('/', '')
        setSelected(currentRoute)

        // Setting parameters for menu animations
        const maxWidth = 100 / items.length
        setBaseNumber(maxWidth)
        items.map((item: any, index: number) => {
            if(currentRoute == item.key){
                setHrMargin(maxWidth * index)
                setInitialHr(maxWidth * index)
            }
        })

        // Setting width for menu, based on items count
        if(items.length >= 6 && items.length < 8){
            setMenuWidth(50)
        } else if(items.length == 8) {
            setMenuWidth(60)
        } else if(items.length == 9) {
            setMenuWidth(70)
        } else if(items.length >= 10) {
            setMenuWidth(80)
        }

        // Menu is loaded
        setLoaded(true)
    }, [location])

    return(
        loaded
        ?
        <div className='main-menu-wrapper'>
            <img src={colorScheme == 'dark' ? logoDark : logoLight} alt='Logo' className='main-menu-logo'/>
            <div className='main-menu-lg' style={{ width: menuWidth.toString() + '%' }}>
                {
                    items.map((item: any, index: number) => {
                        return(
                            <Link
                                to={item.key}
                                className={'main-menu-button' + (selected == item.key ? ' main-menu-button-highlight' : '')}
                                style={{ width: baseNumber.toString() + '%', display: 'inline-block', textAlign: 'center' }}
                                onMouseEnter={() => setHrMargin(baseNumber * index)}
                                onMouseLeave={() => setHrMargin(initialHr)}
                            >
                                {item.title}
                            </Link>
                        )
                    })
                }
                <hr
                    className='main-menu-hr'
                    style={{
                        width: baseNumber.toString() + '%',
                        marginLeft: hrMargin.toString() + '%'
                    }}
                />
            </div>
            <div className='main-menu-md'>
                <Button
                    className='btn-transparent'
                    onClick={() => setMobileDrawer(true)}
                >
                    <MenuOutlined style={{ fontSize: 22 }}/>
                </Button>
                <Drawer
                    placement='right'
                    width='100%'
                    open={mobileDrawer}
                    onClose={() => setMobileDrawer(false)}
                    headerStyle={{
                        display: 'flex',
                        paddingTop: 19,
                        paddingRight: 25,
                        border: 0,
                        backgroundColor: colors.base
                    }}
                    bodyStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: colors.base
                    }}
                    closeIcon={<CloseOutlined style={{ color: colors.text, fontSize: 22 }}/>}
                >
                    {
                        items.map((item: any, index: number) => {
                            return(
                                <Link
                                    to={item.key}
                                    className={'main-menu-button-mobile' + (selected == item.key ? ' main-menu-button-mobile-highlight' : '')}
                                    onClick={() => setMobileDrawer(false)}
                                >
                                    {item.title}
                                </Link>
                            )
                        })
                    }
                </Drawer>
            </div>
        </div>
        :
        null
    )

}

export default Menu