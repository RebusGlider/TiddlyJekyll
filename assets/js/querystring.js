/*
(The MIT License)

Copyright (c) 2013 Greg Allen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var querystring = {
  parse : function(string){
    var parsed = {};
    string = (string !== undefined) ? string :  window.location.search;

    if (typeof string === "string" && string.length > 0){
      if (string[0] === '?') {
        string = string.substring(1);
      }

      string = string.split('&');

      for (var i = 0, length = string.length; i < length; i++){
        var element = string[i],
            eqPos = element.indexOf('='),
            keyValue, elValue;

        if (eqPos >= 0){
          keyValue = element.substr(0,eqPos);
          elValue = element.substr(eqPos +1);
        }
        else {
          keyValue = element;
          elValue = '';
        }

        elValue = decodeURIComponent(elValue);

        if (parsed[keyValue] === undefined){
          parsed[keyValue] = elValue;
        }
        else if (parsed[keyValue] instanceof Array) {
          parsed[keyValue].push(elValue);
        }
        else {
          parsed[keyValue] = [parsed[keyValue], elValue];
        }
      }
    }

    return parsed;
  },
  stringify : function(obj){
    var string = [];

    if (!!obj && obj.constructor === Object){
      for (var prop in obj){
        if (obj[prop] instanceof Array){
          for (var i = 0, length = obj[prop].length; i < length; i++){
            string.push([encodeURIComponent(prop),encodeURIComponent(obj[prop][i])].join('='));
          }
        }
        else {
          string.push([encodeURIComponent(prop),encodeURIComponent(obj[prop])].join('='));
        }
      }
    }

    return string.join('&');
  }
};
