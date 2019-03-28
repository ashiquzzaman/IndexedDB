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

localforage.setDriver(localforage.LOCALSTORAGE);

function IsKeyExist(keyName){
   return localforage.keys().then(function(result) { 
        result.forEach(key => {
            if(key===keyName) return key===keyName;
         });     
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
    return false;
}

function GetAll(key){
   ;
}
var GetAll=(key) =>{
    var arr=[];
    arr.map(function (key) {   
    return localforage.getItem(key).then(function(result){ 
        return result;
     })
})
} ;

function Create(key,model){
  var items=[];

if(IsKeyExist(key)){
    debugger;
    localforage.getItem(key).then(function (result){
        if(Array.isArray(result)){
            items=items.concat(result);
        }else{
            items.push(result); 
        }
    });
}
if(Array.isArray(model)){
    items=items.concat(model);
}else{
    items.push(model); 
}
 localforage.setItem(key, items).then(function(result) {    
   // console.log(result);         
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    })
}
//Create('task',objs);
loadTask();



function loadTask(){
    debugger;
   let html= GetAll('task').then(function(result){   
       let li=""   
        result.forEach(element => {         
            li+="<li>"+element.description+"</li>"; 
      });  
      return li;
    });    
    $("#task-list").html(html); 
}
function saveTask(){
    var obj= {
        date:new Date(),
        description:$("#description").val(),
        done:false,
        detail:null
    }
    Create('task',obj);  
   var html= loadTask();
   $("#task-list").html(html); 
}

