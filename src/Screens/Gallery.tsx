import React, { useEffect, useState, useGlobal } from 'reactn'

// Third-party components
import { Row, Col, Image } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'

// Custom components
import SectionTitle from '../Components/SectionTitle'

// Libraries
import { t } from 'i18next'
import API from '../API'
import useDimensions from '../Config/Dimensions'

type PageType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
    meta: any
}

const Gallery = ({
    ID,
    featured,
    postTitle,
    postContent,
    meta
}: PageType) => {

    /**** STATE VARIABLES ****/
	const [images, setImages] = useState<Array<any>|null>(null)
    const [videos, setVideos] = useState<Array<any>|null>(null)

    /**** HOOKS ****/
    const dimensions = useDimensions()

	/**** BOOT ****/
	useEffect(() => {
        // Setting images
		const srcs = postContent.match(/<img [^>]*src="[^"]*"[^>]*>/gm)
        if(srcs){
            const imgs = srcs.map(x => x.replace(/.*src="([^"]*)".*/, '$1'))
            setImages(imgs)
        }

        // Setting videos
        if(meta.gallery_yt_video && meta.gallery_yt_video != ''){
            const yts = meta.gallery_yt_video.split('\n').map((item: string) => item.replace('\r', '').split('?')[1].substring(2))
            console.log('Videos:', yts)
            setVideos(yts)
        }
	}, [])

    return (
        <>
        {
            images
            ?
            <>
                <Row>
                    <Col
                        span={20}
                        offset={2}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <SectionTitle title={t('immagini')}/>
                    </Col>
                </Row>
                <Image.PreviewGroup>
                    {
                        images?.map(item => {
                            return(
                                <Image
                                    width={dimensions.width > 992 ? '25%' : dimensions.width > 576 ? '50%' : '100%'}
                                    height={400}
                                    src={item}
                                    alt='Gallery image'
                                    key={item}
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                    preview={{
                                        mask: <div><FullscreenOutlined style={{ fontSize: 30 }}/></div>
                                    }}
                                />
                            )
                        })
                    }
                </Image.PreviewGroup>
            </>
            :
            null
        }
        {
            videos
            ?
            <>
                <Row className='mt-fluid'>
                    <Col
                        span={20}
                        offset={2}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <SectionTitle title={t('video')}/>
                    </Col>
                </Row>
                <Row className='container' justify='center'>
                    {
                        videos?.map((item, index) => {
                            return(
                                <Col
                                    lg={{
                                        span: 10
                                    }}
                                    xs={{
                                        span: 20
                                    }}
                                    style={{
                                        padding: 20
                                    }}
                                >
                                    <iframe
                                        width="100%"
                                        height={dimensions.width >= 992 ? "320" : "250"}
                                        src={"https://www.youtube.com/embed/" + item}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    >    
                                    </iframe>
                                </Col>
                            )
                        })
                    }
                </Row>
            </>
            :
            null
        }
        </>
    )
}

export default Gallery