const core = require('@actions/core');
const axios = require('axios');

async function callApi() {
  try {
    // Get inputs from the GitHub workflow
    const apiUrl = core.getInput('api_url');
    const api_key = core.getInput('api_key');
    const changes = core.getInput('changes') || '<none>';  // Default to '<none>'
    const revision = core.getInput('revision');
    const release_stage = core.getInput('release_stage') || 'production';
    const project_id = core.getInput('project_id');

    // Prepare the request payload as JSON
    const payload = {
      api_key: api_key,
      revision: revision,
      release_stage: release_stage,
      changes: changes
    };

    // Make the API call using axios
    const response = await axios.post(`${apiUrl}/${project_id}/deployments`, payload);

    // Log the successful response
    console.log('Deployment successful:', response.data);

    // Set the output for the GitHub Action
    core.setOutput('response', response.data);

  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error during deployment:', error.response ? error.response.data : error.message);

    // Set the action to failed status
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

callApi();
