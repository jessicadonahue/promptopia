'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Form } from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        async function fetchPost() {
            const response = await axios.get(`/api/prompt/${promptId}`);
            const promptResponse = response.data;
            setPost({
                prompt: promptResponse.prompt,
                tag: promptResponse.tag
            })
        }
        if(promptId) fetchPost();
    }, [promptId])

    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found')

        try {
            await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt,
                tag: post.tag
            });

            router.push('/')
            setSubmitting(false)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Suspense>
            <Form 
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={editPrompt}
            />
        </Suspense>
    )
}

export default EditPrompt