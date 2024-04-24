'use client';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { PromptCard } from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard 
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
export const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value)
  }

  useEffect(() => {
    async function fetchPrompts() {
      const response = await axios.get('/api/prompt');
      setPrompts(response.data)
    }
    fetchPrompts();
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required 
          className='search_input peer'
          ></input>
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  )
}
