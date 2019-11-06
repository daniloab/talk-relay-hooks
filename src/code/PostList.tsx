type Props = {
    query: PostList_query;
} &
    RelayRefetchProp;

const PostList = ({ query, relay }: Props) => {
    const { posts } = query;

    return (
        <Content>
            {posts.map((post, i) => (
                <Post key={i} post={post} />
            ))}
        </Content>
    );
};

const PostListRefetchContainer = createRefetchContainer(
    PostList,
    {
        query: graphql`
      fragment PostList_query on Query
        @argumentDefinitions(
          first: { type: Int }
        ) {
        posts(first: $first)
          @connection(key: "PostList_polls", filters: []) {
          endCursorOffset
          startCursorOffset
          count
          edges {
            node {
              ...Post_post
            }
          }
        }
      }
    `,
    },
    graphql`
    query PostListRefetchQuery($first: Int) {
      ...PostList_query @arguments(first: $first)
    }
  `,
);

export default createQueryRendererModern(
    PostListRefetchContainer,
    PostList, {
    query: graphql`
    query PostListQuery($first: Int) {
      ...PostList_query @arguments(first: $first)
    }
  `,
    queriesParams: () => {
        const defaultVariables = {
            first: 10,
        };

        return {
            ...defaultVariables,
        };
    },
});