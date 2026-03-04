import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function findFiles(
    dir: string,
    extension: string
): Promise<string[]> {
    const files: string[] = [];

    async function scan(directory: string): Promise<void> {
        const entries = await readdir(directory);

        for (const entry of entries) {
            const fullPath = join(directory, entry);
            const stats = await stat(fullPath);

            if (stats.isDirectory()) {
                await scan(fullPath);
            } else if (entry.endsWith(extension)) {
                files.push(fullPath);
            }
        }
    }

    await scan(dir);
    return files;
}