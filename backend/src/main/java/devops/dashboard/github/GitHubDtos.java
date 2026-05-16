package devops.dashboard.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

class GitHubDtos {

    // ── GitHub API input types (snake_case) ──────────────────────────────────

    record RunsApiResponse(
            @JsonProperty("total_count") int totalCount,
            @JsonProperty("workflow_runs") List<RunItem> workflowRuns
    ) {}

    record RunItem(
            long id,
            String name,
            @JsonProperty("head_branch") String headBranch,
            @JsonProperty("head_sha") String headSha,
            String status,
            String conclusion,
            @JsonProperty("html_url") String htmlUrl,
            @JsonProperty("created_at") String createdAt,
            @JsonProperty("updated_at") String updatedAt,
            @JsonProperty("run_number") int runNumber,
            ActorItem actor,
            @JsonProperty("head_commit") HeadCommitItem headCommit
    ) {}

    record ActorItem(String login, @JsonProperty("avatar_url") String avatarUrl) {}

    record HeadCommitItem(String message, CommitAuthorItem author) {}

    record CommitAuthorItem(String name) {}

    record WorkflowsApiResponse(
            @JsonProperty("total_count") int totalCount,
            List<WorkflowItem> workflows
    ) {}

    record WorkflowItem(long id, String name, String state) {}

    // ── Frontend output types (camelCase) ────────────────────────────────────

    public record WorkflowRun(
            long id,
            String name,
            String headBranch,
            String headSha,
            String status,
            String conclusion,
            String htmlUrl,
            String createdAt,
            String updatedAt,
            int runNumber,
            String actorLogin,
            String actorAvatarUrl,
            String commitMessage
    ) {}

    public record WorkflowRunsResponse(int totalCount, List<WorkflowRun> runs) {}

    public record Workflow(long id, String name, String state) {}

    public record WorkflowsResponse(int totalCount, List<Workflow> workflows) {}
}
