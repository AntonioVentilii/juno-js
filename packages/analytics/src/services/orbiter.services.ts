import {OrbiterApi} from '../api/orbiter.api';
import type {Environment} from '../types/env';
import type {
  SatelliteIdText,
  SetPageViewRequestEntry,
  SetPageViewsRequest,
  SetPerformanceMetricRequestEntry,
  SetPerformanceMetricsRequest,
  SetTrackEventRequestEntry,
  SetTrackEventsRequest
} from '../types/orbiter';

export class OrbiterServices {
  readonly #env: Environment;
  readonly #api: OrbiterApi;

  constructor(env: Environment) {
    this.#env = env;
    this.#api = new OrbiterApi(env);
  }

  setPageView = async (entry: SetPageViewRequestEntry): Promise<null> => {
    const request: SetPageViewsRequest = {
      ...this.satelliteId(),
      page_views: [entry]
    };

    return await this.#api.postPageViews({request});
  };

  setTrackEvent = async (entry: SetTrackEventRequestEntry): Promise<null> => {
    const request: SetTrackEventsRequest = {
      ...this.satelliteId(),
      track_events: [entry]
    };

    return await this.#api.postTrackEvents({request});
  };

  setPerformanceMetric = async (entry: SetPerformanceMetricRequestEntry): Promise<null> => {
    const request: SetPerformanceMetricsRequest = {
      ...this.satelliteId(),
      performance_metrics: [entry]
    };

    return await this.#api.postPerformanceMetrics({request});
  };

  private satelliteId(): {satellite_id: SatelliteIdText} {
    return {
      satellite_id: this.#env.satelliteId
    };
  }
}
