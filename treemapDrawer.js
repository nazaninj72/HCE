 function drawTreeMap (data,selector1,selector2,compstate,changestate){

			if (compstate=="Animation"){


				    	var duration=0;
				    	var width,height
					   var chartWidth, chartHeight
					   var margin
					   var svg = d3.select(selector1).append("svg")
					   var chartLayer = svg.append("g").classed("chartLayer", true)

				       width = document.querySelector(selector1).clientWidth
				       height = document.querySelector(selector1).clientHeight
				   
				       margin = {top:0, left:0, bottom:0, right:0 }
				       
				       
				       chartWidth = width - (margin.left+margin.right)
				       chartHeight = height - (margin.top+margin.bottom)
				       
				       svg.attr("width", width).attr("height", height)
				       
				       var i=0;
				       chartLayer
				           .attr("width", chartWidth)
				           .attr("height", chartHeight)
				           .attr("transform", "translate("+[margin.left, margin.top]+")")

				        var treemap = d3.treemap()
				               .size([chartWidth, chartHeight])
				               .paddingTop(28)
			                   .paddingRight(4)
			                   .paddingLeft(4)
			                   .paddingBottom(4)
			                   .paddingInner(3) 
				               .round(true); 
				       var root = d3.hierarchy(data)
				       	  				root.sum(function(d) {
				       	  				return d.size;
				       					}) 
						console.log(root)
							
				       	    var rootC=null;
				       		
				       		console.log(rootC)
				updatetreemap(root,chartLayer,duration,treemap)
				svg.selectAll("*").style("opacity",1)
				rootC=clonetreemap(root,root.depth,root.height)
				var startanimation = document.getElementById('startbutton');
				var tempData2 = treemap(rootC);
				 excludedNodes = tempData2.descendants();
				 console.log(excludedNodes)
				 numNodes=excludedNodes.length;
				 var selectednodes=[]
				 selectednodes=randomization(excludedNodes,numNodes)
				 destNode=selectednodes[1];
				 sourceNode=selectednodes[0];
				 console.log(destNode)
				 console.log(sourceNode)
				var newlabels=["W","X","Y","C","O","H","P","U"];
		 		var newindx=getRndInteger(0,newlabels.length-1)
		 		writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
				startanimation.onclick = function(){
					if (changestate=="move"){

						movetochildrenTM(destNode,sourceNode)
						console.log(sourceNode.parent)
						duration=750;
						 //updatetree(root,root,svg1,duration,treemap)
						 console.log(rootC)
						 updateValues(rootC)
						 console.log(rootC)
						 updateTMDepth(rootC,treemap)
						 updatetreemap(rootC,chartLayer,duration,treemap)
						 svg.selectAll("*").style("opacity",1)
					}
					if (changestate=="remove"){
						removeNode(sourceNode,svg)
						//removelink(sourceNode,svg)
						removedata(sourceNode,svg)
						console.log(rootC)
						
						//updatetree(root,root,svg1,duration,treemap)
						duration=750;
						updateValues(rootC)
						updatetreemap(rootC,chartLayer,duration,treemap)
						svg.selectAll("*").style("opacity",1)
					}
					if (changestate=="add"){
						var selected=null;
						console.log(destNode)
						updatetreemap(root,chartLayer,duration,treemap)
						svg.selectAll("g.node").filter(function(d){

						  if (d.id==destNode.id)
						  {
						  	console.log(d)
						    selected=d
						    return true;
						  }
						  else
						    return false;
						})
						
						newnode=newtreemapNode(selected,newlabels[newindx],rootC,treemap)
						console.log(newnode)
						duration=750;
						updateValues(root)
						updatetreemap(root,chartLayer,duration,treemap)
						svg.selectAll("*").style("opacity",1)
					

				
				}
				document.getElementById("startbutton").disabled = true;
			}



				var resetanimation = document.getElementById('resetbutton');
				resetanimation.onclick = function(){
					duration=0;
					if (changestate=="add"){
						//newnode.parent.value-=newnode.value;
						
						removeNode(newnode,svg)
						removedata(newnode,svg)
						removelink(newnode,svg)
						updateValues(root)

					}
					updatetreemap(root,chartLayer,duration,treemap)
					svg.selectAll("*").style("opacity",1)
					document.getElementById("startbutton").disabled = false;

			}
		}

		if (compstate=="SidebySide"){


	    	var duration=0;
	    	var width,height;
	    	var exesheight;
		   var chartWidth, chartHeight
		   var margin
		   var svg1 = d3.select(selector1).append("svg")
		   var chartLayer1 = svg1.append("g").classed("chartLayer", true)
		   var svg2 = d3.select(selector2).append("svg")
		   var chartLayer2 = svg2.append("g").classed("chartLayer", true)
	       width = +d3.select(selector1).style('width').slice(0, -2)
	       height = +d3.select(selector1).style('height').slice(0, -2)-25;
	       //console.log(d3.select("#beforesidebyside").style("height").slice(0, -2))
	   
	       margin = {top:5, left:5, bottom:5, right:5 }
	       
	       
	       chartWidth = width - (margin.left+margin.right)
	       chartHeight = height - (margin.top+margin.bottom)
	       
	       svg1.attr("width", width).attr("height", height)
	       svg2.attr("width", width).attr("height", height)
	       var i=0;
	       chartLayer1
	           .attr("width", chartWidth)
	           .attr("height", chartHeight)
	           .attr("transform", "translate("+[margin.left, margin.top]+")")
	       chartLayer2
	           .attr("width", chartWidth)
	           .attr("height", chartHeight)
	           .attr("transform", "translate("+[margin.left, margin.top]+")")

	        var treemap = d3.treemap()
	               .size([chartWidth, chartHeight])
	               .paddingTop(28)
	               .paddingRight(4)

	               .paddingLeft(4)
	               .paddingBottom(4)
                  .paddingInner(3) 
	               .round(true); 
	       var root = d3.hierarchy(data)
	       	  				root.sum(function(d) {
	       	  				return d.size;
	       					}) 
			console.log(root)
				
	       	 var rootC=null;
	       		
	        updatetreemap(root,chartLayer1,duration,treemap)
			console.log(root)
			svg1.selectAll("*").style("opacity", 0);
			rootC=clonetreemap(root,root.depth,root.height)
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

				 movetochildrenTM(destNode,sourceNode)
				 updateValues(rootC)
				 svg1.selectAll("*").style("opacity", 1);
				 //updatetree(root,root,svg1,duration,treemap)
				 updateTMDepth(rootC,treemap)
				 updatetreemap(rootC,chartLayer2,duration,treemap)
				 svg2.selectAll("*").style("opacity", 1);

			}
			if (changestate=="remove"){
				console.log(sourceNode)
				removedata(sourceNode,svg2)
				updateValues(rootC)
				svg1.selectAll("*").style("opacity", 1);
				//updatetree(root,root,svg1,duration,treemap)
				 updatetreemap(rootC,chartLayer2,duration,treemap)
				 svg2.selectAll("*").style("opacity", 1);

			}
			if (changestate=="add"){
				 	svg1.selectAll("*").style("opacity", 1);
					
						newnode=newtreemapNode(destNode,newlabels[newindx],rootC,treemap)
						console.log(newnode.value)
						updateValues(rootC)
						console.log(rootC)
						updatetreemap(rootC,chartLayer2,duration,treemap)
						svg2.selectAll("*").style("opacity", 1);

			}


		}
		if (compstate=="Diff"){

	    	var duration=0;
	    	var width,height
		   var chartWidth, chartHeight
		   var margin
		   var svg = d3.select("#viscontainerafter").append("svg")
		   var chartLayer = svg.append("g").classed("chartLayer", true)

	       width = document.querySelector("#viscontainerafter").clientWidth
	       height = document.querySelector("#viscontainerafter").clientHeight-22
	   
	       margin = {top:5, left:5, bottom:5, right:5 }
	       
	       
	       chartWidth = width - (margin.left+margin.right)
	       chartHeight = height - (margin.top+margin.bottom)
	       
	       svg.attr("width", width).attr("height", height)
	       
	       var i=0;
	       chartLayer
	           .attr("width", chartWidth)
	           .attr("height", chartHeight)
	           .attr("transform", "translate("+[margin.left, margin.top]+")")
           	   var svgDiffBefore = d3.select("#beforediff").append("svg")
           	   var chartLayerDiffBefore = svgDiffBefore.append("g").classed("chartLayer", true)
           	   var width1,height1
                  width1 = document.querySelector("#beforediff").clientWidth
                  height1 = document.querySelector("#beforediff").clientHeight-22
              
                  margin = {top:5, left:5, bottom:5, right:5 }
                  
                  
                  chartWidth1 = width1 - (margin.left+margin.right)
                  chartHeight1 = height1 - (margin.top+margin.bottom)
                  
                  svgDiffBefore.attr("width", width1).attr("height", height1)
                  
                  var i=0;
                  chartLayerDiffBefore
                      .attr("width", chartWidth1)
                      .attr("height", chartHeight1)
                      .attr("transform", "translate("+[margin.left, margin.top]+")")
          	   var svgDiffAfter = d3.select("#afterdiff").append("svg")
          	   var chartLayerDiffAfter = svgDiffAfter.append("g").classed("chartLayer", true)
          	   var width2,height2
                 width2 = document.querySelector("#afterdiff").clientWidth
                 height2 = document.querySelector("#afterdiff").clientHeight-22
             
                 margin = {top:5, left:5, bottom:5, right:5 }
                 
                 
                 chartWidth2 = width2 - (margin.left+margin.right)
                 chartHeight2 = height2 - (margin.top+margin.bottom)
                 
                 svgDiffAfter.attr("width", width2).attr("height", height2)
                 
                 var i=0;
                 chartLayerDiffAfter
                     .attr("width", chartWidth2)
                     .attr("height", chartHeight2)
                     .attr("transform", "translate("+[margin.left, margin.top]+")")

	              var treemap = d3.treemap()
	                     .size([chartWidth, chartHeight])
     	               .paddingTop(28)
     	               .paddingRight(4)
     	               .paddingLeft(4)
     	               .paddingBottom(4)
                        .paddingInner(3) 
	                     .round(true); 
             var treemap1 = d3.treemap()
                    .size([chartWidth1, chartHeight1])
	               .paddingTop(28)
	               .paddingRight(4)
	               .paddingLeft(4)
	               .paddingBottom(4)
                   .paddingInner(3) 
                    .round(true); 
            var treemap2 = d3.treemap()
                   .size([chartWidth2, chartHeight2])
	               .paddingTop(28)
	               .paddingRight(4)
	               .paddingLeft(4)
	               .paddingBottom(4)
                  .paddingInner(3) 
                   .round(true); 
         var root = d3.hierarchy(data)
 	  				root.sum(function(d) {
 	  				return d.size;
 					}) 
	      	//console.log(root)
			updatetreemap(root,chartLayer,duration,treemap)
			chartLayer.selectAll("*").remove();
       	    var rootC=null;
       		
       		rootC=clonetreemap(root,root.depth,root.height)
			 var tempData2 = treemap(rootC);
			 excludedNodes = tempData2.descendants();
			 numNodes=excludedNodes.length;
			 var selectednodes=[]
			 selectednodes=randomization(excludedNodes,numNodes)
			  var newlabels=["W","X","Y","C","O","H","P","U"];
			  var newindx=getRndInteger(0,newlabels.length-1)
			  destNode=selectednodes[1];
			  sourceNode=selectednodes[0];
			  writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
			  beforeSubtree=clonetreemap(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
				updateTMDepth(beforeSubtree,treemap1)
				updateValues(beforeSubtree)
			if (changestate=="move"){ 
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1)
				svgDiffBefore.selectAll("*").style("opacity", 1);
			 	console.log(sourceNode)
				 movetochildrenTM(destNode,sourceNode)
				 console.log(destNode)
				 console.log(rootC)
				// svg.selectAll("*").remove();
				updateValues(rootC)
				updateTMDepth(rootC,treemap)
				 updatetreemap(rootC,chartLayer,duration,treemap)
				 chartLayer.selectAll("*").style("opacity", 1);
				 afterSubtree=clonetreemap(destNode,destNode.depth,destNode.height)
				 updateTMDepth(afterSubtree,treemap2)
				 updateValues(afterSubtree)
				 
				updatetreemap(afterSubtree,chartLayerDiffAfter,duration,treemap2)
				svgDiffAfter.selectAll("*").style("opacity", 1);

			}
			if (changestate=="remove"){
				beforeSubtree=clonetreemap(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
				updateTMDepth(beforeSubtree,treemap1)
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1)
				updatetreemap(beforeSubtree,chartLayerDiffAfter,duration,treemap2)
				chartLayerDiffAfter.selectAll("*").remove()
				removeTMdata(sourceNode,svgDiffAfter,beforeSubtree)
				console.log(sourceNode)
				console.log(beforeSubtree)
				updateValues(beforeSubtree)
				updatetreemap(beforeSubtree,chartLayerDiffAfter,duration,treemap2)
				chartLayerDiffBefore.selectAll("*").style("opacity",1)
				svgDiffAfter.selectAll("*").style("opacity",1)
				removedata(sourceNode,svg)
				updateTMDepth(rootC,treemap)
				updateValues(rootC)

				updatetreemap(rootC,chartLayer,duration,treemap)
				svg.selectAll("*").style("opacity",1)
			}
			if (changestate=="add"){
				beforeSubtree=clonetreemap(destNode,destNode.depth,destNode.height)
				updateTMDepth(beforeSubtree,treemap1)
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1)
				chartLayerDiffBefore.selectAll("*").style("opacity",1)
				newnode=newtreemapNode(destNode,newlabels[newindx],rootC,treemap)
				console.log(newnode.value)
				updateValues(rootC)
				console.log(rootC)
				afterSubtree=clonetreemap(newnode.parent,newnode.parent.depth,newnode.parent.height)
				updateTMDepth(afterSubtree,treemap2)
				updatetreemap(afterSubtree,chartLayerDiffAfter,duration,treemap2)
				svgDiffAfter.selectAll("*").style("opacity",1)
				updatetreemap(rootC,chartLayer,duration,treemap)
				svg.selectAll("*").style("opacity",1)
			}

		}
	  			



    	 
}

function updatetreemap(root,chartLayer,duration,treemap){
	treemap(root)
	var i=0;
	//calcValues(root)
	var node = chartLayer
	    .selectAll(".node")
	    .data(root.descendants(), function(d){ return d.id || (d.id = ++i); })
	
	node
	    .selectAll("rect")
	    .data(root.descendants(), function(d){ return d.id })        
	
	node
	    .selectAll("text")
	    .data(root.descendants(), function(d){ return d.id })        
	
	// enter                  
	var newNode = node.enter()
	    .append("g")
	    .attr("class", "node")
	
	    
	newNode.append("rect")
	newNode.append("text")
	
	  
	// update   
	chartLayer
	    .selectAll(".node rect")
	    .transition()
	    //.delay(function(d,i){ return i * 100 })
	    .duration(duration)
	    .attr("x", function(d) { return d.x0 })
	    .attr("y", function(d) { return d.y0  })
	    .attr("width", function(d) { return d.x1 - d.x0 })
	    .attr("height", function(d) { return d.y1 - d.y0})
	    .attr("fill", "white")
	    
	chartLayer
	    .selectAll(".node text")    
	    .transition()
	   // .delay(function(d,i){ return i * 100 })
	    .duration(duration)
	    .text(function(d){return  d.data.name })
	    .attr("y", "1.2em")
	    .attr("x", "0.2em")
	    .attr("font-size", "0.40em")
	    .attr("transform", function(d){ return "translate("+[d.x0, d.y0]+")" })
	 
}

function clonenode2(node, isleaf, depth, height){
  var newNode = {
     
      name: node.data.name,
    };

    //Creates a Node from newNode object using d3.hierarchy(.)
    var newNode = d3.hierarchy(newNode);
    newNode.depth = depth
    newNode.height = height
    newNode.id=node.id
    newNode.x1=node.x1;
    newNode.y1=node.y1;
    newNode.x0=node.x0;
    newNode.y0=node.y0;
    newNode.value=node.value;

    //newNode.height = root.height - 1
    if(!isleaf){
      newNode.children=[];
      newNode.data.children=[];
    }
   
    return newNode;
}
function clonetreemap(root, depth, height){

  var cloneroot=clonenode2(root, typeof root.children=='undefined', depth, height)
 

  if (typeof root.children!='undefined'){
   // console.log("entered here")
 
    root.children.forEach(function(f){
      var newNode=clonetreemap(f, depth + 1, height - 1)
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
function movetochildrenTM(d,f){

 // console.log(draggedNode.parent)
  var index = f.parent.children.indexOf(f);
   // console.log(index)
   if (index > -1) {
   //	console.log(f.value)
   	// f.parent.value-=f.value;
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
  // d.value+=f.value;
   //console.log(d.value)
 
}
function updateValues(root){
	sum=0;
	if (!root.children){
		
		root.value=100;
		return root.value;
	}else{
		
		root.children.forEach(function(d){
			sum+=updateValues(d)
		})
		
		root.value=sum
		return sum;
		


  }
}
function newtreemapNode(selected,nodename,root,treemap){

 var newdata = {
   "name": nodename,
   "size": 100
  };
  //Creates a Node from newNode object using d3.hierarchy(.)
 // var newNode = d3.hierarchy(newdata);
  var newNode = d3.hierarchy(newdata)
  	  				newNode.sum(function(d) {
  	  				return d.size;
  					}) 
  //later added some properties to Node like child,parent,depth
  newNode.depth = selected.depth + 1; 
  newNode.height = selected.height - 1;
  
  newNode.parent = selected; 
  newNode.value=100;
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
  //selected.value+=newNode.value;
  if (newNode.height<0){
  	updateTMDepth(root,treemap)
  }
  console.log(selected)
  //updateValues(selected)
 // selected.value+=newNode.value;
 // updatetree(selected,rootC,svg,750,treemap)
  return newNode;
 
}
function updateTMDepth(root,treemap){
	var data=treemap(root)
	var nodes=root.descendants();
	//console.log(nodes)
    nodes.forEach(function(d){
    if (d.parent!=null){
    d.depth = d.parent.depth+1 
    d.height=d.parent.height-1;
    }else{
    	d.depth=0;
    	d.height++;

    }
		});
}
function removeTMdata(f,svg,root){
	 //remove the data too
	 var array=root.children;
	 console.log(root.children)
	 console.log(f.id)
	var index = 0;
	for (var j=0;j<array.length;j++){
		console.log(array[j].id)
		if (array[j].id==f.id){
			index=j;
		//	return true;
		}
	};

	  console.log(index)
	 if (index > -1) {
	 	console.log("root.children before")
	 	console.log(root.children)
	   root.children.splice(index, 1);
	   console.log("root.children after")
	 	console.log(root.children)
	 }
	 //console.log(root)
	 return root;

} 
