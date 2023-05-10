import { useRouter } from "next/router";

export function BlogPostsPage() {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h2>The blog posts</h2>
    </div>
  );
}

export default BlogPostsPage;
