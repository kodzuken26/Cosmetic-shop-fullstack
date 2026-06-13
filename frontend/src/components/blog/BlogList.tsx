import starImg from '/star.png';

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchBlogPosts } from "../../store/slices/blogSlice";
import "./style.scss";

const BlogList = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useTypedSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  if (loading) return <div className="blog-loading">Загрузка статей...</div>;

  return (
    <div className="blog-list">
          <div className="head-block">
              <img src={starImg } /> <h1>Блог</h1> <img src={starImg } />
      </div>
          
          
      <Link to="/skin-test" className="test-button-link">
        Узнать свой тип кожи
      </Link>
      <div className="blog-grid">
        {posts.map((post: any) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
            <h2>{post.title}</h2>
            <p className="blog-author">{post.author}</p>
            <p className="blog-date">
              {new Date(post.created_at).toLocaleDateString("ru-RU")}
            </p>
            <button className="blog-btn">Прочитать</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
