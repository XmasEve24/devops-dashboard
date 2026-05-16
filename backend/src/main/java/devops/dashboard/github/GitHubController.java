package devops.dashboard.github;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/github")
class GitHubController {

    private final GitHubService gitHubService;

    GitHubController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/runs")
    GitHubDtos.WorkflowRunsResponse getRuns(@RequestParam(defaultValue = "20") int limit) {
        return gitHubService.getRecentRuns(Math.min(limit, 100));
    }

    @GetMapping("/workflows")
    GitHubDtos.WorkflowsResponse getWorkflows() {
        return gitHubService.getWorkflows();
    }
}
