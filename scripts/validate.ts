import { findFiles } from './utils/file-finder.js';
import { validateHtml } from './validators/html-validator.js';
import { validateCss } from './validators/css-validator.js';
import type { ValidatorConfig, ValidationResult } from './types.js';

function parseArgs(): ValidatorConfig {
  const args = process.argv.slice(2);
  const projectPath = args[0];

  if (!projectPath) {
    console.error('Usage: tsx scripts/validate.ts <project-path>');
    process.exit(1);
  }

  return {
    projectPath,
    htmlOnly: args.includes('--html-only'),
    cssOnly: args.includes('--css-only'),
  };
}

function printResults(results: ValidationResult[]): void {
  let hasErrors = false;

  let indent = ' '.repeat(3);

  for (const result of results) {
    console.log(`\n${result.filePath}`);

    if (result.errors.length > 0) {
      hasErrors = true;
      console.log('❌  Errors:');
      result.errors.forEach((err) => {
        const location = err.line ? `Line ${err.line}:${err.column}: ` : '';
        console.log(indent + `${location}${err.message}`);
        if (err.extract) {
          console.log(indent + 'Extract:');
          console.log(indent.repeat(2)
              + err.extract.trim().replace(/\n/g, '\n' + indent.repeat(2)));
        }
      });
    }

    if (result.warnings.length > 0) {
      console.log('⚠️ Warnings:');
      result.warnings.forEach((warn) => {
        const location = warn.line ? `Line ${warn.line}:${warn.column}: ` : '';
        console.log(indent + `${location}${warn.message}`);
      });
    }

    if (result.isValid && result.warnings.length === 0) {
      console.log('✅  Valid');
    }
  }

  if (hasErrors) {
    console.log('\n❌  Validation failed');
    process.exit(1);
  } else {
    console.log('\n✅  All files passed validation');
  }
}

async function main(): Promise<void> {
  const config = parseArgs();
  const results: ValidationResult[] = [];

  if (!config.cssOnly) {
    console.log('🔍 Validating HTML files...');
    const htmlFiles = await findFiles(config.projectPath, '.html');

    for (const file of htmlFiles) {
      const result = await validateHtml(file);
      results.push(result);
    }
  }

  if (!config.htmlOnly) {
    console.log('🔍 Validating CSS files...');
    const cssFiles = await findFiles(config.projectPath, '.css');

    for (const file of cssFiles) {
      const result = await validateCss(file);
      results.push(result);
    }
  }

  printResults(results);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
