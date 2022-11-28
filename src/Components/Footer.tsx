import React from 'reactn'

// Third-party components
import { Row, Col } from 'antd'

// Libraries
import env from '../Config/env'

const Footer = () => {

    return(
        <Row className='footer-container' style={{ marginTop: 50 }}>
            <Col
                className='footer-content'
                span={20}
                offset={2}
            >
                {env.authorName} - <a href={'mailto:' + env.authorMail} className="footer-mail">{env.authorMail}</a>
            </Col>
        </Row>
    )
}

export default Footer