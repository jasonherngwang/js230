# HTML
- Display windows
- Grid of buttons

# General Behavior
- Clicking buttons appends digits.
- If entry is 0, entering any digit (even 0) replaces it. Operations and decimal do not.
- Negative button is a toggle. It prepends or removes "-".
- There can be multiple lines of operations shown.
- Only one decimal point in the entry.
- Equal button calculates the value and replaces the entry with is, and clears the operations.
- Clicking an operator copies the entry and operator into the operation window. Fill the entry with the current result.
  - The next entry will overwrite this result.

# Controller

## Properties
- Model
- View

## Methods
Need to bind these View user events to Model operations:
- `handleNum`: Handles 0-9, decimal.
- `handleNeg`: Toggle negation of entry.
- `handleOp`: Handles +, -, /, *, %
- `handleEqual`: Handles =
- `handleClear`: Clear entry and operations. Replace entry with 0.
- `handleClearEntry`: Clear entry; replace with 0.

Model operations that need to update View
- `updateDisplay`: Updates entry and operations.

# Model

## Properties
- Current value of operations (Array)
- Current value of entry

## Methods
### Logic for entering a number
Possible options: 0-9, decimal "."
- After operation (fresh start)
  - If decimal, replace with "0.".
  - If number, replace entry with number.
- Not after operation (after other number input)
  - If entry is 0.
    - If decimal, replace with "0.".
    - If number, replace 0 with number.
  - If entry is not 0
    - If decimal, and decimal exists, return.
    - Append decimal or number to entry.

# View


## Component
- Display: History
- Display: Current value
- Number buttons 0-9
- CE button
- C button
- Operations: +, -, /, *
- Negative (-) button
- Decimal (.) button
- Divide (%) button
- Equal (=) button

## Methods
- `bind*` to attach user click events for each button to a passed-in handler from Controller.
  - For numbers and operations, can use jQuery to select multiple elements, extract the text, and send that text to the handler.
  - This string will be processed in a switch statement in Model.