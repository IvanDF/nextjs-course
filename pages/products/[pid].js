import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  // If we are using fallback on getStaticPaths we need to wait for the content

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  // Here we are saying to next to pre generate pages with specific pids usign fallback: falsy
  // return {
  //   paths: [
  //     {
  //       params: {
  //         pid: "p1",
  //       },
  //       params: {
  //         pid: "p2",
  //       },
  //       params: {
  //         pid: "p3",
  //       },
  //     },
  //   ],
  //   fallback: false,
  // };
  //

  // instead if we use fallbak: true we can say to next what page has to be pre renderend (maybe the most visited) but with truly value next know that can exists other pages to show and not use "not found as default"
  // eg
  // retiurn {
  //  paths: [
  //    params: {
  //      pid: "pid: "p1","
  //    }
  //  ],
  //  fallback: true // fallback as true not block when page doesent exist
  // }

  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } })); // create an object directly

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export default ProductDetailPage;
