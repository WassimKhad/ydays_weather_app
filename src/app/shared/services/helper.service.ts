import { Injectable } from '@angular/core';

import { AppService } from './app.service';


@Injectable()
export class HelperService {
  private unitSystem: string;

  constructor(
    private appService: AppService
  ) {
    this.unitSystem = appService.getUnitSystem();
  }

  getWindDirection(windDegree: number): string {
    const windDirectionIndex = Math.round((windDegree - 11.25) / 22.5);
    const windNames = [
      'Nord', 'Nord nord-est', 'Nord-est', 'Est nord-est', 'Est',
      'Est sud-est', 'Sud-est', 'Sud-sud-est', 'Sud', 'Sud-sud-ouest',
      'Sud-ouest', 'Sud-ouest ouest', 'Ouest', 'Ouest nord-ouest', 'Nord Ouest', 'North Northwest'
    ];

    return windNames[windDirectionIndex];
  }

  getWindBeaufortScaleByMeterInSecond(windSpeed: number): string {
    const beaufortWindScale = [
      'calme', 'air léger', 'brise légère', 'petite brise', 'brise legère', 'brise fraîche',
      'forte brise', 'vent fort, près de coup de vent', 'grand vent', 'coup de vent sévère', 'tempête', 'tempête violente', 'ouragan'
    ];
    let windSpeedIndex = 0;
    const windSpeedScale = [
      [0, 0.3],
      [0.4, 1.6],
      [1.7, 3.5],
      [3.6, 5.5],
      [5.6, 8],
      [8.1, 10.8],
      [10.9, 13.9],
      [14, 17.2],
      [17.3, 20.8],
      [20.9, 24.5],
      [24.6, 28.5],
      [28.6, 32.7],
      [32.8, 1000]
    ];

    windSpeedScale.forEach((speedInterval, index) => {
      if (windSpeedScale[index][0] <= windSpeed && windSpeed <= windSpeedScale[index][1]) {
        windSpeedIndex = index;
      }
    });


    return beaufortWindScale[windSpeedIndex];
  }

  getPressureInMmHg(pressureInHpa: number): number {
    return Math.round(pressureInHpa * 0.75006375541921);
  }

  isItCurrentDayByTimestamps(firstTimestamp, secondTimestamp): boolean {
    const days = [firstTimestamp, secondTimestamp].map(timestamp => Math.floor(timestamp / (3600 * 24)));

    return days[0] === days[1];
  }
}
