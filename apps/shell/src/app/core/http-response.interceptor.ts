import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '@shared/types';

/**
 * Maps backend messageType number to a toastr call.
 * 1 = Success, 2 = Warning, 3 = Error, default = Info
 */
function showFeedback(toastr: ToastrService, message: string, messageType: number): void {
  switch (messageType) {
    case 1: toastr.success(message); break;
    case 2: toastr.warning(message); break;
    case 3: toastr.error(message, 'Error'); break;
    default: toastr.info(message); break;
  }
}

function isApiResponse(body: unknown): body is ApiResponse<unknown> {
  return (
    body !== null &&
    typeof body === 'object' &&
    'errorCode' in body &&
    'isFeedbackSet' in body
  );
}

const AUTH_ENDPOINT_RE = /\/auth(\/|$)/;

/**
 * Interceptor that:
 * 1. Unwraps ApiResponse<T> — components receive `data` directly instead of the full wrapper
 * 2. Shows backend feedback toasts when `isFeedbackSet === true`
 * 3. Throws an HttpErrorResponse when backend returns non-zero errorCode
 *
 * Binary (Blob/ArrayBuffer) and PDF responses are passed through unchanged.
 */
@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  private readonly toastr = inject(ToastrService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event) => {
        if (!(event instanceof HttpResponse)) {
          return event;
        }

        // Skip auth endpoints — AuthApiService handles its own error mapping
        if (AUTH_ENDPOINT_RE.test(request.url)) {
          return event;
        }

        // Skip binary and PDF responses
        const contentType: string | null =
          event.headers.get('content-type') ?? event.headers.get('Content-Type');

        if (contentType?.toLowerCase().includes('application/pdf')) {
          return event;
        }

        const body = event.body;

        if (body instanceof Blob || body instanceof ArrayBuffer) {
          return event;
        }

        if (!isApiResponse(body)) {
          return event;
        }

        // Show backend feedback toast when flagged
        if (body.isFeedbackSet && body.message) {
          const msg = body.message as any;
          if (typeof msg === 'object' && 'messageType' in msg) {
            showFeedback(this.toastr, String(msg.message ?? JSON.stringify(msg)), Number(msg.messageType ?? 0));
          } else if (typeof msg === 'string' && msg.length > 0) {
            this.toastr.info(msg);
          }
        }

        // Backend error — throw so catchError operators can handle it
        if (body.errorCode !== 0 && body.errorCode != null) {
          const errorMsg = (body.message as any)?.message ?? body.data ?? 'Request failed';
          throw { status: 400, message: errorMsg, error: body };
        }

        // Unwrap: return only `data` to the caller
        return event.clone({ body: body.data });
      })
    );
  }
}
