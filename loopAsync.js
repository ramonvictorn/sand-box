// Some examples about loop async
const axios = require('axios');
const console = require('console');

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
];

/**
 * This method works and await loop to execute the rest of code
 */
async function getTodosMap() {
  const data = await Promise.all(urls.map(async (el, idx) => {
    console.log('start with', el);
    const result = await axios.get(el);
    console.log(`Received ${idx + 1}:`, result.data.id);
    return result.data.id;
  }));
  console.log('data -> ', data);
}

/**
* This method works too, but executes sequentially each element.
* One after another awaiting the result before next;
*/
async function getTodosForOf() {
  for await (const [idx, url] of urls.entries()) {
    console.log('start with', url);
    const result = await axios.get(url);
    console.log(`Received ${idx + 1}:`, result.data.id);
  }
  console.log('Finished!');
}

/**
 * Don't awaits the loop and executes the last console, bad to use with loop async
 */
async function getTodosForEach() {
  const data = [];
  urls.forEach(async (el, idx) => {
    console.log('start with', el);
    const result = await axios.get(el);
    console.log(`Received ${idx + 1}:`, result.data.id);
    data.push(result.data.id);
  });
  console.log('data -> ', data);
}

// getTodosMap();
// getTodosForOf();
// getTodosForEach();
