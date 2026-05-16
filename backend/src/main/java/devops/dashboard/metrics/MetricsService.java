package devops.dashboard.metrics;

import com.sun.management.OperatingSystemMXBean;
import org.springframework.stereotype.Service;

import java.io.File;
import java.lang.management.ManagementFactory;

@Service
class MetricsService {

    record SystemMetrics(double cpuLoadPercent, MemoryInfo memory, DiskInfo disk) {}

    record MemoryInfo(long totalBytes, long freeBytes, long usedBytes, long maxBytes, double usedPercent) {}

    record DiskInfo(long totalBytes, long freeBytes, long usedBytes, double usedPercent) {}

    SystemMetrics getSystemMetrics() {
        OperatingSystemMXBean osBean =
                (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();

        double cpuLoad = osBean.getCpuLoad();
        double cpuPercent = cpuLoad >= 0 ? Math.round(cpuLoad * 1000.0) / 10.0 : 0.0;

        long totalMemory = osBean.getTotalMemorySize();
        long freeMemory = osBean.getFreeMemorySize();
        long usedMemory = totalMemory - freeMemory;
        double memPercent = totalMemory > 0
                ? Math.round((double) usedMemory / totalMemory * 1000.0) / 10.0
                : 0.0;

        File root = new File("/");
        long totalDisk = root.getTotalSpace();
        long freeDisk = root.getFreeSpace();
        long usedDisk = totalDisk - freeDisk;
        double diskPercent = totalDisk > 0
                ? Math.round((double) usedDisk / totalDisk * 1000.0) / 10.0
                : 0.0;

        return new SystemMetrics(
                cpuPercent,
                new MemoryInfo(totalMemory, freeMemory, usedMemory, totalMemory, memPercent),
                new DiskInfo(totalDisk, freeDisk, usedDisk, diskPercent)
        );
    }
}
