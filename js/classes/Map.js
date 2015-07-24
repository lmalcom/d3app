define(['jquery', 'underscore', 'backbone', 'd3', 'UIElement'], function($, _, Backbone, d3, UIElement){ 
	'use strict'; 
	var Map = { 
		View: UIElement.View.extend({ 
			className: 'map', 
			animated:true, 
			interval: 4000, 
			initialize: function(){ 
				UIElement.View.prototype.initialize.call(this); 
				//this.on('disabled', this.stopAnimation, this); 
				//this.on('enabled', this.animation, this); 
				this.paths = []; 
				this.nodes = []; 
			},
			showDetails: function(ev){ 
				//ev.current target will give us the object, use id to get the id from the master array 

				//change data in the container 

				//show the container (animate in) 

				return this; 
			},
			render: function(){
				var page, layoutRoot, tree, link; 
				page = this; 

				//set parent div
				this.$el.html(this.template());

				//set svg container for map
				if(!this.layoutRoot){
					this.layoutRoot = d3.select(this.el)
					 .append('svg:svg')
				     .append("svg:g")
				     .attr("class", "container");
				     this.animation();
				};	
				if(window.innerWidth < 400){

				}
				return this; 
			}, 
			animation: function(){ 
				var page, nodes, rx, ry, xrange, svg, maxWidth; 

				page = this, 
				ry = window.innerWidth - 50, 
				rx = window.innerHeight/2 - 50, 
				nodes = this.treeData().content; 
				maxWidth = 	(window.innerWidth < 400)?  350: 
							(window.innerWidth < 1080)? window.innerWidth - 50: 
							1080 - 50; 
				if(window.innerWidth < 480) nodes = [nodes[0]]; 
				xrange = d3.scale.linear() 
						    .domain([0,1]) 
						    .range([ 25, maxWidth ]); 

				//append paths 
				_.each(nodes, function(node, index){ 
					var svg = page.layoutRoot.append('svg'); 
					var root = svg.selectAll('path').data([node]) 
						root.enter()	
							.append('path')	
							.attr('d', new d3.svg.line()
									//xrange will place x values evenly on the line
									.x(function(d, i){  
										return xrange((i)/(node.length - 1)) 
									}) 
									//y range will evenly space the values from min - max - min (parabola shaped) 
									.y(function(d, i){ 
										var angle = d3.scale.linear() 
										    .domain([0, node.length - 1]) 
										    .range([-Math.PI/2, Math.PI/2]); 
										var amplitude = (index*rx/nodes.length - 1); 
										var offsetY = rx; 
										//alternate lines top and bottom
										var mod = (index%2 === 0)? -1: 1;
										var height = amplitude*mod*Math.cos(angle(i)); 
										return height;  
									})
							)
							.attr('fill', 'transparent')
							.attr('stroke', function(){
								return '#' + index.toString() + index.toString() + 'f'; 
							})
							.attr('stroke-width', function(d, i){
								return (index + 1) + 'px';
							})
							.attr("transform", "translate(" + 0 + "," + rx + ")")
						root.transition().duration(1000)
							.attr('d', new d3.svg.line()
									//xrange will place x values evenly on the line
									.x(function(d, i){  
										return xrange((i)/(node.length - 1)) 
									}) 
									//y range will evenly space the values from min - max - min (parabola shaped) 
									.y(function(d, i){ 
										var angle = d3.scale.linear() 
										    .domain([0, node.length - 1]) 
										    .range([-Math.PI/2, Math.PI/2]); 
										var amplitude = (index*rx/nodes.length - 1); 
										var offsetY = rx; 
										var mod = (index%2 === 0)? -1: 1;
										var height = amplitude*mod*Math.cos(angle(i)); 
										//var height = (index*rx/nodes.length - 1)*-Math.cos(angle(i)); 
										return height;  
									})
							)
							.attr('fill', 'transparent')
							.attr('stroke', function(){
								return '#' + index.toString() + index.toString() + 'f'; 
							})
							.attr('stroke-width', function(d, i){
								return (index + 1) + 'px';
							})
							.attr("transform", "translate(" + 0 + "," + rx + ")")
						root.exit()
							.remove()
					page.paths.push(root); 
				})

				//images 				
				_.each(nodes, function(node, index){
					var svg = page.layoutRoot.append('svg'); 
					var root = svg.selectAll('foreignObject').data(node);
						root.enter()
					    	.append("foreignObject")
						    .attr("width", 50)
						    .attr("height", 50)
						    .attr("class", "node")
						    .attr('id', function(d, i){
						    	return d
						    })
						    .attr('x', function(d, i){  
								return xrange((i)/(node.length - 1)) - 25 + 'px'
							}) 
							.attr('y', function(d, i){ 
								var angle = d3.scale.linear() 
								    .domain([0, node.length - 1]) 
								    .range([-Math.PI/2, Math.PI/2]); 
								var amplitude = (index*rx/nodes.length - 1); 
								var offsetY = rx - 25; 
								var mod = (index%2 === 0)? -1: 1;
								var height = amplitude*mod*Math.cos(angle(i)) + offsetY; 
								return height + 'px';  
							})
							.append("xhtml")
						    	.html('<div></div>')						    	
						    	.style('background-image', 'url("/media/images/logo.png")');
						root.transition().duration(1000)
						    .attr('x', function(d, i){  
								return xrange((i)/(node.length - 1)) - 25 + 'px'
							}) 
							.attr('y', function(d, i){ 
								var angle = d3.scale.linear() 
								    .domain([0, node.length - 1]) 
								    .range([-Math.PI/2, Math.PI/2]); 
								var amplitude = (index*rx/nodes.length - 1); 
								var offsetY = rx - 25; 
								var mod = (index%2 === 0)? -1: 1;
								var height = amplitude*mod*Math.cos(angle(i)) + offsetY; 
								return height + 'px';  
							})
						root.exit()
							.remove()
					page.nodes.push(root); 
				}); 

				//set recursion if animated 
				/*if(page.animated){
					setTimeout(function recurs(){
						var content = page.treeData().content; 
						_.each(page.paths, function(path, index){
							path.data([content]); 
						});
						_.each(page.paths, function(node, index){
							node.data([content]); 
						});
						recurs(); 
					}, page.interval); 
				}*/
			},
			smallAnimate: function(){},
			startAnimation: function(){
				this.animated = true; 
				this.animation(); 
				return this; 
			},
			stopAnimation: function(){
				this.animated = false; 
				return this; 
			},
			treeData: function(def){
				/*var query = {query:{
					freeSearch: 'Dan in Texas', 
					//token: controller.get('token')
				}};*/
				var query = {'query': 'San Francisco and works at Google' }; 
				$.ajax({ 
					crossDomain: true,				
					method: "POST", 
					url: 'http://ec2-54-242-145-25.compute-1.amazonaws.com:8000/restapi/query/', 
					dataType: 'json', 
					data: query, 
					withCredentials: true, 
					headers : { 'Authorization' : 'Token ' + controller.get('token') },
					success: function(data){
						if(data) console.log('success!: ', data); 
						else console.log('success! no response message'); 
					}, 
					error: function(err){
						console.log('error!: ', err.responseText); 
					}
				}) 
				console.log('Basic ' + controller.get('token')); 

				//list of everyone
				var masterList = {
					'idNumber': {
							image: 'images/logo.png',
							name: 'name', 
							title: 'title', 
							organization: 'organization', 
							school: 'school', 
							description: 'description', 
							twitter: 'twitterid', 
							facebook: 'facebookid', 
							googleplus: 'gplusid', 
							email: 'email'
					} 
					// create new object for each person 
				}

				//data array used for d3 only has a arrays with ids
				var test = []; 
				var num = Math.floor(Math.random()*10 + 1); 
				for(var i = 0; i < num; i++){
					var test2 = []; 
					var num2 = Math.floor(Math.random()*10 + 2);
					for(var j = 0; j < num2; j++){
						test2.push('john'); 
					}
					test.push(test2); 
				}
				return {
					content:test
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