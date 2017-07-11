// ========================================================
// Global Variables
// ========================================================

// DOM elements that need to be maniuplated 
	var oponentHealth;
	var computerHealthVal = 100;
	var userHealthVal = 100
	var userPlayer;
	var computerHealth;
	var playerHealth;
	var levelUp = 0
	var playerImage;
	var userIndex
	var compIndex
	var computerPlayer
	var computerImage;
	var compOpacity;
	var playerDamage
	var compDamage;
	var areWeDeadYet;
	var changeOpponent;
	var playerAttackPower=0;
	var wins = 0;
	var winsCounter;
	var enableReset;
	var opponentLevelUp=0;
	var compAttackpower;
	var opponentList = ["charmander", "bulbasaur", "chespin", "pikachu"];
	var pokeObject = {
		names: ["charmander", "bulbasaur", "chespin", "pikachu"],
		imagePaths: ["assets/images/charmander.gif","assets/images/bulbasaur.gif","assets/images/chespin.gif","assets/images/pikachu.gif"],
		attackPower: ["2", "55", "40", "55"],
		// attackPower: ["2", "15", "20", "25"],		
	}
	var playerSelected = false;

// ========================================================
// Functions
// ========================================================
	 playerAttack = function () {
		levelUp+=2;
		playerImage = $("#playerImage");
		computerHealth = $("#computerhealth");
		playerAttackPower=$("playerAttackpower");


		playerDamage = parseInt(pokeObject.attackPower[userIndex]);

		$(playerAttackpower).html("Attack Power : " + eval(playerDamage+levelUp));
		computerHealthVal-=playerDamage+levelUp;
		compOpacity-=0.1;
		if (computerHealthVal < 0 ) {
			computerHealthVal = 0;
		}
		$(playerImage).animate({left: "+=600px"}, "fast");
		$(computerImage).css("opacity", compOpacity);
		$(playerImage).animate({left: "-=600px"}, "fast");
		$(computerHealth).css("width", computerHealthVal + "%");
		$(computerHealth).attr("aria-valuenow", computerHealthVal)
		$(computerHealth).html(computerHealthVal + "%");

	}

	computerAttack = function () {
		compAttackpower=$("#compAttackpower");
		playerHealth= $("#playerhealth");
		computerImage = $("#computerImage");

		compLevelUp=Math.floor(Math.random() * 3);
		console.log("Opponent level up is " + opponentLevelUp);
		compDamage = pokeObject.attackPower[pokeObject.names.indexOf(computerPlayer)];
		var totalDamage = parseInt(compDamage) + parseInt(compLevelUp)

		$(compAttackpower).html("Attack Power : " + totalDamage);
			console.log("Opponent level up is " + totalDamage);
			console.log ( "User health val is " + userHealthVal);
		userHealthVal-=totalDamage;
		console.log("user health val is " + userHealthVal);
		compOpacity-=0.1;
		if (userHealthVal <= 0 ) {
			userHealthVal = 0;
		}

		console.log (userHealthVal);
		$(computerImage).animate({right: "+=600px"}, "fast");
		$(computerImage).animate({right: "-=600px"}, "fast");
		$(playerhealth).css("width", userHealthVal + "%");
		$(playerhealth).attr("aria-valuenow", userHealthVal)
		$(playerhealth).html(userHealthVal + "%");
		if (userHealthVal <= 0 ) {
			setTimeout(enableReset,1500);
		}

	}

	changeOpponent = function () {
			//reset computer and user health values
			computerHealthVal = 100;
			userHealthVal = 100;
			console.log("Here are the wins " + wins);
			winsCounter=$("#wins");
			$(winsCounter).html("Wins : " + wins);

			//reset the players level up
			levelUp=0;
			playerAttackPower=$("playerAttackpower");
			$(playerAttackpower).html("Attack Power : " + eval(playerDamage+levelUp));

			//randomly select next pokemon from the list
			compIndex = Math.floor(Math.random() * opponentList.length)
			computerPlayer = opponentList[compIndex];

			//update data for computer player
			compDamage = pokeObject.attackPower[pokeObject.names.indexOf(computerPlayer)];
			$(compAttackpower).html("Attack Power : " + compDamage);
			var computerImagePath = "assets/images/"+computerPlayer+".gif";
			console.log("comp is " + computerPlayer);
			console.log("comp image path is " + computerImagePath);
			console.log("=============");


			//remove the chosen opponent from the list
			opponentList.splice(compIndex,1);
			console.log("Removing selected computer from list : " + opponentList);
			console.log("=============");
			$("#"+computerPlayer).css("visibility","hidden");
			computerImage = $("#computerImage");
			//Update Player image on battleground
			var userImage
			$(computerImage).attr("src",computerImagePath);

			//Reset player health 
			$(playerhealth).css("width", "100" + "%");
			$(playerhealth).attr("aria-valuenow", "100")
			$(playerhealth).html("100" + "%");
			$(computerHealth).css("width", "100" + "%");
			$(computerHealth).attr("aria-valuenow", "100")
			$(computerHealth).html("100" + "%");

	}

	enableReset = function() {
		$("#playerheader").css("visibility","hidden");
		$("#battleground").css("visibility", "hidden");
		$("#resetGame").css("visibility","visible");

		for (var i = 0 ; i < pokeObject.names.length;i++) {
			$("#"+pokeObject.names[i]).css("visibility","hidden");
		}

		if (wins===3) {
			$("#winloss").html(
				" You Won!! Congratulations! "
			)
		} else {
			$("#winloss").html(
				" You Lost!! Its Ok! "
			)		
		}


	}





// ========================================================
// Main Logic
// ========================================================
	$("#attack").on("click", function(){
	
		playerAttack();
		if (computerHealthVal <= 0) {
			wins ++;
			if (wins === 3) {
				setTimeout(enableReset,1500);
			} 
			else {
			console.log ("time to pick a new opponent");
			setTimeout(changeOpponent,1500);
			}
		}
		else {
			setTimeout(computerAttack,1000);
			if (userHealthVal <= 0 ) {
			console.log ("we lost, disable everything, enable reset");
			}
		}


	})

	$("#resetGame").on("click", function(){
		computerHealthVal = 100;
		userHealthVal = 100;
		playerSelected=false;
		levelUp = 0
		playerAttackPower=0;
		wins = 0;
		opponentLevelUp=0;
		$("#winloss").empty();
		opponentList = ["charmander", "bulbasaur", "chespin", "pikachu"];
		$(playerhealth).css("width", "100" + "%");
		$(playerhealth).attr("aria-valuenow", "100")
		$(playerhealth).html("100" + "%");
		$(computerHealth).css("width", "100" + "%");
		$(computerHealth).attr("aria-valuenow", "100")
		$(computerHealth).html("100" + "%");
		$("#resetGame").css("visibility","hidden");
		$("#playerheader").css("visibility","visibile");
		for (var i = 0 ; i < pokeObject.names.length;i++) {
			$("#"+pokeObject.names[i]).css("visibility","visible");
		}


	})

	$(".pokemon").on("click", function () {

		if (!playerSelected) {
			playerSelected=true;
			userPlayer = $(this).attr("name");
			userIndex = pokeObject.names.indexOf(userPlayer);
			var playerImagePath = pokeObject.imagePaths[userIndex];

			console.log("User is " + userPlayer);
			console.log("User image path is " + playerImagePath);
			console.log("=============");


			opponentList.splice(userIndex,1);
			console.log("We have removed user player from opponent list, opponent list is now : " + opponentList);
			console.log("=============");
			compIndex = Math.floor(Math.random() * opponentList.length)
			computerPlayer = opponentList[compIndex];
			var computerImagePath = "assets/images/"+computerPlayer+".gif";
			console.log("comp is " + computerPlayer);
			console.log("comp image path is " + computerImagePath);
			console.log("=============");

			//remove the chosen opponent from the list
			opponentList.splice(compIndex,1);
			console.log("Removing selected computer from list : " + opponentList);
			console.log("=============");

			$("#"+userPlayer).css("visibility","hidden");
			$("#"+computerPlayer).css("visibility","hidden");
			computerImage = $("#computerImage");
			playerImage = $("#playerImage");
			//Update Player image on battleground
			var userImage
			$(playerImage).attr("src", playerImagePath);
			$(computerImage).attr("src",computerImagePath);



			var battleGround=$("#battleground");
			$(battleGround).css("visibility", "visible");

		}


	})