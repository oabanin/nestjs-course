import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {API_URL, CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID} from "./hh.constants";
import {lastValueFrom} from 'rxjs';
import {HhResponse} from "./hh.models";
import {hhData} from "../top-page/top-page.model";

@Injectable()
export class HhService {
    private token: string;

    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
        this.token = this.configService.get('HH_TOKEN') ?? '';
    }

    async getData(text: string) {
        try {
            const observable = this.httpService.get<HhResponse>(API_URL.vacancies,
                {
                    params: {
                        text,
                        clusters: true
                    },
                    headers: {
                        'User-Agent': "OwlTop/1.0 (oleh@oleh.com)",
                        Authorization: 'Bearer' + this.token,
                    }
                });
            const {data} = await lastValueFrom(observable);
            return this.parseData(data);
        } catch (e) {
            Logger.error(e);
        }

    }

    private parseData(data: HhResponse): hhData {
        const salaryCluster = data.clusters.find(c => c.id === SALARY_CLUSTER_ID)
        if (!salaryCluster) {
            throw  new Error(CLUSTER_FIND_ERROR)
        }

        const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
        const middleSalary = this.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name);
        const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length - 1].name);


        return {
            count: data.found,
            juniorSalary,
            middleSalary,
            seniorSalary,
            updatedAt: new Date()
        }

    }

    private getSalaryFromString(s: string): number {
        const numberRegExp = /(\d+)/g
        const res = s.match(numberRegExp);
        if (!res) return 0;
        return Number(res[0]);
    }
}
