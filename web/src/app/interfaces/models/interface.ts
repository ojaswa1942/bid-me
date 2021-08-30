export type InterfaceResponsePromise<T> = Promise<SuccessInterfaceResponse<T> | FailureInterfaceResponse>;
export type InterfaceResponse<T> = SuccessInterfaceResponse<T> | FailureInterfaceResponse;

type SuccessInterfaceResponse<T> = {
    success: true;
    data: T;
};

type FailureInterfaceResponse = {
    success: false;
    error: string;
};

export const successInterfacePromiseResponse = async <T>(arg: T): InterfaceResponsePromise<T> => {
    return {
        success: true,
        data: arg
    };
};

export const successInterfaceResponse = <T>(arg: T): InterfaceResponse<T> => {
    return {
        success: true,
        data: arg
    };
};
