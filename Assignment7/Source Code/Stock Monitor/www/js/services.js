angular.module('stockWatch.services', [])

.factory('encodeURIService', function(){

  return {
    encode: function(string){
      console.log(string);
      return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, escape);
    }
  };

})
.service('LoginService', function($q, $http) {
    return {
  loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/register?q={username:\''+name+'\'}&apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        contentType:"application/json"
        
    }).success(function(data){
     alert(data[0]._id.$oid);
      if (name == data[0].username && pw == data[0].password) {
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
                 
    })
    promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
  }
            
        }})
.service('DeleteService', function($q, $http) {
    return {
        
         deleteUser:function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/register?q={username:\''+name+'\'}&apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        contentType:"application/json"
        
    }).success(function(data){
     alert(data[0]._id.$oid);
      if (name == data[0].username && pw == data[0].password) {
         
          $http({
              method: 'DELETE' ,   
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/register/'+data[0]._id.$oid+'?apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
		 
             }).success(function (data) { 
             alert(1);
             })
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
                 
    })
    promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;

        }
        
    }
         })


  .service('UpdateService', function($q, $http) {
    return {
        
         updateUser:function(fname, lname, address, age, email, username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/register?q={username:\''+username+'\'}&apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        contentType:"application/json"
        
    }).success(function(data){
     //alert(data[0]._id.$oid);
      if (name == data[0].username ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/register/'+data[0]._id.$oid+'?apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
		 data: JSON.stringify( { "$set" : { "password" : password } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             alert(1);
             })
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
                 
    })
    promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;

        }
        
    }
         })

.service('RegisterService', function($q, $http) {
    return {
        RegisterUser: function(fname, lname, address, age, email, username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
          $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections//register?apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        data: JSON.stringify({
       firstname: fname,
        lastname: lname,
        address: address,
        age: age,
        email: email,
        username: username,
        password: password,
    }),
        contentType:"application/json"
        
    }).success(function(data){
            
             alert(data);
              deferred.resolve('Welcome!');
            /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('please fill all the fields');
            }
              */ 
    
    })
           promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
           
        }
    }
})
///
.service('BuyService', function($q, $http) {
    return {
        BuyShare: function(company, shares, price) {
            var deferred = $q.defer();
            var promise = deferred.promise;
          $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections//stocks?apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        data: JSON.stringify({
       company: company,
        shares: shares,
        price: price,
    }),
        contentType:"application/json"
        
    }).success(function(data){
            
             alert(data);
              deferred.resolve('Welcome!');
            /* if ( data[0].username != null && data[0].password != null && data[0].lastname != null && data[0].firstname != null &&data[0].email != null ) {
                deferred.resolve('Welcome ' + data[0].username + '!');
            } else {
                deferred.reject('please fill all the fields');
            }
              */ 
    
    })
           promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
           
        }
    }
})
///
//SellService.sellShare
.service('SellService', function($q, $http) {
    return {
        
         sellShare:function(company, shares) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/stocks?q={company:\''+company+'\'}&apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        contentType:"application/json"
        
    }).success(function(data){
     alert(data[0]._id.$oid);
      if (company == data[0].company) {
         
          $http({
              method: 'DELETE' ,   
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/stocks/'+data[0]._id.$oid+'?apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
		 
             }).success(function (data) { 
             alert(1);
             })
                deferred.resolve('Welcome ' + data[0].company + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
                 
    })
    promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;

        }
        
    }
         })

//
////UpdateShareService.updateShare
 .service('UpdateShareService', function($q, $http) {
    return {
        
         updateShare:function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
             $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/stocks?q={company:\''+name+'\'}&apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
        contentType:"application/json"
        
    }).success(function(data){
     alert(data[0]._id.$oid);
      if (name == data[0].company ) {
         
          $http({
              method: 'PUT' ,   
        url: 'https://api.mongolab.com/api/1/databases/stockmonitor/collections/stocks/'+data[0]._id.$oid+'?apiKey=wefPCJS1Ns9Zi8Xqx5ly_Goixo3U1zzN',
		 data: JSON.stringify( { "$set" : { "shares" : pw } } ),
		 
		  contentType: "application/json"
             }).success(function (data) { 
             alert(1);
             })
                deferred.resolve('Welcome ' + data[0].company + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
                 
    })
    promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;

        }
        
    }
         })

////

.factory('dateService', function($filter){

  var currentDate = function(){
    var d = new Date();
    var date = $filter('date')(d,'yyyy-MM-dd');
    return date;
  };

  var oneYearAgoDate = function(){
    var d = new Date(new Date().setDate(new Date().getDate() - 365));
    var date = $filter('date')(d, 'yyyy-MM-dd');
    return date;

  };

  return {
    currentDate: currentDate,
    oneYearAgoDate: oneYearAgoDate
  };

})

.factory('stockDetailsCacheService', function(CacheFactory){

  var stockDeatailsCache;

  if(!CacheFactory.get('stockDeatailsCache')){
    stockDeatailsCache = CacheFactory('stockDeatailsCache', {
      maxAge: 60 * 1000,
      deleteOnExpire:'aggressive',
      storageMode: 'localStorage'
    });
  }else{
    stockDeatailsCache = CacheFactory.get('stockDeatailsCache');
  }

  return stockDeatailsCache;

})

.factory('stockDataService', function($q,$http, encodeURIService, stockDetailsCacheService){

  var getDetailsData=function(ticker){

    var deferred=$q.defer(),

    cacheKey = ticker,
    stockDeatailsCache = stockDetailsCacheService.get(cacheKey),
    query = 'select * from yahoo.finance.quotes where symbol IN ("' + ticker + '")',
    url = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIService.encode(query) + '&format=json&env=http://datatables.org/alltables.env';

    //console.log(url);
if(stockDeatailsCache){
  deferred.resolve(stockDeatailsCache);
}else {
    $http.get(url)
      .success(function(json){
        var jsonData = json.query.results.quote;
        deferred.resolve(jsonData);

        stockDetailsCacheService.put(cacheKey, jsonData);
      })
      .error(function(err){
          console.log("Details Data Error"+ err);
          deferred.reject();
    });
}

      return deferred.promise;
  };


 var getPriceData=function(ticker){

   var deferred = $q.defer(),
       url='http://finance.yahoo.com/webservice/v1/symbols/'+ ticker + '/quote?format=json&view=detail';

      $http.get(url)
        .success(function(json){
          var jsonData = json.list.resources[0].resource.fields;
          deferred.resolve(jsonData);
      })
        .error(function(err){
            console.log("Price Data Error"+ err);
            deferred.reject();
  });

  return deferred.promise;

};

  return {
    getPriceData: getPriceData,
    getDetailsData: getDetailsData
  };
})


.factory('chartDataCacheService', function(CacheFactory){

  var chartDataCache;

  if(!CacheFactory.get('chartDataCache')){
    chartDataCache = CacheFactory('chartDataCache', {
      maxAge: 60 * 60 * 8 * 1000,
      deleteOnExpire:'aggressive',
      storageMode: 'localStorage'
    });
  } else {
    chartDataCache = CacheFactory.get('chartDataCache');
  }

  return chartDataCache;

})

.factory('chartDataService', function($q, $http, encodeURIService, chartDataCacheService){

  var getHistoricalData = function(ticker, fromDate, todayDate){

    var deferred = $q.defer(),

    cacheKey = ticker,
    chartDataCache = chartDataCacheService.get(cacheKey),
    query= 'select * from yahoo.finance.historicaldata where symbol = "'+ ticker + '" and startDate = "'+ fromDate + '" and endDate = "'+ todayDate +'"',
    url = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIService.encode(query) + '&format=json&env=http://datatables.org/alltables.env';

if(chartDataCache){
  deferred.resolve(chartDataCache);
}else{
    $http.get(url)

      .success(function(json){
        console.log(json);
        var jsonData=json.query.results.quote;

        var priceData=[],
            volumeData=[];

        jsonData.forEach(function(dayDataObject){

          var dateToMillis = dayDataObject.Date,
          date = Date.parse(dateToMillis),
          price = parseFloat(Math.round(dayDataObject.Close * 100) / 100).toFixed(3),
          volume = dayDataObject.Volume,

          volumeDatum = '['+ date + ',' + volume + ']',
          priceDatum = '['+ date + ',' + price + ']';

          //console.log(volumeDatum, priceDatum);

          volumeData.unshift(volumeDatum);
          priceData.unshift(priceDatum);

        });

        var formattedChartData =
        '[{' +
          '"key":' + '"volume",' +
          '"bar":' + 'true,' +
          '"values":' + '[' + volumeData + ']' +
          '},' +
          '{' +
          '"key":' + '"' + ticker + '",' +
          '"values":' + '[' + priceData + ']' +
        '}]';

      deferred.resolve(formattedChartData);
      chartDataCacheService.put(cacheKey, formattedChartData);

      })
      .error(function(err){
        console.log('chartsDataService Error'+ err);
        deferred.reject();
      });
    }

      return deferred.promise;

  };

  return{
    getHistoricalData: getHistoricalData
  };



})

.factory('notesCacheService', function(CacheFactory){

  var notesCache;

  if(!CacheFactory.get('notesCache')){
    notesCache = CacheFactory('notesCache', {
      storageMode: 'localStorage'
    });
  }else{
    notesCache = CacheFactory.get('notesCache');
  }
  return notesCache;
})

.factory('notesService', function(notesCacheService){

  return {

    getNotes: function(ticker){
      return notesCacheService.get(ticker);
    },

    addNote: function(ticker, note){

      var stockNotes=[];

      if(notesCacheService.get(ticker)){
        stockNotes=notesCacheService.get(ticker);
        stockNotes.push(note);
      }else{
        stockNotes.push(note);
      }
      notesCacheService.put(ticker, stockNotes);
    },

    deleteNote: function(ticker, index){

      var stockNotes = [];

      stockNotes = notesCacheService.get(ticker);
      stockNotes.splice(index, 1);
      notesCacheService.put(ticker, stockNotes);

    }

  };

})

.factory('newsService', function($q, $http){

  return {

    getNews: function(ticker){
      var deferred = $q.defer(),
      x2js = new X2JS(),

      url='http://finance.yahoo.com/rss/headline?s='+ ticker;

      $http.get(url)
      .success(function(xml){

        var xmlDoc=x2js.parseXmlString(xml),
        json = x2js.xml2json(xmlDoc),
        jsonData = json.rss.channel.item;

        deferred.resolve(jsonData);

      })
      .error(function(err){
        deferred.reject();
        console.log('News Service Error', err);
      });

      return deferred.promise;
    }

  };

})

.factory('fillMyStocksCacheService', function(CacheFactory){

  var myStocksCache;

  if(!CacheFactory.get('myStocksCache')){
    myStocksCache = CacheFactory('myStocksCache', {
      storageMode: 'localStorage'
    });
  }else{
    myStocksCache=CacheFactory.get(myStocksCache);
  }

  var fillMyStocksCache = function(){
    var myStocksArray=[
      {ticker:'AAPL'},
      {ticker:'GPRO'},
      {ticker:'FB'},
      {ticker:'NFLX'},
      {ticker:'TSLA'},
      {ticker:'BRK-A'},
      {ticker:'INTC'},
      {ticker:'MSFT'},
      {ticker:'GE'},
      {ticker:'BAC'},
      {ticker:'C'},
      {ticker:'T'}
    ];

    myStocksCache.put('myStocks', myStocksArray);
  };

  return {
    fillMyStocksCache: fillMyStocksCache
  };

})

.factory('myStocksCacheService', function(CacheFactory){

  var myStocksCache = CacheFactory.get('myStocksCache');

  return myStocksCache;

})

.factory('myStocksArrayService', function(fillMyStocksCacheService, myStocksCacheService){

  if(!myStocksCacheService.info('myStocks')){
    fillMyStocksCacheService.fillMyStocksCache();
  }

  var myStocks=myStocksCacheService.get('myStocks');

  return myStocks;

})

.factory('followStocksService', function(myStocksArrayService, myStocksCacheService){

  return {

    follow:function(ticker){

      var stockToAdd = {'ticker': ticker};


      myStocksArrayService.push(stockToAdd);
      myStocksCacheService.put('myStocks', myStocksArrayService);

    },

    unfollow:function(ticker){
      for (var i = 0; i < myStocksArrayService.length; i++) {
        if(myStocksArrayService[i].ticker == ticker){
          myStocksArrayService.splice(i, 1);
          myStocksCacheService.remove('myStocks');
          myStocksCacheService.put('myStocks', myStocksArrayService);

          break;
        }
      }
    },

    checkFollowing:function(ticker){
      for (var i = 0; i < myStocksArrayService.length; i++) {
        if (myStocksArrayService[i].ticker == ticker) {
          return true;
        }
      }

      return false;
    }
  };

})

.service('modalService', function($ionicModal){

  this.openModal = function(id){
    var _this = this;

    if(id==1){
    $ionicModal.fromTemplateUrl('templates/search.html', {
      scope: null,
      controller: 'SearchCtrl'
    }).then(function(modal) {
      _this.modal = modal;
      _this.modal.show();
    });
  }else if(id==2){
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
  }else if(id ==3){
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
  }
  };

  this.closeModal = function(){
    var _this = this;

    if(!_this.modal) return;
    _this.modal.hide();
    _this.modal.remove();
  };

})

.factory('searchService', function($q, $http){

  return {
    search: function(query){
      var deferred = $q.defer(),

      url='http://d.yimg.com/autoc.finance.yahoo.com/autoc?query="'+ query +'"&callback=YAHOO.Finance.SymbolSuggest.ssCallback';

      YAHOO = window.YAHOO = {
        Finance : {
          SymbolSuggest: {}
        }
      };

      YAHOO.Finance.SymbolSuggest.ssCallback = function(data){
        var jsonData = data.ResultSet.Result;
        deferred.resolve(jsonData);
      };
      $http.jsonp(url)
      .then(YAHOO.Finance.SymbolSuggest.ssCallback);

      return deferred.promise;
    }
  };

})

;
