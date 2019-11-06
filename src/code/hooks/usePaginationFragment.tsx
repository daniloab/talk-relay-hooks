import type {FriendsListPaginationQuery} from 'FriendsListPaginationQuery.graphql';
import type {FriendsList_user$key} from 'FriendsList_user.graphql';

const React = require('React');

const {graphql, usePaginationFragment} = require('react-relay/hooks');

type Props = {|
    user: FriendsList_user$key,
    |};

function FriendsList(props: Props) {
    const {
        data,
        loadNext,
        loadPrevious,
        hasNext,
        hasPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refetch, // For refetching connection
    } = usePaginationFragment<FriendsListPaginationQuery, _>(
        graphql`
      fragment FriendsListComponent_user on User
      @refetchable(queryName: "FriendsListPaginationQuery") {
        name
        friends(first: $count, after: $cursor)
        @connection(key: "FriendsList_user_friends") {
          edges {
            node {
              name
              age
            }
          }
        }
      }
    `,
        props.user,
    );

    return (
        <>
            <h1>Friends of {data.name}:</h1>

            <List items={data.friends?.edges.map(edge => edge.node)}>
                {node => {
                    return (
                        <div>
                            {node.name} - {node.age}
                        </div>
                    );
                }}
            </List>
            <Button onClick={() => loadMore(10)}>Load more friends</Button>
        </>
    );
}

module.exports = FriendsList;