import React, { useContext, useState } from 'react';
import AnimationWrapper from '../common/page-animation';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { removeFromSession } from '../common/session';

const UserNavigationPanel = () => {
    const { userAuth, setUserAuth } = useContext(UserContext);
    const { user_id,user_name,state } = userAuth;
    const Navgator= useNavigate()

    // Function to sign out the user
    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null, user_name: null }); // Reset userAuth state
        Navgator('/');
        // navgate("/hotelsdata"); 
     
    };

    return (
        <AnimationWrapper
            className="absolute right-0 z-50"
            transition={{ duration: 0.2 }}
        >
            <div className="bg-white absolute right-0 border-0 border-grey w-60 duration-200">
                <Link to="/editor" className='flex gap-2 link md:hidden pl-8 py-4'>
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>

                <Link to={`/user/${user_id}`} className='link pl-8 py-4'>
                    Profile
                </Link>

                {
                    state === "admin" ? (
                        <Link to="/admin/home-admin" className='link pl-8 py-4'>
                        Dashboard
                        </Link>
                    ) : state === "manager" ? (
                        <Link to="/dashboard/homemanager-user" className='link pl-8 py-4'>
                        Dashboard
                        </Link>
                    ) : state === "user" ? (
                        <Link to="/dashboard/homemanager-user" className='link pl-8 py-4'>
                        Dashboard
                        </Link>
                    ): null
                 }
                
                  

                {
                    state === "admin" ? (
                        <Link to="/admin/edit-profile" className='link pl-8 py-4'>
                        Setting
                        </Link>
                    ) : state === "manager" ? (
                        <Link to="/settings/edit-profile" className='link pl-8 py-4'>
                        Setting
                        </Link>
                    ) : state === "user" ? (
                        <Link to="/settings/edit-profile" className='link pl-8 py-4'>
                        Setting
                        </Link>
                    ): null
                 }

                {/* <Link to="/settings/edit-profile" className='link pl-8 py-4'>
                    Setting
                </Link> */}

                <span className='absolute border-t border-grey w-[100%]'></span>

                <button
                    className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
                    onClick={signOutUser}
                >
                    <h1 className='font-bold text-xl mg-1'>
                        Sign Out
                    </h1>
                    <p>@{user_name}</p>
                </button>
            </div>
        </AnimationWrapper>
    );
};

export default UserNavigationPanel;
