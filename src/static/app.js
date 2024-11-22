const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = input.value.trim();
  if (task) {
    addTask(task);
    saveTask(task);
    input.value = '';
  }
});

function addTask(task) {
  const li = document.createElement('li');
  li.textContent = task;
  list.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(addTask);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

// APIデータをキャッシュ
async function fetchAndCacheAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // キャッシュストレージに保存
    const cache = await caches.open('api-cache');
    await cache.put(url, new Response(JSON.stringify(data)));
    return data;
  } catch {
    // オフライン時はキャッシュから取得
    const cache = await caches.open('api-cache');
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      return cachedResponse.json();
    } else {
      throw new Error('No cached data available');
    }
  }
}

loadTasks();
