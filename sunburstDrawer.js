

function drawSunburst(data,selector1,selector2,compstate,changestate){
  
if (compstate=="Animation"){
    var containerWidth = +d3.select(selector1).style('width').slice(0, -2)
    var containerHeight = +d3.select(selector1).style('height').slice(0, -2)
    var margin = {top: 40, right: 90, bottom: 50, left: 90},
      width = containerWidth - margin.left - margin.right,
      height = containerHeight - margin.top - margin.bottom,
      center = [height / 2, width / 2],
          focus = center;
   var svg = d3.select(selector1).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
         .append('g')
        .attr('transform', 'translate(' + width / 2+ ',' + height / 2 + ')');
  //.append('g').attr("transform","translate(" + width / 10 + "," + height/8 + ")")

  radius = Math.min(width, height)/2;
     x = d3.scaleLinear().range([0, 2 * Math.PI]),
      y = d3.scaleSqrt().range([0, radius])
  var partition = d3.partition()
     .size([2 * Math.PI, radius]);
  var root = d3.hierarchy(data)
    .sum(function (d) { return d.size});
  partition(root);
  console.log(partition(root))
  node = root
var rootC=null;
  rootC=clonetreemap(root,root.depth,root.height)
  partition(rootC)
  console.log(rootC)
  var duration=0;
  update(root,0,svg,partition)
 svg.selectAll("*").remove()
  update(rootC,0,svg,partition)

  var tempData2 = partition(rootC);
   excludedNodes = tempData2.descendants();
   numNodes=excludedNodes.length;
   var selectednodes=[]
   selectednodes=randomization(excludedNodes,numNodes)
   destNode=selectednodes[1];
   sourceNode=selectednodes[0];
   var oldparent=sourceNode.parent;
   // console.log("sourceNode")
   // console.log(sourceNode)
   // console.log("destNode")
   // console.log(destNode)
 //  if (changestate=="move"){
    // movetochildrenTM(destNode,sourceNode)
    // console.log(destNode)
    //updateSunDepth(rootC)
    //updateValues(rootC)
 //  }
  var newlabels=["W","X","Y","C","O","H","P","U"];
      var newindx=getRndInteger(0,newlabels.length-1)
 writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
var startanimation = document.getElementById('startbutton');
var clickedonstart=0;
var clickedonreset=0;
startanimation.onclick = function(){
  clickedonstart++;
    if (changestate=="move"){
      movetochildrenTM(destNode,sourceNode)
      updateSunDepth(rootC)
      updateValues(rootC)
     // update(root,duration,svg,partition)
      svg.selectAll("*").remove();
      duration=1000

      update(rootC,1000,svg,partition)
    }
    if (changestate=="delete"){
      removedata(sourceNode,svg)
      updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      duration=1000

      update(rootC,1000,svg,partition)

      console.log(rootC)
    }
    if (changestate=="add"){
      newnode=newNode(sourceNode,newlabels[newindx])
      console.log(newnode)
     
      updateValues(rootC)
      svg.selectAll("*").remove();
      

      update(rootC,0,svg,partition)
      svg.selectAll("g").filter(function(d){

                    if (d.id==newnode.id)
                    {
                      
                     
                      return true;
                    }
                    else
                      return false;
                  })
                  .style("opacity", 0.0)
                    .transition()
                    .duration(1000)
                    .style("opacity", 1.0)
      

    }
    document.getElementById("startbutton").disabled = true;

}
  var resetanimation = document.getElementById('resetbutton');
  resetanimation.onclick = function(){
    clickedonreset++;
    duration=1000;
    if (changestate=="move"){
      movetochildrenTM(oldparent,sourceNode)
      updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition)
    }
    if (changestate=="delete"){
      //should add sourcenode to the hierarchy again
      console.log(sourceNode)
      addback(oldparent,sourceNode)
      console.log(oldparent)
      //updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition)

    }
    if (changestate=="add"){
      removedata(newnode,svg)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition)
    }
    
    document.getElementById("startbutton").disabled = false;
  }
}
  if (compstate=="SidebySide"){
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
         .append('g').attr("transform","translate(" + width1 / 2 + "," + height1/2+ ")")
    .append('g');

    var containerWidth2 = +d3.select(selector2).style('width').slice(0, -2)
    var containerHeight2 = +d3.select(selector2).style('height').slice(0, -2)

    // set the dimensions and margins of the diagram
    margin = {top: 40, right: 90, bottom: 50, left: 90},
        width2 = containerWidth2 - margin.left - margin.right,
        height2 = containerHeight2 - margin.top - margin.bottom,
        center = [height2 / 2, width2 / 2],
        focus = center;

    var svg2 = d3.select(selector2).append("svg")
          .attr("width", width2 + margin.left + margin.right)
          .attr("height", height2 + margin.top + margin.bottom)
         .append('g').attr("transform","translate(" + width2 / 2 + "," + height2/2 + ")")
    .append('g');
    radius = Math.min(width1, height1)/2;
         x = d3.scaleLinear().range([0, 2 * Math.PI]),
          y = d3.scaleSqrt().range([0, radius])
      var partition = d3.partition()
         .size([2 * Math.PI, radius]);
      var root = d3.hierarchy(data)
        .sum(function (d) { return d.size});
      partition(root);
      console.log(partition(root))
      node = root
    var rootC=null;
      rootC=clonetreemap(root,root.depth,root.height)
      update(rootC,0,svg1,partition)
      svg1.selectAll("*").remove();
      partition(rootC)
      console.log(rootC)
      var duration=0;
      var tempData2 = partition(rootC);
      excludedNodes = tempData2.descendants();
      numNodes=excludedNodes.length;
      var selectednodes=[]
      selectednodes=randomization(excludedNodes,numNodes)
      destNode=selectednodes[1];
      sourceNode=selectednodes[0];
      console.log("sourceNode")
      console.log(sourceNode)
      console.log("destNode")
      console.log(destNode)
      var newlabels=["W","X","Y","C","O","H","P","U"];
      var newindx=getRndInteger(0,newlabels.length-1)
      writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
      update(root,0,svg1,partition)
      if (changestate=="move"){
        movetochildrenTM(destNode,sourceNode)
        updateSunDepth(rootC)
        updateValues(rootC)
        //svg.selectAll("*").remove();
        update(rootC,0,svg2,partition)

      }
      if (changestate=="add"){
        newnode=newNode(sourceNode,newlabels[newindx])
        console.log(newnode)
        duration=1000;
        updateValues(rootC)
        update(rootC,0,svg2,partition)


      }
      if (changestate=="delete"){
        update(rootC,0,svg2,partition)
        removedata(sourceNode,svg2)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg2.selectAll("*").remove();
        update(rootC,0,svg2,partition)

      }

  }
  if (compstate=="Diff"){
        var containerWidth = +d3.select("#viscontainerafter").style('width').slice(0, -2)
        var containerHeight = +d3.select("#viscontainerafter").style('height').slice(0, -2)
        var margin = {top: 40, right: 90, bottom: 50, left: 90},
          width = containerWidth - margin.left - margin.right,
          height = containerHeight - margin.top - margin.bottom,
          center = [height / 2, width / 2],
              focus = center;
       var svg = d3.select("#viscontainerafter").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
             .append('g')
            .attr('transform', 'translate(' + width / 2+ ',' + height /2 + ')');
      radius = Math.min(width, height)/2;
         x = d3.scaleLinear().range([0, 2 * Math.PI]),
          y = d3.scaleSqrt().range([0, radius])
      var partition = d3.partition()
         .size([2 * Math.PI, radius]);
      var root = d3.hierarchy(data)
        .sum(function (d) { return d.size});
      partition(root);
      console.log(partition(root))
      node = root
      update(root,0,svg,partition)
      var rootC=null;
      rootC=clonetreemap(root,root.depth,root.height)
      svg.selectAll("*").remove()
      update(rootC,0,svg,partition)
      var duration=0;
      var tempData2 = partition(rootC);
      excludedNodes = tempData2.descendants();
      numNodes=excludedNodes.length;
      console.log(excludedNodes)
      var selectednodes=[]
      selectednodes=randomization(excludedNodes,numNodes)
      destNode=selectednodes[1];
      sourceNode=selectednodes[0];
      console.log("sourceNode")
      console.log(sourceNode)
      console.log("destNode")
      console.log(destNode)
      var newlabels=["W","X","Y","C","O","H","P","U"];
      var newindx=getRndInteger(0,newlabels.length-1)
      writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
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
            .append('g').attr("transform","translate(" + diffWidth /2 + "," + diffheight/4 + ")")
       .append('g');

      var svgDiffAfter = d3.select("#afterdiff").append("svg")
             .attr("width", diffWidth1 + margin.left + margin.right)
             .attr("height", diffheight1 + margin.top + margin.bottom)
             .append('g').attr("transform","translate(" +diffWidth /2 + "," + diffheight/4 + ")")
             .append('g');
        radius1 = Math.min(diffWidth1/1.3, diffheight1/1.3);
        
      var partition1 = d3.partition()
          .size([2 * Math.PI, radius1]);
      beforeSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
      updateValues(beforeSubtree)
     // partition(beforeSubtree)
     // updateSunDepth(beforeSubtree)
      update(beforeSubtree,0,svgDiffBefore,partition1)
      if (changestate=="move"){
        var diV = document.getElementById('startdots');
        var diV2 = document.getElementById('startdots2');
       // if (sourceNode.parent.parent== null)
       // {
          diV.style.display='none';
          diV2.style.display='none';
       // }
       radius2 = Math.min(diffWidth1, diffheight1);
        
        var partition2 = d3.partition()
          .size([2 * Math.PI, radius2]);
        update(beforeSubtree,0,svgDiffBefore,partition2)
        dashedSunUpdate(beforeSubtree,sourceNode,svgDiffBefore,partition2,changestate)
        movetochildrenTM(destNode,sourceNode)
        //updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove()
        update(rootC,0,svg,partition)
        afterSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        update(afterSubtree,0,svgDiffAfter,partition2)
        dashedSunUpdate(afterSubtree,sourceNode,svgDiffAfter,partition2,changestate)
      }
      if(changestate=="add"){
        radius2 = Math.min(diffWidth1, diffheight1);
        
        var partition2 = d3.partition()
          .size([2 * Math.PI, radius2]);
         var diV = document.getElementById('startdots');
         var diV2 = document.getElementById('startdots2');
         if (sourceNode.parent== null)
         {
           diV.style.display='none';
           diV2.style.display='none';
         }
        beforeSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
       //updateSunDepth(beforeSubtree)
        svgDiffBefore.selectAll("*").remove()
        update(beforeSubtree,0,svgDiffBefore,partition2)
        dashedSunUpdate(beforeSubtree,sourceNode,svgDiffBefore,partition2,changestate,diffWidth,diffheight)
        var arcpositions=[];
        
        svgDiffBefore.selectAll('g').filter(function(d){ 
          if (d.id==sourceNode.id)
          {
            console.log(d.y1-d.y0)
           
            diV.style.position = "relative";
            diV.style.left = diffWidth /2+'px';
            diV.style.top = diffheight /2+'px';


          }
          if (d.id==sourceNode.parent.id){
            return true;
          }
        }).style("opacity",0)
        newnode=newNode(sourceNode,newlabels[newindx])
        console.log(newnode)
        duration=1000;
        updateValues(rootC)
        svg.selectAll("*").remove()
        update(rootC,0,svg,partition)
        afterSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        //updateSunDepth(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition2)
        dashedSunUpdate(afterSubtree,newnode,svgDiffAfter,partition2,changestate,diffWidth,diffheight)
        
        svgDiffAfter.selectAll('g').filter(function(d){ 
          if (d.id==sourceNode.id)
          {
            console.log(d)
            diV2.style.position = "relative";
            diV2.style.left = diffWidth1/1.3+'px';
            diV2.style.top = (50)+'px';

          }
        })
      }
      if (changestate=="delete"){
         beforeSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
          var diV = document.getElementById('startdots');
          var diV2 = document.getElementById('startdots2');
         // if (sourceNode.parent.parent== null)
         // {
            diV.style.display='none';
            diV2.style.display='none';
         // }
        radius2 = Math.min(diffWidth1, diffheight1);
        
        var partition2 = d3.partition()
          .size([2 * Math.PI, radius2]);
        svgDiffBefore.selectAll("*").remove()
        update(beforeSubtree,0,svgDiffBefore,partition2)
        dashedSunUpdate(beforeSubtree,sourceNode,svgDiffBefore,partition2,changestate)
        removedata(sourceNode,svg)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove();
        update(rootC,0,svg,partition)
        afterSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        //updateSunDepth(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition2)
        dashedSunUpdate(afterSubtree,sourceNode,svgDiffAfter,partition2,changestate)
        
      }

  }
         
}

 function update(root,duration,svg,partition){
  var i=0;
 var gSlices = svg.selectAll("g").data(partition(root).descendants(),function(d) { return d.id|| (d.id = ++i); }).enter().append("g");   
   gSlices.exit().remove();
   gSlices.append("path").style("fill", "#deebf7").style('stroke', 'black')
        .append("title").text(function (d) { return d.data.name; });  // Return white for root.
   gSlices.append("text").attr("dy", ".50em").text(function (d) { return d.data.name ; }).attr("id", function (d) { return "w" + d.data.name; }); // TODO: was d.data.word
    svg.selectAll("path").append("title").text(function (d) { return d.data.word; })
    svg.selectAll("path").data(partition(root).descendants());
    svg.selectAll("path").transition("update").duration(duration).attrTween("d", function (d, i) {
         return arcTweenPath(d, i);
       });
      svg.selectAll("text").transition("update").duration(duration).attrTween("transform", function (d, i) { return arcTweenText(d, i); })
         .attr('text-anchor', function (d) { return d.textAngle > 180 ? "start" : "end"; })
         .attr("dx", function (d) { return d.textAngle > 180 ? -8 : 8; })
         .attr("opacity", function (e) { return e.x1 - e.x0 > 0.01 ? 1 : 0; });
   
  
 } 
 
 function arcTweenText(a, i) {

   var oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0), y0: (a.y0s ? a.y0s : 0), y1: (a.y1s ? a.y1s : 0) }, a);
   function tween(t) {
     var b = oi(t);
     var ang = ((x((b.x0 + b.x1) / 2) - Math.PI / 2) / Math.PI * 180);
     b.textAngle = (ang > 90) ? 180 + ang : ang;
     a.centroid = arc.centroid(b);
     //b.opacity = (b.x1 - b.x0) > 0.01 ? 0 : 0;
     //console.log(b.data.name + " x1:" + b.x1 + " x0:" + b.x0);
     return "translate(" + arc.centroid(b) + ")rotate(" + b.textAngle + ")";
   }
   return tween;
 }

 // When switching data: interpolate the arcs in data space.
 function arcTweenPath(a, i) {
   // (a.x0s ? a.x0s : 0) -- grab the prev saved x0 or set to 0 (for 1st time through)
   // avoids the stash() and allows the sunburst to grow into being
   var oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0), y0: (a.y0s ? a.y0s : 0), y1: (a.y1s ? a.y1s : 0) }, a);
   function tween(t) {
     var b = oi(t);
     a.x0s = b.x0;
     a.x1s = b.x1;
     a.y0s = b.y0;
     a.y1s = b.y1;
     return arc(b);
   }
   if (i == 0 && node) {  // If we are on the first arc, adjust the x domain to match the root node at the current zoom level.
     var xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
     var yd = d3.interpolate(y.domain(), [node.y0, 1]);
     var yr = d3.interpolate(y.range(), [node.y0 ? 40 : 0, radius]);

     return function (t) {
       x.domain(xd(t));
       y.domain(yd(t)).range(yr(t));
       return tween(t);
     };
   } else {
     return tween;
   }
 }
  var arc = d3.arc()
            .startAngle(function (d) { return d.x0 })
            .endAngle(function (d) { return d.x1 })
            .innerRadius(function (d) { return d.y0 })
            .outerRadius(function (d) { return d.y1 });
function deleteNode(f){

 // console.log(draggedNode.parent)
  var index = f.parent.children.indexOf(f);
   // console.log(index)
   if (index > -1) {
   // console.log(f.value)
     f.parent.value-=f.value;
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
   
 
}
function updateSunDepth(root){
  var nodes=root.descendants();
  //console.log(nodes)
    nodes.forEach(function(d){
    if (d.parent!=null){
    d.depth = d.parent.depth+1 
    d.height=d.parent.height-1;
    }else{
      d.depth=0;
      //d.height++;

    }
    });
}
function dashedSunUpdate(root,sourceNode,svg,partition,changestate,width,height){
      var solidarcs=[];
      var l=0; 
      var solidarcids=[];
      var k=0; 
      solidarcs=addToAdjacencyList(sourceNode,solidarcs)
      console.log(solidarcs)
      var solidadd=[];
      if (changestate=="add"){
        k=0;
        solidadd[k++]=sourceNode.parent.id;
        solidadd[k++]=sourceNode.id;
        
      }
      solidarcs.forEach(function(f){
        solidarcids[k++]=f.id;
      })
      if (changestate=="move"||changestate=="delete")
      {
        solidarcids[k++]=sourceNode.parent.id;
      
        svg.selectAll("g").filter(function(d,i){
          if (solidarcids.includes(d.id)){
            return false;
          }else{
            return true;
          }
        }).style("opacity",0)
      } 
      if (changestate=="add"){
        svg.selectAll("g").filter(function(d,i){
          if (solidadd.includes(d.id)){
            return false;
          }else{
            return true;
          }
        }).style("opacity",0)  
      }
       if (changestate=="move"||changestate=="delete")
      {
        solidarcids[k++]=sourceNode.parent.id;
      
        svg.selectAll("g").filter(function(d,i){
          if (solidarcids.includes(d.id)){
            return true;
          }else{
            return false;
          }
        }).attr("transform","translate(" + (0) + "," + (-height/4) + ")")
      } 
      if (changestate=="add"){
        svg.selectAll("g").filter(function(d,i){
          if (solidadd.includes(d.id)){
             $(this).css({top: height/2, left: width/2, position:'absolute'});
            return true;
          }else{
            return false;
          }
        })
        
      }
}

