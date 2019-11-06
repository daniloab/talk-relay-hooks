import { PostList_query } from './__generated__/PostList_query.graphql';

const ITEMS_PER_PAGE = 10;

type Props = {
    query: PostList_query;
} &
    RelayRefetchProp;

const PostList = ({ query, relay }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [qtyPerPage, setQtyPerPage] = useState<number>(ITEMS_PER_PAGE);

    const refetch = () => {
        relay.refetch(
            {itemID: this.props.item.id},  // Our refetchQuery needs to know the `itemID`
            null,  // We can use the refetchVariables as renderVariables
            () => { console.log('Refetch done') },
            {force: true},  // Assuming we've configured a network layer cache, we want to ensure we fetch the latest data.
        );
    }

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

export default createQueryRendererModern(PostListRefetchContainer, PostList, {
    query: graphql`
    query PostListQuery($first: Int) {
      ...PostList_query @arguments(first: $first)
    }
  `,
    queriesParams: () => {
        const defaultVariables = {
            first: ITEMS_PER_PAGE,
        };

        return {
            ...defaultVariables,
        };
    },
});