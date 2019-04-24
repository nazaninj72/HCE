 var clickedonstart=0;
var clickedonreset=0;
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
		               .paddingTop(35)
	                   .paddingRight(4)
	                   .paddingLeft(4)
	                   .paddingBottom(4)
	                   .paddingInner(3) 
		               .round(true); 
		       var root = d3.hierarchy(data)
		       	  				root.sum(function(d) {
		       	  				return d.size;
		       					}) 
				
				
	       	    var rootC=null;
	       		
	       	
	       		var lid=[];
	       		
	       		var list=[];
				updatetreemap(root,chartLayer,duration,treemap,lid)
				svg.selectAll("*").style("opacity",1)
				rootC=clonetreemap(root,root.depth,root.height)
				var startanimation = document.getElementById('startbutton');
				var tempData2 = treemap(rootC);
				 excludedNodes = tempData2.descendants();
				 console.log(excludedNodes)
				 numNodes=excludedNodes.length;
				 var selectednodes=[]
				  maxdepth=updateDepth(rootC,treemap)
		 		 selectednodes=randomization(excludedNodes,numNodes,maxdepth)
				 destNode=selectednodes[1];
				 sourceNode=selectednodes[0];
				 console.log(destNode)
				 console.log(sourceNode)
				 var k=0;
				 list=addToAdjacencyList(sourceNode,list)
				 list.forEach(function(f){
				 	lid[k++]=f.id;
				 })
				var newlabels=["W","X","Y","C","O","H","P","U"];
		 		var newindx=getRndInteger(0,newlabels.length-1)
		 		//writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
				startanimation.onclick = function(){
					document.getElementById("resetbutton").disabled = false;
					clickedonstart++;
					if (changestate=="move"){

						movetochildrenTM(destNode,sourceNode)
					
						duration=1500;
						 //updatetree(root,root,svg1,duration,treemap)
						 bringtoFront(sourceNode,svg,"g.node")
						 updateValues(rootC)
						 updateTMDepth(rootC,treemap)
						 
						 updatetreemap(rootC,chartLayer,duration,treemap,lid)
						 svg.selectAll("*").style("opacity",1)
					}
					if (changestate=="delete"){
						duration=1500;
						var alldata = treemap(rootC).descendants();
						 alldata.forEach(function(f){
						 
				 				lid[k++]=f.id;
			 			 })
			 		
						removeTMnode(sourceNode,svg,duration,"g.node",function(){
							removedata(sourceNode,svg)
							updateValues(rootC)
							updatetreemap(rootC,chartLayer,duration,treemap,lid)
						})
						svg.selectAll("*").style("opacity",1)
					}
				if (changestate=="add"){
					var selected=null;
					
					//updatetreemap(root,chartLayer,duration,treemap,lid)
					/*svg.selectAll("g.node").filter(function(d){

					  if (d.id==destNode.id)
					  {
					  	
					    selected=d
					    return true;
					  }
					  else
					    return false;
					})*/
					
					newnode=newtreemapNode(sourceNode,newlabels[newindx],rootC,treemap)
					duration=0;
					updateValues(rootC)
					updatetreemap(rootC,chartLayer,duration,treemap,lid)
					svg.selectAll("*").style("opacity",1)
					svg.selectAll("g.node").filter(function(d){

					  if (d.id==newnode.id)
					  {
					  	
					   
					    return true;
					  }
					  else
					    return false;
					})
					.style("opacity", 0.0)
						.transition()
						.duration(1500)
						.style("opacity", 1.0)
					console.log(newnode.id)
			}
				document.getElementById("startbutton").disabled = true;
			}



				var resetanimation = document.getElementById('resetbutton');
				resetanimation.onclick = function(){
					clickedonreset++;
					var lid=[];
					duration=0;
				if (changestate=="add"){
						//newnode.parent.value-=newnode.value;
						
						svg.selectAll('g.node')
					 	  .filter(function(d, i) {
					 	    if (d.id==newnode.id){
					 	   	
					 	      return true;
					 	    }else{
					 	      return false;
					 	    }
					 	 }).remove();
						removedata(newnode,svg)
						//updateValues(rootC)
						//updatetreemap(rootC,chartLayer,duration,treemap,lid)

					}
						updatetreemap(root,chartLayer,duration,treemap,lid)
					
					
					svg.selectAll("*").style("opacity",1)
					document.getElementById("startbutton").disabled = false;
					document.getElementById("resetbutton").disabled = true;
			}
		}

		if (compstate=="SidebySide"){


	    	var duration=0;
	    	var width,height;
	    	var exesheight;
		   var chartWidth, chartHeight
		   var margin
		   var lid=[];
		   var svg1 = d3.select(selector1).append("svg")
		   var chartLayer1 = svg1.append("g").classed("chartLayer", true)
		   var svg2 = d3.select(selector2).append("svg")
		   var chartLayer2 = svg2.append("g").classed("chartLayer", true)
	       width = +d3.select(selector1).style('width').slice(0, -2)
	       height = +d3.select(selector1).style('height').slice(0, -2)-25;
	       //console.log(d3.select("#beforesidebyside").style("height").slice(0, -2))
	       $(".questionbar").css("top", "10%");
	   
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
	               .paddingTop(35)
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
	       		
	        updatetreemap(root,chartLayer1,duration,treemap,lid)
			console.log(root)
			svg1.selectAll("*").style("opacity", 0);
			rootC=clonetreemap(root,root.depth,root.height)
			 var tempData2 = treemap(rootC);
			 excludedNodes = tempData2.descendants();
			 numNodes=excludedNodes.length;
			 var selectednodes=[]
			  maxdepth=updateDepth(rootC,treemap)

			 selectednodes=randomization(excludedNodes,numNodes,maxdepth)
			  var newlabels=["W","X","Y","C","O","H","P","U"];
			  var newindx=getRndInteger(0,newlabels.length-1)
			  destNode=selectednodes[1];
			  sourceNode=selectednodes[0];
			  	 	
			 // answerinput.innerHTML = ""+sourceNode.data.name+"-"+ changestate;
			  
			 // writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
			if (changestate=="move"){

				 movetochildrenTM(destNode,sourceNode)
				 updateValues(rootC)
				 svg1.selectAll("*").style("opacity", 1);
				 //updatetree(root,root,svg1,duration,treemap)
				 updateTMDepth(rootC,treemap)
				 updatetreemap(rootC,chartLayer2,duration,treemap,lid)
				 svg2.selectAll("*").style("opacity", 1);

			}
			if (changestate=="delete"){
				console.log(sourceNode)
				removedata(sourceNode,svg2)
				updateValues(rootC)
				svg1.selectAll("*").style("opacity", 1);
				//updatetree(root,root,svg1,duration,treemap)
				 updatetreemap(rootC,chartLayer2,duration,treemap,lid)
				 svg2.selectAll("*").style("opacity", 1);

			}
			if (changestate=="add"){
				 	svg1.selectAll("*").style("opacity", 1);
					
						newnode=newtreemapNode(destNode,newlabels[newindx],rootC,treemap)
						console.log(newnode.value)
						updateValues(rootC)
						console.log(rootC)
						updatetreemap(rootC,chartLayer2,duration,treemap,lid)
						svg2.selectAll("*").style("opacity", 1);

			}


		}
		if (compstate=="Diff"){

		   document.getElementById("viscontainerafter").style.left="2%";
		   document.getElementById("beforediff").style.left="8%";
		   document.getElementById("afterdiff").style.left="8%";
		   document.getElementById("beforediff").style.top="8%";
		   document.getElementById("afterdiff").style.top="8%";
		   document.getElementById("viscontainerafter").style.top="8%";
		   document.getElementById("currentvis").style.left="13%";
		   
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
     	               .paddingTop(35)
     	               .paddingRight(4)
     	               .paddingLeft(4)
     	               .paddingBottom(4)
                        .paddingInner(3) 
	                     .round(true); 
              

         var root = d3.hierarchy(data)
 	  				root.sum(function(d) {
 	  				return d.size;
 					}) 
 					var lid=[];
	      	//console.log(root)
			updatetreemap(root,chartLayer,duration,treemap,lid)

			
       	    var rootC=null;
       		
       		rootC=clonetreemap(root,root.depth,root.height)
			 var tempData2 = treemap(rootC);
			 excludedNodes = tempData2.descendants();
			 numNodes=excludedNodes.length;
			 var selectednodes=[]
			  maxdepth=updateDepth(rootC,treemap)

		 	  selectednodes=randomization(excludedNodes,numNodes,maxdepth)
			  var newlabels=["W","X","Y","C","O","H","P","U"];
			  var newindx=getRndInteger(0,newlabels.length-1)
			  destNode=selectednodes[1];
			  sourceNode=selectednodes[0];
			  var beforewidth=0;
			  var beforeheight=0;
			  var afterwidth=0;
			  var afterheight=0;
			  chartLayer.selectAll(".node rect").filter(function(d){
			  	if (d.id==sourceNode.parent.id)
			  	{	
			  		beforewidth=d.x1-d.x0;
			  		

			  		if (beforewidth>chartWidth1)
			  			beforewidth=chartWidth1
			  		beforeheight=d.y1 - d.y0;
			  		if (beforeheight>chartHeight1)
			  			beforeheight=chartHeight1
			  		
			  	}
			  	return true;
			  })
			  
	           var treemap1 = d3.treemap()
	                  .size([beforewidth, beforeheight])
		               .paddingTop(35)
		               .paddingRight(4)
		               .paddingLeft(4)
		               .paddingBottom(4)
	                 .paddingInner(3) 
	                  .round(true);
	          chartLayer.selectAll("*").remove();
			 // writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
				beforeSubtree=clonetreemap(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)	
				updateTMDepth(beforeSubtree,treemap1)
				updateValues(beforeSubtree)

			if (changestate=="move"){ 
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1,lid)
				var diV = document.getElementById('startdots');
				var diV2 = document.getElementById('startdots2');
				if (sourceNode.parent.parent== null)
					diV.style.display='none';
				chartLayerDiffBefore.selectAll("*").remove()
				updateTMDepth(beforeSubtree,treemap1)
				updateValues(beforeSubtree)
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1,lid)
				svgDiffBefore.selectAll("*").style("opacity", 1);
				svgDiffBefore.selectAll('.node rect').filter(function(d){
				
					if (d.id==sourceNode.parent.id)
					{
						
						diV.style.position = "relative";
						diV.style.left = ((d.x1 - d.x0)/2)+'px';
						diV.style.top = (-15)+'px';

					}
				})
				var sIDs=[];
				var sNodes=[];
				sNodes=addToAdjacencyList(sourceNode,sNodes)
				var k=0;
				sNodes.forEach(function(f){
					sIDs[k++]=f.id;
				})
				sIDs[k++]=sourceNode.parent.id;
				 movetochildrenTM(destNode,sourceNode)
				// console.log(destNode)
				 //console.log(rootC)
				// svg.selectAll("*").remove();
				updateValues(rootC)
				updateTMDepth(rootC,treemap)
				 updatetreemap(rootC,chartLayer,duration,treemap,lid)
				 chartLayer.selectAll("*").style("opacity", 1);
				 chartLayer.selectAll(".node rect").filter(function(d){
			  	if (d.id==destNode.id)
			  	{	
			  		afterwidth=d.x1-d.x0;
			  		if (afterwidth>chartWidth1)
			  			afterwidth=chartWidth1
			  		afterheight=d.y1 - d.y0;
			  		if (afterheight>chartHeight1)
			  			afterheight=chartHeight1
			  		
			  	}
			  	return true;
			  })
	           var treemap2 = d3.treemap()
	                  .size([afterwidth, afterheight])
	 	               .paddingTop(35)
	 	               .paddingRight(4)
	 	               .paddingLeft(4)
	 	               .paddingBottom(4)
	                 .paddingInner(3) 
	                  .round(true); 
				 afterSubtree=clonetreemap(destNode,destNode.depth,destNode.height)
				 updateTMDepth(afterSubtree,treemap2)
				 updateValues(afterSubtree)
				 updatetreemap(afterSubtree,chartLayerDiffAfter,duration,treemap2,lid)
				 //afterSubtree=trimTMSubtrees(afterSubtree,sourceNode,svgDiffBefore)
				 chartLayerDiffAfter.selectAll("*").remove()
				 updateTMDepth(afterSubtree,treemap2)
				 updateValues(afterSubtree)
				 updatetreemap(afterSubtree,chartLayerDiffAfter,duration,treemap2,lid)
				 
				 svgDiffAfter.selectAll("*").style("opacity", 1);
				 if (destNode.parent== null)
					diV2.style.display='none';
				 svgDiffAfter.selectAll('.node rect').filter(function(d){
				 	if (d.id==destNode.id)
				 	{
				 		
				 		diV2.style.position = "relative";
				 		diV2.style.left = ((d.x1 - d.x0)/2)+'px';
				 		diV2.style.top = (-15)+'px';

				 	}
				 })
				 dashedTMUpdate(afterSubtree,sourceNode,chartLayerDiffAfter,treemap2,changestate)
				chartLayerDiffBefore.selectAll("*").remove()
				updateTMDepth(beforeSubtree,treemap2)
				updateValues(beforeSubtree)
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap2,lid)
				
			
				svgDiffBefore.selectAll("*").style("opacity", 1);
				
				svgDiffBefore.selectAll('.node rect').filter(function(d){
					if (sIDs.includes(d.id))
					{
						return false;
					}else{
						return true;
					}
				}).style("opacity",0);
				svgDiffBefore.selectAll('.node text').filter(function(d){
					if (sIDs.includes(d.id))
					{
						return false;
					}else{
						return true;
					}
				}).style("opacity",0);
				//dashedTMUpdate(beforeSubtree,sourceNode,chartLayerDiffBefore,treemap2,changestate)
					
			}
			if (changestate=="delete"){
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1,lid)
				var diV = document.getElementById('startdots');
				var diV2 = document.getElementById('startdots2');
				if (sourceNode.parent.parent== null)
					diV.style.display='none';
				removedata(sourceNode,svg)
				updateTMDepth(rootC,treemap)
				updateValues(rootC)
				updatetreemap(rootC,chartLayer,duration,treemap,lid)
				svg.selectAll("*").style("opacity",1)
				chartLayer.selectAll(".node rect").filter(function(d){
			  		if (d.id==sourceNode.parent.id)
			  		{	
			  		afterwidth=d.x1-d.x0;
			  		if (afterwidth>chartWidth1)
			  			afterwidth=chartWidth1
			  		afterheight=d.y1 - d.y0;
			  		if (afterheight>chartHeight1)
			  			afterheight=chartHeight1
			  		}
			  	return true;
			  	})
	           var treemap2 = d3.treemap()
                  .size([afterwidth, afterheight])
 	               .paddingTop(35)
 	               .paddingRight(4)
 	               .paddingLeft(4)
 	               .paddingBottom(4)
                 .paddingInner(3) 
                  .round(true);
				chartLayerDiffBefore.selectAll("*").remove()
				updateTMDepth(beforeSubtree,treemap1)
				updateValues(beforeSubtree)
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap2,lid)
				svgDiffBefore.selectAll("*").style("opacity", 1);
				svgDiffBefore.selectAll('.node rect').filter(function(d){
					if (d.id==sourceNode.parent.id)
					{
						
						diV.style.position = "relative";
						diV.style.left = ((d.x1 - d.x0)/2)+'px';
						diV.style.top = (-15)+'px';

					}
				})
				dashedTMUpdate(beforeSubtree,sourceNode,chartLayerDiffBefore,treemap1,"move")
				chartLayerDiffAfter.selectAll("*").remove()
				removeTMdata(sourceNode,svgDiffAfter,beforeSubtree)
				updateValues(beforeSubtree)
				
				updatetreemap(beforeSubtree,chartLayerDiffAfter,duration,treemap2,lid)
				chartLayerDiffAfter.selectAll("*").style("opacity",1)
				svgDiffAfter.selectAll('.node rect').filter(function(d){
				
					if (d.id==sourceNode.parent.id)
					{
						
						diV2.style.position = "relative";
						diV2.style.left = ((d.x1 - d.x0)/2)+'px';
						diV2.style.top = (-15)+'px';

					}
				})
				dashedTMUpdate(beforeSubtree,sourceNode,chartLayerDiffAfter,treemap2,"move")
				
			}
			if (changestate=="add"){
				var diV = document.getElementById('startdots');
				var diV2 = document.getElementById('startdots2');
				if (sourceNode.parent== null)
					diV.style.display='none';
				beforeSubtree=clonetreemap(sourceNode,sourceNode.depth,sourceNode.height)
				
				//updateTMDepth(beforeSubtree,treemap1)
				chartLayerDiffBefore.selectAll("*").remove()
				updateTMDepth(beforeSubtree,treemap1)
				updateValues(beforeSubtree)
				updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1,lid)
				
				chartLayerDiffBefore.selectAll("*").style("opacity",1)
				newnode=newtreemapNode(sourceNode,newlabels[newindx],rootC,treemap)
				updateValues(rootC)
				updatetreemap(rootC,chartLayer,duration,treemap,lid)
				svg.selectAll("*").style("opacity",1)
				 chartLayer.selectAll(".node rect").filter(function(d){
			  	if (d.id==sourceNode.id)
			  	{	
			  		afterwidth=d.x1-d.x0;
			  		if (afterwidth>chartWidth1)
			  			afterwidth=chartWidth1
			  		afterheight=d.y1 - d.y0;
			  		if (afterheight>chartHeight1)
			  			afterheight=chartHeight1
			  		
			  	}

			  	return true;
			  })
				 treemap1 = d3.treemap()
	                  .size([afterwidth, afterheight])
	 	               .paddingTop(35)
	 	               .paddingRight(4)
	 	               .paddingLeft(4)
	 	               .paddingBottom(4)
	                 .paddingInner(3) 
	                  .round(true);
			   updatetreemap(beforeSubtree,chartLayerDiffBefore,duration,treemap1,lid)
	           dashedTMUpdate(beforeSubtree,sourceNode,chartLayerDiffBefore,treemap1,changestate)
	           svgDiffBefore.selectAll('.node rect').filter(function(d){
	           
	           	if (d.id==sourceNode.id)
	           	{
	           		
	           		diV.style.position = "relative";
	           		diV.style.left = ((d.x1 - d.x0)/2)+'px';
	           		diV.style.top = (-15)+'px';

	           	}
	           })
	           var treemap2 = d3.treemap()
	                  .size([afterwidth, afterheight])
	 	               .paddingTop(35)
	 	               .paddingRight(4)
	 	               .paddingLeft(4)
	 	               .paddingBottom(4)
	                 .paddingInner(3) 
	                  .round(true); 
				afterSubtree=clonetreemap(sourceNode,sourceNode.depth,sourceNode.height)
				updateTMDepth(afterSubtree,treemap2)
				updateValues(afterSubtree)
				updatetreemap(afterSubtree,chartLayerDiffAfter,duration,treemap2,lid)
				svgDiffAfter.selectAll("*").style("opacity",1)
				dashedTMUpdate(afterSubtree,newnode,chartLayerDiffAfter,treemap1,changestate)
	           
				svgDiffAfter.selectAll('.node rect').filter(function(d){
				
					if (d.id==sourceNode.id)
					{
						
						diV2.style.position = "relative";
						diV2.style.left = ((d.x1 - d.x0)/2)+'px';
						diV2.style.top = (-15)+'px';

					}
				})
				
			}

		}
	  			



    	 
}
function bringtoFront(sourceNode,svg,selector){
	var list=[];
	var lid=[];
	var k=0;
	list=addToAdjacencyList(sourceNode,list)
	list.forEach(function(f){
		lid[k++]=f.id;
	})
	svg.selectAll(selector).filter(function(d){
		if (lid.includes(d.id)){
			d3.select(this).raise();
		}
	})
}

function updatetreemap(root,chartLayer,duration,treemap,lid){
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
/*	    .delay(function(d,i){ 
	    	if (d.id ==id)
	    		return i * 50
    		else
    			return 0; })*/
	    .duration(function(d,i){ 
	    	if (lid.includes(d.id))
	    		return duration
    		else
    			return 0;})
	    .attr("x", function(d) { return d.x0 })
	    .attr("y", function(d) { return d.y0  })
	    .attr("width", function(d) { return d.x1 - d.x0 })
	    .attr("height", function(d) { return d.y1 - d.y0})
	    .style("fill","#f0f0f0")
	    
	chartLayer
	    .selectAll(".node text")    
	    .transition()
	    //.delay(function(d,i){ if (d.id ==id)return i * 50 else
    		//	return 0;})
	    .duration(function(d,i){ 
	    	if (lid.includes(d.id))
	    		return duration
    		else
    			return 0;})
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
	 if (index > -1) {
	   root.children.splice(index, 1);

	 }
	 //console.log(root)
	 return root;

} 
function trimTMSubtrees(subtree,sourceNode,svg){
	var removingnode=[];
	//console.log(sourceNode)
	if (typeof subtree.children!="undefined"){
		subtree.children.forEach(function(d){
			//console.log(d)
		if (d.id!=sourceNode.id){
			removingnode.push(d)
		}
	})
	for (var i=0;i<(removingnode.length);i++)
		removeTMdata(removingnode[i],svg,subtree)

	}
	return subtree;

}
function dashedTMUpdate(root,sourceNode,chartLayer,treemap,changestate){
		var i=0;
	    var treeData = treemap(root);
	    var solidLinkNodes=[];
	    var otherids=[];
	    var l=0; 
	    var solidlinkids=[];
	    var solidadd=[];
	    var k=0;
	 	if (changestate=="add"){
	    	k=0;
    		solidadd[k++]=sourceNode.parent.id;
    		solidadd[k++]=sourceNode.id;
	    	
	    }
	    k=0; 
    	solidLinkNodes=addToAdjacencyList(sourceNode,solidLinkNodes)
    	console.log(solidLinkNodes)
    	
    	solidLinkNodes.forEach(function(f){
    		solidlinkids[k++]=f.id;
    	})
    	if (changestate=="move")
    	{
    		solidlinkids[k++]=sourceNode.parent.id;
			chartLayer.selectAll(".node rect").filter(function(d,i){
				if (solidlinkids.includes(d.id)){
					return false;
				}else{
					return true;
				}
			}).style("opacity",0)

			chartLayer.selectAll(".node text").filter(function(d){
				if (solidlinkids.includes(d.id)){
					return false;
				}else{
					return true;
				}
			}).style("opacity",0)
		}
		if (changestate=="add"){
			chartLayer.selectAll(".node rect").filter(function(d,i){
				if (solidadd.includes(d.id)){
					return false;
				}else{
					return true;
				}
			}).style("opacity",0)
			

			chartLayer.selectAll(".node text").filter(function(d){
				console.log(d)
				if (solidadd.includes(d.id)){
					return false;
				}else{
					return true;
				}
			}).style("opacity",0)
		}
	    	
}
function removeTMnode(f,svg,duration,selector,callback){
	var lid=[];
	var k=0;
	var list=[];
	list=addToAdjacencyList(f,list)
	list.forEach(function(f){
		lid[k++]=f.id;
	})
		svg.selectAll(selector)
		  .filter(function(d, i) {
		    if (lid.includes(d.id)){
		    
		      return true;
		    }else{
		      return false;
		    }
		 }).style("opacity", 1.0)
						.transition()
						.duration(duration)
						.style("opacity", 0.0)
						.on("end", callback);
	
}
function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}