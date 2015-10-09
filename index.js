(function(){
  var REPORT_ID = /report\/([^\/]*)\//.exec(document.location.href)[1];

  var filterCol = function(col){
    // Used at Bringr
    return col.indexOf('msgCount_') === -1;
  };

  var getUserUrl = function(id){
    return 'https://mixpanel.com/report/'+REPORT_ID+'/explore/#user?distinct_id='+id;
  };

  var getData = function(){
    var records = mp.report.explore.models.records;

    var currentLength = records.length;

    while (true) {
      records.load_more();
      if (records.length == currentLength){
        break;
      } else {
        currentLength = records.length;
      }
    }

    var json = records.toJSON();

    return _.pluck(json, 'properties').map(function(model, i){
      model.$id = json[i].id;
      model.url = getUserUrl(model.$id);
      return model;
    });
  };

  var getCols = function(filter, data){
    data   = data || DATA;
    filter = filter || function(){return true;};

    return data.reduce(function(m, line){
      Object.keys(line).map(function(col){
        if(filter(col) && m.indexOf(col) === -1){
          m.push(col);
        }
      });
      return m;
    }, []);
  };

  var addslashes = function(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
  };

  var colValueToExcelCSV = function(val){
    if(typeof val === "number"){return val;}
    return '"'+addslashes(String(val))+'"';
  };

  var toTable = function(cols, data){
    data = data || DATA;
    var lines = data.map(function(line){
      return cols.map(function(col){
        return line[col] || '';
      });
    });
    return [cols].concat(lines);
  };

  var toCSV = function(table, fFormatter){
    fFormatter = fFormatter || colValueToExcelCSV;
    return table.map(function(lines){
      return lines.map(function(cell){
        return fFormatter(cell);
      }).join(';');
    }).join('\n');
  };

  var removeNonAsciiCode = function(str){
    return str.split('').map(function(c, i){
        return str.charCodeAt(i) > 0xFF ? '?' : c;
    }).join('');
  };

  var data = getData();
  var csv  = toCSV(toTable(getCols(filterCol, data), data));
  window.open("data:text/csv;base64," + btoa(removeNonAsciiCode(csv)));
})();
