export async function getFromCache(url) {
  const storage = window.localStorage;
  let cache = storage.getItem(url);
  if (cache) {
    return JSON.parse(cache).response;
  } else {
    const response = await (await fetch(url)).json();
    storage.setItem(
      url,
      JSON.stringify({
        response: response,
        ts: new Date().valueOf(),
      })
    );
    return response;
  }
}