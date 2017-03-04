export default function(sourceurl, args){
   return function(on_open, on_message, on_close, on_error){
     var url = sourceurl+"?";
     for(var key in args){
       url = url + "&"+key+"="+args[key];
     }
     var _source = new EventSource(url);
     _source.addEventListener('open', function(e){
       on_open(e)
     });
     _source.addEventListener('error', function(e){
        console.log(e.target.readyState);
        on_close(e);
     });
     _source.addEventListener('message', function(e){
        var data = JSON.parse(e.data);
        on_message(data);
     });
   }
};
