/**
 *  coin_calculator - Programming exercise for NCsoft.
 *  coin_calculator.js - CoinCalculator class to do the real calculations.
 */

class CoinCalculator {

    /**
     *  constuctor - main constructor for CoinCalculator
     *  @param {[number]}   denominations - Array of denominations.
     */
    constructor(denominations) {
        console.log('CoinCalculator constructor: ' + denominations);
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
            if (isNaN(n) || n <= 0) {
                throw new TypeError('denominations must contain only valid positive integers');
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
        console.log('backSortQuantities: ' + quantities);
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

        console.log('backSortQuantities result: ' + result);
        return result;
    }

    calculateBestQuantities(total) {
        console.log('calculateBestQuantities: ' + total);
        var quantities = [];
        var remaining = total;

        return [1, 2, 3, 4];
    };

    calculateGreedyQuantities(total) {
        console.log('calculateGreedyQuantities: ' + total);
        var quantities = [];
        var remaining = total;

        for (var dIndex = 0; dIndex < this.sortedDenominations.length; dIndex++) {
            var denomination = this.sortedDenominations[dIndex];
            var quantity = 0;
            while (remaining >= denomination) {
                remaining -= denomination;
                quantity++;
            }
            console.log('d: ' + denomination + ' = ' + quantity);
            quantities.push(quantity);
        }
        return this.backSortQuantities(quantities);
    }

    calculateQuantities(total) {
        console.log('calculateQuantities: ' + total);

        // Check passed parameter.
        total = parseInt(total);
        if (isNaN(total) || total < 0) {
            throw TypeError('total must be a valid non-negative integer');
        }

        // Todo: find out if there is a good way to determine whether the denominations will work for greedy.
        // Select either greedy or optimal calculations.
        /*
        if (this.sortedDenominations[0] === 25 &&
            this.sortedDenominations[1] === 10 &&
            this.sortedDenominations[2] ===  5 &&
            this.sortedDenominations[3] ===  1) {
         */
            return this.calculateGreedyQuantities(total);
            /*
        } else {
            return this.calculateBestQuantities(total);
        }  */
    }

}

/**
 *  test_CoinCalculator - execute a series of self-tests to make sure the code is working.
 *  @returns    {boolean}   Success status.
 */
function test_CoinCalculator() {
    console.log('test_CoinCalculator');
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

