import NotFoundError from './not-found.exception';

export function handleHttpException(error: any, errorMessage: string): void {
  if (error instanceof NotFoundError) {
    throw error;
  }
  throw new Error(errorMessage);
}
