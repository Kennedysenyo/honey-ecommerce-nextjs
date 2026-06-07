export const handleErrors = (error: unknown): string => {
  console.error(error);
  return error instanceof Error ? error.message : (error as string);
};
