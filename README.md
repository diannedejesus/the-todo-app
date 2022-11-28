# To Do List
This application is built with simplicity in mind, it is all about getting the person focused on what needs to get done, without them getting distracted with other items including the ones on their to-do list.

**Link to project:** Being Updated

![alt tag](https://github.com/diannedejesus/100devs_todo/blob/main/todoapp.PNG)

## What is it made with: 

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, EJS

## How It's Made:

This is a one-page application that handles six routes built for the app. You use the form at the bottom of the page to create a to-do item with a due date and type. If no due date is provided the current date will be automatically applied. If the item is tagged as a priority it will be displayed in that section if it is tagged as additional, it will be placed in a hidden menu. If you select the item as an event it will be placed in the event section but only if it is one of the three most recent events.

When an event or priority item is checked it is placed in the completed section. This lets the user have a tally of what they have accomplished since we tend to underestimate or overestimate the work we do, it is nice to have a visual representation. You cant do this with additional items (since you aren't supposed to be working on them) until you move them to your priority section.

Additional items can be viewed by pressing the + button. Events are marked with a blank calendar icon and priority items with a full star and additional with an empty star. By clicking on the star you can move items from one section to another (priority to additional or vice versa). You can't move events since they are automatically handled. Once you mark an event as completed or delete an event the next one is placed.

<!-- ## What problem is this software addressing? Who will be using it? 
In a world dedicated to productivity, the amount of thing you need and/or want to get done in a day can feel over whelming. Even if the tasks are acheivable. Have a way to focus and have a history of your accountablity can help put things in purspective. That is what the this app is for. Helping people who need to get things done but find it hard to get going and keep going.

Things to change
Reformat the program to MVC, possibly to switch to react to allow a more customizable UI. Rework the interfase to assure concentration.
-->

## Optimizations

The next thing I would do with this application is building a couple of more layouts, and add a bit more functionality behind the scenes for prioritizing items. I would implement a quotes API to provide daily inspiration for the user and move the add section.

## Lessons Learned:

In this project, I had a hard deadline and lots of ideas. All these seemed simple but altogether would push the final product back. So I need to recheck the scope of the project with the functionality needed. I was able to get the basic functionality need and some additional functionality by rethinking the implementation and integrating it with what I had in a much simpler way.

## Other Projects:
Take a look at these projects that I have:

**Tic Tac Toe:** https://github.com/diannedejesus/knowledge-aquisition/tree/main/tictactoe

**Coin Flipper:** https://github.com/diannedejesus/knowledge-aquisition/tree/main/coin-flipper

**Portfolio:** https://diannedejesus.netlify.app/
