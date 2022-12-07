import React, { useState, useGlobal } from 'reactn'

// Third-party components
import { Row, Col, Form, Input, Button, Result } from 'antd'
import { MailOutlined, UserOutlined } from '@ant-design/icons'

// Custom components
import SectionTitle from '../Components/SectionTitle'

// Libraries
import { t } from 'i18next'
import API from '../API'
import useDimensions from '../Config/Dimensions'
import SocialIterator from '../Components/SocialIterator'


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

    /**** GLOBAL STATES ****/
    const [authorName, setAuthorName] = useGlobal<any>('authorName')
    const [authorMail, setAuthorMail] = useGlobal<any>('authorMail')
    const [social, setSocial] = useGlobal<any>('social')

    /**** STATE VARIABLES ****/
    const [name, setName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false)
    const [status, setStatus] = useState<'typing'|'success'|'error'>('typing')

    /**** HOOKS ****/
	const [form] = Form.useForm()
    const dimensions = useDimensions()

    /**
     * [API] Send a message to the admin
     */
    const sendMessage = async () => {
        try {
            const res = await API.General.sendMail({
                name,
                address,
                content
            })
            if(res == true){
                setStatus('success')
            } else {
                throw res
            }
        } catch (error) {
            console.log("Error in Contacts.sendMessage:", error)
            setStatus('error')
        }
    }

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

            <Row style={{ marginTop: 40 }}>
                {/* Image */}
                <Col
                    lg={{
                        span: 10,
                        offset: 1,
                        order: 0
                    }}
                    xs={{
                        span: 20,
                        offset: 2,
                        order: 1
                    }}
                >
                    <div className="img-frame">
                        <img src={featured} alt={t('contatti')} className="img-fluid"/>
                    </div>
                </Col>
                {/* Form */}
                <Col
                    lg={{
                        span: 10,
                        offset: 1,
                        order: 1
                    }}
                    xs={{
                        span: 20,
                        offset: 2,
                        order: 0
                    }}
                    style={{ marginBottom: dimensions.width < 992 ? 30 : 0 }}
                >
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        {
                            // Showing the contact form
                            status == 'typing'
                            ?
                                <Form
                                    layout='vertical'
                                    form={form}
                                    onFinish={sendMessage}
                                    requiredMark={false}
                                >
                                    {/* Name */}
                                    <Form.Item
                                        label={<SectionTitle title={t('tuoNome')} type='standard' size='small' bottom={0}/>}
                                        name='name'
                                        rules={[
                                            { required: true, message: t('nomeObbligatorio') }
                                        ]}
                                    >
                                        <Input
                                            placeholder={t('tuoNome')}
                                            onChange={e => setName(e.target.value)}
                                            maxLength={100}
                                            className='contacts-input'
                                        />
                                    </Form.Item>
                                    {/* Address */}
                                    <Form.Item
                                        label={<SectionTitle title={t('tuoIndirizzo')} type='standard' size='small' bottom={0}/>}
                                        name='address'
                                        rules={[
                                            { required: true, message: t('mailObbligatoria') },
                                            {
                                                pattern: /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
                                                message: t('mailValida')
                                            }
                                        ]}
                                    >
                                        <Input
                                            placeholder={t('tuoIndirizzo')}
                                            onChange={e => setAddress(e.target.value)}
                                            maxLength={100}
                                            className='contacts-input'
                                        />
                                    </Form.Item>
                                    {/* Content */}
                                    <Form.Item
                                        label={<SectionTitle title={t('messaggio')} type='standard' size='small' bottom={0}/>}
                                        name='content'
                                        rules={[
                                            { required: true, message: t('messObbligatorio') }
                                        ]}
                                    >
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
                                        <Button
                                            type='primary'
                                            className='contacts-send'
                                            htmlType='submit'
                                            disabled={submitDisabled}
                                        >
                                            {String(t('invia'))}
                                        </Button>
                                    </Form.Item>
                                </Form>

                            // Success state
                            : status == 'success' ?
                            <div className='contacts-result'>
                                <Result
                                    status='success'
                                    title={String(t('grazie'))}
                                    subTitle={String(t('messInviato'))}
                                />
                            </div>

                            // Error status
                            : status == 'error' ?
                            <div className='contacts-result'>
                                <Result
                                    status='error'
                                    title={String(t('errore'))}
                                    subTitle={String(t('messErrore'))}
                                />
                            </div>
                            : null
                        }

                        {/* Info */}
                        <div style={{ marginTop: 20 }}>
                            <UserOutlined style={{ marginRight: 3 }}/> {authorName}<br/>
                            <MailOutlined style={{ marginRight: 3 }}/> <a href={"mailto:" + authorMail}>{authorMail}</a><br/>
                            <SectionTitle title={t('seguiSocial')} type='standard' size='small' style={{ marginTop: 20 }} bottom={10}/>
                            <SocialIterator size='3x'/>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
	)

}

export default Contacts