var CACHE='ah-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(cc){cc.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request).then(function(r){if(r.ok){var c=r.clone();caches.open(CACHE).then(function(cc){cc.put(e.request,c)})}return r})}));
});
