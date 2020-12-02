<h1 align="center">
<img src="/images/banner.png"/>
</h1>

# Spark - List Manager

## Purpose
My friends and I wanted a way of keeping track of what shows we wanted to watch
together, but I got tired of editing my own message over and over.

## User Features
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

## Some Code Features

* Multiple server support through the use of JSON watchlists/eventlists and a server-info registration checker.

* Simple duplicate prevention through lowercasing. If **Cowboy Bebop** is already in the list,
then **cowboy Bebop** won't get added.

## Setup
It's easy! You can run `!setup` on your server to learn more or:
* Run `!setup w` in your dedicated watchlist channel to create a new watchlist.
* Run `!setup e` in your dedicated eventlist channel to create a new eventlist.

You can have one, the other, both, or neither!

## Known Issue (WIP)
The bot MAY desync, failing to display an update in the eventlist/watchlist message.
If this happens, simply run `!setup w` or `!setup e` in the channel of the affected
message and delete the old one. This will restore your registration. I'm still testing 
to see what causes this.
