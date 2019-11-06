const React = require('React');

const {useRelayEnvironment} = require('react-relay/hooks');

function MyComponent() {
    const environment = useRelayEnvironment();

    const handler = useCallback(() => {
        // For example, can be used to pass the environment to functions
        // that require a Relay environment.
        commitMutation(environment, ...);
    }, [environment])

    return (...);
}

module.exports = Root;