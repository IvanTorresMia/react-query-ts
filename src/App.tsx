import "./App.css";
import { useQuery, useMutation } from "@tanstack/react-query";

type postType = {
  id: string;
  title: string;
};

const POSTS: postType[] = [
  { id: crypto.randomUUID(), title: "Post 1" },
  { id: crypto.randomUUID(), title: "Post 2" },
];

function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: () => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title: "Post 3" })
      );
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;
  return (
    <div className="App">
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
