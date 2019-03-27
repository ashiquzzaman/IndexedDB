var dbName ='JsStore_Demo';
function getDbSchema() {
  var tblProduct = {
    name: 'Product',
    columns: [
      {
          name: 'Id',
          primaryKey: true,
          autoIncrement: true
      }, 
      {
          name: 'ItemName',
          notNull: true,
          dataType: JsStore.DATA_TYPE.String
      }, 
      {
          name: 'Price',
          notNull: true,
          dataType: JsStore.DATA_TYPE.Number
      }, 
      {
          name: 'Quantity',
          notNull: true,
          dataType: JsStore.DATA_TYPE.Number
      }
    ]
  };
  var db = {
      name: dbName,
      tables: [tblProduct]
  }
  return db;
}


var connection = new JsStore.Instance(new Worker('jsstore.worker.min.js'));
function initJsStore() {
    connection.isDbExist(dbName).then(function(isExist) {
        if (isExist) {
            connection.openDb(dbName);
        } else {
            var database = getDbSchema();
            connection.createDb(database);
        }
    }).catch(function(err) {
        console.error(err);
    })
}

var save=()=>{
    initJsStore()
    var value = {
        ItemName: 'Green Jeans',
        Price: 2000,
        Quantity: 1000
    }
    
    //since Id is autoincrement column, so the value will be automatically generated.
    connection.insert({
        into: 'Product',
        values: [value]
    }).then(function(rowsInserted) {
        if (rowsInserted > 0) {
            alert('successfully added');
        }
    }).catch(function(err) {
        console.log(err);
        alert(err.message);
    });
}

save();
