package devops.dashboard.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("app.github")
public record AppProperties(String token, String owner, String repo) {}
