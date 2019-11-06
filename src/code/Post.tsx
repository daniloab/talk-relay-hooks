type Props = {
    post: Post_post,
};

const Post = ({post}: Props) => {
    return (
        <div>
            <p>{post.title}</p>
            <div>
                <img src={post.image}/>
                <span>{post.description}</span>
            </div>
        </div>
    );
};

export default createFragmentContainer(Post, {
    post: graphql`
    fragment Post_post on Post {
      id
      title
      image
      description
    }
  `,
});