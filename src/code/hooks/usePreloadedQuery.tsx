const AppEnvironment = require('./AppEnvironment'); // user-defined

const query = graphql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      image
      description
    }
  }
`;

// Note: call in an event-handler or similar, not during render
const result = preloadQuery(
    AppEnvironment,
    query,
    {id: '4'},
    {fetchPolicy: 'store-or-network'},
);

function App() {
    const data = usePreloadedQuery<PostQuery>(query, result);

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
