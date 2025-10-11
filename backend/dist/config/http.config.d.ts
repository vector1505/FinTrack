export declare const HTTPSTATUS: {
    OK: number;
    CREATED: number;
    ACCEPTED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    CONFLICT: number;
    PAYLOAD_TOO_LARGE: number;
    UNSUPPORTED_MEDIA_TYPE: number;
    TOO_MANY_REQUESTS: number;
    UNPROCESSABLE_ENTITY: number;
    INTERNAL_SERVER_ERROR: number;
    NOT_IMPLEMENTED: number;
    BAD_GATEWAY: number;
    SERVICE_UNAVAILABLE: number;
    GATEWAY_TIMEOUT: number;
};
export type HTTPStatusCodeType = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS];
//# sourceMappingURL=http.config.d.ts.map