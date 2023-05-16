import fs from "fs/promises";
import Link from "next/link";
import path from "path";

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

// all code inside getStaticProps runs on build time (server side - node js) and not on the client side
export const getStaticProps = async () => {
  console.log("(Re)Rendering...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // it needs for production everi n second revalidate page like dev when you save the file
  };
};

export default HomePage;
