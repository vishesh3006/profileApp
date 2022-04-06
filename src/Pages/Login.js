import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Button, Space, Row, Col, Spin } from 'antd'
import {GoogleCircleFilled, UserOutlined } from '@ant-design/icons'
import { googleSignInInitiate, anonymousSignInInintiate } from '../Redux/Actions/authAction'

export const Login = () => {

    const [loader, setLoader] = useState(true);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingAnonymous, setLoadingAnonymous] = useState(false);
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {

        setTimeout(() => {
            setLoader(false);
        }, 500)
        console.log(currentUser)
        if(currentUser){
            console.log(currentUser)
            navigate('/');
        }
    }, [currentUser, navigate])

    const googleSignin = (e) => {
        e.preventDefault()
        setLoadingGoogle(true)
        const promise = new Promise(() => {
            dispatch(googleSignInInitiate())
        })
        promise.then(() => {
            setLoadingGoogle(false)
            navigate('/')
        }).catch((err) => {
            console.error(err)
        })
    }

    const anonymousSignin = (e) => {
        e.preventDefault()
        setLoadingAnonymous(true)
        const promise = new Promise(() => {
            dispatch(anonymousSignInInintiate())
        })
        promise.then(() => {
            setLoadingAnonymous(false)
            navigate('/')
        })
        // navigate('/');
    }
  return (
    <div className='login'>{
        loader ? <div><Space size="middle">
                <Spin size="large" />
            </Space></div> :
        <>
            <h1>Login</h1>
            <Row style={{width: '100%'}}>
                <Col span={24}>
                    <Button onClick={googleSignin} type='primary' disabled={loadingGoogle} size='large' icon={loadingGoogle ? null : <GoogleCircleFilled fill='white' />} className='btn google'>
                    { loadingGoogle 
                            ? <Space size="middle">
                                    <Spin size="small" />
                            </Space>
                            : <span>Google Login</span>}
                    </Button>
                </Col>
            </Row>
            <Row style={{width: '100%'}}>
                <Col span={24}>
                    <Button onClick={anonymousSignin} type='primary' disabled={loadingAnonymous} size='large' icon={loadingAnonymous ? null : <UserOutlined fill='white'/>} color='#1a1a1a' className='btn anonymous'>
                        { loadingAnonymous 
                            ? <Space size="middle">
                                    <Spin size="small" />
                            </Space>
                            : <span>Anonymous Login</span>}
                    </Button>
                </Col>
            </Row>
        </>
    }
        
    </div>
  )
}
