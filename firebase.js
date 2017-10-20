var firebase = require("firebase");

//Configuration for firebase.js

var config = {
    apiKey: "AIzaSyCMyM-4Pe80L_lgrL2Dq1TOIua6Vilthog",
    authDomain: "practice-5ca25.firebaseapp.com",
    databaseURL: "https://practice-5ca25.firebaseio.com",
    storageBucket: "practice-5ca25.appspot.com",
  };
  firebase.initializeApp(config);
  console.log('firebase initialized')

//This fetch's data from firebase and displays it

    exports.fetchData = function(category, callback) {
        var allData = [];
        if(category === 'all'){
            return firebase.database().ref('/').once('value').then(function(snapshot) {
            if(snapshot) {
                for(var category in snapshot.val()){
                    for(var id in snapshot.val()[category]){
                        allData.push({id: id,category: category ,title: snapshot.val()[category][id].title, description: snapshot.val()[category][id].description, location: snapshot.val()[category][id].location, img: snapshot.val()[category][id].img})
                    }
                }
                callback(allData)
            } else {
                callback(allData)
            }
        })
        } else {
            return firebase.database().ref('/' + category).once('value').then(function(snapshot) {
             
            if(snapshot) {
                for(var id in snapshot.val()){
                    allData.push({id: id, title: snapshot.val()[id].title, description: snapshot.val()[id].description, location: snapshot.val()[id].location});
                }
                callback(allData)
            } else {
                callback(allData)
            }
        })
        }
}

//Login function

exports.login = function(email, password, callback) {
    
    return firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        callback(user, undefined);
    }).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.Message;

        callback(undefined, error)
        if (errorCode === 'auth/wrong-password') {
            // alert('Wrong password.');
            console.log('wrong password')
        } else {
            // alert('errorMessage')
        }
    })
}

//Logout function//

exports.logOut = function( callback) {
    return firebase.auth().signOut().then(function(res) {
        callback(res, undefined)
    }).catch(function(error) {
        console.log(error);
        callback(undefined, error)
    })
}

//Update function

exports.update = function(category, id, data) {
    console.log(id, category, data)
    return firebase.database().ref('/' + category + '/' + id).set(data);
}

//This function writes data to firebase

exports.writeData = function(category, data, callback) {
   return firebase.database().ref('/' + category).push('/' + category + '/').set(data).then(function(res){
    callback(res, undefined);
    console.log(category, data, 'writeData')
   }).catch(function(err){
       callback(undefined, err)
   });
}

//this function fetched data from firebase via its ID

exports.fetchDataById = function(category, id, callback) {
        return firebase.database().ref('/' + category + '/' + id).once('value').then(function(snapshot) {
            var allData = [];
        if(snapshot) {
            callback(snapshot.val())
        } else {
            callback(allData)
        }
    });
}

//Remove function

exports.remove = function(category, id, callback) {
    return firebase.database().ref('/' + category + '/' + id).remove().then(function(error){
    callback(error, undefined);
    }).catch(function(error){
        callback(undefined, error)
        console.log(error)
    })
}
