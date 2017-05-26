# Glugh

#### By _**{Janek Brandt and Dallas Slaughter}**_
======
An app for both the bartender and the customer. This app allows any beer or cider serving establishment to publicly display what's on tap. In addition to this, it also gives a visual representation of the current fill level of each keg. Allows adding, editing, and removing of kegs, as well as a way for the bartender to update keg levels via pint, grumbler, or growler. Adjustable to use the most popular keg sizes.



Running / Development
======

* You will first need to create a Firebase app at [Firebase](https://firebase.google.com). You will use information from that app (click on 'Add Firebase to your web app' in the Overview panel for needed values) in the `api-keys.ts` (not provided, you will have to create) file as detailed below.
* Add file `app/api-keys.ts` with following (change the values such as YOUR_API_KEY to those provided by firebase)
```
export var masterFirebaseConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  storageBucket: YOUR_STORAGE_BUCKET
}
```

* firebase database rules should be set to
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```


#### Licensed under GNU
