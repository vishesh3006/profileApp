import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {db} from '../firebase'
import {ProfileList} from '../components/ProfileList'
import {Row, Col, Pagination, Skeleton} from 'antd'
import { UserProfile } from '../components/UserProfile'

export const Home = () => {

    // const dispatch = useDispatch()
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState("");
    const {currentUser} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    useEffect(() => {

        setLoader(true);

        setTimeout(() => {
            if(!currentUser){
                navigate('/login');
                return;
            }
            db.collection('users')
                .orderBy('likeCount', 'desc')
                .onSnapshot((query) => {
                    const items = [];
                    let favourite = [];
                    let status = ""
                    query.forEach((doc) => {
                        if(doc.id == currentUser.uid){
                            console.log(doc.data());
                            setUser(doc.data());
                            status = doc.data().status;
                            favourite = [...doc.data().favourite];
                        }else{
                            items.push(doc.data())
                        }
                    });

                    const usersArray = [];
                    items.map((item) => {
                        if(favourite.indexOf(item.uid) > -1)
                            usersArray.push(item);
                    })
                    items.map((item) => {
                        if(favourite.indexOf(item.uid) < 0)
                            usersArray.push(item)
                    })
                    setUsers(usersArray)
                    if(status == "")
                        navigate("/addProfile")
                })
            setLoader(false);
        }, 2000)

    }, [currentUser])
    
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(6);

    const handleChange = value => {
        if (value <= 1) {
            setMinValue(0);
            setMaxValue(6);
        }else {
            setMinValue((value-1)*6);
            setMaxValue(value*6);
        }
      };

    return (
        <>
            {
                loader ? 
                <div style={{margin: 'auto', maxWidth: '1100px'}}>
                <Row gutter={8} style={{margin: 'auto 0', rowGap: '0'}}>
                    <Col xs={24} lg={12} xl={8} style={{display: 'flex', justifyContent: 'center'}}>
                        <Skeleton avatar paragraph={{ rows: 7 }} style={{marginTop: '60px'}} />
                    </Col>
                    <Col xs={24} lg={12} xl={16}>
                        <Skeleton avatar paragraph={{ rows: 3 }} style={{marginTop: '60px', maxWidth: '600px'}} />
                        <Skeleton avatar paragraph={{ rows: 3 }} style={{marginTop: '20px', maxWidth: '600px'}} />
                        <Skeleton avatar paragraph={{ rows: 3 }} style={{marginTop: '20px', maxWidth: '600px'}} />
                    </Col>
                </Row>

            </div>
                    :   <div style={{margin: 'auto', maxWidth: '1200px'}}>
                    <Row gutter={8} >
                        <Col xs={24} lg={12} xl={8} style={{display: 'flex', justifyContent: 'center'}}>
                            <UserProfile user={user}/>
                        </Col>
                        <Col xs={24} lg={12} xl={16}>
                            {users ? <ProfileList style={{height: '100%', overflowY: 'auto'}} users={users.slice(minValue, maxValue)} curUser={user}/> : <p>No Profiles to Show</p>}
                            <div className='pagination'>
                                <Pagination
                                    defaultCurrent={1}
                                    defaultPageSize={6}
                                    onChange={handleChange}
                                    total={users.length}
                                />
                            </div>
                        </Col>
                    </Row>

                </div>
            }
        </>
        
    )
}
