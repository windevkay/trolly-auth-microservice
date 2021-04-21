export interface UnifiedErrorStructure {
  errors: {
    message: string;
    field?: string;
  }[];
}
