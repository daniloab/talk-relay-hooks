// Show a spinner while the post list is loading
<Suspense fallback={<Spinner />}>
    <PostList />
</Suspense>