angular.module('stockWatch.controllers', [])

.controller('AppCtrl', ['$scope','modalService',
  function($scope, modalService) {

    $scope.modalService = modalService;

}])

.controller('MyStocksCtrl', ['$scope', 'myStocksArrayService',
  function($scope, myStocksArrayService) {

    $scope.myStocksArray = myStocksArrayService;
    console.log(myStocksArrayService);

}])
.controller('CntctCntrl', ['$scope', function($scope,$cordovaSms, $cordovaVibration){
	$scope.sendEmail = function(){
		if(window.plugins && window.plugins.emailComposer){
			window.plugins.emailComposer.showEmailComposerWithCallback(function(result){
				alert("Email success");
			},
			"Stock Monitor - Feed back",
			$scope.message,
			["yatheesh628svu@gmail.com"],
			null,
			null,
			false,
			null,
			null
			);
		}
	};
	 var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: '' // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
        //intent: 'INTENT' // send SMS inside a default SMS app
    }
  };
	$scope.sendSMS = function($cordovaSms) {
    $cordovaSms
      .send('8162239377', 'This is some dummy text', options)
      .then(function() {
        alert('Success');
        // Success! SMS was sent
      }, function(error) {
        alert('Error');
        // An error occurred
      });
  };
  $scope.splashScreen = function(){
	  navigator.splashscreen.show();
  };
  $scope.vibrate = function($cordovaVibration){
	  $cordovaVibration.vibrate(100);
  }
}])
/////
.controller('ShareCtrl', function($scope, BuyService, SellService, UpdateShareService, $ionicPopup, $state) {
     $scope.data = {};
 
    $scope.buy = function(){
      
            BuyService.BuyShare($scope.data.company, $scope.data.shares, $scope.data.price).success(function(data) {
           alert($scope.data.company);
                //$state.go('login');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Buy Share failed!',
                template: 'Please check your details!'
            });
        });
    }
	
	    $scope.sell =function()
		{
         SellService.sellShare($scope.data.company, $scope.data.shares).success(function(data) {
         var alertPopup = $ionicPopup.alert({
                title: 'Sold!',
                template: 'Your shares sold succesfully!'
            });
		}).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid shares!',
                template: 'Please check your shares!'
            });
        });
		}
		 $scope.update =function()
		{
			alert($scope.data.company+ $scope.data.shares);
         UpdateShareService.updateShare($scope.data.company, $scope.data.shares).success(function(data) {
         var alertPopup = $ionicPopup.alert({
                title: 'Updated!',
                template: 'Your shares updates succesfully!'
            });
		}).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Invalid Shares!',
                template: 'Please check your shares!'
            });
        });
		}
	
})
/////////
.controller('RegisterCtrl', function($scope, RegisterService, DeleteService, UpdateService, $ionicPopup, $state) {
     $scope.data = {};
 
    $scope.register = function(email){
      
            RegisterService.RegisterUser($scope.data.firstname, $scope.data.lastname, $scope.data.address, $scope.data.age, $scope.data.email, $scope.data.username, $scope.data.password ).success(function(data) {
           alert($scope.data.lastname);
                $state.go('app.login');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Registration failed!',
                template: 'Please check your credentials!'
            });
        });
    }
	
	    $scope.delete =function(username)
		{
         DeleteService.deleteUser($scope.data.username, $scope.data.password).success(function(data) {
         var alertPopup = $ionicPopup.alert({
                title: 'Deleted!',
                template: 'Your account is deleted succesfully!'
            });
		}).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
		}
		 $scope.update =function()
		{
         UpdateService.updateUser($scope.data.firstname, $scope.data.lastname, $scope.data.address, $scope.data.age, $scope.data.email, $scope.data.username, $scope.data.password).success(function(data) {
         var alertPopup = $ionicPopup.alert({
                title: 'Updated!',
                template: 'Your account is updated succesfully!'
            });
		}).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Update failed!',
                template: 'Please check your credentials!'
            });
        });
		}
	
})
.controller('LoginCtrl', function($scope, LoginService, DeleteService, UpdateService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function(username) {
         LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            alert("success");
			$state.go('app.myStocks');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
           
    }
    $scope.signup =function()
    {
        $state.go('register');
    }
 
      $scope.update =function(username)
    {
         UpdateService.updateUser($scope.data.username, $scope.data.password).success(function(data) {
         var alertPopup = $ionicPopup.alert({
                title: 'Deleted!',
                template: 'Your account is deleted succesfully!'
            });
    }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
}
}
)

.controller('StockCtrl', ['$scope','$window', '$ionicPopup', '$stateParams', 'stockDataService', 'dateService', 'chartDataService', 'notesService', 'newsService', 'followStocksService',
   function($scope, $window, $ionicPopup, $stateParams, stockDataService, dateService, chartDataService, notesService, newsService, followStocksService) {

     $scope.ticker = $stateParams.stockTicker;
     $scope.chartView = 4;
     $scope.oneYearAgoDate = dateService.oneYearAgoDate();
     $scope.todayDate = dateService.currentDate();

     $scope.stockNotes=[];

     $scope.following = followStocksService.checkFollowing($scope.ticker);



     $scope.$on('$ionicView.afterEnter', function(){
       getPriceData();
       getDetailsData();
       getChartData();
       getNews();
       $scope.stockNotes = notesService.getNotes($scope.ticker);
     });

     $scope.toggleFollow = function(){
       if ($scope.following) {
         followStocksService.unfollow($scope.ticker);
         $scope.following=false;
       } else{
         followStocksService.follow($scope.ticker);
         $scope.following = true;
       }
     };

     $scope.chartViewFunc=function(inp){
       $scope.chartView=inp;
     };

     $scope.openWindow= function(link){
       //TODO install and setup in app browser
       console.log("openWindow ->" + link);
       console.log($scope.newsStories[3]);
     };


 $scope.addNote = function() {
  $scope.note = {title: 'Note', body: '', date: $scope.todayDate, ticker: $scope.ticker};

  // An elaborate, custom popup
  var note = $ionicPopup.show({
    template: '<input type="text" ng-model="note.title" id="stock-note-title"><textarea type="text" ng-model="note.body" id="stock-note-body"></textarea>',
    title: 'New Note for '+ $scope.ticker,
    scope: $scope,
    buttons: [
      { text: 'Cancel',
        onTap: function(e){
          return;
        }
     },
      {
        text: '<b>Save</b>',
        type: 'button-balanced',
        onTap: function(e) {
        notesService.addNote($scope.ticker, $scope.note);
        }
      }
    ]
  });
  note.then(function(res) {
    $scope.stockNotes= notesService.getNotes($scope.ticker);
  });
};


$scope.openNote = function(index, body, title) {
 $scope.note = {title: title, body: body, date: $scope.todayDate, ticker: $scope.ticker};

 // An elaborate, custom popup
 var note = $ionicPopup.show({
   template: '<input type="text" ng-model="note.title" id="stock-note-title"><textarea type="text" ng-model="note.body" id="stock-note-body"></textarea>',
   title: $scope.note.title,
   scope: $scope,
   buttons: [
     {
       text: 'Delete',
       type: 'button-assertive button-small',
       onTap: function(e){
         notesService.deleteNote($scope.ticker, index);
       }
     },
     { text: 'Cancel',
       type: 'button-small',
       onTap: function(e){
         return;
       }
    },
     {
       text: '<b>Save</b>',
       type: 'button-balanced button-small',
       onTap: function(e) {
       notesService.deleteNote($scope.ticker, index);
       notesService.addNote($scope.ticker, $scope.note);
       }
     }
   ]
 });
 note.then(function(res) {
   $scope.stockNotes= notesService.getNotes($scope.ticker);
 });
};


  function getNews(){
    $scope.newsStories=[];

    var promise = newsService.getNews($scope.ticker);

    promise.then(function(data){
      $scope.newsStories = data;
    });
  }



     function getPriceData(){


     var promise = stockDataService.getPriceData($scope.ticker);
     promise.then(function(data){
       $scope.stockPriceData = data;

       if(data.chg_percent>=0 && data !== null){
         $scope.reactiveColor = {'background-color':'#33cd5f', 'border-color' : 'rgba(255,255,255,.3)'};
       } else if(data.chg_percent <=0 && data !== null){
         $scope.reactiveColor = {'background-color':'#ef473a', 'border-color' : 'rgba(0,0,0,.2)'};
       }
     });
   }

   function getDetailsData(){

   var promise = stockDataService.getDetailsData($scope.ticker);
   promise.then(function(data){

     //console.log(data);

     $scope.stockDetailsData = data;
   });
   }

   function getChartData(){
     var promise = chartDataService.getHistoricalData($scope.ticker, $scope.oneYearAgoDate, $scope.todayDate);

     promise.then(function(data){

       $scope.myData = JSON.parse(data)
     .map(function(series) {
       series.values = series.values.map(function(d) { return {x: d[0], y: d[1] }; });
       return series;
     });

     });
   }


   //NV-CHART EXAMPLE



	var xTickFormat = function(d) {
		var dx = $scope.myData[0].values[d] && $scope.myData[0].values[d].x || 0;
		if (dx > 0) {
      return d3.time.format("%b %d")(new Date(dx));
		}
		return null;
	};

  var x2TickFormat = function(d) {
    var dx = $scope.myData[0].values[d] && $scope.myData[0].values[d].x || 0;
    return d3.time.format('%b %Y')(new Date(dx));
  };

  var y1TickFormat = function(d) {
    return d3.format(',f')(d);
  };

  var y2TickFormat = function(d) {
    return d3.format('s')(d);
  };

  var y3TickFormat = function(d) {
    return d3.format(',.2s')(d);
  };

  var y4TickFormat = function(d) {
    return d3.format(',.2s')(d);
  };

  var xValueFunction = function(d, i) {
    return i;
  };

  var marginBottom=($window.innerWidth / 100) * 10;

	$scope.chartOptions = {
    chartType: 'linePlusBarWithFocusChart',
    data: 'myData',
    margin: {top: 15, right: 0, bottom: marginBottom, left: 0},
    interpolate: "cardinal",
    useInteractiveGuideline: false,
    yShowMaxMin: false,
    tooltips: false,
    showLegend: false,
    useVoronoi: false,
    xShowMaxMin: false,
    xValue: xValueFunction,
    xAxisTickFormat: xTickFormat,
    x2AxisTickFormat: x2TickFormat,
    y1AxisTickFormat: y1TickFormat,
    y2AxisTickFormat: y2TickFormat,
    y3AxisTickFormat: y3TickFormat,
    y4AxisTickFormat: y4TickFormat,
    transitionDuration: 500,
    y1AxisLabel: 'Price',
    y3AxisLabel: 'Volume',
    noData: 'Loading Data...'
	};

}])

.controller('SearchCtrl', ['$scope','$state', 'modalService','searchService',
function($scope, $state, modalService, searchService){

  $scope.closeModal = function(){
    modalService.closeModal();
  };

  $scope.search = function(){
    $scope.searchResults='';
    startSearch($scope.searchQuery);
  };

  var startSearch = ionic.debounce(function(query){
    searchService.search(query)
    .then(function(data){
      $scope.searchResults=data;
    });
  }, 750);

  $scope.goToStock = function(ticker){

    modalService.closeModal();
    $state.go('app.stock', {stockTicker: ticker});


  };

}])

;
