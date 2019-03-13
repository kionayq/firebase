$(function(){ //must always be here if you use JQuery
    
    let db = firebase.firestore().collection('restaurants')
    let resList = $('.res-container')

    db.get()
    .then(result => {
        let changes = result.docChanges() //gets array of docs

        changes.forEach(res => {
            console.log(res.doc.data());
            resList.append(`<li data-id="${res.doc.id}">${res.doc.data().name} - ${res.doc.data().location} <button class="edit">edit</button> <button class="delete">delete</button> </li>`)

            
        });
        
    }).catch(err => console.log(err))


    resList.on('click', ".delete", function(){
        // $(this).parent().attr("data-id")
        let id = $(this).parent().data("id")

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
        
        let name = $('input[name=name]').val()
        let location = $('input[name=location]').val()

        console.log(name)
        console.log(location)

        db.add({
            name: name,
            location: location
        }).then(res =>{
            resList.append(`<li data-id="${res.id}">${name} - ${location} <button class="edit">edit</button> <button class="delete">delete</button></li>`)
            
            
        })
        
        
    })

})