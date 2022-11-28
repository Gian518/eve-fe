import React, { useEffect, useState, useGlobal } from 'reactn'

// Third-party components
import { Col, Row } from 'antd'

// Custom components
import SectionTitle from '../Components/SectionTitle'

// Libraries
import API from '../API'
import { t } from 'i18next'

type BiographyType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
    meta: any
}

const Biography = ({
    ID,
    featured,
    postTitle,
    postContent,
    meta
}: BiographyType) => {

    return (
		<div style={{ marginBottom: 100 }}>
            <Row>
                <Col
                    span={20}
                    offset={2}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <SectionTitle title={t('biografia')}/>
                </Col>
            </Row>
			<Row>
                <Col
                    span={20}
                    offset={2}
                >
                    <span>
                        <img src={featured} alt={postTitle} className='bio-pic'/>
                        <p dangerouslySetInnerHTML={{ __html: postContent }}/>
                    </span>
                </Col>
            </Row>
		</div>
	)

}

export default Biography