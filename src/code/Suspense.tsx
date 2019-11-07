// Show a spinner while the post list is loading
<ErrorBoundary>
    <Suspense fallback={<Spinner />}>
        <PostList />
    </Suspense>
</ErrorBoundary>