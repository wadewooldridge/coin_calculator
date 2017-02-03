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

