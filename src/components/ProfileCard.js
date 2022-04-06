import React, {useEffect} from 'react'
import { Card, Divider } from 'antd';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { HeartFilled, HeartOutlined, DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import {db} from '../firebase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const ProfileCard = ({user, curUser}) => {

    const {currentUser} = useSelector((state) => state.auth); 
    // const {uid} = currentUser;
    // const [likeClicked, setlikeClicked] = useState(false)
    // const [dislikeClicked, setdislikeClicked] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if(!curUser || !currentUser){
            navigate('/')
        }
    }, [])
    const { Meta } = Card;
    let {name, likeCount, image, status, dislikeCount, likeArray, dislikeArray, favourite} = user;
    dayjs.extend(relativeTime)
    // console.log(curUser);
    const likeHandle = () => {
        let index = curUser.likeArray.indexOf(user.uid);
        if(index > -1){
            curUser.likeArray.splice(index, 1);
            likeCount--;
        }else{
            curUser.likeArray.push(user.uid);
            likeCount++;
            index = curUser.dislikeArray.indexOf(user.uid);
            if(index > -1){
                dislikeCount--;
                curUser.dislikeArray.splice(index, 1)
            }
        }

        db.collection('users')
            .doc(curUser.uid)
            .set({
                ...curUser,
                likeArray: curUser.likeArray,
                dislikeArray: curUser.dislikeArray
            })
        
        db.collection('users')
            .doc(user.uid)
            .set({
                ...user,
                likeCount: likeCount,
                dislikeCount: dislikeCount
            })
        
    }

    const dislikeHandle = () => {
        console.log(curUser);
        let index = curUser.dislikeArray.indexOf(user.uid);
        if(index > -1){
            curUser.dislikeArray.splice(index, 1);
            dislikeCount--;
        }else{
            curUser.dislikeArray.push(user.uid);
            dislikeCount++;
            index = curUser.likeArray.indexOf(user.uid);
            if(index > -1){
                likeCount--;
                curUser.likeArray.splice(index, 1)
            }
        }
        db.collection('users')
            .doc(curUser.uid)
            .set({
                ...curUser,
                likeArray: curUser.likeArray,
                dislikeArray: curUser.dislikeArray
            })
        
        db.collection('users')
            .doc(user.uid)
            .set({
                ...user,
                likeCount: likeCount,
                dislikeCount: dislikeCount
            })
    }

    const heartHandle = () => {
        let index = curUser.favourite.indexOf(user.uid);
        if(index > -1){
            curUser.favourite.splice(index, 1);
            
        }else{
            curUser.favourite.push(user.uid);
        }
        db.collection('users')
                .doc(curUser.uid)
                .set({
                    ...curUser,
                    favourite: curUser.favourite
                })
    }
    return (
        <Card
            className='profileCard'
            style={{ display: 'flex', position: 'relative' }}
            headStyle={{color: 'red'}}
            cover={
                <div>
                    <img
                        alt={name}
                        src={image}
                    />
                </div>
            }
        >   
            <Meta
                style={{width: 'fit-content'}}
                title={name}
                description={[
                    <>
                        <p className='timestamp'>{dayjs(new Date(user.timestamp)).fromNow()}</p>
                        <p className='status'>{status}</p> 
                        <div className='profileButtons' style={{display:'flex', flexDirection:'row', width:'150px', justifyContent:'space-between'}}>
                            <>
                                {curUser.likeArray.indexOf(user.uid) > -1 ?
                                   <span>  <LikeFilled key='like' onClick={likeHandle} style={{color:'#1890ff'}}/> {likeCount} </span>
                                :  <span>  <LikeOutlined key='like' onClick={likeHandle} /> {likeCount} </span>
                            }
                                
                            </>
                            <Divider type="vertical" style={{ height: "25px" }} />
                            <>
                                {curUser.dislikeArray.indexOf(user.uid) > -1 ?
                                   <span>  <DislikeFilled key='dislike' onClick={dislikeHandle} style={{color:'#1890ff'}}/> {dislikeCount} </span>
                                :  <span>  <DislikeOutlined key='dislike' onClick={dislikeHandle} /> {dislikeCount} </span>
                            }
                                
                            </>
                            <Divider type="vertical" style={{ height: "25px" }} />
                            <>
                                {curUser.favourite.indexOf(user.uid) > -1 ?
                                   <span className='heart'><HeartFilled key='favourite' onClick={heartHandle} style={{color:'red'}}/></span>
                                :  <span className='heart'><HeartOutlined key='favourite' onClick={heartHandle} /></span>
                            }
                                
                            </>
                        </div>
                    </>
                    
                ]}
            />
        </Card>
    )
}

