export interface ValidationResult {
  filePath: string;
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  line?: number;
  column?: number;
  message: string;
  extract?: string;
}

export interface ValidationWarning {
  line?: number;
  column?: number;
  message: string;
}

export interface ValidatorConfig {
  projectPath: string;
  htmlOnly?: boolean;
  cssOnly?: boolean;
}

export interface W3CHtmlError {
  type: 'error' | 'info' | 'warning';
  lastLine: number;
  firstColumn: number;
  message: string;
  extract: string;
}

export interface W3CHtmlResponse {
  messages: W3CHtmlError[];
}

export interface W3CCssError {
  line: string;
  level: string;
  message: string;
  context?: string;
}

export interface W3CCssResponse {
  cssvalidation: {
    errors: W3CCssError[];
    warnings: W3CCssError[];
    validity: boolean;
  };
}
