
import './css/App.css';
import React, {useEffect} from 'react';
import Header from './Header';
import {Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import BlogForm from './BlogForm';
import BlogSite from './BlogSite';
import Blog from './Blog';
import {fetchBlogTitles} from './actionCreators';
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const post = useSelector(state=> state.posts);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchBlogTitles())
  }, [dispatch, post]);


  return (
    <div className="App">
        <Header />
        <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/new" element={<BlogForm />} />
            <Route exact path="/blog" element={<BlogSite />} />
            <Route exact path="/:id" element={<Blog />} />
            <Route path="*" element={<Navigate to="/home" replace />}/>
            <Route path="/" element={<Navigate to="/home" replace/>}/>
        </Routes>
    </div>
  );
}

export default App;
