import React, { useEffect, useState, useGlobal } from 'reactn'

// Third-party components
import { Row, Col, Form, Input, Button } from 'antd'

// Custom components
import SectionTitle from '../Components/SectionTitle'

// Libraries
import { t } from 'i18next'
import API from '../API'

type PageType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
    meta: any
}

const Contacts = ({
    ID,
    featured,
    postTitle,
    postContent,
    meta
}: PageType) => {

    /**** STATE VARIABLES ****/
    const [name, setName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [content, setContent] = useState<string>('')

    /**** HOOKS ****/
	const [form] = Form.useForm()

	/**** BOOT ****/
	useEffect(() => {
		
	}, [])

    return (
		<div className='container'>
            {/* Header */}
            <Row>
                <Col
                    span={20}
                    offset={2}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <SectionTitle title={t('contatti')}/>
                </Col>
            </Row>

            <Row>
                {/* Image */}
                <Col
                    lg={{
                        span: 10,
                        offset: 1
                    }}
                >
                    <img src={featured} alt={t('contatti')} className="img-fluid contacts-featured"/>
                </Col>
                {/* Form */}
                <Col
                    lg={{
                        span: 10,
                        offset: 1
                    }}
                >
                    <Form
                        layout='vertical'
                        form={form}
                    >
                        {/* Name */}
                        <Form.Item label={<SectionTitle title={t('tuoNome')} type='standard' size='small' bottom={0}/>}>
                            <Input
                                placeholder={t('tuoNome')}
                                onChange={e => setName(e.target.value)}
                                maxLength={100}
                                className='contacts-input'
                            />
                        </Form.Item>
                        {/* Address */}
                        <Form.Item label={<SectionTitle title={t('tuoIndirizzo')} type='standard' size='small' bottom={0}/>}>
                            <Input
                                placeholder={t('tuoIndirizzo')}
                                onChange={e => setAddress(e.target.value)}
                                maxLength={100}
                                className='contacts-input'
                            />
                        </Form.Item>
                        {/* Content */}
                        <Form.Item label={<SectionTitle title={t('messaggio')} type='standard' size='small' bottom={0}/>}>
                            <Input.TextArea
                                placeholder={t('messaggio')}
                                onChange={e => setContent(e.target.value)}
                                maxLength={600}
                                className='contacts-input'
                                autoSize

                            />
                        </Form.Item>

                        {/* Send */}
                        <Form.Item>
                            <Button type='primary' className='contacts-send'>
                                {String(t('invia'))}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
	)

}

export default Contacts