# Match Labels Action

A GitHub Action to check pull-request labels and returns matching labels. This action only run if the GitHub event contains **pull-request** object. 



## Inputs

| Name | Description | Default |
|------|-------------|---------|
| `match_labels` | List of your filter labels | n/a |
| `default_label` | Label to be applied if no match | n/a |



## Outputs
| Name | Type | Description |
| ------ | ---- | ----------- |
| `matched_labels` | string | comma-separated value of matching labels |
| `matched_labels_array` | array | array of matching labels |
| `matched_labels_count` | number | count of matching labels |




## Example Usage

```yaml
name: Task
on:
  pull_request_target:
    branches:
      - master
    types:
      - closed
jobs:
  checklabel:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: filter labels step 
        id: filter_labels
        uses: binowork/match-labels@v0.1.0
        with:
          match_labels: |
            major
            minor
            patch

      - name: run the script if PR contains one of [major,minor, patch]
        if: ${{ steps.filter_labels.outputs.matched_count == 1 }}
        run: |
          echo "Output from the script"
          echo "${{ steps.filter_labels.outputs.matched_labels }}"
          echo "${{ steps.filter_labels.outputs.matched_count }}"
          echo "${{ steps.filter_labels.outputs.matched_labels_array }}"
```