$(document).ready(function(){
    $("#startData").click(function(){
        encounter.allCreatures.length = 0;
        $("#encounterList").html("");


        let creature = new Creature("Goblin", 15, 7, 7, 2);
        encounter.creatureToInit(creature);

        creature = new Creature("Goblin", 15, 7, 7, 20);
        encounter.creatureToInit(creature);

        creature = new Creature("Goblin", 15, 7, 7, 11);
        encounter.creatureToInit(creature);
        
        print();
    });

    $("#clear").click(function(){
        encounter.allCreatures.length = 0;
        $("#encounterList").html("");
        currentTurn = 0;
        currentRound = 1;
        $("#round").html("");
        $("#next").addClass("collapse");
        $("#previous").addClass("collapse");
        $("#start").removeClass("collapse");
        $("#end").addClass("collapse");
        $("#round").addClass("collapse");
        $("#load").removeClass("collapse");
        $("#saveButton").removeClass("collapse");
    });

$("#descending").click(function(){

    encounter.allCreatures.sort(function(a, b) {
        return b._init - a._init;
    });


    print();
});

$("#ascending").click(function(){

    encounter.allCreatures.sort(function(a, b) {
        return a._init - b._init;
    });


    print();
});

$("#closeTab").click(function(){
    $("#creatureStatTab").addClass("collapse");
   
});

$("#closeTab1").click(function(){
    $("#creatureAdd").toggleClass("collapse");
    $("#creatureStatTab").addClass("col-5");
    $("#listTab").addClass("col-7");
    $("#ascending").after("<button type='button' class='btn btn-secondary col-12' id='openAdd' onclick='openAdd()'>Add Creature</button>");
});


$("#save").click(function(){
    if ($('input.hostile2').is(':checked')) { 
        let creature = new Creature(
            $("#name").val(),
            $("#ac").val(),
            $("#max-hp").val(),
            $("#hp").val(),
            $("#init").val(),
            1,
            );
           
           
            encounter.creatureToInit(creature);
    } else {
        let creature = new Creature(
        $("#name").val(),
        $("#ac").val(),
        $("#max-hp").val(),
        $("#hp").val(),
        $("#init").val(),
        0,
        );
        
        
        encounter.creatureToInit(creature);
    }
        
        print();
});

$("#saveEncounter").click(function(){
    let encounterNameSaved = $("#encounterName").val();

    let statArrayName = $("#encounterName").val() + "name";
    let statArrayAc = $("#encounterName").val() +  "ac";
    let statArrayHp = $("#encounterName").val()  + "hp";
    let statArrayMaxHp =  $("#encounterName").val() + "maxhp";
    let statArrayInit = $("#encounterName").val() + "init";
    let statArrayHostile = $("#encounterName").val() + "hostile";
    let statArrayConcentration = $("#encounterName").val()+  "concentration";

    let lName = [];
    let lAc = []
    let lmaxHp = [];
    let lHp = [];
    let lInit = [];
    let lHostile = [];
    let lConcentration = [];

    let load = localStorage.getItem("DREncounterTracker");
    loadEncounters = JSON.parse(load);
    if(!loadEncounters) {
        loadEncounters = [];
    };
    
    loadEncounters.push(encounterNameSaved);

    for( let i = 0; i < encounter.allCreatures.length; i++){
        lName.push(encounter.allCreatures[i].name);
        lAc.push(encounter.allCreatures[i].ac); 
        lmaxHp.push(encounter.allCreatures[i].maxhp);
        lHp.push(encounter.allCreatures[i].hp);
        lInit.push(encounter.allCreatures[i].init);
        lHostile.push(encounter.allCreatures[i].hostile);
        lConcentration.push(encounter.allCreatures[i].lConcentration);
    };


    let JSONName = JSON.stringify(lName);
    let JSONAc = JSON.stringify(lAc);
    let JSONMaxHp = JSON.stringify(lmaxHp);
    let JSONHp = JSON.stringify(lHp);
    let JSONInit = JSON.stringify(lInit);
    let JSONHostile = JSON.stringify(lHostile);
    let JSONConcentration = JSON.stringify(lConcentration);
    
    localStorage.setItem(statArrayName, JSONName);
    localStorage.setItem(statArrayAc, JSONAc);
    localStorage.setItem(statArrayMaxHp, JSONMaxHp);
    localStorage.setItem(statArrayHp, JSONHp);
    localStorage.setItem(statArrayInit, JSONInit);
    localStorage.setItem(statArrayHostile, JSONHostile);
    localStorage.setItem(statArrayConcentration, JSONConcentration);

    let JSONSaved = JSON.stringify(loadEncounters);
    localStorage.setItem("DREncounterTracker", JSONSaved);

    });

    $("#load").click(function(){
        let load = localStorage.getItem("DREncounterTracker");
        loadEncounters = JSON.parse(load);
        if(!loadEncounters) {
            $("#loadingList").html("<a class='list-group-item list-group-item-action'>You've got no loadable encounters!</a>")
        };
        $.each(loadEncounters, function( index, value ) {
            console.log(loadEncounters);
            $("#loadingList").append("<a class='list-group-item list-group-item-action' onclick='loadItem(" + index + ")'>" + index + ": " + value + "</a>");
          });
    });
    $('#loadModal').on('hidden.bs.modal', function() {
        $("#loadingList").html("");
      });


});