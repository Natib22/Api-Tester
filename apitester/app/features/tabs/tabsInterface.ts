export interface ResponseMetadata {
    type: string;
    url: string;
    redirected: boolean;
    status: number;
    ok: boolean;
    statusText: string;
    headers: Headers; // Use the built-in Headers type for response headers
    body: ReadableStream; // Use the built-in ReadableStream type
    bodyUsed: boolean;
  }

