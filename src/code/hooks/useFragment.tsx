import Post_post from 'Post_post.graphql';

const React = require('React');

const {graphql, useFragment} = require('react-relay/hooks');

type Props = {
    post: Post_post,
};

function Post(props: Props) {
    const data = useFragment(
        graphql`
      fragment Post_post on Post {
        id
        title
        image
        description
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
        </>
    );
}