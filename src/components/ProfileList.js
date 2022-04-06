import React, {useState} from 'react'
import {ProfileCard} from './ProfileCard'
export const ProfileList = ({users, curUser}) => {

    console.log(users)

    return (
        <div style={{marginTop: '60px'}}>
            {
               users && users.length>0 && users.map(user => <ProfileCard key={user.uid} curUser={curUser} user={user}/>)
            }

        </div>
    )
}
