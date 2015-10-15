describe('MyStocksCtrl',function() {
    beforeEach(module('stockWatch.controllers'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
            $controller=_$controller_;
    }));
    describe('login',function (){
        it('Tests login function of my controller',function() {
           
            var username = 'yatheesh';
            var password = 'secret7';
            expect(username).toEqual('yatheesh');
            
                   });
        });
    
    });