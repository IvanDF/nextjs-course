const userProfilePage = (props) => {
  return <h1>{props.userName}</h1>;
};

export default userProfilePage;

// Only execute on the server
export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Luca",
    },
  };
};
