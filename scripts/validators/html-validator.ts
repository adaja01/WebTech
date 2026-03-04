import { readFile } from 'fs/promises';
import type { ValidationResult, W3CHtmlResponse } from '../types.js';

export async function validateHtml(
    filePath: string
): Promise<ValidationResult> {
    const content = await readFile(filePath, 'utf-8');

    const response = await fetch('https://validator.w3.org/nu/?out=json', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'User-Agent': 'WebTech-Validator/1.0',
        },
        body: content,
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as W3CHtmlResponse;

    const errors = data.messages
        .filter((msg) => msg.type === 'error')
        .map((msg) => ({
            line: msg.lastLine,
            column: msg.firstColumn,
            message: msg.message,
            extract: msg.extract,
        }));

    const warnings = data.messages
        .filter((msg) => msg.type === 'info' || msg.type === 'warning')
        .map((msg) => ({
            line: msg.lastLine,
            column: msg.firstColumn,
            message: msg.message,
        }));

    return {
        filePath,
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}