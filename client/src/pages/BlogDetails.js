
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://blogsphere-api-new.onrender.com";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/blogs`);

        if (!res.ok) {
          throw new Error("Unable to load blogs");
        }

        const blogs = await res.json();

        const selectedBlog = blogs.find(
          (item) => item._id === id
        );

        if (!selectedBlog) {
          throw new Error("Blog not found");
        }

        setBlog(selectedBlog);
      } catch (err) {
        console.error("BLOG DETAILS ERROR:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  
if (loading) {
  return (
    <div className="min-h-screen bg-orange-50/40 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm animate-pulse">

        {/* IMAGE SKELETON */}
        <div className="h-64 w-full bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 sm:h-96" />

        <div className="space-y-6 px-5 py-8 sm:px-10">

          {/* BACK BUTTON */}
          <div className="h-4 w-28 rounded-full bg-orange-100" />

          {/* CATEGORY */}
          <div className="h-7 w-24 rounded-full bg-orange-100" />

          {/* TITLE */}
          <div className="space-y-3">
            <div className="h-9 w-full rounded-lg bg-slate-100" />
            <div className="h-9 w-3/4 rounded-lg bg-slate-100" />
          </div>

          {/* AUTHOR */}
          <div className="h-4 w-48 rounded-full bg-slate-100" />

          <div className="border-t border-slate-100" />

          {/* BLOG CONTENT */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`h-4 rounded-full bg-slate-100 ${
                  index % 3 === 0 ? "w-full" :
                  index % 3 === 1 ? "w-5/6" : "w-4/6"
                }`}
              />
            ))}
          </div>

          {/* COMMENTS */}
          <div className="space-y-3 pt-6">
            <div className="h-6 w-36 rounded-lg bg-orange-100" />
            <div className="h-16 rounded-xl bg-orange-50" />
            <div className="h-16 rounded-xl bg-orange-50" />
          </div>

        </div>
      </div>
    </div>
  );
}


  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-2xl font-semibold text-slate-800">
          {error || "Blog not found"}
        </h2>

        <Link
          to="/home"
          className="rounded-full bg-orange-400 px-5 py-2 text-white hover:bg-orange-500"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const authorName =
    typeof blog.author === "object"
      ? blog.author?.name
      : "User";

  const publishedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-orange-50/40 px-4 py-10 sm:px-6">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-sm">

        {/* COVER IMAGE */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="h-64 w-full object-cover sm:h-96"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="px-5 py-8 sm:px-10 sm:py-10">

          {/* BACK BUTTON */}
          <Link
            to="/home"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
          >
            ← Back to blogs
          </Link>

          {/* CATEGORY */}
          <div className="mb-4">
            <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-600">
              {blog.category || "General"}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl">
            {blog.title}
          </h1>

          {/* AUTHOR AND DATE */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-6 text-sm text-slate-500">
            <span>By {authorName || "User"}</span>

            {publishedDate && (
              <>
                <span>•</span>
                <span>{publishedDate}</span>
              </>
            )}
          </div>

          {/* FULL BLOG CONTENT */}
          <div className="py-8">
            <div className="whitespace-pre-wrap break-words text-base leading-8 text-slate-700">
              {blog.content}
            </div>
          </div>

          {/* LIKE COUNT */}
          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="text-lg text-red-500">❤</span>
              <span>
                {blog.likes?.length || 0} Likes
              </span>
            </div>
          </div>

          {/* COMMENTS */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Comments ({blog.comments?.length || 0})
            </h2>

            {blog.comments?.length > 0 ? (
              <div className="space-y-3">
                {blog.comments.map((comment, index) => (
                  <div
                    key={comment._id || index}
                    className="rounded-xl bg-orange-50/70 p-4"
                  >
                    <p className="text-sm leading-6 text-slate-700">
                      {comment.text}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString("en-IN")
                        : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                No comments yet.
              </p>
            )}
          </div>

        </div>
      </article>
    </div>
  );
}

export default BlogDetails;
