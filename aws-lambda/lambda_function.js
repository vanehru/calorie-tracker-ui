exports.handler = async (event) => {
    // Log the incoming event
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // Process the GitHub webhook event
    if (event.headers && event.headers['X-GitHub-Event']) {
        const githubEvent = event.headers['X-GitHub-Event'];
        console.log(`GitHub Event: ${githubEvent}`);
        
        // Handle different GitHub event types
        switch(githubEvent) {
            case 'workflow_run':
                console.log('GitHub Actions workflow run event received');
                break;
            case 'push':
                console.log('GitHub push event received');
                break;
            default:
                console.log(`Unhandled GitHub event type: ${githubEvent}`);
        }
    }

    // Return a response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'GitHub runner Lambda function executed successfully',
            input: event
        }),
    };
    return response;
};
