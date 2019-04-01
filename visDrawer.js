var treemap;
function drawTree (data,selector1,selector2,compstate,changestate){
	console.log(compstate)
	console.log(changestate)
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
		var panSpeed = 200;
		var panBoundary = 20;  
		// set the dimensions and margins of the diagram
		var margin = {top: 40, right: 90, bottom: 50, left: 90},
		    width = containerWidth - margin.left - margin.right,
		    height = containerHeight - margin.top - margin.bottom,
		    center = [height / 2, width / 2],
		    focus = center;

		var svg = d3.select(selector1).append("svg")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		           
		     // attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		     .append('g').attr("transform","translate(" + width / 8 + "," + height/4 + ")")
		.append('g');

		// declares a tree layout and assigns the size
		var treemap = d3.tree()
		    .size([2*height, width]);

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
		//updatetree(rootC,rootC,svg,duration,treemap)
		 var tempData2 = treemap(rootC);
		 excludedNodes = tempData2.descendants();
		 console.log(excludedNodes)
		 numNodes=excludedNodes.length;
		 var selectednodes=[]
		 selectednodes=randomization(excludedNodes,numNodes)

		// var answerId=getRndInteger(1,4);
		// console.log(answerId)
		// var answerinput = document.getElementById(''+answerId+'choice');
		 //var label = input.nextSibling;
		 var newlabels=["W","X","Y","C","O","H","P","U"];
		 var newindx=getRndInteger(0,newlabels.length-1)
		 destNode=selectednodes[1];
		 sourceNode=selectednodes[0];
		 console.log("destNode")	
		 console.log(destNode)
		 console.log("sourceNode before children")
		 console.log(sourceNode)

		 	 	
		// answerinput.innerHTML = ""+sourceNode.data.name+"-"+ changestate;
		 
		 writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
		startanimation.onclick = function(){

			if (changestate=="move"){

				addtochildren(destNode,sourceNode)
				console.log("destNode")
				console.log(destNode)
				console.log("sourceNode after children")
				console.log(sourceNode)
				console.log(rootC)
				updateDepth(rootC,treemap)
				duration=1000;
				 //updatetree(root,root,svg1,duration,treemap)
				 updatetree(rootC,rootC,svg,duration,treemap)
			}
			if (changestate=="delete"){
				removeNode(sourceNode,svg)
				removelink(sourceNode,svg)
				removedata(sourceNode,svg)
				console.log(rootC)
				
				//updatetree(root,root,svg1,duration,treemap)
				duration=1000;
				updatetree(rootC,rootC,svg,duration,treemap)

			}
			if (changestate=="add"){
				var selected=null;
				console.log(destNode)
				updatetree(root,root,svg,duration,treemap)
				svg.selectAll("g.node").filter(function(d){

				  if (d.id==destNode.id)
				  {
				  	console.log(d)
				    selected=d
				    d3.select(this).raise();
				    return true;
				  }
				  else
				    return false;
				})
				
				newnode=newNode(selected,newlabels[newindx],rootC,svg,treemap)
				console.log(newnode)
				duration=1000;
				updatetree(selected,root,svg,duration,treemap)

			}
			document.getElementById("startbutton").disabled = true;
		}

		var resetanimation = document.getElementById('resetbutton');
		resetanimation.onclick = function(){
			duration=0;
			if (changestate=="add"){

				removeNode(newnode,svg)
				removedata(newnode,svg)
				removelink(newnode,svg)
			}
			updatetree(root,root,svg,duration,treemap)
			document.getElementById("startbutton").disabled = false;
		}



	}
	if (compstate=="SidebySide"){//draw two svgs one for before one for after
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
		     .append('g').attr("transform","translate(" + width1 / 19 + "," + height1/8+ ")")
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
		     .append('g').attr("transform","translate(" + width2 / 19 + "," + height2/8 + ")")
		.append('g');

		// declares a tree layout and assigns the size
		treemap = d3.tree()
		    .size([1.4*height1, width1]);

		//  assigns the data to a hierarchy using parent-child relationships

		root = d3.hierarchy(data, function(d) {
		  return d.children;
		});
		root.y0 = 100;
		root.x0 = height1 / 2;
		updatetree(root,root,svg1,duration,treemap)
		console.log(root)
		svg1.selectAll("*").style("opacity", 0);
		var rootC;
		rootC=clonetree(root,root.depth,root.height)
		 var tempData2 = treemap(rootC);
		 excludedNodes = tempData2.descendants();
		 numNodes=excludedNodes.length;
		 var selectednodes=[]
		 selectednodes=randomization(excludedNodes,numNodes)
		  var newlabels=["W","X","Y","C","O","H","P","U"];
		  var newindx=getRndInteger(0,newlabels.length-1)
		  destNode=selectednodes[1];
		  sourceNode=selectednodes[0];
		  	 	
		 // answerinput.innerHTML = ""+sourceNode.data.name+"-"+ changestate;
		  
		  writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
		if (changestate=="move"){
			console.log(destNode)
			 addtochildren(destNode,sourceNode)
			 console.log(sourceNode)
			 svg1.selectAll("*").style("opacity", 1);
			 updateDepth(rootC,treemap)
			 //updatetree(root,root,svg1,duration,treemap)
			 updatetree(rootC,rootC,svg2,duration,treemap)

		}
		if (changestate=="delete"){
			console.log(sourceNode)
			removedata(sourceNode,svg2)
			svg1.selectAll("*").style("opacity", 1);
			//updatetree(root,root,svg1,duration,treemap)
			updatetree(rootC,rootC,svg2,duration,treemap)

		}
		if (changestate=="add"){
			 	svg1.selectAll("*").style("opacity", 1);
				newnode=newNode(destNode,newlabels[newindx])
				duration=0;
				updatetree(rootC,rootC,svg2,duration,treemap)

		}


		

	}
	if (compstate=="Diff"){
		var duration=0;
		var i = 0;
		var numNodes;
		var adjacentNodes=[];
		var containerWidth, containerHeight,margin;


		//  assigns the data to a hierarchy using parent-child relationships

		
		var sourceNode;
		var destNode;
	//	updatetree(root,root,svg,duration,treemap)
		//	svg.selectAll("*").remove();
		var	containerWidth = +d3.select("#viscontainerafter").style('width').slice(0, -2)
		var	containerHeight = +d3.select("#viscontainerafter").style('height').slice(0, -2)

			// set the dimensions and margins of the diagram
		var	margin = {top: 40, right: 90, bottom: 50, left: 90},
			    width = containerWidth - margin.left - margin.right,
			    height = containerHeight - margin.top - margin.bottom,
			    center = [height / 2, width / 2],
			    focus = center;

			 var svg = d3.select("#viscontainerafter").append("svg")
			      .attr("width", width + margin.left + margin.right)
			      .attr("height", height + margin.top + margin.bottom)
			     .append('g').attr("transform","translate(" + width /8 + "," + height/4 + ")")
			.append('g');
			root = d3.hierarchy(data, function(d) {
			  return d.children;
			});
			root.y0 = 100;
			root.x0 = height / 2;
			// declares a tree layout and assigns the size
			var treemap = d3.tree()
			    .size([1.4*height, width]).separation(function separation(a, b) { return a.parent == b.parent ? 2 : 2; });
			var rootC;
			rootC=clonetree(root,root.depth,root.height)
			updatetree(rootC,rootC,svg,duration,treemap)
			svg.selectAll("*").remove();
			 var tempData2 = treemap(rootC);
			 excludedNodes = tempData2.descendants();

			 numNodes=excludedNodes.length;
			 var selectednodes=[];
			 selectednodes=randomization(excludedNodes,numNodes)
			 destNode=selectednodes[1];
			 sourceNode=selectednodes[0];
			 var beforeSubtree;
			 beforeSubtree=clonetree(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
			
			  var newlabels=["W","X","Y","C","O","H","P","U"];
			  var newindx=getRndInteger(0,newlabels.length-1) 	 	
			 // answerinput.innerHTML = ""+sourceNode.data.name+"-"+ changestate;
			  writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
			 var afterSubtree;
			 var diffWidth = +d3.select("#beforediff").style('width').slice(0, -2)
			
			 var diffheight = +d3.select("#beforediff").style('height').slice(0, -2)
			
			 // set the dimensions and margins of the diagram
			 margin = {top: 40, right: 90, bottom: 50, left: 90},
			     diffWidth1 = diffWidth - margin.left - margin.right,
			     diffheight1 = diffheight - margin.top - margin.bottom,
			     center = [diffheight1/2, diffWidth1/2],
			     focus = center;

			 var svgDiffBefore = d3.select("#beforediff").append("svg")
			       .attr("width", diffWidth1 + margin.left + margin.right)
			       .attr("height", diffheight1 + margin.top + margin.bottom)
			      .append('g').attr("transform","translate(" + (-diffWidth1/19) + "," + diffheight/3 + ")")
			 .append('g');

			 var svgDiffAfter = d3.select("#afterdiff").append("svg")
			       .attr("width", diffWidth1 + margin.left + margin.right)
			       .attr("height", diffheight1 + margin.top + margin.bottom)
			       .append('g').attr("transform","translate(" + (-diffWidth1/19) + "," + diffheight/3 + ")")
			       .append('g');
			      //
			 var treemap1 = d3.tree()
			     .size([diffheight1/1.3, diffWidth1/2]).separation(function separation(a, b) { return a.parent == b.parent ? 1 : 2; });;
			 // declares a tree layout and assigns the size
			 var dashable=false;
			if (changestate=="move"){
				updateDepth(beforeSubtree,treemap1)
				console.log(destNode)
				var diV = document.getElementById('startdots');
				var diV2 = document.getElementById('startdots2');
				if (sourceNode.parent.parent== null)
					diV.style.display='none';
				 beforeSubtree=trimSubtrees(beforeSubtree,sourceNode)
				 console.log(beforeSubtree)
				updatetree(beforeSubtree,beforeSubtree,svgDiffBefore,duration,treemap1)
				
				svgDiffBefore.selectAll('g.node').filter(function(d){
					if (d.id==sourceNode.parent.id)
					{
						
						diV.style.position = "relative";
						diV.style.left = (-diffWidth1/19 +d.x0-3)+'px';
						diV.style.top = (diffheight/3 -30)+'px';

					}
				})
				dashedUpdate(beforeSubtree,sourceNode,svgDiffBefore,treemap1,changestate)
				addtochildren(destNode,sourceNode)
				
				 svg.selectAll("*").remove();
				 updateDepth(rootC,treemap)
				 updatetree(rootC,rootC,svg,duration,treemap)
				 
				 afterSubtree=clonetree(destNode,destNode.depth,destNode.height)
				 beforeSubtree=trimSubtrees(afterSubtree,sourceNode)
				 updateDepth(afterSubtree,treemap1)
				if (destNode.parent== null)
					diV2.style.display='none';
				 //afterSubtree=trimSubtrees(afterSubtree,sourceNode)
				 updatetree(afterSubtree,afterSubtree,svgDiffAfter,duration,treemap1)
				svgDiffAfter.selectAll('g.node').filter(function(d){
					if (d.id==destNode.id)
					{
						
						diV2.style.position = "relative";
						diV2.style.left = (-diffWidth1/19 +d.x0-3)+'px';
						diV2.style.top = (diffheight/3 -30)+'px';

					}
				})

				 
				 dashedUpdate(afterSubtree,sourceNode,svgDiffAfter,treemap1,changestate)
			
			}
			if (changestate=="delete"){
				//beforeSubtree=clonetree(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
			//	console.log(beforeSubtree)
				var diV = document.getElementById('startdots');
				var diV2 = document.getElementById('startdots2');
				if (sourceNode.parent.parent== null)
				{
					diV.style.display='none';
					diV2.style.display='none';
				}
					
					updateDepth(beforeSubtree,treemap1)
			
				
				updatetree(beforeSubtree,beforeSubtree,svgDiffBefore,duration,treemap1)
				svgDiffBefore.selectAll('g.node').filter(function(d){
					if (d.id==sourceNode.parent.id)
					{
						
						diV.style.position = "relative";
						diV.style.left = (-diffWidth1/19 +d.x0-3)+'px';
						diV.style.top = (diffheight/3 -30)+'px';

					}
				})
				dashedUpdate(beforeSubtree,sourceNode,svgDiffBefore,treemap1,"move")
				removedata(sourceNode)
				
				afterSubtree=clonetree(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
				//updatetree(beforeSubtree,beforeSubtree,svgDiffAfter,duration,treemap1)
				updateDepth(afterSubtree,treemap1)
				updatetree(afterSubtree,afterSubtree,svgDiffAfter,duration,treemap1)
				svgDiffAfter.selectAll('g.node').filter(function(d){
					if (d.id==sourceNode.parent.id)
					{
						
						diV2.style.position = "relative";
						diV2.style.left = (-diffWidth1/19 +d.x0-3)+'px';
						diV2.style.top = (diffheight/3 -30)+'px';

					}
				})
				dashedUpdate(afterSubtree,sourceNode,svgDiffAfter,treemap1,"move")
				updatetree(rootC,rootC,svg,duration,treemap)
			}
			if(changestate=="add"){
				var diV = document.getElementById('startdots');
				var diV2 = document.getElementById('startdots2');
				if (sourceNode.parent== null)
				{
					diV.style.display='none';
					diV2.style.display='none';
				}
				beforeSubtree=clonetree(sourceNode,sourceNode.depth,sourceNode.height)
				updateDepth(beforeSubtree,treemap1)
				updatetree(beforeSubtree,beforeSubtree,svgDiffBefore,duration,treemap1)
				svgDiffBefore.selectAll('g.node').filter(function(d){
					if (d.id==sourceNode.id)
					{
						
						diV.style.position = "relative";
						diV.style.left = (-diffWidth1/19 +d.x0-3)+'px';
						diV.style.top = (diffheight/3 -30)+'px';

					}
				})
				
				newnode=newNode(sourceNode,newlabels[newindx])
				duration=0;

				dashedUpdate(beforeSubtree,sourceNode,svgDiffBefore,treemap1,"beforeadd")
				afterSubtree=clonetree(sourceNode,sourceNode.depth,sourceNode.height)
				updateDepth(afterSubtree,treemap1)
				updatetree(afterSubtree,afterSubtree,svgDiffAfter,duration,treemap1)
				svgDiffAfter.selectAll('g.node').filter(function(d){
					if (d.id==sourceNode.id)
					{
						
						diV2.style.position = "relative";
						diV2.style.left = (-diffWidth1/19 +d.x0-3)+'px';
						diV2.style.top = (diffheight/3 -30)+'px';

					}
				})
				dashedUpdate(afterSubtree,newnode,svgDiffAfter,treemap1,"move")
				updatetree(rootC,rootC,svg,duration,treemap)

			}

	}


    }
     
function updatetree(source,root,svg,duration,treemap){
	var i=0;
    var treeData = treemap(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
    	links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){
    	d.y = d.depth * 50
    });



    // ### LINKS

    // Update the links...
    var link = svg.selectAll('line.link').
    	data(links, function(d) {
      	return d.id;
      });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().
    	append('line').
      attr("class", "link").
      attr("stroke-width", 2).
      attr('x1', function(d) {
      	return source.x0;
      }).
      attr('y1', function(d) {
      	return source.y0;
      }).
      attr('x2', function(d) {
      	return source.x0;
      }).
      attr('y2', function(d) {
      	return source.y0;
      });
      
    var linkUpdate = linkEnter.merge(link);
    
    linkUpdate.transition().
    	duration(duration).
      attr('x1', function(d) {
      	return d.parent.x;
      }).
      attr('y1', function(d) {
      	return d.parent.y;
      }).
      attr('x2', function(d) {
      	return d.x;
      }).
      attr('y2', function(d) {
      	return d.y;
      });

    // Transition back to the parent element position
    linkUpdate.transition().
    	duration(duration).
      attr('x1', function(d) {
      	return d.parent.x;
      }).
      attr('y1', function(d) {
      	return d.parent.y;
      }).
      attr('x2', function(d) {
      	return d.x;
      }).
      attr('y2', function(d) {
      	return d.y;
      });

    // Remove any exiting links
    var linkExit = link.exit().
    	transition().
      duration(duration).
      attr('x1', function(d) {
      	return source.x;
      }).
      attr('y1', function(d) {
      	return source.y;
      }).
      attr('x2', function(d) {
      	return source.x;
      }).
      attr('y2', function(d) {
      	return source.y;
      }).
      remove();

  	// ### CIRCLES

    // Update the nodes...
    var node = svg.selectAll('g.node')
    	.data(nodes, function(d) {
      	return d.id || (d.id = ++i);
      });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().
      append('g').
      attr('class', 'node').
      attr("transform", function(d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })

    // Add Circle for the nodes



    nodeEnter.append('circle').
    	attr('class', 'node').
      attr('r', 10).
      style("fill", function(d) {
      	return "#f6e8c3";
      });

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
      	return "translate(" + d.x + "," + d.y + ")";
    	});

    // Update the node attributes and style
   	 nodeUpdate.select('circle.node').
    attr('class', 'node').
        attr('r', 10).
        style("fill", function(d) {
          return "#f6e8c3";
        });

    // Remove any exiting nodes
    var nodeExit = node.exit().
    	transition().
      duration(duration).
      attr("transform", function(d) {
      	return "translate(" + source.x + "," + source.y + ")";
      }).
      remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle').attr('r', 0);
    
    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
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
	var sourceNode=null;
	 SourceId=getRndInteger(2,numNodes);
	// console.log(SourceId)
	// console.log(excludedNodes)
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
	    	//console.log(d)
	      removeNode(d,svg)

	  })

	 }else{
	 	svg.selectAll('g.node')
	 	  .filter(function(d, i) {
	 	  	//console.log(d)
	 	    if (d.id == f.id){
	 	    console.log(d)
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
function removedata(f){
	 //remove the data too
    var index = f.parent.children.indexOf(f);

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
function trimSubtrees(subtree,sourceNode){
	var removingnode=[];
	//console.log(sourceNode)
	if (typeof subtree.children!="undefined"){
		subtree.children.forEach(function(d){
			//console.log(d)
		if (d.id!=sourceNode.id){
			removingnode.push(d)
		}
	})
	for (var i=0;i<(removingnode.length-1);i++)
		removedata(removingnode[i])

	}
	return subtree;

}
function writeInputChoices(sourceNode,changestate,root,newnodelabels,newnodeindx){

	var inputs=[];
	var candidates=[];
	var changeStringify;
	var hasChildren;
	var answernodeStringify;

	if (changestate=="add")
	{
		changeStringify=""+changestate+"ed";
		answernodeStringify=""+newnodelabels[newnodeindx]+"";
		hasChildren=false;

	}
	else
	{
		changeStringify=""+changestate+"d";
		hasChildren=typeof sourceNode.children!='undefined';
		if (hasChildren){
	 		answernodeStringify=""+sourceNode.data.name+" & its children";
	 	}
	 	else
	 		answernodeStringify=""+sourceNode.data.name+"";

	}
		
	
	var nodes=root.descendants();
	var inputindx,changeindx,randnodeindx;
	var changes=["move","delete","add"]
	var j=1;
 	var answerId=getRndInteger(1,4);
	//console.log(answerId)
	 var answerinput = document.getElementById(''+answerId+'choice');

	 if (hasChildren)	
	 	answerinput.innerHTML = answernodeStringify+"-"+"were "+ changeStringify;
	 else
	 	answerinput.innerHTML = answernodeStringify+"-"+"was "+ changeStringify;
	for (var i=0;i<4;i++){
		inputs[i]=document.getElementById(''+j+'choice');
		j++;
	}
	//console.log(inputs)
	inputs.splice((answerId-1), 1)
	for (var i=1;i<nodes.length;i++){
		if ((nodes[i].id!=sourceNode.id))
			candidates.push(nodes[i])
	}
	

	candidates=shuffle(candidates)

	if (hasChildren){
		for (var i=0;i<candidates.length;i++){
			if (typeof candidates[i].children!="undefined"){
				inputindx=getRndInteger(0,(inputs.length-1))
				changeindx=getRndInteger(0,2)
				
				var otherinput=inputs[inputindx];
				if (changes[changeindx]=="add")
					otherinput.innerHTML= ""+ candidates[i].data.name +" & its children"+"-"+"were "+ changes[changeindx]+"ed";
				else
					otherinput.innerHTML= ""+ candidates[i].data.name +" & its children"+"-"+"were "+ changes[changeindx]+"d";
				inputs.splice(inputindx, 1)
				candidates.splice(i,1)
				i=candidates.length;

			}
		}
	}
	
	var k=0;
	while (inputs.length>0){
		inputindx=getRndInteger(0,(inputs.length-1))
		changeindx=getRndInteger(0,2)
		var otherinput=inputs[inputindx];
		if (candidates[k].children){
			otherinput.innerHTML= ""+ candidates[k].data.name +" & its children"+"-"+"were "+ changes[changeindx]+"d";
		}else{
			if (changes[changeindx]=="add")
				otherinput.innerHTML= ""+ candidates[k].data.name+"-"+"was "+ changes[changeindx]+"ed";
			else
				otherinput.innerHTML= ""+ candidates[k].data.name+"-"+"was "+ changes[changeindx]+"d";

		}
		
				inputs.splice(inputindx, 1)
		k++;
	}	

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function newNode(selected,nodename,rootC,svg,treemap){

 var newNode = {
   "name": nodename,
   "size": 100
  };
  //Creates a Node from newNode object using d3.hierarchy(.)
  var newNode = d3.hierarchy(newNode);

  //later added some properties to Node like child,parent,depth
  newNode.depth = selected.depth + 1; 
  newNode.height = selected.height - 1;
  newNode.parent = selected; 
  newNode.id = Date.now();

  //Selected is a node, to which we are adding the new node as a child
  //If no child array, create an empty array
  if(!selected.children){
    selected.children = [];
    selected.data.children = [];
  }

  //Push it to parent.children array  
  selected.children.push(newNode);
  selected.data.children.push(newNode.data);
 // updatetree(selected,rootC,svg,750,treemap)
  return newNode;
 
} 
function updateDepth(root,treemap){
	var data=treemap(root)
	var nodes=data.descendants();
	//console.log(nodes)
    nodes.forEach(function(d){
    if (d.parent!=null){
    d.depth = d.parent.depth+1 
    d.height=d.parent.height-1;
    }else{
    	d.depth=0;

    }
		});
}
function dashedUpdate(root,sourceNode,svg,treemap,changestate){
		var i=0;
	    var treeData = treemap(root);
	    var solidLinkNodes=[];
	    var otherids=[];
	    var l=0;   
	    sourceNode.parent.children.forEach(function(m){
	    			if (m.id!=sourceNode.id)
	    				otherids[l++]=m.id;
	    		})
	  	otherids[l++]=sourceNode.parent.id;
	    // Compute the new tree layout.
	    var nodes = treeData.descendants(),
	    	links = treeData.descendants().slice(1);

	    // Normalize for fixed-depth.
	    nodes.forEach(function(d){
	    	d.y = d.depth * 50
	    });
	    // ### LINKS

	    // Update the links...
	    var link = svg.selectAll('line.link').
	    	data(links, function(d) {
	      	return d.id;
	      });
	    	
	    	var flag=true;
	    	solidLinkNodes=addToAdjacencyList(sourceNode,solidLinkNodes)
	    	var solidlinkids=[];
	    	var k=0;
	    	solidLinkNodes.forEach(function(f){
	    		solidlinkids[k++]=f.id;
	    	})
	    	//
	    	console.log(solidLinkNodes)
	    	console.log(solidlinkids)
	    		svg.selectAll('line.link').filter(function(d,i){
	    			if (solidlinkids.includes(d.id)){
	    				return false;
	    			}else{
	    				return true;
	    			}
	    		}).style("opacity",0)
	    		
	    		solidlinkids[k++]=sourceNode.parent.id;
	    		svg.selectAll('g.node').filter(function(d,i){
	    			if (solidlinkids.includes(d.id)){
	    				return false;
	    			}else{
	    				return true;
	    			}
	    		}).style("opacity",0)
	    		if (changestate=="beforeadd"){
	    			svg.selectAll('line.link').filter(function(d,i){
	    				if (d.id==sourceNode.id){
	    					return false;
	    				}else{
	    					return true;
	    				}
	    			}).style("opacity",0)
	    			
	    			
	    			svg.selectAll('g.node').filter(function(d,i){
	    				if (d.id==sourceNode.id){
	    					return false;
	    				}else{
	    					return true;
	    				}
	    			}).style("opacity",0)
	    		}
	    	
	    	
	    	
}
