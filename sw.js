const CACHE_NAME = 'pj-porcelanataria-v1';
const urlsToCache = [
    '/',
    '/index.html',
    // Adicione aqui outros arquivos se tiver, como CSS ou JS externos
];

// Evento de instalação: abre o cache e adiciona os arquivos principais
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de fetch: intercepta as requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        // Tenta encontrar a resposta no cache
        caches.match(event.request)
            .then(response => {
                // Se encontrar no cache, retorna a resposta do cache
                if (response) {
                    return response;
                }
                // Se não, faz a requisição à rede
                return fetch(event.request);
            })
    );
});
