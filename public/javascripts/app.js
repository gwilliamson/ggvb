/**
 * Created by gwilliamson on 11/29/14.
 */
(function () {

    var app = angular.module('budget', [ ]);

    app.controller('BudgetController', [ '$scope', '$http', function($scope, $http) {
        var budget = this;
        budget.term = {};
        budget.spent = 0;
        budget.left = 0;
        budget.transactions = [];

        $scope.save = function(transaction) {
            console.log(transaction);
            $http.post('api/transactions', transaction)
                .success(function(data) {
                    $scope.refreshTransactions();
                    $scope.refreshTerm();
                    $scope.transaction = {};
                })
                .error(function(data) {
                    console.log('Could not post transaction');
                })
        }

        $scope.delete = function(transactionId) {
            $http.delete('api/transactions/' + transactionId)
                .success(function(data) {
                    $scope.refreshTransactions();
                    $scope.refreshTerm();
                })
                .error(function(data) {
                    console.log('Could not delete transaction')
                })
        }

        $scope.refreshTransactions = function() {
            $http.get('api/transactions')
                .success(function(data) {
                    budget.transactions = data;
                })
                .error(function(data) {
                    console.log('Errory!');
                });
        }

        $scope.getTotalSpent = function(termId) {
            $http.get('api/terms/' + termId + '/totalSpent')
                .success(function(data) {
                    budget.spent = data.totalSpent == null ? 0 : Math.round(data.totalSpent);
                    budget.left = budget.term.limit - budget.spent;
                })
                .error(function(data) {
                    console.log('Could not get total spent');
                })
        }

        $scope.refreshTerm = function() {
            var today = new Date();
            var month = today.getMonth();
            month++;
            var formatted = today.getFullYear() + '-' + month + '-' + today.getDate();
            $http.get('api/terms/' + formatted)
                .success(function(data) {
                    budget.term = data;
                    $scope.getTotalSpent(budget.term.termId);
                })
                .error(function(data) {
                    console.log('Oh noes');
                })
        }

        $scope.refreshTerm();
        $scope.refreshTransactions();
    }]);

})();
