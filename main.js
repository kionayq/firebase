$(function ready(doc){ //must always be here if you use JQuery
    
    let db = firebase.firestore().collection('resturants')
    let resList = $('.res-container')

    var tdate = new Date();
    var dd = tdate.getDate(); 
    var MM = ((tdate.getMonth().length+1) === 1)? (tdate.getMonth()+1) : '0' + (tdate.getMonth()+1);
    var yyyy = tdate.getFullYear();
    var currentDate= yyyy + "-" + MM + "-" + dd;

    console.log(currentDate)

    db.where('date','==',currentDate).get().then(result => {
        let changes = result.docChanges() //gets array of docs
        console.log(changes)
        changes.forEach(res => {
            console.log(res.doc.data());
            resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} - ${res.doc.data().date} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)            
        });        
    }).catch(err => console.log(err))


 db.onSnapshot( result => {
        let changes = result.docChanges(); //gets array of docs
        changes.forEach(res => {
            // console.log(res.doc.data());
            if(res.type == 'added' ) {
                console.log(res.doc.data());
                // ready(res.doc)
            }else if (res.type == 'removed'){
                let li = resList.$('[date-id=' + res.doc.id + ']')
                resList.removeChild(li)
            }
            // resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} - ${res.doc.data().date} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)

            
        });
        
    })


    resList.on('click', ".delete", function(){
         //$(this).parent().attr("data-id")
         let id =$(this).parent().data("id")

        db.doc(id).delete()
        // .then()


    })

    resList.on('click', ".edit", function(){
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id")
        
        // let name = 
        let location = $('input[name=location]').val()

        db.doc(id).get().then(res => {
            // console.log(res.data());
            
            $('input[name=name]').val(res.data().name)
            $('input[name=location]').val(res.data().location)
        })
        // db.doc(id).update({

        // })
        // .then()

    })

    //create data and store to restaurants collection
    $('.submit').click(function(){
                
        let nameI = $('input[name=name]').val()
        let locationI = $('input[name=location]').val()
        let dateI = $('input[name=bday]').val()

     

        db.add({
            name: nameI,
            location: locationI,
            date: dateI
        }).then(res =>{

            console.log(` ${name} - ${locationI}` );
            
            resList.append(`<li data-id="${res.id}">${nameI} - ${locationI} - ${dateI} <button class="edit">edit</button> <button class="delete">delete</button></li>`)     
                   })     

                   $('input[name=name]').val('')
                   $('input[name=location]').val('')
                   $('input[name=bday]').val('')
        
  
    })

})