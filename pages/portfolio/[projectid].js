import { useRouter } from "next/router";

export function PortfolioPageProject() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h2>The portfolio project page</h2>
    </div>
  );
}

export default PortfolioPageProject;
