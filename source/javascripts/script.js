$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}

$.getDivece = function () {
    var viewportWidth = $(window).width();
    if (viewportWidth > 0) {
        var device = 'small';
    };

    if (viewportWidth > 640) {
        var device = 'medium';
    };

    if (viewportWidth > 1024) {
        var device = 'large';
    };

    return device;

}

$.getCampaign = function (){

    if (Cookies.get('campaign') !== undefined) {
        var campaign = Cookies.get('campaign');
    }
    else {
        var campaign = 'direct';
    }


    if ($.urlParam('gclid')) {
        campaign = 'google';
    }

    if ($.urlParam('utm_source')) {
        campaign = $.urlParam('utm_source');
    }

    Cookies.set('campaign', campaign, { expires: 100});

    return campaign;
}

$.setCampaingInForm = function (fieldId) {
    var newValue = $.getCampaign ();
    $.setFormValue (fieldId, newValue);
}

$.setFormValue = function (fieldId, newValue){
    if ($(fieldId)) {
        $(fieldId).val(newValue);
    }
}

$.setDeviceInForm = function (fieldId) {
    newValue = $.getDivece ();
    $.setFormValue (fieldId, newValue);
}

$.setOptimizelyVariationInForm = function (fieldId, experimentId) {
    newValue = optimizely.variationNamesMap[experimentId];
    console.log (newValue);
    $.setFormValue (fieldId, newValue);
}
