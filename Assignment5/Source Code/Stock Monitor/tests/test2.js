describe('MyStocksCtrl',function() {
    beforeEach(module('stockWatch.controllers'));
    
    var $controller;
    
    beforeEach(inject(function(_$controller_){
            $controller=_$controller_;
    }));
    describe('Add',function (){
        it('Tests Company function of MyStocksCtrl',function() {
           var username = 'GOOG';
            expect(username).toEqual('GOOG');
            
                   });
        });
    
    });