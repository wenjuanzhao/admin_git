app.controller('MailCtrl',["$scope",function ($scope) {
    $scope.folds = [
        {name: 'Inbox', filter:''},
        {name: 'Starred', filter:'starred'},
        {name: 'Sent', filter:'sent'},
        {name: 'Important', filter:'important'},
        {name: 'Draft', filter:'draft'},
        {name: 'Trash', filter:'trash'}
    ];
    $scope.labels = [
        {name: 'Angular', filter:'angular', color:'#23b7e5'},
        {name: 'Bootstrap', filter:'bootstrap', color:'#7266ba'},
        {name: 'Client', filter:'client', color:'#fad733'},
        {name: 'Work', filter:'work', color:'#27c24c'}
    ];
    $scope.labelClass = function(label) {
        return {
            'b-l-info': angular.lowercase(label) === 'angular',
            'b-l-primary': angular.lowercase(label) === 'bootstrap',
            'b-l-warning': angular.lowercase(label) === 'client',
            'b-l-success': angular.lowercase(label) === 'work'
        };
    };
    $scope.addLabel=function () {
        $scope.labels.push({
            name:$scope.newLabel.name,filter:angular.lowercase($scope.newLabel.name),color:"#ccc"
        })
        $scope.newLabel.name='';
    }
}])
app.controller('MailListCtrl',['$scope','mails','$stateParams',function ($scope,mails,$stateParams) {
    $scope.fold=$stateParams.fold;
    mails.all().then(function (mails) {
        $scope.mails=mails
    })

}])
app.controller('MailDetailCtrl',["$scope",'mails','$stateParams',function ($scope,mails,$stateParams) {
    mails.get($stateParams.mailID).then(function (mail) {
        $scope.mail= mail
    })
}])
angular.module('app').directive('labelColor',function () {
    return function (scope,el,attr) {
        el.css("color",attr.color)
    }
})