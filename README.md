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
highest-to-lowest denomination.
- The second implementation allows for a "greedy" algorithm if the standard
coinage is used, and a "best fit" algorithm otherwise.  The best fit algorithm
is a cubic worst-case, so I limited the denominations to three digits (999)
and the total to four digits (9999).
- A full implementation would require another pass through to create a 
dynamic programming solution with memoization for optimization.  If this is
justified, we can pursue this. If the actual use case is coin changing, that
would be overkill. An interim amelioration of this could be achieved by doing
more checks to determine whether the greedy algorithm can be used.
- We could also add some wait indication to help the user understand that the
program is still working during some of the worst-case calculations.
- Added an optimization that will cover the worst cases, but calculating the 
Least Common Multiple of the three non-1 numbers, and assuming that however
many times this goes into the total, it will use the largest denomination.
Based on this, I relaxed the total from a max of 9999 to 999999.  However,
this can cause the worst-case result to sometimes overflow the quantity 
result circle. I didn't want to modify the sizes of these from the original
spec, so I made the background color light gray, so the overflow can at least
be seen.
- Per discussion with NCsort, added an optimization to not use "var" to
declare variables inside the triple-loop, and declare them all beforehand.
This only made about a 1% improvement, but I left it in.
