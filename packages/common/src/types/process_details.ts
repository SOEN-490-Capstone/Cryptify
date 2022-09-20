export type ProcessDetails = {
    appId: string;
    appVersion: string;
    uptime: number;
    environment: string;
    nodeVersion: string;
    platform: NodeJS.Platform;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: NodeJS.CpuUsage;
};
