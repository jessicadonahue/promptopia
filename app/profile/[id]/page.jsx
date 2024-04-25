'use client';
import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useParams } from 'next/navigation';
import Profile from '@components/Profile';
import axios from 'axios';

const GetProfile = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get(`/api/users/${params.id}/posts`);
            setPosts(response.data);
        }
        if(params.id) fetchPosts();
    }, []);

    return (
        <Profile 
            name={`${name}'s`}
            desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts!`}
            data={posts}
        />
    ) 
}

const ProfilePage = () => {
    return (
        <Suspense>
            <GetProfile />
        </Suspense>
    )
}

export default ProfilePage