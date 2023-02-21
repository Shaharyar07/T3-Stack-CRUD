"use client";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useState } from "react";

const Main = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState({
    title: "",
    content: "",
    userId: "",
  });

  const { data: posts, refetch: refetchPosts } = api.post.getAll.useQuery(
    undefined,
    {
      enabled: session?.user !== undefined,
    }
  );
  const createPost = api.post.create.useMutation({});
  const deletePost = api.post.delete.useMutation({});
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent page refresh
    setPost({ ...post, userId: session?.user?.id });

    console.log(post);
    createPost.mutate(post);
    await refetchPosts();
    setPost({ title: "", content: "", userId: "" });
  };
  const handleDelete = async (id: string) => {
    deletePost.mutate({
      id,
    });
    await refetchPosts();
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 flex h-1/2 w-1/2 flex-col items-center justify-center rounded-lg bg-slate-400 p-5 "
      >
        <label htmlFor="title">Enter the Title</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <label htmlFor="content">Enter the Content</label>
        <input
          type="text"
          name="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />

        <button
          type="submit"
          className="btn mt-5 rounded bg-teal-400 p-2 text-white hover:bg-teal-500"
        >
          Create Post
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
        {posts?.map((post) => (
          <div className="m-5 rounded-lg bg-slate-400 p-5" key={post.id}>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-lg">{post.content}</p>
            <button
              onClick={() => void handleDelete(post.id)}
              className="btn mt-5 rounded bg-teal-400 p-2 text-white hover:bg-teal-500"
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
