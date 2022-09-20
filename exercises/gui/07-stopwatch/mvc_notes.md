# Overview
Review Juan's implementation of the stopwatch, using the MVC architecture.

# Model

## Constructor
- Initialize time components as properties of `Model`: hours, minutes, seconds, centiseconds
- Initialize null variable `intervalId` which will act as a handler for the `setInterval` process.

## Methods 
- `startWatch`: Create a `setInterval` object
  - Interval: 1 centisecond = 10 milliseconds
  - On every interval, increment `centiseconds` by 1.
  - Update all other time components.
  - Thresholds at which we need to advance the next time component:
    - centiseconds > 99: Advance seconds. Reset centiseconds to 0.
    - seconds > 59: Advance minutes. Reset seconds to 0.
    - minutes > 59: Advance hours. Reset minutes to 0.
    - hours > 99: Stopwatch's limits exceeded. Reset stopwatch by clearing `setInterval`.
  - Update the View by invoking `timeChanged` and passing the new state of the time.
- `stopWatch`: Clear the `setInterval`.
- `reset`
  - Set all time components to 0.
  - Clear the `setInterval`.
- `bindTimeChanged`: Assign `Model.timeChanged` to the passed callback.

# View
- Responsible for storing data related to the display of the stopwatch (the time components).
- Responsible for monitoring for user events (clicking buttons) and executing the appropriate handlers.
  - The handler logic is not necessarily written in View. Rather, it may be passed in from Controller, and simply called in View.

## Constructor
- Create variables referencing DOM elements, and store as properties of `View`: hours, minutes, seconds, centiseconds, start/stop button, reset button.

## Methods
- `updateTime`: Takes an object containing time components, converts them to Strings, and replaces the text of the DOM elements.
- `bindClickStartStop`: Bind event handler to Start/Stop button.
  - Swap text between "Start" and "Stop", and execute the appropriate event handler.
- `bindClickReset`: Bind event handler to the Reset button.

# Controller
- Responsible for orchestrating the data flow between View (user events) and Model (application data).

## Contructor
- Stores instances of Model and View.
- Binds its own methods to the Controller instance itself (`this`). The Controller is the glue between Model and View. Events occurring in Model may impact what is displayed in View, and vice versa. However we do not want Model and View to have direct access to each other. Therefore, the pattern we use is:
  - Create a method in Controller that invokes a method in Model.
  - Bind that method to the Controller instance.
  - Pass the resulting method to View.
  - Within View, invoke that method.
- We do this vice versa as well, from View to Model.

## Methods
- `onTimeChanged`: The time changes every 10 ms. This occurs in Model. We need some way to update the View when this occurs. `onTimeChange` updates the View with the data passed as a time object. We bind `onTimeChanged` to Controller, and pass this to Model. Model stores this as one of its methods, and calls it every 10 ms.
- `handleStart`, `handleStop`: In View, the user may click the start and stop buttons. We need some way to start and and stop the `setInterval` process in Model when this occurs. We create `handleStart` and `handleStop` which perform these operations in Model. We bind both to Controller and pass them to View. In View, we attach event handlers to the start/stop buttons, which call these passed methods.
- `handleReset` does the same thing, but for the Reset button.

# Startup
On DOM load, create an instance of the Controller, passing as arguments new instances of Model and View