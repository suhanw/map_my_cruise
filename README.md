# Sloth

[Sloth live](http://sloth-chat.herokuapp.com)

Sloth is a full-stack web application inspired by Slack. It utilizes Ruby on Rails on the backend, a PostgreSQL database, and React.js with a Redux architectural framework on the frontend.

## Features & Implementation

### Live chat

![Live chat example](docs/live-chat.gif)

Messages are stored at the database level with associated an `user_id` and `channel_id`. Message authors can freely edit and delete their own messages. Realtime updating is accomplished using Pusher. A single instance of Pusher is constructed on each visit to the message feed component. Based on the data returned by the Pusher event, a client can update their feed and notifications.

### Channels

![Channels example](docs/channels.gif)

Messages are organized by their parent Channels. All users can freely create and join channels. Users will only keep track of messages and notifications for channels in which they are members.

### Direct messages

![Direct messaging example](docs/direct-messaging.gif)

Direct messages can only be seen by a specified group of members. The number of members per channel is limited to 7 users. Unlike regular channels, which can be muted, direct messages will always notify all specified members.

### Notifications

Along with updating the message feed, every message created generates a notification for every subscribed member. Notification are cleared on channel entry.

### Giphy integration

![Giphy example](docs/giphy.gif)

By typing the command `/giphy` followed by a query string, users can generate a random related GIF from Giphy's library. This is accomplished using Giphy's public API.

### Single page

Sloth is a single page app that allows for quick navigation between its various components. As data is fetched from Rails, components are only updated when necessary.

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for Sloth are outlined below.

### Search

Slack has a global search that allows users to find specific messages or other users. The results populate a list that appears in a new right-hand sidebar component. I intend to build this new component up using the Fuse.js library for fuzzy-searching.

### Reactions

Slack allows users to leave reactions to individual messages. Reactions are essentially tags that are associated with emojis. Slack admins can also create custom emojis. To build this I would have to build a new component for emoji selection.
