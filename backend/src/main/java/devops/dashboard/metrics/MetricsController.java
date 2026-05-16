package devops.dashboard.metrics;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/metrics")
class MetricsController {

    private final MetricsService metricsService;

    MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }

    @GetMapping("/system")
    MetricsService.SystemMetrics getSystemMetrics() {
        return metricsService.getSystemMetrics();
    }
}
