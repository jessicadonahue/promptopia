'use client';
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PromptCard } from '@components/PromptCard';

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          prompt={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile