import { expect, test } from 'vitest';
import { getAllSchemeFiles } from '../scripts/convertSchemes';

test('read all scheme files', async () => {
	expect(await getAllSchemeFiles()).toBe(333);
});
