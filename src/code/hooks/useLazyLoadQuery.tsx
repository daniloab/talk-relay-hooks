function App() {
    const data = useLazyLoadQuery<PostQuery>(
        graphql`
      query PostQuery($id: ID!) {
        post(id: $id) {
          id
          title
          image
          description
        }
      }
    `,
        {id: 4},
        {fetchPolicy: 'store-or-network'},
    );

    return (
        <>
            <p>{data.post.title}</p>
            <div>
                <img src={data.post.image}/>
                <span>{data.post.description}</span>
            </div>
        </>
    );
}