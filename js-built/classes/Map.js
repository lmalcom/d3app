define(['jquery', 'underscore', 'backbone', 'd3', 'UIElement'], function($, _, Backbone, d3, UIElement){
	'use strict'; 
	var Map = {
		View: UIElement.View.extend({
			className: 'map', 
			animated:true,
			interval: 4000, 
			initialize: function(){
				UIElement.View.prototype.initialize.call(this); 
				this.on('disabled', this.stopAnimation, this); 
				this.on('enabled', this.animation, this); 
			},
			render: function(){
				var page, layoutRoot, tree, link; 
				page = this; 

				//set div
				this.$el.html(this.template());

				this.tree = d3.layout.tree()
						.sort(null)
						.size([window.innerHeight, window.innerWidth])
						.children(function(d)
					    {
					        return (!d.contents || d.contents.length === 0) ? null : d.contents;
					    }); 
				if(!this.layoutRoot){
					this.layoutRoot = d3.select(this.el)
					 .append('svg:svg')
				     .append("svg:g")
				     .attr('height', window.innerHeight - 60)
				     .attr('width', window.innerWidth)
				     .attr("class", "container");
				};								
				return this; 
			}, 
			animation: function(){
				var page, link, nodes, links, paths, nodeGroup, rx, ry; 

				//initialize the tree with node and link info
				page = this; 
				rx = Math.random()*window.innerHeight; 
				ry = Math.random()*window.innerWidth; 
				link = d3.svg.diagonal()
				    .projection(function(d){
				     	var y, x; 
			    		x = d.children ? d.x : rx, 
				    		y = d.children ? d.y : ry;  
				        return [y, x];
				    });

				nodes = this.tree.nodes(page.treeData()),
				links = this.tree.links(nodes),
				paths = this.layoutRoot.selectAll("path.link")
				    .data(links),
				nodeGroup = this.layoutRoot.selectAll("g.node")
				     .data(nodes);

				//path animation				
				paths.enter()
					 .insert("svg:path")
				     .attr("class", "link")
				     .attr("d", link)
				paths.transition().duration(2000)
				    .attr("d", link) 
				paths.exit()
				 	.remove();

				//node animation				
				nodeGroup.enter()
				    .append("svg:g")
				    .attr("class", "node")
				    .attr("transform", function(d)
				    	{
				    		var y, x; 
				    		x = d.children ? d.x : rx, 
				    		y = d.children ? d.y : ry;  
				        	return "translate(" + y + "," + x + ")";
				    	})
					.append("svg:circle")
				    .attr("class", "node-dot")
				    .attr("r", function(d, ind){
				     	return Math.random()*20
				    });
				nodeGroup.transition().duration(1000)
					.attr("transform", function(d)
				    	{
				    		var y, x; 
				    		x = d.children ? d.x : rx, 
				    		y = d.children ? d.y : ry; 
				        	return "translate(" + y + "," + x + ")";
				    	})
					.attr("r", function(d, ind){
				     	return Math.random()*80
				    });
				nodeGroup.exit()
					.attr('fill', 'rgba(255,255,255, 1)')
				 	.remove(); 

				//set recursion if animated 
				if(page.animated){
					setTimeout(function(){
						page.animation();
					}, 4000); 
				}				
			}, 
			startAnimation: function(){
				this.animated = true; 
				this.animation(); 
				return this; 
			},
			stopAnimation: function(){
				this.animated = false; 
				return this; 
			},
			treeData: function(){
				var arr = []; 
				function createBranches(numRepeat){
					var arr2 = []; 
					for(var i = 0; i < Math.floor(Math.random()*3 + 2); i++){
						if(numRepeat > 1){
							arr2.push( {name:'', contents: createBranches(numRepeat - 1)} ); 
						}else{ 
							arr2.push( {contents: []} ); 
						}
					}
					return arr2; 
				}
				arr = createBranches(5); 
				return {
					name:'/', 
					contents:arr
				}
			}
		}),
		Model: UIElement.Model.extend({
			defaults: {
				message: 'show',
				view: 'Map', 
			}
		}),
	}; 	
	return Map; 
}); 