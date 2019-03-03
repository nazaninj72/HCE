var treemap;
function drawTree (data,selector1,selector2,compstate,changestate){
	d3.select(selector1).selectAll("svg").remove();
	d3.select(selector2).selectAll("svg").remove();
	var sourceNode;
	var destNode;
	var adjacentNodes=[];
	if (compstate=="Animation"){//draw a single svg and add animation functions

		var duration=0;
		var i = 0;
		var numNodes;
		var adjacentNodes=[];
		var containerWidth = +d3.select(selector1).style('width').slice(0, -2)
		var containerHeight = +d3.select(selector1).style('height').slice(0, -2)

		// set the dimensions and margins of the diagram
		var margin = {top: 40, right: 90, bottom: 50, left: 90},
		    width = containerWidth - margin.left - margin.right,
		    height = containerHeight - margin.top - margin.bottom,
		    center = [height / 2, width / 2],
		    focus = center;

		var svg = d3.select(selector1).append("svg")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		     .append('g').attr("transform","translate(" + width / 4 + "," + height/8 + ")")
		.append('g');

		// declares a tree layout and assigns the size
		var treemap = d3.tree()
		    .size([height, width]);

		//  assigns the data to a hierarchy using parent-child relationships

		root = d3.hierarchy(data, function(d) {
		  return d.children;
		});
		root.y0 = 100;
		root.x0 = height / 2;
		var sourceNode;
		var destNode;
		updatetree(root,root,svg,duration,treemap)
		numNodes=0;
		var startanimation = document.getElementById('startbutton');
		var rootC;
		rootC=clonetree(root,root.depth,root.height)
		 var tempData2 = treemap(rootC);
		 excludedNodes = tempData2.descendants();
		 numNodes=excludedNodes.length;
		 var selectednodes=[]
		 selectednodes=randomization(excludedNodes,numNodes)
		
			
		 sourceNode=selectednodes[0];
		 console.log("sourceNode")
		 console.log(sourceNode)
		 destNode=selectednodes[1];
		startanimation.onclick = function(){

			if (changestate=="move"){

				addtochildren(destNode,sourceNode)
				duration=750;
				 //updatetree(root,root,svg1,duration,treemap)
				 updatetree(rootC,rootC,svg,duration,treemap)
				}
			if (changestate=="remove"){
				removeNode(sourceNode,svg)
				removelink(sourceNode,svg)
				removedata(sourceNode,svg)
				console.log(rootC)
				
				//updatetree(root,root,svg1,duration,treemap)
				duration=750;
				updatetree(rootC,rootC,svg,duration,treemap)

			}
			document.getElementById("startbutton").disabled = true;
		}

		var resetanimation = document.getElementById('resetbutton');
		resetanimation.onclick = function(){
			duration=0;
			updatetree(root,root,svg,duration,treemap)
			document.getElementById("startbutton").disabled = false;
		}



	}
	if (compstate=="Sidebyside"){//draw two svgs one for before one for after
		var duration=0;
		var i = 0;
		var numNodes;
		 var adjacentNodes=[];
		var containerWidth1 = +d3.select(selector1).style('width').slice(0, -2)
		var containerHeight1 = +d3.select(selector1).style('height').slice(0, -2)
		// set the dimensions and margins of the diagram
		var margin = {top: 40, right: 90, bottom: 50, left: 90},
		    width1 = containerWidth1 - margin.left - margin.right,
		    height1 = containerHeight1 - margin.top - margin.bottom,
		    center = [height1/ 2, width1 / 2],
		    focus = center;

		var svg1 = d3.select(selector1).append("svg")
		      .attr("width", width1 + margin.left + margin.right)
		      .attr("height", height1 + margin.top + margin.bottom)
		     .append('g').attr("transform","translate(" + width1 / 4 + "," + height1/8 + ")")
		.append('g');

		var containerWidth2 = +d3.select(selector2).style('width').slice(0, -2)
		var containerHeight2 = +d3.select(selector2).style('height').slice(0, -2)

		// set the dimensions and margins of the diagram
		var margin = {top: 40, right: 90, bottom: 50, left: 90},
		    width2 = containerWidth2 - margin.left - margin.right,
		    height2 = containerHeight2 - margin.top - margin.bottom,
		    center = [height2 / 2, width2 / 2],
		    focus = center;

		var svg2 = d3.select(selector2).append("svg")
		      .attr("width", width2 + margin.left + margin.right)
		      .attr("height", height2 + margin.top + margin.bottom)
		     .append('g').attr("transform","translate(" + width2 / 4 + "," + height2/8 + ")")
		.append('g');

		// declares a tree layout and assigns the size
		treemap = d3.tree()
		    .size([height1, width1]);

		//  assigns the data to a hierarchy using parent-child relationships

		root = d3.hierarchy(data, function(d) {
		  return d.children;
		});
		root.y0 = 100;
		root.x0 = height1 / 2;
		updatetree(root,root,svg1,duration,treemap)
		svg1.selectAll("*").style("opacity", 0);
		var rootC;
		rootC=clonetree(root,root.depth,root.height)
		 var tempData2 = treemap(rootC);
		 excludedNodes = tempData2.descendants();
		 numNodes=excludedNodes.length;
		 var selectednodes=[]
		 selectednodes=randomization(excludedNodes,numNodes)
		 sourceNode=selectednodes[0];
		 destNode=selectednodes[1];
		if (changestate=="move"){

			 addtochildren(destNode,sourceNode)
			 svg1.selectAll("*").style("opacity", 1);
			 //updatetree(root,root,svg1,duration,treemap)
			 updatetree(rootC,rootC,svg2,duration,treemap)

		}
		if (changestate=="remove"){
			console.log(sourceNode)
			removedata(sourceNode,svg2)
			svg1.selectAll("*").style("opacity", 1);
			//updatetree(root,root,svg1,duration,treemap)
			updatetree(rootC,rootC,svg2,duration,treemap)

		}
		if (changestate=="add"){

		}


		

	}
	if (compstate=="Diff"){
		document.getElementById("diffbefore").disabled = false;


		var duration=0;
		var i = 0;
		var numNodes;
		var adjacentNodes=[];
		var containerWidth = +d3.select(selector1).style('width').slice(0, -2)
		var containerHeight = +d3.select(selector1).style('height').slice(0, -2)

		// set the dimensions and margins of the diagram
		var margin = {top: 40, right: 90, bottom: 50, left: 90},
		    width = containerWidth - margin.left - margin.right,
		    height = containerHeight - margin.top - margin.bottom,
		    center = [height / 2, width / 2],
		    focus = center;

		var svg = d3.select(selector1).append("svg")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		     .append('g').attr("transform","translate(" + width / 4 + "," + height/8 + ")")
		.append('g');

		// declares a tree layout and assigns the size
		var treemap = d3.tree()
		    .size([height, width]);

		//  assigns the data to a hierarchy using parent-child relationships

		root = d3.hierarchy(data, function(d) {
		  return d.children;
		});
		root.y0 = 100;
		root.x0 = height / 2;
		var sourceNode;
		var destNode;
		updatetree(root,root,svg,duration,treemap)


		var diffbefore = document.getElementById('diffbefore');
		diffbefore.onclick = function(){
			svg.selectAll("*").remove();
			document.getElementById("viscontainerafter").style.display = "block";
			document.getElementById("diffshow").style.display = "block";
			document.getElementById("diffbefore").style.display = "none";
			document.getElementById("questionparagraph").style.display = "none";
			containerWidth = +d3.select("#viscontainerafter").style('width').slice(0, -2)
			containerHeight = +d3.select("#viscontainerafter").style('height').slice(0, -2)

			// set the dimensions and margins of the diagram
			margin = {top: 40, right: 90, bottom: 50, left: 90},
			    width = containerWidth - margin.left - margin.right,
			    height = containerHeight - margin.top - margin.bottom,
			    center = [height / 2, width / 2],
			    focus = center;

			svg = d3.select("#viscontainerafter").append("svg")
			      .attr("width", width + margin.left + margin.right)
			      .attr("height", height + margin.top + margin.bottom)
			     .append('g').attr("transform","translate(" + width / 4 + "," + height/8 + ")")
			.append('g');

			// declares a tree layout and assigns the size
			var treemap = d3.tree()
			    .size([height, width]);


			var rootC;
			rootC=clonetree(root,root.depth,root.height)
			 var tempData2 = treemap(rootC);
			 excludedNodes = tempData2.descendants();
			 numNodes=excludedNodes.length;
			 var selectednodes=[]
			 selectednodes=randomization(excludedNodes,numNodes)
			 sourceNode=selectednodes[0];
			 var beforeSubtree=clonetree(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
			 console.log("beforeSubtree")
			 console.log(beforeSubtree)
			 destNode=selectednodes[1];
			 var afterSubtree;


			 var diffWidth = +d3.select("#beforediff").style('width').slice(0, -2)
			console.log(diffWidth)
			 var diffheight = +d3.select("#beforediff").style('height').slice(0, -2)
			 console.log(diffheight)
			 // set the dimensions and margins of the diagram
			 margin = {top: 40, right: 90, bottom: 50, left: 90},
			     diffWidth1 = diffWidth - margin.left - margin.right,
			     diffheight1 = diffheight - margin.top - margin.bottom,
			     center = [diffheight1/2, diffWidth1/2],
			     focus = center;

			 var svgDiffBefore = d3.select("#beforediff").append("svg")
			       .attr("width", diffWidth1 + margin.left + margin.right)
			       .attr("height", diffheight1 + margin.top + margin.bottom)
			      .append('g').attr("transform","translate(" + diffWidth / 8 + "," + 0+ ")")
			 .append('g');

			 var svgDiffAfter = d3.select("#afterdiff").append("svg")
			       .attr("width", diffWidth1 + margin.left + margin.right)
			       .attr("height", diffheight1 + margin.top + margin.bottom)
			       .append('g').attr("transform","translate(" +diffWidth / 8  + "," + 0 + ")")
			       .append('g');
			      //
			 
			 // declares a tree layout and assigns the size
			 
			if (changestate=="move"){
				console.log("sourceNode")
			 	console.log(sourceNode)
				 addtochildren(destNode,sourceNode)
				 console.log(destNode)
				 updatetree(rootC,rootC,svg,duration,treemap)
				 afterSubtree=clonetree(destNode,destNode.depth,destNode.height)
				 console.log("afterSubtree")
				 console.log(afterSubtree)
				 afterSubtree=trimSubtrees(afterSubtree,sourceNode)
				 console.log("afterSubtreeTrimmed")
				 console.log(afterSubtree)
				 beforeSubtree=trimSubtrees(beforeSubtree,sourceNode)
				 
				 //put subtres into small divs
				 

				// console.log("afterSubtreeTrimmed")
				 //console.log(afterSubtree)
				 treemap = d3.tree()
				     .size([diffheight1, diffWidth1]);
				 updatetree(afterSubtree,afterSubtree,svgDiffAfter,duration,treemap)
				 updatetree(beforeSubtree,beforeSubtree,svgDiffBefore,duration,treemap)








			}
			if (changestate=="remove"){
				beforeSubtree=clonetree(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
				console.log(beforeSubtree)
				beforeSubtree=trimSubtrees(beforeSubtree,sourceNode)
				updatetree(beforeSubtree,beforeSubtree,svgDiffBefore,duration,treemap)
				updatetree(beforeSubtree,beforeSubtree,svgDiffAfter,duration,treemap)
				removedata(sourceNode,svgDiffAfter)
				removeNode(sourceNode,svgDiffAfter)
				removelink(sourceNode,svgDiffAfter)

				//updatetree(root,root,svg1,duration,treemap)
				updatetree(rootC,rootC,svg,duration,treemap)

			}
			
		}


	}


    }
    function drawTreeMap (data,selector){
    	var containerWidth = +d3.select(selector).style('width').slice(0, -2)
    	  var containerHeight = +d3.select(selector).style('height').slice(0, -2)
    	  var margin = {top: 40, right: 90, bottom: 50, left: 90},
    	    width = containerWidth - margin.left - margin.right,
    	    height = containerHeight - margin.top - margin.bottom,
    	    center = [height / 2, width / 2],
    	    focus = center;
    	  var svg = d3.select(selector).append("svg")
    	      .attr("width", width + margin.left + margin.right)
    	      .attr("height", height + margin.top + margin.bottom)
    	      .append('g').attr("transform","translate(" + width / 10 + "," + height/8 + ")")
    	      .append('g');

    	  var treemapLayout = d3.treemap()
    	  .size([width, height])
    	  .paddingOuter(16);
    	  var rootNode = d3.hierarchy(data)
    	  rootNode.sum(function(d) {
    	  return d.size;
    	});

    	treemapLayout(rootNode);

    	var nodes = svg.selectAll('g.node')
    	  .data(rootNode.descendants())
    	  .enter()
    	  .append('g')
    	  .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
    	  nodes
    	  .append('rect')
    	  .attr('width', function(d) { return d.x1 - d.x0; })
    	  .attr('height', function(d) { return d.y1 - d.y0; })

    	nodes
    	  .append('text')
    	  .attr('dx', 4)
    	  .attr('dy', 14)
    	  .text(function(d) {
    	    return d.data.name;
    	  })
    }
    function drawSunburst (data,selector){
    	var containerWidth = +d3.select(selector).style('width').slice(0, -2)
    	  var containerHeight = +d3.select(selector).style('height').slice(0, -2)
    	  var margin = {top: 40, right: 90, bottom: 50, left: 90},
    	    width = containerWidth - margin.left - margin.right,
    	    height = containerHeight - margin.top - margin.bottom,
    	    center = [height / 2, width / 2],
    	    focus = center;
    	  var svg = d3.select(selector).append("svg")
    	      .attr("width", width + margin.left + margin.right)
    	      .attr("height", height + margin.top + margin.bottom)
    	       .append('g')
        		.attr('transform', 'translate(' + width / 2+ ',' + height / 1.5 + ')');

    	      //.append('g').attr("transform","translate(" + width / 10 + "," + height/8 + ")")
	       var radius = Math.min(width, height) / 2;
	       var partition = d3.partition()
	           .size([2 * Math.PI, radius]);
	      var root = d3.hierarchy(data)
	          .sum(function (d) { return d.size});
	          
          partition(root);
          var arc = d3.arc()
          .startAngle(function (d) { return d.x0 })
          .endAngle(function (d) { return d.x1 })
          .innerRadius(function (d) { return d.y0 })
          .outerRadius(function (d) { return d.y1 });


      // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
      // variable calculations. Last, color the lines and the slices.
          svg.selectAll('g.node')
	          .data(root.descendants())
	          .enter().append('g').attr("class", "node").append('path')
	          .attr("display", function (d) { return d.depth ? null : "none"; })
	          .attr("d", arc)
	          .style('stroke', 'black')
	          .style("fill", 'white');


              // Populate the <text> elements with our data-driven titles.
             svg.selectAll('g.node')
                  .append("text")
                  .attr("transform", function(d) {
                      return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
                  .attr("dx", "-20") // radius margin
                  .attr("dy", ".5em") // rotation align
                  .text(function(d) { return d.parent ? d.data.name : "" });




          /**
           * Calculate the correct distance to rotate each label based on its location in the sunburst.
           * @param {Node} d
           * @return {Number}
           */
             

    }
    function computeTextRotation(d) {
        var angle = (d.x0 + d.x1) / Math.PI * 90;

        // Avoid upside-down labels
        return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
        //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
    }  
function updatetree(source,root,svg,duration,treemap){
			var i=0;
			  // Assigns the x and y position for the nodes
			var treeData = treemap(root);
			//console.log(treeData)
			// Compute the new tree layout.
			var nodes = treeData.descendants(),
			 links = treeData.descendants().slice(1);
			// append the svg obgect to the body of the page
			// appends a 'group' element to 'svg'
			// moves the 'group' element to the top left margin


			nodes.forEach(function(d){
			    if (d.parent!=null){
			    d.depth = d.parent.depth+1 
			    d.height=d.parent.height-1;
			    }else{
			    	d.depth=0;

			    }
			});
			      // Normalize for fixed-depth.
			nodes.forEach(function(d){
			    d.y = d.depth * 70
			});
			node = svg.selectAll('g.node')
			 .data(nodes, function(d) { return d.id || (d.id = ++i); });

				      // adds the links between the nodes
		var link = svg.selectAll('line.link').
		    data(links, function(d) {
		      return d.id;

		    });
		     // Update the nodes...

		  // Enter any new links at the parent's previous position.
		  var linkEnter = link.enter().
		    append('line').
		    attr("class", "link").
		    attr("id", function(d){return d.id}).
		    attr("stroke-width", 2).
		    attr("stroke", '#006699').
		    attr('x1', function(d) {
		      return source.y0;
		    }).
		    attr('y1', function(d) {
		      return source.x0;
		    }).
		    attr('x2', function(d) {
		      return source.y0;
		    }).
		    attr('y2', function(d) {
		      return source.x0;
		    })



	    	var linkUpdate = linkEnter.merge(link);
	    	//console.log(svg.selectAll('line.link'))
	    	//console.log(linkUpdate)


	    	linkUpdate.transition().
	    	duration(duration).
	    	attr('x1', function(d) {
	    	  return d.parent.y;
	    	}).
	    	attr('y1', function(d) {
	    	  return d.parent.x;
	    	}).
	    	attr('x2', function(d) {
	    	  return d.y;
	    	}).
	    	attr('y2', function(d) {
	    	  return d.x;
	    	});
			

		var nodeEnter = node.enter().
		  append('g').
		  attr('class', 'node')
		  .attr("transform", function(d) {
		    return "translate(" + source.y0 + "," + source.x0 + ")";
		  })



		    nodeEnter.append('circle').
		    attr('class', 'node')
		   
		    .attr('r', 10)
		    .attr("opacity", 1.0)
		    .style("fill", "#ffffff");
		    nodeEnter.append("text")
		      .attr("dy", ".40em")
		      .style("text-anchor", "middle")
		      .text(function(d) { return d.data.name; });
		  // Update
		  var nodeUpdate = nodeEnter.merge(node);

		  // Transition to the proper position for the node
		  nodeUpdate.transition().
		    duration(duration).
		    attr("transform", function(d) {
		      return "translate(" + d.y + "," + d.x + ")";
		    });



		nodeUpdate.select('circle.node').
		    attr('r', 10).
		    style("fill", function(d) {
		      return "#ffffff";
		    });


		      // Store the old positions for transition.
		  nodes.forEach(function(d){
		    d.y0 = d.x;
		    d.x0 = d.y;
		  }); 
}
function clonenode(node, isleaf, depth, height){
  var newNode = {
     
      name: node.data.name,
    };

    //Creates a Node from newNode object using d3.hierarchy(.)
    var newNode = d3.hierarchy(newNode);
    newNode.depth = depth
    newNode.height = height
    newNode.id=node.id
    newNode.x=node.x;
    newNode.y=node.y;
    newNode.x0=node.x0;
    newNode.y0=node.y0;

    //newNode.height = root.height - 1
    if(!isleaf){
      newNode.children=[];
      newNode.data.children=[];
    }
   
    return newNode;
}
function clonetree(root, depth, height){

  var cloneroot=clonenode(root, typeof root.children=='undefined', depth, height)
 

  if (typeof root.children!='undefined'){
   // console.log("entered here")
 
    root.children.forEach(function(f){
      var newNode=clonetree(f, depth + 1, height - 1)
     //console.log("newnode")
     //console.log(newNode)
      cloneroot.children.push(newNode)
      cloneroot.data.children.push(newNode.data)
      newNode.parent=cloneroot;
    })
      
     
     // console.log("newnode after adding children")
     // console.log(newNode)
    
    //j=0;
    return cloneroot;
  }else{
   // console.log(cloneroot)
  // j=0;
    return cloneroot;

  }
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addtochildren(d,f){

 // console.log(draggedNode.parent)
  var index = f.parent.children.indexOf(f);
   // console.log(index)
   if (index > -1) {
     f.parent.children.splice(index, 1);
     f.parent.data.children.splice(index, 1);
   }
   //console.log(f.parent.children.length)
   if (f.parent.children.length == 0)
   {
    delete f.parent.children
    delete f.parent.data.children
   }
   //console.log("children of parent of draggedNode")
   //console.log(f.parent.children)
   f.depth = d.depth + 1; 
   f.height = d.height - 1;
   f.parent=d;
   if (typeof d.children !== 'undefined') {
        d.children.push(f);
    } else {
        d.children=[];
        d.data.children=[];
        d.children.push(f);
    }

   d.data.children.push(f.data);

 
} 
function randomization(excludedNodes,numNodes){
	var adjacentNodes=[];
	var selectednodes=[];
	 SourceId=getRndInteger(2,numNodes);
	 console.log(SourceId)
	 console.log(excludedNodes)
	   excludedNodes.forEach(function(d){
	     if (d.id==SourceId){
	       
	       sourceNode=d;
	       return true;
	     }
	   })
	  
	   selectednodes.push(sourceNode)
	   if (typeof sourceNode.children!='undefined')
	   {
	     sourceNode.children.forEach(function(d){
	       adjacentNodes.push(d)
	     })   
	   }

	 adjacentNodes=addToAdjacencyList(sourceNode,adjacentNodes);
	 adjacentNodes.push(sourceNode.parent)
	  adjacentNodes.forEach(function(f){
	      var index = excludedNodes.indexOf(f);
	       if (index > -1) {
	       excludedNodes.splice(index, 1);
	       }
	  })
	  randIndx=getRndInteger(0,excludedNodes.length-1);
	  destNode=excludedNodes[randIndx];
	  selectednodes.push(destNode)
	  return selectednodes;
}
function addToAdjacencyList(sourceNode,adjacentNodes){

 if (typeof sourceNode.children!='undefined'){
    sourceNode.children.forEach(function(d){
      addToAdjacencyList(d,adjacentNodes)


  })

 }else{
  adjacentNodes.push(sourceNode)
  return adjacentNodes;
 }
  adjacentNodes.push(sourceNode)
  return adjacentNodes;
}

function removeNode(f,svg){

	 if (typeof f.children!='undefined'){
	    f.children.forEach(function(d){
	    	console.log(d)
	      removeNode(d,svg)

	  })

	 }else{
	 	svg.selectAll('g.node')
	 	  .filter(function(d, i) {
	 	    if (d.id == f.id){
	 	    
	 	      return true;
	 	    }else{
	 	      return false;
	 	    }
	 	 }).remove();

	  
	 }
	 svg.selectAll('g.node')
	 	  .filter(function(d, i) {
	 	    if (d.id == f.id){
	 	   
	 	      return true;
	 	    }else{
	 	      return false;
	 	    }
	 	 }).remove();


  

   


  

}
function removedata(f,svg){
	 //remove the data too
    var index = f.parent.children.indexOf(f);
     // console.log(index)
     if (index > -1) {
       f.parent.children.splice(index, 1);
       f.parent.data.children.splice(index, 1);
     }
     if (f.parent.children.length == 0)
        {
         delete f.parent.children
         delete f.parent.data.children
         }
}
function removelink(f,svg){
  if (typeof f.children!='undefined'){
	    f.children.forEach(function(d){
	    	console.log(d)
	      removelink(d,svg)

	  })

	 }else{
	 	svg.selectAll('line.link')
	 	  .filter(function(d, i) {
	 	    if (d.id == f.id){
	 	   
	 	      return true;
	 	    }else{
	 	      return false;
	 	    }
	 	 }).remove();

	  
	 }
	 svg.selectAll('line.link')
	 	  .filter(function(d, i) {
	 	    if (d.id == f.id){
	 	    	
	 	      return true;
	 	    }else{
	 	      return false;
	 	    }
	 	 }).remove();

}
function updatesvg(svg,selector){



}
function trimSubtrees(subtree,sourceNode){
	var removingnode=[];
	if (typeof subtree.children!="undefined"){
	subtree.children.forEach(function(d){
		if (d.id!=sourceNode.id){
			removingnode.push(d)
		}
	})
	for (var i=0;i<removingnode.length;i++)
		removedata(removingnode[i])
	}
	
	return subtree;

}

