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

    calculateGreedyQuantities(total) {
        console.log('calculateGreedyQuantities: ' + total);
        var quantities = [];
        var remaining = total;

        for (var dIndex = 0; dIndex < this.sortedDenominations.length; dIndex++) {
            var denomination = this.sortedDenominations[dIndex];
            var quantity = 0;
            while (total >= denomination) {
                total -= denomination;
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

        // For now, just calculate the greedy quantities.
        return this.calculateGreedyQuantities(total);
    }

}
