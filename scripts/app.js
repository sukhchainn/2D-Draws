var app = angular.module('app-main', ['ngRoute', 'ng-context-menu']);

app.controller('side-nav', function displayMessage($scope, stringService) {
	$scope.message = "Hello World!";
	$scope.transformString = function (input) {
		$scope.output = stringService.processString(input);
	}

	var brush = {
		name: "brush",
		opacity: 1,
		size: 5,
		color: "black"
	};

	// tools logic starts here...
	var tools = 
		['J', 'K', 'L', 'M' ,
		 'N', 'O', 'P', 'Q']
	;
	var selected_tool = 'J';

	// tools logic starts here...
	var settings = 
		['x', 'y',
		'width', 'height', 'margin', 'padding']
	;
	var selected_setting = 'J';

	// tools login ends here...
	$scope.brush = brush;
	$scope.tools = tools;
	$scope.settings = settings;
	$scope.o_oO = function(i) {
		switch(i) {
			case 'C':
				$scope.message = "Option 1";
			break;
			case 'D':
				$scope.message = "Option 2";
			break;
			case 'H':
				$scope.message = "Option 3";
			break;
			case 'G':
				$scope.message = "Option 4";
			break;
		}
	}
	$scope.o_oF = function(i) {
		switch(i) {
			case 'C':
				$scope.message = "New File";
			break;
			case 'D':
				$scope.message = "Open File";

			break;
			case 'H':
				$scope.message = "Import";
				console.log(i);
				var fileSelector = document.createElement('input');
				fileSelector.setAttribute('type', 'file');
				fileSelector.setAttribute('accept', 'image/gif, image/jpeg, image/png');

			    fileSelector.click();
			    fileSelector.onchange = function(e) {
				    // img = new Image();
				    var file = e.target.files[0];

				    var reader = new FileReader();
			        reader.onloadend = function() {
			             img.src = reader.result;
			        }
			        reader.readAsDataURL(file);


			        var newWindow = window.open("", "_blank", "height=56,width=56,status=yes,toolbar=no,menubar=no,location=no");  
			        
			        newWindow.document.write("<canvas id='imagePlaceholder'>Canvas not supported!</canvas>");
			        var canvas = newWindow.document.getElementById("imagePlaceholder");
			        var ctx = canvas.getContext("2d");

			        ctx.drawImage(img, 0, 0);
			        // console.log(ctx.getImageData(0, 0, 56, 56).data);
			        dest = ctx.getImageData(0, 0, img.width, img.height).data;
			        console.log(dest);
			        newWindow.close();
			        draw = true;
			    }
			break;
			case 'G':
				$scope.message = "Export";
			break;
		}
	}

	$scope.toolsVisibility = "";
	$scope.tools_visibility = () => {
		if ($scope.toolsVisibility == "")
			$scope.toolsVisibility = "none";
		else $scope.toolsVisibility = "";
	}

	$scope.settingsVisibility = "";
	$scope.settings_visibility = () => {
		if ($scope.settingsVisibility == "")
			$scope.settingsVisibility = "none";
		else $scope.settingsVisibility = "";
	}

	$scope.dropdownVisibility = "";
	$scope.dropdown_visibility = () => {
		if ($scope.dropdownVisibility == "")
			$scope.dropdownVisibility = "none";
		else $scope.dropdownVisibility = "";
	}

	$scope.openContextMenu = (evt) => {
		evt.preventDefault();
		const time = menu.isOpen() ? 100 : 0;
		menu.hide();
		setTimeout(() => { menu.show(evt.pageX, evt.pageY) }, time);
		document.addEventListener('click', hideContextMenu, false);
	}
	$scope.hideContextMenu = (evt) => {
		menu.hide();
		document.removeEventListener('click', hideContextMenu);
	}
});

app.directive( "ngContextmenu", function(){
    contextMenu = {replace: false};
    contextMenu.restrict = "AE";
    
    contextMenu.scope = {"visible": "="};
    contextMenu.link = function( $scope, lElem, lAttr ){
        lElem.on("contextmenu", function (e) {
                
                e.preventDefault();
            
                console.log("Element right clicked.");
                $scope.$apply(function () {
                     $scope.visible = true;
                })
            
                
      
        });
        lElem.on("mouseleave", function(e){
         
                console.log("Leaved the div");
                 console.log("Element right clicked.");
                $scope.$apply(function () {
                     $scope.visible = false;
                })
         
        });
    };
    return contextMenu;
});
