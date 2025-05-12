#What the f*** is this

I am looking for a filter row
the output of the filter row is basicly its current state or configuration. //However you want to call it.

##Usage:
The filter row will be used to get for example two filter arrays and a text search input
 - The filter arrays are domain specific
The filter row also needs to be usabale in other configurations (i.e. more filter / no text input)

##Requirements:
However the result will look it needs to be dynamic enought to handle domain specific data (not logic*)

##Type A
The filter row is indipendent and does not require any props.
That means a new copy of this file needs to be created for each domain
The filter row also invites a list of type string for each filter array to represent the filter items
Depending on code style guides a major part of the file needs to be rewritten
Rewriting the file on the other hand takes only a minute if the reader is used to it.
The filter row emits each kind of configuration field idependtly.

The reader can ignore the lower abstraction of the filter component or text search input
Its a blackbox that works.

##Type B
The filter row is indipendent but requires props.
The reader can ignore the filter row and also the filter or text search components.
They are blackboxes and work.

The props required by the filter row however need to be understood by the reader, but it's quite simple.
The SelectionEntity- and SelectionItem-Interface are used to setup the filter row.
The data used by the filter row needs be written for each domain new.
Writing the new data on the other hand takes only a few minutes if the reader is used to it.
The filter row modifys directly the state of the selection entity 
The filter row emits one event holding the complete current state of the filter row


##Learning
Both work, both need some time to get into the component or interface by the reader.

*Logic
The filter can select (add an item) deselect (remove an item), it uses a checkbox-input to display the state