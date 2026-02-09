import { compile } from 'mdsvex';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

function testPlugin() {
	return function transformer(tree) {
		console.log('=== Plugin called ===');
		visit(tree, (node) => {
			console.log(`Node: ${node.type}`);
			if (node.type === 'containerDirective') {
				console.log('Found containerDirective:', node.name);
			}
		});
	};
}

const markdown = `
:::info
This is a test
:::
`;

console.log('remarkDirective type:', typeof remarkDirective);
console.log('remarkGfm type:', typeof remarkGfm);

const options = {
	extensions: ['.md'],
	remarkPlugins: [remarkDirective, testPlugin, remarkGfm],
	layout: null
};

console.log('Options:', JSON.stringify(options, null, 2));

try {
	const result = await compile(markdown, options);
	console.log('\n=== Code Output (first 500 chars) ===');
	console.log(result.code.substring(0, 500));
} catch (error) {
	console.error('Error:', error.message);
	console.error(error.stack);
}
