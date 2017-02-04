/**
 *  coin_calculator - Programming exercise for NCsoft.
 *  coin_calculator.js - CoinCalculator class to do the real calculations.
 */

class CoinCalculator {

    /**
     *  constructor - main constructor for CoinCalculator
     *  @param {[number]}   denominations - Array of denominations.
     */
    constructor(denominations) {
        //console.log('CoinCalculator constructor: ' + denominations);
        var i;

        // Check basic passed parameters.
        if (!denominations || !Array.isArray(denominations) || denominations.length === 0) {
            throw new TypeError('denominations must be a non-empty array');
        }

        // Make a copy to prevent modifying the original.
        this.denominations = denominations.slice();
        // Make sure we have numeric values.
        for (i = 0; i < this.denominations.length; i++) {
            var n = parseInt(this.denominations[i]);
            if (isNaN(n) || n <= 0 || n > 999) {
                throw new TypeError('denominations must contain only valid positive integers 1-999');
            }
            this.denominations[i] = n;
        }

        // Now sort them in reverse order for use later.
        this.sortedDenominations = this.denominations.slice().sort(function(a,b){return b-a});

        // Check for duplicates.
        for (i = 0; i < this.sortedDenominations.length - 1; i++) {
            if (this.sortedDenominations[i] === this.sortedDenominations[i+1]) {
                throw new TypeError('denominations array cannot contain duplicate values');
            }
        }

        // Make sure they provided a 1-cent coin as the lowest.
        if (this.sortedDenominations[this.sortedDenominations.length - 1] != 1) {
            throw new TypeError('denominations must include a 1 as the lowest value');
        }

    }

    /**
     *  backSortQuantities - Given an array of quantities that correspond to this.sortedDenominations,
     *                       put the array back in the caller's order based on this.denominations.
     *  @param      {[number]}  quantities that conform to this.sortedDenominations.
     *  @returns    {[number]}  quantities that conform to this.denominations.
     */
    backSortQuantities(quantities) {
        //console.log('backSortQuantities: ' + quantities);
        var result = [];
        for (var sortedIndex = 0; sortedIndex < this.sortedDenominations.length; sortedIndex++) {
            var denomination = this.sortedDenominations[sortedIndex];

            for (var origIndex = 0; origIndex < this.denominations.length; origIndex++) {
                if (denomination === this.denominations[origIndex]) {
                    result[origIndex] = quantities[sortedIndex];
                    break;
                }
            }
        }

        //console.log('backSortQuantities result: ' + result);
        return result;
    }

    /**
     *  calculateBestQuantities - Calculate quantity of each denomination to get the total.
     *                            Much less efficient than "greedy" algorithm, but works for all cases.
     *  @param  {number}    total
     *  @return {[number]}  quantities of each denomination.
     */
    calculateBestQuantities(total) {
        //console.log('calculateBestQuantities: ' + total);

        // Set up a baseline "to beat", that uses all denomination-1 coins. Keep the quantity array and total coins.
        var bestQuantitiesSoFar = [0, 0, 0, total];
        var bestCoinCountSoFar = total;

        // Set up the multiple for-loop to find the solution. dx = denomination, qx = quantity, rx = remainder.
        var d0 = this.sortedDenominations[0];
        var d1 = this.sortedDenominations[1];
        var d2 = this.sortedDenominations[2];
        var d3 = 1;

        // Optimization: find the Least Common Multiple of the three non-1 numbers. However many times this can go
        // into the total, that will be done with the largest denomination.  We could subtract this out and then add
        // it back at the end, but instead we'll just use it as the starting point for the outer loop.

        var lcm = CoinCalculator.calculateLCM(d0, CoinCalculator.calculateLCM(d1, d2));
        //console.log('lcm: ' + lcm);
        var q0Base = Math.floor(total / lcm) * (lcm / d0);

        // Triple loop for finding the best fit.
        for (var q0 = q0Base; q0 <= Math.floor(total / d0); q0++) {
            var r0 = total - (d0 * q0);

            for (var q1 = 0; q1 <= Math.floor(r0 / d1); q1++) {
                var r1 = r0 - (d1 * q1);

                for (var q2 = 0; q2 <= Math.floor(r1 / d2); q2++) {
                    var r2 = r1 - (d2 * q2);
                    var q3 = r2;

                    var coinCount = q0 + q1 + q2 + q3;
                    if (coinCount < bestCoinCountSoFar) {
                        bestQuantitiesSoFar = [q0, q1, q2, q3];
                        bestCoinCountSoFar = coinCount;
                        //console.log('New best: ' + coinCount + ": [" + bestQuantitiesSoFar + ']');
                    }

                }
            }
        }

        // Return the best one we found.
        return this.backSortQuantities(bestQuantitiesSoFar);
    };

    /**
     *  calculateGreedyQuantities - Calculate quantity of each denomination to get the total.
     *                              Uses "greedy" algorithm starting from highest to lowest denomination.
     *                              Most efficient for regular coinage, but does not work in all cases for
     *                              other strange denominations.
     *  @param  {number}    total
     *  @return {[number]}  quantities of each denomination.
     */
    calculateGreedyQuantities(total) {
        //console.log('calculateGreedyQuantities: ' + total);
        var quantities = [];
        var remaining = total;

        for (var dIndex = 0; dIndex < this.sortedDenominations.length; dIndex++) {
            var denomination = this.sortedDenominations[dIndex];
            var quantity = 0;
            while (remaining >= denomination) {
                remaining -= denomination;
                quantity++;
            }
            //console.log('d: ' + denomination + ' = ' + quantity);
            quantities.push(quantity);
        }
        return this.backSortQuantities(quantities);
    }

    /**
     *  calculateQuantities - Calculate quantity of each denomination to get the total.
     *  @param  {number}    total
     *  @return {[number]}  quantities of each denomination.
     */
    calculateQuantities(total) {
        //console.log('calculateQuantities: ' + total);

        // Check passed parameter.
        total = parseInt(total);
        if (isNaN(total) || total < 0 || total > 999999) {
            throw TypeError('total must be a valid non-negative integer 0 to 999999');
        }

        // Todo: We could optimize this to always use the greedy calculation if the following conditions are met:
        // 1. The GCD of the three larger numbers is the third-largest number, and
        // 2. Each number is greater than the sum of the next two largest numbers.

        // Select either greedy or optimal calculations.
        if (this.sortedDenominations[0] === 25 &&
            this.sortedDenominations[1] === 10 &&
            this.sortedDenominations[2] ===  5 &&
            this.sortedDenominations[3] ===  1) {
            return this.calculateGreedyQuantities(total);
        } else {
            return this.calculateBestQuantities(total);
        }
    }

    /**
     *  calculateGCD - Greatest Common Divisor, Euclid-style.
     */
    static calculateGCD(a, b) {
        var temp;
        while (b != 0) {
            temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     *  calculateLCM - Least Common Multiple of two numbers.
     */
    static calculateLCM(a, b) {
        return (a * b) / CoinCalculator.calculateGCD(a, b);
    }

}

/**
 *  test_CoinCalculator - execute a series of self-tests to make sure the code is working.
 *  @returns    {boolean}   Success status.
 */
function test_CoinCalculator() {
    //console.log('test_CoinCalculator');
    var testPassed = true;

    var testData = [
        // Basic test.
        {
            denominations:  [25, 10, 5, 1],
            total:          117,
            expected:       [4, 1, 1, 2]
        },
        // Other order of operands.
        {
            denominations:  [1, 5, 10, 25],
            total:          117,
            expected:       [2, 1, 1, 4]
        },
        {
            denominations:  [5, 25, 1, 10],
            total:          117,
            expected:       [1, 4, 2, 1]
        },
        // First test that fails with non-greedy interface.
        {
            denominations:  [25, 10, 6, 1],
            total:          19,
            expected:       [0, 0, 3, 1]
        },
        // Non-greedy with operands in other orders.
        {
            denominations:  [1, 6, 10, 25],
            total:          19,
            expected:       [1, 3, 0, 0]
        },
        {
            denominations:  [6, 1, 25, 10],
            total:          69,
            expected:       [3, 1, 2, 0]
        }
    ];

    for (var testIndex = 0; testIndex < testData.length; testIndex++) {
        var testObj = testData[testIndex];
        var expected = testObj.expected;
        var coinCalculator = new CoinCalculator(testObj.denominations);
        var result = coinCalculator.calculateQuantities(testObj.total);

        var match = true;
        for (var i = 0; i < result.length; i++) {
            if (result[i] !== expected[i]) {
                console.warn('Index ' + testIndex + ': expected [' + expected + '], result [' + result + ']');
                testPassed = false;
                break;
            }
        }
    }

    return testPassed;
}

