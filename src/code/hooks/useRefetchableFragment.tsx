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
            <p>{data.post.title}</p>
            <div>
                <img src={data.post.image}/>
                <span>{data.post.description}</span>
            </div>
            <Button
                onClick={() => {
                    startTransition(() => {
                        refetch({postId: data.post.id},
                            {fetchPolicy: 'store-or-network'})}
                });
                }>
                Like
            </Button>
        </>
    );
}

module.exports = PostList;