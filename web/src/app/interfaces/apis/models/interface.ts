export type InterfaceResponse<T> = Promise<SuccessInterfaceResponse<T> | FailureInterfaceResponse>;

type SuccessInterfaceResponse<T> = {
    success: true;
    data: T;
};

type FailureInterfaceResponse = {
    success: false;
    error: string;
};

export const successInterfaceResponse = async <T>(arg: T): InterfaceResponse<T> => {
    return {
        success: true,
        data: arg
    };
};
