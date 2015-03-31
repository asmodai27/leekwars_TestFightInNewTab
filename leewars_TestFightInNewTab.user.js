// ==UserScript==
// @name        leekwars_TestFightInNewTab
// @namespace   asmodai
// @author      asmodai
// @description Changes binding of "Tester" button to open test fight in a new tab
// @include     http://leekwars.com/editor
// @version     1
// @grant       none
// ==/UserScript==

// For some reason unbind('click') doesn't work if it is done too early, so I only call it upon hover instead of from page loading.
$("#launch").mouseover(function(){
    $(this).unbind('click');
    //then I add my own function : the same as the initial one, but replacing window.location.href with new tab opener
    $(this).click( function() {
        var data = { test: true } ;
        for (var e in _testEnemies){
            data[e] = _testEnemies[e];
        }
        data.id = _testAI;
        data.myleek = _testLeek;
        data['test-type'] = _testType;
        ajax('editor_update', data, function(data) {
            if (!isNaN(parseInt(data))) {
                // newtab opener, some tweek going on there to force opening it in a new tab
                var newtab = window.open('', '_blank');
                $.post('').always( function() {
                    newtab.location = '/fight/' + data ;
                });
                // and don't forget to close the Test fight popup
                _testPopup.dismiss();
            }
            else {
                Toast("Erreur : " + data);
            }
        });
    }) ;
});
