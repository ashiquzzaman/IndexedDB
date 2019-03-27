const db = new Dexie('myDb');
createSchema();

function createSchema(){
    db.version(1).stores({
        tasks: '++id,date,description,done,*detail'//
    });
    db.version(2).stores({
        users: '++id,Name,Email,Phone'//
    });
}

async function Find(pkVal){
    const result = await db.tasks.get(pkVal); 
    return result;
};

async function FindAll(whereObj){
    const result = await db.tasks.where(whereObj).toArray(); 
    return result;
};
async function GetAll(){
    const result = await db.tasks.toArray(); 
    return result;
};

function Create(obj){ 
    db.transaction('rw', db.tasks, () => {       
      return db.tasks.add(obj);
      });
}
function CreateList(objs){ 
    db.transaction('rw', db.tasks, () => {
       
        db.tasks.bulkAdd(objs);//add for only insert and put for insert or update
        //  db.tasks.bulkPut(objs);//add for only insert and put for insert or update
        // for (const o of objs) {
        //   db.tasks.add(o);
        // }
      }).catch(function (ex) {
        console.log(ex)
        //Dexie.currentTransaction.abort();
      });
}

const objs = [
    {
        date:new Date(),
        description:"Test 1",
        done:false,
        detail:[
           {
            id:1,
            Name:"test1"
           }
        ]
    },  
    {
        date:new Date(),
        description:"Test 2",
        done:false,
        detail:[
            {
             id:2,
             Name:"test2"
            }
         ]
    }, 
    {
        date:new Date(),
        description:"Test 3",
        done:false,
        detail:[
            {
             id:3,
             Name:"test3"
            }
         ]
    }, 
];
//CreateList(objs);


function loadTask(){
    GetAll().then(function(result){
        $("ul#task").html("");
        result.forEach(element => {
         $("ul#task").append("<li>"+element.description+"</li>");
      });
    });   
}
loadTask();
function saveTask(){
    var obj= {
        date:new Date(),
        description:$("#description").val(),
        done:false,
        detail:null
    }
  var result= Create(obj);   
}