

    class Creature {
        constructor(name, ac, maxhp, hp, init, hostile, concentration) {
            this._name = name;
            this._ac = ac;
            this._maxhp = maxhp;
            this._hp = hp;
            this._init = init;
            this._hostile = hostile;
            this._concentration = concentration;
        }
        printListStat(){
            return "<div class='row creature-block text-break'>" + "<div class='col-lg-2 col-md-3 col-sm-4 col-4 initBox align-self-center'>" + this._init +
             "</div>" + "<div class='col-lg-7 col-md-5 col-sm-8 col-8 centerBox'>" + this._name + '<br>' + 'AC: ' + this._ac + "</div>" + "<div class='col-lg-3 col-md-4 col-sm-12 col-12 hpBox'>" + this._hp + "/" + 
             this._maxhp + "</div>" + "</div>"; 
        }

   

        set name(cname){
            this._name = cname;
        }

        set ac(cac){
            this._ac = cac;
        }

        set maxhp(maxchp){
            this._maxhp = maxchp;
        }

        set hp(chp){
            this._hp = chp;
        }

        set init(cinit){
            this._init = cinit;
        }

        set hostile(chostile){
            this._hostile = chostile;
        }

        set concentration(cconcentration){
            this._concentration = cconcentration;
        }

        get name(){
            return this._name;
        }

        get ac(){
            return this._ac;
        }

        get maxhp(){
            return this._maxhp;
        }

        get hp(){
            return this._hp;
        }

        get init(){
            return this._init;
        }
        get hostile(){
            return this._hostile;
        }
        get concentration(){
            return this._concentration;
        }

  
    };
    

    let encounter = {
        allCreatures: new Array(),
        
        countHostiles: function(){
            let hostiles = 0;
            
            
            for ( let i = 0; i < encounter.allCreatures.length; i++){
                let creature = encounter.allCreatures[i].hostile;
                if(creature === 1){
                    hostiles++;
                };
                
            };
            console.log(hostiles);
        },
        creatureToInit: function(creature) {
            
            this.allCreatures.push(creature);
                
        },

        creatureRemove: function(index) {
            
            this.allCreatures.splice(index, 1);
        },
    };

function printOne(index){
    let printCreature = encounter.allCreatures[index];
    $("#creatureStatTab").removeClass("collapse");
    $("#creatureAdd").addClass("collapse");
    if($('#openAdd').length <= 0){
        $("#ascending").after("<button type='button' class='btn btn-secondary col-12' id='openAdd' onclick='openAdd()'>Add Creature</button>");
        };
    $("#creatureStatTab p").remove();
    $("#creatureStatTab #edit1").remove();
    $("#creatureStatTab #remove").remove();

    
    $("#name1").val(printCreature._name);
    $("#ac1").val(printCreature._ac);
    $("#maxhp1").val(printCreature._maxhp);
    $("#hp1").val(printCreature._hp);
    $("#init1").val(printCreature._init);
    if (printCreature.hostile == 1) {
        $('input.hostile1').prop( "checked", true )
    } else {
        $('input.hostile1').prop( "checked", false )
    };
    if (printCreature.concentration == 1) {
        $('input.concentration1').prop( "checked", true )
    } else {
        $('input.concentration1').prop( "checked", false )
    };
    
    $("#creatureStatTab #closeTab").before("<button type='button' class='btn btn-success col-12' id='edit1' onclick='edit(" + index + ")'>Save Changes</button>");
    $("#creatureStatTab").append("<button type='button' class='btn btn-danger col-12 mt-5' id='remove' onclick='remove(" + index + ")'>Remove Creature</button>");

};


function print() {
        
    $("#encounterList").html("");

    for(let i = 0; i < encounter.allCreatures.length; i++) {
        let oneCreature = encounter.allCreatures[i];
        let listedCreature = "creature" + i; 
        
        $("#encounterList").append("<span id='creature" + [i] + "'  onclick='printOne(" + i + ")'>" + oneCreature.printListStat() + "</span>");
        if (oneCreature.hp <= 0) {
            $("#"+listedCreature+" .row").addClass("dead");
        }  else if (oneCreature.hp <= oneCreature.maxhp / 2) {
            $("#"+listedCreature + " .row").addClass("bloodied");
        };
        if (oneCreature.concentration == 1) {
            $("#"+listedCreature + " .row .hpBox").append("<br>" + "C");

        };
        if (oneCreature.hostile == 1) {
            $("#"+listedCreature + " .centerBox, " + "#"+listedCreature + " .hpBox").addClass("hostile");

        };

    };
    encounter.countHostiles();
    turns();
};

function edit(index){

    let editCreature = encounter.allCreatures[index];

    editCreature.name = document.getElementById('name1').value;
    editCreature.ac = document.getElementById('ac1').value;
    editCreature.hp = document.getElementById('hp1').value;
    editCreature.maxhp = document.getElementById('maxhp1').value;
    editCreature.init = document.getElementById('init1').value; 
    if ($('input.hostile1').is(':checked')) {
        editCreature.hostile = 1;
        
    } else {
        editCreature.hostile = 0;
    };
    if ($('input.concentration1').is(':checked')) {
        editCreature.concentration = 1;
        
    } else {
        editCreature.concentration = 0;
    };
    print();
};

function remove(index){
    encounter.creatureRemove(index);
    $("#creatureStatTab").toggleClass("collapse");
    print();
};

function openAdd(){
    $("#creatureAdd").removeClass("collapse");
    $("#creatureStatTab").addClass("collapse");
    $("#openAdd").remove();
    $("#creatureStatTab").removeClass("col-5");
    $("#listTab").removeClass("col-7");
};

let currentTurn = 0;
let currentRound = 1;



function nextTurn(){
    $("#creature" + currentTurn + " .row").removeClass("current");
    currentTurn++;
    if (currentTurn >= encounter.allCreatures.length) {
        currentTurn = 0;
        currentRound++;
    };
    $("#creature" + currentTurn + " .row").addClass("current");
    $("#round").html("Round: " + currentRound);
    

}
function previousTurn(){
    $("#creature" + currentTurn + " .row").removeClass("current");
    currentTurn--;
    if (currentTurn < 0) {
        currentTurn = encounter.allCreatures.length;
        $("#creature" + "0 .row").removeClass("current");
        currentTurn--;
        currentRound--;
        if (currentRound == 0) {
            currentRound = 1;
        };
    }; 
    $("#creature" + (currentTurn) + " .row").addClass("current");
    $("#round").html("Round: " + currentRound);
    
};

function start(){
    $("#previous").toggleClass("collapse")
    $("#next").toggleClass("collapse");
    $("#start").toggleClass("collapse");
    $("#end").toggleClass("collapse");
    $("#round").toggleClass("collapse");
    $("#load").toggleClass("collapse");
    $("#saveButton").toggleClass("collapse");
    $("#round").append("Round: " + currentRound);
    
    $("#creature"+currentTurn+" .row").addClass("current");
};
function turns(){
    $("#creature"+currentTurn + " .row").addClass("current");
};

function end(){
    currentTurn = 0;
    currentRound = 1;   
    $("#round").html("");
    $("#next").toggleClass("collapse");
    $("#previous").toggleClass("collapse");
    $("#start").toggleClass("collapse");
    $("#end").toggleClass("collapse");
    $("#round").toggleClass("collapse");
    $("#load").toggleClass("collapse");
    $("#saveButton").toggleClass("collapse");
    let creatureNumber = encounter.allCreatures.length;

    for(let i = 0; i <= creatureNumber; i++){
        if (encounter.allCreatures[i]._hp <= 0){
            encounter.creatureRemove(i);
            i--;
        };
        print();
    };
   
};

function loadItem(index){
    let encounterList = localStorage.getItem("DREncounterTracker");
    encounterList = JSON.parse(encounterList);
    let item = encounterList[index];

    encounter.allCreatures.length = 0;
    let ItemName = localStorage.getItem(item + "name");
    ItemName = JSON.parse(ItemName);
    let ItemAC = localStorage.getItem(item + "ac");
    ItemAC = JSON.parse(ItemAC);
    let ItemMaxHp = localStorage.getItem(item + "maxhp");
    ItemMaxHp = JSON.parse(ItemMaxHp);
    let ItemHp = localStorage.getItem(item + "hp");
    ItemHp = JSON.parse(ItemHp);
    let ItemInit = localStorage.getItem(item + "init");
    ItemInit = JSON.parse(ItemInit);
    let ItemHostile = localStorage.getItem(item + "hostile");
    ItemHostile = JSON.parse(ItemHostile);
    let ItemConcentration = localStorage.getItem(item + "concentration");
    ItemConcentration = JSON.parse(ItemConcentration);

    for(let i = 0; i < Number(ItemName.length); i++) {
        let creature = new Creature(ItemName[i], ItemAC[i], ItemMaxHp[i], ItemHp[i], ItemInit[i], ItemHostile[i], ItemConcentration[i]);
        encounter.creatureToInit(creature);
    };
    

    print();

    /*let loadEncounter = localStorage.getItem("'"+value+"'");
    loadEncounters = JSON.parse(loadEncounter);*/

};