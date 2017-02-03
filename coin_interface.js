/**
 *  coin_calculator - Programming exercise for NCsoft.
 *  coin_interface.js - Main Angular app and controller to manage interface.
 */

// Main Angular app and controller.
var app = angular.module('coinApp', []);

app.controller('coinController', ['$log', function($log) {
    var self = this;

    // Denominations for the four coin types.
    this.denominations = [25, 10, 5, 1];

    // Quantities for the four coin types.
    this.quantities = [0, 0, 0, 0];

    // Total change required from the input field.
    this.totalRequired = undefined;

    // Main flag to say whether a solution is available and should be displayed.
    this.solved = false;

    // Flag of whether there is an error to display, and what the error message is.
    this.errorFlag = false;
    this.errorMessage = '';

    // Main instance of the CoinCalculator class. This is start as undefined, and will be set back to undefined
    // any time the denominations are changed. If the denominations are not changed, it can be reused.
    this.coinCalculator = undefined;

    // Button handler for "Calculate".
    this.onCalculate = function() {
        $log.log('onCalculate: ' + this.totalRequired);
        this.solved = false;
        this.errorFlag = false;

        try {
            if (this.coinCalculator === undefined) {
                this.coinCalculator = new CoinCalculator(this.denominations);
            }
            this.quantities = this.coinCalculator.calculateQuantities(this.totalRequired);
            this.solved = true;
        }
        catch (err) {
            this.errorMessage = err.name + ': ' + err.message;
            this.errorFlag = true;
        }

    };

    // Change handler for new denomination: clear out any old solution, and destroy any existing coinCalculator.
    this.onNewDenomination = function() {
        $log.log('onNewDenomination');
        this.solved = false;
        this.errorFlag = false;
        this.coinCalculator = undefined;
    };

    // Change handler for new total: clear out any old solution.
    this.onNewTotal = function() {
        $log.log('onNewTotal');
        this.solved = false;
        this.errorFlag = false;
    };

}]);
