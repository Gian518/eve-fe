import React, { useGlobal } from 'reactn'

// Third-party components
import { Row, Col } from 'antd'

// Libraries
import SocialIterator from './SocialIterator'

const Footer = () => {

    /**** GLOBAL STATE ****/
    const [authorName, setAuthorName] = useGlobal<any>('authorName')
    const [authorMail, setAuthorMail] = useGlobal<any>('authorMail')

    return(
        <Row className='footer-container' style={{ marginTop: 50 }}>
            <Col
                className='footer-content'
                span={20}
                offset={2}
            >
                {authorName} - <a href={'mailto:' + authorMail} className="footer-mail">{authorMail}</a>
                <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
                <SocialIterator/>
            </Col>
        </Row>
    )
}

export default Footer