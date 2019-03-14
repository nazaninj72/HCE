

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
   console.log("sourceNode")
   console.log(sourceNode)
   console.log("destNode")
   console.log(destNode)
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
      duration=750

      update(rootC,750,svg,partition)
    }
    if (changestate=="remove"){
      removedata(sourceNode,svg)
      updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      duration=750

      update(rootC,750,svg,partition)
      console.log(rootC)
    }
    if (changestate=="add"){
      newnode=newNode(sourceNode,newlabels[newindx])
      console.log(newnode)
      duration=750;
      updateValues(rootC)
      svg.selectAll("*").remove();
      duration=750

      update(rootC,750,svg,partition)
    }
    document.getElementById("startbutton").disabled = true;

}
  var resetanimation = document.getElementById('resetbutton');
  resetanimation.onclick = function(){
    clickedonreset++;
    duration=750;
    if (changestate=="move"){
      movetochildrenTM(oldparent,sourceNode)
      updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition)
    }
    if (changestate=="remove"){
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
        duration=750;
        updateValues(rootC)
        update(rootC,0,svg2,partition)


      }
      if (changestate=="remove"){
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
      update(root,0,svg,partition)
      var rootC=null;
      rootC=clonetreemap(root,root.depth,root.height)
      svg.selectAll("*").remove()
      update(rootC,0,svg,partition)
      console.log(rootC)
      var duration=0;
      var tempData2 = partition(rootC);
      excludedNodes = tempData2.descendants();
      numNodes=excludedNodes.length;
      console.log(numNodes)
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
            .append('g').attr("transform","translate(" + diffWidth /2 + "," + diffheight/2 + ")")
       .append('g');

       var svgDiffAfter = d3.select("#afterdiff").append("svg")
             .attr("width", diffWidth1 + margin.left + margin.right)
             .attr("height", diffheight1 + margin.top + margin.bottom)
             .append('g').attr("transform","translate(" +diffWidth /2 + "," + diffheight/2 + ")")
             .append('g');
         radius1 = Math.min(diffWidth1/1.3, diffheight1/1.3);
           
         var partition1 = d3.partition()
            .size([2 * Math.PI, radius1]);
        beforeSubtree=clonetreemap(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
        partition1(beforeSubtree)
        updateSunDepth(beforeSubtree)
        update(beforeSubtree,0,svgDiffBefore,partition1)
        console.log(beforeSubtree)
      if (changestate=="move"){
        movetochildrenTM(destNode,sourceNode)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove()
        update(rootC,0,svg,partition)
        afterSubtree=clonetreemap(destNode,destNode.depth,destNode.height)
        updateSunDepth(afterSubtree)
        updateValues(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition1)
      }
      if(changestate=="add"){
        beforeSubtree=clonetreemap(sourceNode,sourceNode.depth,sourceNode.height)
        updateSunDepth(beforeSubtree)
        svgDiffBefore.selectAll("*").remove()
        update(beforeSubtree,0,svgDiffBefore,partition1)
        newnode=newNode(sourceNode,newlabels[newindx])
        console.log(newnode)
        duration=750;
        updateValues(rootC)
        svg.selectAll("*").remove()
        update(rootC,0,svg,partition)
        afterSubtree=clonetreemap(sourceNode,sourceNode.depth,sourceNode.height)
        updateSunDepth(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition1)

      }
      if (changestate=="remove"){
        removedata(sourceNode,svg)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove();
        update(rootC,0,svg,partition)
        afterSubtree=clonetreemap(sourceNode.parent,sourceNode.parent.depth,sourceNode.parent.height)
        updateSunDepth(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition1)

      }

  }
         
}

 function update(root,duration,svg,partition){
   var i=0;
   // console.log("duration")
   // console.log(duration)
   //if (first_build) {
   var gSlices = svg.selectAll("g").data(partition(root).descendants(),function(d) { return d.id|| (d.id = ++i); }).enter().append("g");
        
      gSlices.append("path").style("fill","white").style('stroke', 'black')
          .append("title").text(function (d) { return d.data.name; });  // Return white for root.
        gSlices.append("text").attr("transform", function(d) {
         var rotation = computeTextRotation(d);
         var translation = y(d.y0);
         if (rotation > 90 && rotation < 270) {
           rotation = rotation + 180;
           translation = -translation - 13;
         }
         return (
           "rotate(" + rotation + ")" +
           "translate(" + translation + ",0)"
         );
      })
      .attr("text-anchor", function(d) {
        var rotation = computeTextRotation(d);
        return (rotation > 90 && rotation < 270) ? "end" : "start";
      })
      .attr("dx", function(d) {
        var rotation = computeTextRotation(d);
        return (rotation > 90 && rotation < 270) ? -6 : 6;
      })
      .attr("dy", ".35em") // vertical-align
      .text(function(d) { 
          return d.data.name;
      })
        .attr("id", function (d) { return "w" + d.data.name; }); 
        //first_build=false;
     // }else {
        svg.selectAll("path").data(partition(root).descendants());
    //}


        svg.selectAll("path").transition().duration(duration)
        .attrTween("d", arcTweenData);
        svg.selectAll("text").transition("update").duration(0)
        .attrTween("transform", function (d, i) { return arcTweenText(d, i); })
        .attr('text-anchor', function (d) { return d.textAngle > 180 ? "start" : "end"; })
        .attr("dx", function (d) { return d.textAngle > 180 ? -13 : 13; })
        .attr("opacity", function (e) { return e.x1 - e.x0 > 0.01 ? 1 : 0; });
 } 
 
 function computeTextRotation(d) {
   var angle = (x((d.x0 + d.x1)/2) - Math.PI / 2) / Math.PI * 180;
   return (angle >  90 || angle < 270) ?  angle : 180 + angle ;

   }
  function arcTweenData(a, i) {
// (a.x0s ? a.x0s : 0) -- grab the prev saved x0 or set to 0 (for 1st time through)
// avoids the stash() and allows the sunburst to grow into being
var oi = d3.interpolate({ x0: (a.x0s ? a.x0s : 0), x1: (a.x1s ? a.x1s : 0) }, a);  
function tween(t) {
  var b = oi(t);
  a.x0s = b.x0;  
  a.x1s = b.x1;  
  return arc(b);
}
    if (i == 0) { 
      // If we are on the first arc, adjust the x domain to match the root node
      // at the current zoom level. (We only need to do this once.)
      var xd = d3.interpolate(x.domain(), [node.x0, node.x1]);
      return function (t) {
        x.domain(xd(t));
        return tween(t);
      };
    } else {
      return tween;
    }
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
  // When zooming: interpolate the scales.
  function arcTweenZoom(d) {
    var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
        yd = d3.interpolate(y.domain(), [d.y0, 1]), // [d.y0, 1]
        yr = d3.interpolate(y.range(), [d.y0 ? 40 : 0, radius]);
    return function (d, i) {
      return i
          ? function (t) { return arc(d); }
          : function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
    };
  }
  var arc = d3.arc()
            .startAngle(function (d) { return d.x0 })
            .endAngle(function (d) { return d.x1 })
            .innerRadius(function (d) { return d.y0 })
            .outerRadius(function (d) { return d.y1 });


function addback(d,f){

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
 
}
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

