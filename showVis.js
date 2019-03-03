function updateVis(selector1,selector2,compState,visState,changeState,dataState){
	//var visDrawer = require('visDrawer.js');
 // d3.select(selector1).remove();
	var mediumdata= {"name": "A", "children": [{
         "name": "B",
         "children": [{"name": "E", 
         "children":[{"name":"J", "size": 100},{"name":"K","size":100}]
        }, {"name": "F",
         "children":[{"name":"I", "size": 100},{"name":"Z","size":100}]}]
      }, {
         "name": "D",
         "children": [{"name": "L", "size": 100}, {"name": "M", "size": 100}, {
             "name": "G", "size": 100}]
      }, {
         "name": "N",
         "children": [{"name": "S", 
         "children":[{"name":"T", "size": 100},{"name":"V","size":100}]
      }, {"name": "Q", "size": 100},{"name": "R","size": 100}]
      }]
  };

 	if (visState=="tree")
 		{drawTree(mediumdata,selector1,selector2,compState,changeState);}
 	else if (visState=="treemap")
 		{drawTreeMap(mediumdata,selector);}
 	else if (visState=="sunburst")
 		{drawSunburst(mediumdata,selector);}
 	


}