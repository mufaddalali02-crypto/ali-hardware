var CACHE='ah-v3';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  if(/\.(mp4|webm|mov|m4v)(\?|$)/i.test(u.pathname))return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-cache'}).then(function(r){var c=r.clone();caches.open(CACHE).then(function(cc){cc.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request).then(function(r){if(r.ok){var c=r.clone();caches.open(CACHE).then(function(cc){cc.put(e.request,c)})}return r})}));
});
