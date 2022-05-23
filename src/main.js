const core = require('@actions/core');
const github = require('@actions/github');

function main(input = [], validLabels = []) {

    let output = {
        matched_array: [],
        matched: '',
        matched_count: 0,
    }
    const intersection = input.filter(element => validLabels.includes(element));
    if (intersection.length > 0) {
        output.matched_array = intersection;
        output.matched = intersection.join(',');
        output.matched_count = intersection.length;
    }

    core.info(`Intersection: ${output.matched}`);

    return output;
}

const defaultLabel = core.getInput('default_label');
const validLabels = core.getMultilineInput('match_labels', { required: true });

const pullRequest = github.context.payload.pull_request;
if (pullRequest === undefined) {
    throw new Error('This action can only be used in a pull request context');
}

let inputLabels = pullRequest.labels.map(label => label.name);

if (defaultLabel !== '') {
    core.info(`Default label: ${defaultLabel}`);
    inputLabels.push(defaultLabel);
}

const output = main(inputLabels, validLabels);

core.setOutput('matched_labels', output.matched);
core.setOutput('matched_count', output.matched_count);
core.setOutput('matched_labels_array', output.matched_array);
