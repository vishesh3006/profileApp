import { Card, Avatar } from 'antd';
import { EditOutlined, LikeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


const { Meta } = Card;
dayjs.extend(relativeTime)

export const UserProfile = ({user}) => {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/updateProfile')
    }
    return (
        <div className='userDiv'>
            <Card
                style={{ minWidth: '300px', width: 'fit-content' }}
                className='userProfile'
                cover={
                <div>
                    <img
                        alt={user.name}
                        src={user.image}
                    />
                </div>
                }
                actions={[
                    <div>
                        <LikeOutlined key='like' disabled={true} style={{color: '#1890ff'}}/>
                        <span style={{color: '#1890ff'}}> {user.likeCount} Likes</span>
                    </div>,
                    <div onClick={onClickHandler}>
                        <EditOutlined key="edit"/>
                        <span> Edit</span>
                    </div>,
                ]}
            >
                <Meta
                    title= {user.name}
                    description={[
                    <>
                        <p className='timestamp' key='timestamp'>{dayjs(new Date(user.timestamp)).fromNow()}</p>
                        <p className='status' key='status'>{user.status}</p> 
                    </>
                    
                ]}
                />
            </Card>
        </div>
    )
}
