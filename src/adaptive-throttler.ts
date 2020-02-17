import { AxiosResponse } from 'axios';

export class AdaptiveThrottler {
  private currentWindowTotalRequests: number;

  private currentWindowAcceptedRequests: number;

  private currentWindowStart: number;

  private rejectionProbability: number;

  public constructor(private readonly windowSize: number) {
    this.currentWindowTotalRequests = 0;
    this.currentWindowAcceptedRequests = 0;
    this.rejectionProbability = 0;
    this.currentWindowStart = Date.now();
  }

  public async makeRequest(
    fn: () => Promise<AxiosResponse>
  ): Promise<AxiosResponse> {
    if (this.rejectionProbability > 0) {
      if (
        (this.currentWindowTotalRequests + 1) %
          (1 / this.rejectionProbability) <
        1
      ) {
        this.currentWindowTotalRequests = this.currentWindowTotalRequests + 1;
        return Promise.resolve({
          data: {},
          status: 428,
          statusText: '',
          headers: {},
          config: {}
        });
      }
    }

    const result = await fn();

    if (this.currentWindowStart + this.windowSize > Date.now()) {
      this.currentWindowTotalRequests = this.currentWindowTotalRequests + 1;
      if (result.status === 200) {
        this.currentWindowAcceptedRequests =
          this.currentWindowAcceptedRequests + 1;
      }
    } else {
      this.calculateRejectionProbability();
      this.currentWindowStart = Date.now();
      this.currentWindowAcceptedRequests = 0;
      this.currentWindowTotalRequests = 0;
    }
    return result;
  }

  private calculateRejectionProbability() {
    this.rejectionProbability = Math.max(
      0,
      (this.currentWindowTotalRequests -
        1.1 * this.currentWindowAcceptedRequests) /
        (this.currentWindowTotalRequests + 1)
    );
    console.log(this.rejectionProbability);
  }
}
