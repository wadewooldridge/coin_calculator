/**
 *  coin_calculator - Programming exercise for NCsoft.
 *  coin_calculator.js - CoinCalculator class to do the real calculations.
 */

class CoinCalculator {

    constructor(denominations) {
        console.log('CoinCalculator constructor: ' + denominations);
        this.denominations = denominations;
        this.sortedDenominations = denominations.sort().reverse();
    }

    calculateQuantities(total) {
        console.log('calculateQuantities: ' + total);
        return [1, 2, 3, 4];
    }

}
