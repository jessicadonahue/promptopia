'use client';
import React from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function fetchPosts() {
            console.log(session)
            const response = await axios.get(`/api/users/${session.user.id}/posts`);
            setPosts(response.data);
        }
        if(session?.user.id) fetchPosts();
    }, [session])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if(hasConfirmed) {
            try {
                await axios.delete(`/api/prompt/${post._id}`);
                const myPosts = posts.filter((p) => p._id !== post._id);
                setPosts(myPosts);
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <Profile 
            name="My"
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile