import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchBlogPostBySlug } from "../../store/slices/blogSlice";
import type { BlogBlock } from "../../types/blog";
import "./style.scss";

const BlogPost = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { currentPost, loading } = useTypedSelector((state) => state.blog);

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogPostBySlug(slug));
    }
  }, [slug]);

  if (loading) return <div className="blog-loading">Загрузка статьи...</div>;
  if (!currentPost)
    return <div className="blog-not-found">Статья не найдена</div>;

  return (
    <div className="blog-post-detail">
      <Link to="/blog" className="back-link">
        ← Назад к списку
      </Link>

      <h1>{currentPost.title}</h1>
      <p className="meta">
        Автор: {currentPost.author} |{" "}
        {new Date(currentPost.created_at).toLocaleDateString("ru-RU")}
      </p>

      <div className="blog-content">
        {currentPost.blocks.map((block: BlogBlock) => {
          if (block.block_type === "text") {
            return (
              <p key={block.id} className="blog-text">
                {block.text_content}
              </p>
            );
          }

          if (block.block_type === "quote") {
            return (
              <blockquote key={block.id} className="blog-quote">
                {block.text_content}
              </blockquote>
            );
          }

          if (block.block_type === "image") {
            return (
              <figure key={block.id} className="blog-image-figure">
                <img
                  src={block.image}
                  alt={block.image_alt || currentPost.title}
                  className="blog-image"
                />
                {block.image_alt && (
                  <figcaption className="blog-image-caption">
                    {block.image_alt}
                  </figcaption>
                )}
              </figure>
            );
          }

          if (block.block_type === "video" && block.video_url) {
            return (
              <div key={block.id} className="blog-video-wrapper">
                <div className="blog-video-container">
                  <iframe
                    src={block.video_url.replace("watch?v=", "embed/")}
                    title="video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default BlogPost;
