import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }

  console.log('geoserver');
  // Listen to incoming HTTP requests (can only be used on the server).
  WebApp.connectHandlers.use('/hello', (req, res, next) => {
    console.log('Ciao momndo');
    res.writeHead(200);
    res.end(`Hello world from: ${Meteor.release}`);
  });


});
