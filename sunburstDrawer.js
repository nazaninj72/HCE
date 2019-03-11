    function drawSunburst(data,selector1,selector2,compstate,changestate){
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
        		.attr('transform', 'translate(' + width / 2+ ',' + height / 1.5 + ')');

    	      //.append('g').attr("transform","translate(" + width / 10 + "," + height/8 + ")")
	       var radius = Math.min(width, height) / 2;
	       var partition = d3.partition()
	           .size([2 * Math.PI, radius]);
	      var root = d3.hierarchy(data)
	          .sum(function (d) { return d.size});
	         // console.log(root)
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