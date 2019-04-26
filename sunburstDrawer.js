
var clickedonstart=0;
var clickedonreset=0;
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
        .call(d3.zoom().on("zoom", function () {
         svg.attr("transform", d3.event.transform)
           }))
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
  var lid=[];         
  var list=[];
  partition(rootC)
  var duration=0;
  console.log(lid)
  lid[0]=-1;
  update(root,0,svg,partition,lid)
  svg.selectAll("*").remove()
  update(rootC,0,svg,partition,lid)

  var tempData2 = partition(rootC);
   excludedNodes = tempData2.descendants();
   numNodes=excludedNodes.length;
   var selectednodes=[]
    maxdepth=updateSunDepth(rootC)

     selectednodes=randomization(excludedNodes,numNodes,maxdepth)
   destNode=selectednodes[1];
   sourceNode=selectednodes[0];
   var k=0;
   list=addToAdjacencyList(sourceNode,list)
   list.forEach(function(f){
    lid[k++]=f.id;
   })
    var oldparent=sourceNode.parent;
    var oldindx=oldparent.children.indexOf(sourceNode);
    var newlabels=["W1","XY","Y9","CU","OR","HP","IP","UM","IR","SH"];
    var newindx=getRndInteger(0,newlabels.length-1)
   // writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
    var startanimation = document.getElementById('startbutton');
    var clickedonstart=0;
    var clickedonreset=0;
    startanimation.onclick = function(){
    clickedonstart++;
    if (changestate=="move"){
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition,lid)
      movetochildrenTM(destNode,sourceNode)
      updateSunDepth(rootC)
      updateValues(rootC)
     // update(root,duration,svg,partition)
      svg.selectAll("*").remove();
      duration=1500
      bringtoFront(sourceNode,svg,"g")
      update(rootC,duration,svg,partition,lid)
    }
    if (changestate=="delete"){
      duration=1500;
      removeTMnode(sourceNode,svg,duration,"g", function() {
        removedata(sourceNode,svg)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove()
        //svg.selectAll("*").transition().duration(1500).remove();
        update(rootC,duration,svg,partition,lid)
      });
 
      
     // svg.selectAll("*").style("opacity",1);

    }
    if (changestate=="add"){
      duration=1500;
      newnode=newNode(sourceNode,newlabels[newindx])
      console.log(newnode)
      
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition,lid)
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
              .duration(duration)
              .style("opacity", 1.0)

    }
    document.getElementById("startbutton").disabled = true;

}
  var resetanimation = document.getElementById('resetbutton');
  resetanimation.onclick = function(){
    clickedonreset++;
    duration=1500;
    if (changestate=="move"){
    //  movetochildrenTM(oldparent,sourceNode)
      moveback(oldparent,sourceNode,oldindx)
      updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition,lid)
    }
    if (changestate=="delete"){
      //should add sourcenode to the hierarchy again
      console.log(sourceNode)
      addback(oldparent,sourceNode,oldindx)
      console.log(oldparent)
      //updateSunDepth(rootC)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition,lid)

    }
    if (changestate=="add"){
      removedata(newnode,svg)
      updateValues(rootC)
      svg.selectAll("*").remove();
      update(rootC,0,svg,partition,lid)
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
    document.getElementById("beforesidebyside").style.left=""+(width1/2-50)+"px";
    document.getElementById("aftersidebyside").style.left=""+(width1/2-50)+"px";
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
    
      var root = d3.hierarchy(data)
        .sum(function (d) { return d.size});
      var H=height1/2;
     if (root.descendants().length>25)
        H=height1/2;
      else
        H=height1/2.2;

      radius = Math.min(width1/2, H);
         x = d3.scaleLinear().range([0, 2 * Math.PI]),
          y = d3.scaleSqrt().range([0, radius])
      var partition = d3.partition()
         .size([2 * Math.PI, radius]);
         partition(root);
      node = root
    var rootC=null;
    var lid=[];
      rootC=clonetreemap(root,root.depth,root.height)
      update(rootC,0,svg1,partition,lid)
      svg1.selectAll("*").remove();
      partition(rootC)
      console.log(rootC)
      var duration=0;
      var tempData2 = partition(rootC);
      excludedNodes = tempData2.descendants();
      numNodes=excludedNodes.length;
      var selectednodes=[]
       maxdepth=updateSunDepth(rootC)

     selectednodes=randomization(excludedNodes,numNodes,maxdepth)
      destNode=selectednodes[1];
      sourceNode=selectednodes[0];
      console.log("sourceNode")
      console.log(sourceNode)
      console.log("destNode")
      console.log(destNode)
      var newlabels=["W1","XY","Y9","CU","OR","HP","IP","UM","IR","SH"];
      var newindx=getRndInteger(0,newlabels.length-1)
     // writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
      update(root,0,svg1,partition,lid)
      resizeSunburst(root,width1,height1,svg2,2.9)
      if (changestate=="move"){
        movetochildrenTM(destNode,sourceNode)
        updateSunDepth(rootC)
        updateValues(rootC)
        update(rootC,0,svg2,partition,lid)
        resizeSunburst(rootC,width1,height1,svg2,2.9)

      }
      if (changestate=="add"){
        newnode=newNode(sourceNode,newlabels[newindx])
        console.log(newnode)
        duration=1500;
        updateValues(rootC)
        update(rootC,0,svg2,partition,lid)
        resizeSunburst(rootC,width1,height1,svg2,2.9)
      }
      if (changestate=="delete"){
        update(rootC,0,svg2,partition,lid)
        removedata(sourceNode,svg2)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg2.selectAll("*").remove();
        update(rootC,0,svg2,partition,lid)
        resizeSunburst(rootC,width1,height1,svg2,2.9)
      }

  }
  if (compstate=="Diff"){
    var lid=[];
    lid[0]=-1;
   // document.getElementById('startdots').style.display='none';
   // document.getElementById('startdots2').style.display='none';
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
            .attr('transform', 'translate(' + width / 2+ ',' + height /2 + ')')
            
      radius = Math.min(width, height)/2;
         x = d3.scaleLinear().range([0, 2 * Math.PI]),
          y = d3.scaleSqrt().range([0, radius])
      var partition = d3.partition()
         .size([2 * Math.PI, radius]);
      var root = d3.hierarchy(data)
        .sum(function (d) { return d.size});
      partition(root);
      node = root
      update(root,0,svg,partition,lid)
      var rootC=null;
      rootC=clonetreemap(root,root.depth,root.height)
      svg.selectAll("*").remove()
      update(rootC,0,svg,partition,lid)
      var duration=0;
      var tempData2 = partition(rootC);
      excludedNodes = tempData2.descendants();
      numNodes=excludedNodes.length;
      console.log(excludedNodes)
      var selectednodes=[]
       maxdepth=updateSunDepth(rootC)

     selectednodes=randomization(excludedNodes,numNodes,maxdepth)
      /*svg.selectAll("g").filter(function(d){
        if (d.data.name=="B")
          sourceNode=d;
        if (d.data.name=="WH")
          destNode=d;
      })*/
      destNode=selectednodes[1];
      sourceNode=selectednodes[0];
      console.log("sourceNode")
      console.log(sourceNode)
      console.log("destNode")
      console.log(destNode)
      var newlabels=["W1","XY","Y9","CU","OR","HP","IP","UM","IR","SH"];
      var newindx=getRndInteger(0,newlabels.length-1)
     // writeInputChoices(sourceNode,changestate,rootC,newlabels,newindx)
      var diffWidth = +d3.select("#beforediff").style('width').slice(0, -2)
      var diffheight = +d3.select("#beforediff").style('height').slice(0, -2)
       // set the dimensions and margins of the diagram
      margin = {top: 40, right: 90, bottom: 50, left: 90},
           diffWidth1 = diffWidth - margin.left - margin.right,
           diffheight1 = diffheight - margin.top - margin.bottom,
           center = [diffheight1/4, diffWidth1/4],
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
             if (root.descendants().length>25)
                radius1 = Math.min(diffWidth1/1.35, diffheight1/1.35);
             else
              radius1 = Math.min(diffWidth1/2.1, diffheight1/2.1);
       var diV = document.getElementById('startdots');
        var diV2 = document.getElementById('startdots2');
      var partition1 = d3.partition()
          .size([2 * Math.PI, radius1]);
      beforeSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
      updateValues(beforeSubtree)
      updateSunDepth(beforeSubtree)
      update(beforeSubtree,0,svgDiffBefore,partition1,lid)
      resizeSunburst(beforeSubtree,diffWidth1,diffheight1,svgDiffBefore,2.7)
      if (changestate=="move"){
       
        if (sourceNode.parent.parent== null)
        {
          diV.style.display='none';
         
        }

        if (destNode.parent== null)
        {
          diV2.style.display='none';
         
        }
       
        update(beforeSubtree,0,svgDiffBefore,partition1,lid)
        resizeSunburst(beforeSubtree,diffWidth,diffheight,svgDiffBefore,2.7)
        dashedSunUpdate(beforeSubtree,sourceNode,svgDiffBefore,partition1,changestate)
        svgDiffBefore.selectAll('g').filter(function(d){ 
          if (d.id==rootC.id)
          {
            console.log(d)
          XC=arc.centroid(d)[0];
          YC=arc.centroid(d)[1];
          
        }})
        transferarcs(sourceNode,svgDiffBefore,XC,YC)
        
        
     
        movetochildrenTM(destNode,sourceNode)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove()
        update(rootC,0,svg,partition,lid)
        resizeSunburst(rootC,width,height,svg,2.7)
        afterSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        update(afterSubtree,0,svgDiffAfter,partition1,lid)
        resizeSunburst(afterSubtree,diffWidth,diffheight,svgDiffAfter,2.7)
        dashedSunUpdate(afterSubtree,sourceNode,svgDiffAfter,partition1,changestate)
       /* svgDiffAfter.selectAll('g').filter(function(d){ 
          if (d.id==sourceNode.parent.id)
          {
            console.log(d)
            console.log(arc.centroid(d))
            var rect=d3.select(this)._groups[0][0].getBoundingClientRect()
          // var X = rect.left + d.y1 * Math.sin(Math.PI - d.x1)
          // var Y = rect.top + d.y1 * Math.cos(d.x1)
           var X = rect.left + arc.centroid(d)[0];
           var Y = rect.top + arc.centroid(d)[1];
            diV2.style.position = "absolute";
            diV2.style.left =(X)+'px';
            diV2.style.top = (Y-60)+'px';
          }
        })*/
         svgDiffAfter.selectAll('g').filter(function(d){ 
          if (d.id==rootC.id)
          {
            console.log(d)
          XC=arc.centroid(d)[0];
          YC=arc.centroid(d)[1];
          
        }})
        transferarcs(sourceNode,svgDiffAfter,XC,YC)
        var maxy=0;
        var miny=1000;
        svgDiffBefore.selectAll('g').filter(function(d){
         
          if(d3.select(this).style("opacity") != 0){

            if (maxy<d.y1)
            {
              maxy=d.y1;
            }
            if (miny>d.y0){
              miny=d.y0;
            }
          }

        })
         var maxy2=0;
        var miny2=1000;
        svgDiffAfter.selectAll('g').filter(function(d){
         
          if(d3.select(this).style("opacity") != 0){

            if (maxy2<d.y1)
            {
              maxy2=d.y1;
            }
            if (miny2>d.y0){
              miny2=d.y0;
            }
          }

        })
          
        diV.style.position = "relative";
          diV.style.left =(diffWidth/2 )+'px';
          diV.style.top = (100)+'px';


          diV2.style.position = "relative";
          diV2.style.left = diffWidth/2+'px';
          diV2.style.top =(100)+'px';
     
      }

      if(changestate=="add"){
       
        
         if (sourceNode.parent== null)
         {
           diV.style.display='none';
           diV2.style.display='none';
         }
        beforeSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        updateSunDepth(beforeSubtree)
        svgDiffBefore.selectAll("*").remove()
        update(beforeSubtree,0,svgDiffBefore,partition1,lid)
        resizeSunburst(beforeSubtree,diffWidth,diffheight,svgDiffBefore,2.7)
        dashedSunUpdate(beforeSubtree,sourceNode,svgDiffBefore,partition1,changestate)
        svgDiffBefore.selectAll('g').filter(function(d){ 
          if (d.id==rootC.id)
          {
            console.log(d)
          XC=arc.centroid(d)[0];
          YC=arc.centroid(d)[1];
          
        }})
       
        svgDiffBefore.selectAll('g').filter(function(d){ 
          /*if (d.id==sourceNode.id)
          {
            console.log(d)
            console.log(arc.centroid(d))
            var rect=d3.select(this)._groups[0][0].getBoundingClientRect()
           var X1 =  d.y1 * Math.sin(Math.PI - d.x1)
           console.log(X1)
           var Y1 =  d.y1 * Math.cos(d.x1)
           console.log(Y1)
          var X = rect.left + arc.centroid(d)[0];
           var Y = rect.top + arc.centroid(d)[1];
            diV.style.position = "relative";
            diV.style.left =(X)+'px';
            diV.style.top = (Y-80)+'px';
          }*/
          if (d.id==sourceNode.parent.id){
            return true;
          }
        }).style("opacity",0)
         transferarcs(sourceNode,svgDiffBefore,XC,YC)
        newnode=newNode(sourceNode,newlabels[newindx])
        console.log(newnode)
        duration=1500;
        updateValues(rootC)
        svg.selectAll("*").remove()
        update(rootC,0,svg,partition,lid)
        resizeSunburst(rootC,width,height,svg,2.7)

        afterSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        updateSunDepth(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition1,lid)
        resizeSunburst(afterSubtree,diffWidth,diffheight,svgDiffAfter,2.7)
        dashedSunUpdate(afterSubtree,newnode,svgDiffAfter,partition1,changestate)
        var nid=newnode.id;
        svgDiffAfter.selectAll('g').filter(function(d){ 
          if (d.id==newnode.parent.id){
            return true;
          }else
            return false;
        }).style("opacity",1);
        
        //d3.selectAll("#rems").
       
        //svgDiffAfter.selectAll('text')     
           
        /*svgDiffAfter.selectAll('g').filter(function(d){
         
          if (d.id==newnode.id)
          {
            diV2 = document.getElementById('Startdots2');
            var rect=d3.select(this)._groups[0][0].getBoundingClientRect()
            console.log(d3.select(this)._groups[0][0].getBoundingClientRect())
            diV2.style.position = "relative";
            diV2.style.left =(rect.x+arc.centroid(d)[0])+'px';
            diV2.style.top = (rect.y+arc.centroid(d)[1]-80)+'px';
            

          }
        })*/

         svgDiffAfter.selectAll('g').filter(function(d){ 
          if (d.id==rootC.id)
          {
            console.log(d)
          XC=arc.centroid(d)[0];
          YC=arc.centroid(d)[1];
          
        }})
         transferarcs(newnode,svgDiffAfter,XC,YC)
         var maxy=0;
         var miny=1000;
         svgDiffBefore.selectAll('g').filter(function(d){
          
           if(d3.select(this).style("opacity") != 0){

             if (maxy<d.y1)
             {
               maxy=d.y1;
             }
             if (miny>d.y0){
               miny=d.y0;
             }
           }

         })
           //var gheight = d3.select('g').style('height').slice(0, -2)
      var maxh=0;

         svgDiffAfter.selectAll('g').filter(function(d){
                 
                  if (d3.select(this).style("opacity") != 0)
                  {
                   console.log(d3.select(this).style("height"))
                  }
          })
          diV.style.position = "relative";
          diV.style.left =(diffWidth/2 )+'px';
          diV.style.top = (100)+'px';


          diV2.style.position = "relative";
          diV2.style.left = diffWidth/2+'px';
          diV2.style.top =(100)+'px';
      }
      if (changestate=="delete"){
        diV2 = document.getElementById('startdots2');
         beforeSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        
          if (sourceNode.parent.parent== null)
          {
            diV.style.display='none';
            diV2.style.display='none';
          }
        
        svgDiffBefore.selectAll("*").remove()
        updateSunDepth(beforeSubtree)
        updateValues(beforeSubtree)
        update(beforeSubtree,0,svgDiffBefore,partition1,lid)
        resizeSunburst(beforeSubtree,diffWidth,diffheight,svgDiffBefore,2.7)
        dashedSunUpdate(beforeSubtree,sourceNode,svgDiffBefore,partition1,changestate)
       /* svgDiffBefore.selectAll('g').filter(function(d){
         
          if (d.id==sourceNode.parent.id)
          {
           
            var rect=d3.select(this)._groups[0][0].getBoundingClientRect()
            console.log(d3.select(this)._groups[0][0].getBoundingClientRect())
            diV.style.position = "absolute";
            diV.style.left =(rect.x+arc.centroid(d)[0])+'px';
            diV.style.top = (rect.y+arc.centroid(d)[1]-60)+'px';
            

          }
        })*/
        svgDiffBefore.selectAll('g').filter(function(d){ 
          if (d.id==rootC.id)
          {
            console.log(d)
          XC=arc.centroid(d)[0];
          YC=arc.centroid(d)[1];
          
        }})
        transferarcs(sourceNode,svgDiffBefore,XC,YC)
        var maxy=0;
        var miny=1000;
        svgDiffBefore.selectAll('g').filter(function(d){
         
          if(d3.select(this).style("opacity") != 0){

            if (maxy<d.y1)
            {
              maxy=d.y1;
            }
            if (miny>d.y0){
              miny=d.y0;
            }
          }

        })
               
       


        removedata(sourceNode,svg)
        updateSunDepth(rootC)
        updateValues(rootC)
        svg.selectAll("*").remove();
        update(rootC,0,svg,partition,lid)
        resizeSunburst(rootC,width,height,svg,2.7)
      
        afterSubtree=clonetreemap(rootC,rootC.depth,rootC.height)
        updateSunDepth(afterSubtree)
        updateValues(afterSubtree)
        update(afterSubtree,0,svgDiffAfter,partition1,lid)
        resizeSunburst(afterSubtree,diffWidth,diffheight,svgDiffAfter,2.7)
        dashedSunUpdate(afterSubtree,sourceNode,svgDiffAfter,partition1,changestate)
        
        svgDiffAfter.selectAll('g').filter(function(d){ 
          if (d.id==rootC.id)
          {
            console.log(d)
          XC=arc.centroid(d)[0];
          YC=arc.centroid(d)[1];
          
        }})
        transferarcs(sourceNode.parent,svgDiffAfter,XC,YC)
  
      
      
        

      /* svgDiffAfter.selectAll('g').filter(function(d){
               
                if (d.id==sourceNode.parent.id)
                {
                  diV2.style.position = "relative";
                  diV2.style.left =(diffWidth/2 )+'px';
                  diV2.style.top = (diffheight/2-Math.abs(d.y1-d.y0) -70)+'px';


                  diV.style.position = "relative";
                  diV.style.left = diffWidth/2+'px';
                  diV.style.top =(diffheight/2-(maxy-miny)-20)+'px';
                }
        })*/
        diV.style.position = "relative";
          diV.style.left =(diffWidth/2 )+'px';
          diV.style.top = (100)+'px';


          diV2.style.position = "relative";
          diV2.style.left = diffWidth/2+'px';
          diV2.style.top =(100)+'px';

      }

  }
         
}

 function update(root,duration,svg,partition,lid){
  var i=0;
  console.log(lid)
 var gSlices = svg.selectAll("g").data(partition(root).descendants(),function(d) { return d.id|| (d.id = ++i); }).enter().append("g");   
   gSlices.exit().remove();
   gSlices.append("path")
   .style("fill", "#f0f0f0").style('stroke', 'black')





        .append("title").text(function (d) { return d.data.name; });  // Return white for root.
   gSlices.append("text").attr("dy", ".50em").text(function (d) { return d.data.name ; }).attr("id", function (d) { return "w" + d.data.name; });
    svg.selectAll("path").data(partition(root).descendants());
    svg.selectAll("path").transition("update").duration(duration).attrTween("d", function (d, i) {
        
         return arcTweenPath(d, i);
       });
      svg.selectAll("text").transition("update").duration(function(d){
                if (lid.includes(d.id))
                  return duration
                else
                  return 0;
      }).attrTween("transform", function (d, i) { return d.parent ? arcTweenText(d, i) : 0; })
      .attr('text-anchor', function (d) { return d.textAngle > 180 ? "start" : "end"; })
      .attr("dx", function (d) { 
        return d.textAngle > 180 ? -1 : 1; })
         .attr("opacity", 1
         // function (e) { return e.x1 - e.x0 > 0.01 ? 1 : 0; }
          );
   
  
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
     return "translate(" + arc.centroid(b)  + ")";
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
    var maxdepth=0;
    nodes.forEach(function(d){
    if (maxdepth<d.depth){
      maxdepth=d.depth;
    }
  });
  return maxdepth;
}
function dashedSunUpdate(root,sourceNode,svg,partition,changestate){
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
        })
      } 
      
}
function addback(d,f,indx){

 f.depth = d.depth + 1; 
   f.height = d.height - 1;
   f.parent=d;
   if (typeof d.children !== 'undefined') {
        d.children.splice(indx, 0, f);
    } else {
        d.children=[];
        d.data.children=[];
        d.children.push(f);
    }

   d.data.children.push(f.data);
  // d.value+=f.value;
 
}
function moveback(d,f,indx){

 // console.log(draggedNode.parent)
  var index = f.parent.children.indexOf(f);
   // console.log(index)
   if (index > -1) {
   // console.log(f.value)
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
        d.children.splice(indx, 0, f);
    } else {
        d.children=[];
        d.data.children=[];
        d.children.push(f);
    }

   d.data.children.push(f.data);
  // d.value+=f.value;
   //console.log(d.value)
 
}

function transferarcs(sourceNode,svg,XC,YC){
      var transids=[];
      var transnodes=[];
      var k=0;
      transnodes=addToAdjacencyList(sourceNode,transnodes)
       transnodes.forEach(function(f){
      transids[k++]=f.id;
         })
       if (sourceNode.parent){
        svg.selectAll('g').filter(function(d){ 
        
          if (d.id==sourceNode.parent.id)
          {
            X1 = arc.centroid(d)[0];
            Y1 = arc.centroid(d)[1];
              return true;
            }else
              return false;
            }).attr("transform","translate(" + (XC -X1 ) + "," + (YC-Y1) + ")")
       }
      
      svg.selectAll('g').filter(function(d){ 
        if (transids.includes(d.id))
        {
          return true;
        }else
          return false;
      }).attr("transform","translate(" + (XC -X1 ) + "," + (YC-Y1) + ")")

}
function resizeSunburst(root,w,h,svg,rs){
  console.log("w")
  console.log(w)
  console.log("h")
  console.log(h)  
  var allnodes=root.descendants();
  var maxy=0;
  var k=0;
  var lid=[];

  allnodes.forEach(function(d){
    if (maxy<d.y1){
      maxy=d.y1;
    }

  })
  console.log("maxy")
  console.log(maxy)
  while ((2*maxy)>= w+50 ||(2*maxy) >= h+50){
    
    svg.selectAll("*").remove()
    radius2 =  Math.min(w/rs, h/rs);
  
    partition2 = d3.partition()
      .size([2 * Math.PI, radius2]);
      console.log(partition2(root))
      update(root,0,svg,partition2,lid)
     // dashedSunUpdate(root,sourceNode,svg,partition2,changestate)
     $("text").css("font-size", "16px");
     maxy=0;
     svg.selectAll('g').filter(function(d){
      if (maxy<d.y1){
        maxy=d.y1;
      }
     })
     console.log("maxy")
      console.log(maxy)
     rs=rs+0.2;

  }

}
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}