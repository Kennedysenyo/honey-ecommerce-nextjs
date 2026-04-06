export const handleErrors = (error: unknown): string => {
  return error instanceof Error ? error.message : (error as string);
};
