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


  export interface RequestMetaData {
    method: string; // e.g., "GET"
    url: string; // e.g., "https://jsonplaceholder.typicode.com/todos/1?="
    headers: Headers; // a Headers instance, could be HeadersInit if headers are modified as a simple object
    destination: string; // e.g., "", could also be "document", "iframe", etc.
    referrer: string; // e.g., "about:client"
    referrerPolicy: ReferrerPolicy; // e.g., "", other options include "no-referrer", "origin", etc.
    mode: RequestMode; // e.g., "cors", options include "navigate", "same-origin", "no-cors"
    credentials: RequestCredentials; // e.g., "same-origin", also "omit" and "include"
    cache: RequestCache; // e.g., "default", other values like "reload", "no-cache"
    redirect: RequestRedirect; // e.g., "follow", other values include "manual" and "error"
    integrity: string; // e.g., "", used for subresource integrity checking
    signal: AbortSignal; // e.g., `AbortSignal { aborted: false, onabort: null }`
    bodyUsed: boolean; // e.g., `false`, indicates if the body has already been read
  }
  
  
