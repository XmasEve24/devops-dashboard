package devops.dashboard.github;

import devops.dashboard.config.AppProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
class GitHubService {

    private final RestClient gitHubClient;
    private final AppProperties props;

    GitHubService(RestClient gitHubClient, AppProperties props) {
        this.gitHubClient = gitHubClient;
        this.props = props;
    }

    GitHubDtos.WorkflowRunsResponse getRecentRuns(int limit) {
        var response = gitHubClient.get()
                .uri("/repos/{owner}/{repo}/actions/runs?per_page={limit}",
                        props.owner(), props.repo(), limit)
                .retrieve()
                .body(GitHubDtos.RunsApiResponse.class);

        if (response == null) return new GitHubDtos.WorkflowRunsResponse(0, List.of());

        List<GitHubDtos.WorkflowRun> runs = response.workflowRuns().stream()
                .map(this::toWorkflowRun)
                .toList();

        return new GitHubDtos.WorkflowRunsResponse(response.totalCount(), runs);
    }

    GitHubDtos.WorkflowsResponse getWorkflows() {
        var response = gitHubClient.get()
                .uri("/repos/{owner}/{repo}/actions/workflows", props.owner(), props.repo())
                .retrieve()
                .body(GitHubDtos.WorkflowsApiResponse.class);

        if (response == null) return new GitHubDtos.WorkflowsResponse(0, List.of());

        List<GitHubDtos.Workflow> workflows = response.workflows().stream()
                .map(w -> new GitHubDtos.Workflow(w.id(), w.name(), w.state()))
                .toList();

        return new GitHubDtos.WorkflowsResponse(response.totalCount(), workflows);
    }

    private GitHubDtos.WorkflowRun toWorkflowRun(GitHubDtos.RunItem item) {
        String actorLogin = item.actor() != null ? item.actor().login() : "";
        String actorAvatarUrl = item.actor() != null ? item.actor().avatarUrl() : "";
        String commitMessage = item.headCommit() != null ? item.headCommit().message() : "";
        if (commitMessage.contains("\n")) {
            commitMessage = commitMessage.substring(0, commitMessage.indexOf('\n'));
        }
        return new GitHubDtos.WorkflowRun(
                item.id(), item.name(), item.headBranch(), item.headSha(),
                item.status(), item.conclusion(), item.htmlUrl(),
                item.createdAt(), item.updatedAt(), item.runNumber(),
                actorLogin, actorAvatarUrl, commitMessage
        );
    }
}
