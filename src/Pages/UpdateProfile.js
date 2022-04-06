import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {db} from '../firebase'
import {toast} from 'react-toastify'
import {Form, Input, Button, Space, Spin } from 'antd'


export const UpdateProfile = () => {

    const navigate = useNavigate()

    const {currentUser} = useSelector((state) => state.auth);
    const [loader, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const [state, setState] = useState({
        name: "",
        status: "",
    })

    useEffect(() => {
        console.log(currentUser)
        if(!currentUser){
            navigate('/login');
            return;
        }
        const getUser = async() => {
            await db.collection('users')
                .where('uid', '==', currentUser.uid)
                .get()
                .then((res) => {
                    const user = res.docs.map(obj => ({...obj.data(), id: obj.id}))[0]
                    setUser(user);
                    setState({
                        name: user.name,
                        status: user.status,
                    })
                })
                .then(() => setLoading(false))
                .catch((err) => console.error(err))
        }
        setInterval(() => {
            getUser();
        }, 1000)
    }, [currentUser])


    const {name, status} = state

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

    const onFinish = async (values) => {
        console.log(values);
        await db.collection('users')
                .doc(currentUser.uid)
                .set({
                    ...user,
                    name: values.name,
                    status: values.status
                }).then(() => {
                    toast.success("Profile Updated")
                }).then(() => {
                    setTimeout(() => {navigate('/')}, 1300)
                })
    }
    return ( 
        <>
            {loader ? 
                <div style={{paddingTop: '200px', textAlign: 'center', justifyContent:'center'}}>
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </div>
                : <div style={{paddingTop: '100px'}}>
                <Form
                    {...formItemLayout}
                    style={{width: '50%'}}
                    name='updateProfile'
                    onFinish={onFinish}
                    initialValues={{
                        name: name,
                        status: status
                    }}
                >
                    <Form.Item name='name' label='Display Name' tooltip='What do you want others to call you?'
                        rules={[{required: true, message:'Please input your name!', whitespace: true}]}
                    >
                        <Input/>
                    </Form.Item>
    
                    {/* <Form.Item name='email' label='E-mail' tooltip='Pls input your email'
                        rules={[{type: 'email', message: 'Input a valid E-mail!'},{required: true, message:'Please input your email!'}]}
                    >
                        <Input/>
                    </Form.Item> */}
                    <Form.Item name='status' label='Status' tooltip='What do you want your status to show?'
                        rules={[{required: true, message:'Please input your status!'}]}
                    >
                        <Input.TextArea showCount maxLength={100}/>
                    </Form.Item>
                    <Form.Item 
                        {...tailFormItemLayout}
                    >
                        <Button type='primary' htmlType='submit'>Update Profile</Button>
                    </Form.Item>
                </Form>
            </div>    
        }
        </>
    )
}
