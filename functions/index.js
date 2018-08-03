const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

/* exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
}); */


exports.addTeam = functions.https.onRequest((req, res) => {
  const teamId = req.query.teamId;
  const notification = req.body;
  return admin.database().ref('/team/' + teamId + '/notifications').set(notification).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
});



exports.teamNotifications = functions.database.ref('/team/{teamId}/notifications')
  .onCreate((snapshot, context) => {
    console.log('snapshot.action', snapshot._data.action.type);
    console.log('snapshot', snapshot._data);
    switch (snapshot._data.action.type) {
      case 'SEND_MESSAGE':
        saveMessage(snapshot._data, context);
        break;
      case 'INVITE_MEMBER':
        admin.database.ref('/').push({});
        break;
    }
  });

function saveMessage(data, context) {
  console.log("datadddddd", data.data);
  console.log('context', context);
  const dataToSave = data.data
  return admin.database().ref('/messages').push({1: data}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
  
  // const payLoad = req.body;
  // return admin.database.ref('/')
}

exports.addMemberToTeam = functions.https.onCall((data, context) => {
  return admin.database.ref('/').push({})
})