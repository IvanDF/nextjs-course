import { useRouter } from "next/router";

export function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router.query)

  return (
    <div>
      <h2>The single project of a single client</h2>
    </div>
  );
}

export default SelectedClientProjectPage;
