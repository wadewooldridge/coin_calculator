# coin_calculator
Coin change calculator exercise for NCsoft, by Wade Wooldridge

## Problem Statement
See problem.docx and problem.jpg for a full description of the requirements.

## Design Notes
- I chose to use Bootstrap for the basic grid layout, and Angular for the
data binding and the easy hide/show of the solution quantities.
- I chose to break the problem into coin_interface.html and .js for the
interface, and coin_calculator.js for the class to hold the request and do
the calculations. This is to make that part of the solution reusable.
- I wanted to have the interface auto-sort any new quantities, but I rejected
that as possibly confusing to the users. That did mean that I had to add logic
to CoinCalculator to accept the denominations in any order, sort them for 
internal use, then put the resultant quantities back into the requested order.
- Error handling was not specified, so I chose to have the CoinCalculator 
class throw exceptions such as TypeError back for invalid parameters passed
to it. I added a try/catch block in the interface code to display this error,
and clear it when the values are modified again.
- The initial implementation allowed for any order of denominations as
specified, but limited itself to a "greedy" algorithm working from
highest-to-lowest denomination.  The full implementation to support all
possible combanations will require more sophisticated dynamic programming
logic.

