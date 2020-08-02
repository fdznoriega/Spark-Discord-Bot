<h1 align="center">
<img src="resources/banner.png"/>
</h1>

# Spark - Your List Manager

## Purpose
Can't decide what to do, even though you've got a good number of ideas? Having trouble keeping track of what everyone wants to watch together? Spark's got you covered.

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

Simple duplicate prevention for both lists. If
> Cowboy Bebop

is already in the list, then
> cowboy Bebop

won't get added.

## Setup


## Example
