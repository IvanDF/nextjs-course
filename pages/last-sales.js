import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  // useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
  const { data, error } = useSWR(
    "https://next-s-course-f67e0-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json()),
  );

  const [sales, setSales] = useState(props.sales);

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // const [sales, setSales] = useState();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     "https://next-s-course-f67e0-default-rtdb.firebaseio.com/sales.json",
  //   ).then((response) => response.json()).then((data) => {
  //
  //     const transformedSales = [];
  //     for (const key in data) {
  //       transformedSales.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume,
  //       });
  //     }
  //     setSales(transformedSales);
  //     setLoading(false);
  //   });
  // }, []);

  if (error) {
    return <p>Failed to load data.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>{sale.username} - ${sale.volume}</li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  return fetch(
    "https://next-s-course-f67e0-default-rtdb.firebaseio.com/sales.json",
  ).then((response) => response.json()).then((data) => {
    const transformedSales = [];
    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    return {
      props: {
        sales: transformedSales,
      },
      revalidate: 10,
    };
  });
};

export default LastSalesPage;
