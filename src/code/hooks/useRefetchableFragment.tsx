import PostListRefetchQuery from 'PostListRefetchQuery.graphql';
import PostList_comment$key from 'PostList_comment.graphql';

const React = require('React');
const {useTransition} = require('React');

// RN or WWW:
const {graphql, useRefetchableFragment} = require('react-relay/hooks');


type Props = {|
    comment: PostList_comment$key,
    |};

function PostList(props: Props) {
    const [startTransition] = useTransition();
    const [data, refetch] = useRefetchableFragment<PostListRefetchQuery, _>(
        graphql`
      fragment PostList_comment on Comment
      @refetchable(queryName: "PostListRefetchQuery") {
        body(lang: $lang) {
          text
        }
      }
    `,
        props.comment,
    );

    return (
        <>
            <p>{data.body?.text}</p>
            <Button
                onClick={() => {
                    startTransition(() => {
                        refetch({lang: 'SPANISH'}, {fetchPolicy: 'store-or-network'})}
                });
                }>
                Translate Comment
            </Button>
        </>
    );
}

module.exports = PostList;