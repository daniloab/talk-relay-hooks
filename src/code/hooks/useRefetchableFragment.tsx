type Props = {
    post: PostList_post,
};

function PostList(props: Props) {
    const [startTransition] = useTransition();
    const [data, refetch] =
        useRefetchableFragment<PostListRefetchQuery, _>(
        graphql`
      fragment PostList_post on Post
      @refetchable(queryName: "PostListRefetchQuery") {
        id
        name
        image
        descriptiion
      }
    `,
        props.post,
    );

    return (
        <>
            <p>{data.body?.text}</p>
            <Button
                onClick={() => {
                    startTransition(() => {
                        refetch({lang: 'SPANISH'},
                            {fetchPolicy: 'store-or-network'})}
                });
                }>
                Translate Comment
            </Button>
        </>
    );
}

module.exports = PostList;