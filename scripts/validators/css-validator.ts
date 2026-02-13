import { readFile } from 'fs/promises';
import type { ValidationResult, W3CCssResponse } from '../types.js';

export async function validateCss(
  filePath: string
): Promise<ValidationResult> {
  const content = await readFile(filePath, 'utf-8');

  const formData = new FormData();
  formData.append('text', content);
  formData.append('profile', 'css3svg');
  formData.append('output', 'json');

  const response = await fetch(
    'https://jigsaw.w3.org/css-validator/validator',
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as W3CCssResponse;

  const errors = data.cssvalidation?.errors?.map((err) => ({
    line: parseInt(err.line),
    message: err.message,
    extract: err.context,
  })) || [];

  const warnings = data.cssvalidation?.warnings?.map((warn) => ({
    line: parseInt(warn.line),
    message: warn.message,
  })) || [];

  return {
    filePath,
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
