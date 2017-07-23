var oDv = oDv || [];
var oVa = oVa || {};

optimera = {};
optimera.src = "";
optimera.url = "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/external_json/oPS.js";
optimera.getURL = function() {       //the JSON URL that contains the oVa values. It doesn't exist for new articles.
    var optimeraHost = window.location.host;
    var optimeraPathName = window.location.pathname;
    var rand = Math.random();
    var nydnId = 1;
    optimera.src = "https://s3.amazonaws.com/elasticbeanstalk-us-east-1-397719490216/json/client/" + nydnId + "/" +  optimeraHost + optimeraPathName + ".js?t=" + rand;
    nydn.urls.optimera = optimera.src;
};
optimera.setup = function() {        //set up defauly valuse for oDv and oVa BEFORE downloading JSON
    oDv.push("1");
    rhAdArr2.forEach(function(rhAdx){
        if (rhAdx !=="div-gpt-ad-x100" && rhAdx!="div-gpt-ad-x108"){
            oDv.push(rhAdx);
            oVa[rhAdx] = ["NULL"];
        }
    });
    if (!!document.querySelector("[id*='r-aol-video']")) {
        var aolVideoDivId = document.querySelector("[id*='r-aol-video']").id;
        oDv.push(["v", aolVideoDivId]);
        oVa[aolVideoDivId] = ["NULL"];
    }; 
    //optimera.download();
};
optimera.download = function() {     //download JSON with final oVa
    nydnRequires([nydn.urls.optimera], function(util) {
        console.log("nydn 🎯  optimera.download ✓ "+nydn.urls.optimera);
        console.log("nydn 🎯 optimera.download oVa = "+JSON.stringify(oVa));
    });
    optimera.download2();
};
optimera.download2 = function() {    //download oPs that reports ad units loading
    nydnRequires([optimera.url], function(util) {
        console.log("nydn 🎯  optimera.download 2 ✓");
    });
};
optimera.targeting = function() {        //loops thourgh defined ad nits, and setTargeting
    var rhAdx;
    nydnRequires([nydn.urls.optimera], function(util) {     //must wait for JSON if it exists.
        console.log("nydn 🎯 optimera.targeting");
        rhAdArr.forEach(function(rhAd){
            //alert("!!rhAdArr[0].u "+!!rhAdArr[0].u);
            //if (!!rhAdArr[0].u) {
            rhAdx = rhAd.nydnDivID;
            if (rhAdx !=="div-gpt-ad-x100" && rhAdx !="div-gpt-ad-x108"){
                rhAd.setTargeting("oView", oVa[rhAdx]);
                log[rhAdx].oView = oVa[rhAdx];
                console.log("nydn 🎯 optimera.targeting oVa["+rhAdx+"] = "+JSON.stringify( oVa[rhAdx]));
            }
        });
        dfp.checkList.bidder["optimera"] = true;
        dfp.checkList.done +=1;
        console.log("nydn 🎯 optimera.targeting DONE");
    });
};
optimera.refresh = function() {
    nydnRequires([optimera.url], function(util) {
        console.log("nydn 🎯  optimera.refresh");
        oPageUnload('1');
    });
};

export default optimera;