<h1 align="center">
<img src="resources/banner.png"/>
</h1>

# Spark - List Manager

## Purpose
My friends and I wanted a way of keeping track of what shows we wanted to watch
together, but I got tired of editing my own message over and over.

## Features
Interacting with the **event-list** through:
* !events -- display all events
* !add-event *eventName* -- add event to the list
* !remove-event *eventName* -- remove event from the list
* !pick-event -- pick an event from the list

Interacting with the **watch-list** through:
* !shows -- displays list of shows (used for setup)
* !rec *showName* -- add to candidates list
* !win *candidateName* -- move candidate to winner section
* !update *ID* *episode* -- updates the episode to the new value
* !finish *ID* -- adds show to finished section
* !hiatus *ID* -- adds winner to hiatus section
* !banish *ID* -- adds winner to banished section (it was THAT bad)
* !remove *showName* -- removes the show from anywhere on the list

Simple duplicate prevention for both lists. If **Cowboy Bebop** is already in the list,
then **cowboy Bebop** won't get added.

## Setup
The bot needs four IDs:
* the ID of the channel of the event-list message
* the ID of the event-list message itself
* the ID of the channel of the watch-list message
* the ID of the watch-list message itself

## Future Development
Currently, the bot only produces one instance of itself across servers.
In other words, it works on one server at a time. That works fine for me now,
but in the future I'd like to have one instance of the bot manage multiple
servers. Instead of creating an instance per server, the bot would look at
the server the message was sent in, and would access an ID json object that
would contain the four IDs mentioned above. I would do the same thing for the
event-list and watch-list itself. These values would be edited in a future
'setup' command.
