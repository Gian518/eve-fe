import React, { useEffect, useState, useGlobal } from 'reactn'

// Third-party components
import { Col, Row } from 'antd'

// Custom components
import Featured from '../Components/Featured'
import SectionTitle from '../Components/SectionTitle'

// Libraries
import { useTranslation } from 'react-i18next'
import API from '../API'
import env from '../Config/env'
import useDimensions from '../Config/Dimensions'

type HomeType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
    meta: any
}

const Home = ({
    ID,
    featured,
    postTitle,
    postContent,
    meta
}: HomeType) => {

    /**** STATE VARIABLES ****/
	const [videoID, setVideoID] = useState<string|null>(null)

    /**** HOOKS ****/
    const { t } = useTranslation()
    const dimensions = useDimensions()

	/**** BOOT ****/
	useEffect(() => {
		if(meta.home_video && meta.home_video != ''){
            const video = meta.home_video.split('?')[1].substr(2)
            setVideoID(video)
        }
	}, [])

    return (
		<div style={{ paddingBottom: 100 }}>
            {/* Featured image */}
            <Featured url={featured} text={meta.home_image_title}/>

            {/* Bio */}
            <Row className='mt-fluid'>
                <Col
                    xs={{ span: 20, offset: 2, order: 1 }}
                    lg={{ span: 8, offset: 4, order: 0 }}
                    style={{ alignItems: 'center', marginTop: dimensions.width < 992 ? 20 : 0 }}
                >
                    <div className='img-frame'>
                        <img className='img-fluid' src={meta.home_bio.home_bio_photo} alt='Immagine bio'/>
                    </div>
                </Col>
                <Col
                    xs={{ span: 20, offset: 2, order: 0 }}
                    lg={{ span: 8, offset: 1, order: 1 }}
                >
                    <SectionTitle title={t('biografia')}/>
                    <p dangerouslySetInnerHTML={{ __html: meta.home_bio.home_bio_text }}/>
                </Col>
            </Row>

            {/* Quote */}
            {
                meta.home_quote && meta.home_quote.home_quote_title
                ?
                <Row className='mt-fluid'>
                    <Col
                        span={20}
                        offset={2}
                    >
                        <h1 className='home-quote-title'>{meta.home_quote.home_quote_title}</h1>
                        {
                            meta.home_quote.home_quote_subtitle
                            ?
                            <h1 className="home-quote-subtitle">{meta.home_quote.home_quote_subtitle}</h1>
                            :
                            null
                        }
                    </Col>
                </Row>
                :
                null
            }

            {/* Video */}
            {
                videoID
                ?
                <Row className='mt-fluid'>
                    <Col
                        span={20}
                        offset={2}
                    >
                        <iframe
                            width="100%"
                            height={dimensions.width >= 992 ? "600" : "250"}
                            src={"https://www.youtube.com/embed/" + videoID}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >    
                        </iframe>
                    </Col>
                </Row>
                :
                null
            }
		</div>
	)

}

export default Home