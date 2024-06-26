export type FulfilledType = "fulfilled";

export type RejectedType = "rejected";

export type PromiseFulfilledResult<T> = {
    status: FulfilledType;
    value: T;
};

export type PromiseRejectedResult = {
    status: RejectedType;
    reason: any;
};

export type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

// custom implementation of Promise.allSettled for compatibility with react native
export const promiseAllSettled = (promises: Array<Promise<any> | any>): Promise<Array<PromiseSettledResult<any>>> =>
    Promise.allSettled
        ? Promise.allSettled(promises)
        : Promise.all(
              promises.map((p: Promise<any>) =>
                  Promise.resolve(p)
                      .then((value: any) => ({ status: "fulfilled" as FulfilledType, value }))
                      .catch((reason: any) => ({ status: "rejected" as RejectedType, reason })),
              ),
          );
