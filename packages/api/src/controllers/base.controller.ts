import { Controller, Get } from "@nestjs/common";
import { ProcessDetails } from "@cryptify/common/src/domain/process_details";

@Controller("")
export class BaseController {
    @Get("/")
    find(): ProcessDetails {
        return {
            appId: "cryptify-api",
            appVersion: `v${process.env.npm_package_version}`,
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
            nodeVersion: process.version,
            platform: process.platform,
            memoryUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage(),
        };
    }
}
