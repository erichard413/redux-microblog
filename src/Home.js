import React from 'react';
import BlogPreview from './BlogPreview';
import './css/Home.css';
import {useSelector} from 'react-redux';


const Home = () => {
    const titles = useSelector(state=> state.titles);
    let titlesArr = []
    Object.keys(titles).map(key=> titlesArr.push(titles[key]));
    let sorted;
    sorted = titlesArr.sort((t1, t2) => (t1.votes < t2.votes) ? 1 : (t1.votes > t2.votes) ? -1 : 0);
   
    return (
        <div className="Home">
            <h2>
                Welcome to MicroBlog, where the blogs are fake and the stories don't matter.
            </h2>
            <div className="Home-blogscontainer">
                {titles && sorted.map(t=> <BlogPreview key={t.id} id={t.id} title={t.title} votes={t.votes} description={t.description} />)}

            </div>   
        </div>
        
    )
}

export default Home;