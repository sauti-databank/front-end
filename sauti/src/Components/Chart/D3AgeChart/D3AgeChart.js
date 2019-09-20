import AgeCount from './D3AgeCount.csv'

export default function define(runtime, observer) {
  const main = runtime.module();
  
  main
    .variable(observer()).define(["md"], function(md) {
      return (
        md`# Horizontal Bar Chart

        This chart shows the relative frequency of letters in the English language.`
      )
    });
  
  main
    .variable(observer("chart"))
    .define("chart", [
      "d3",
      "DOM",
      "width",
      "height",
      "data",
      "x",
      "y",
      "format",
      "xAxis",
      "yAxis"
    ], function(d3, DOM, width, height, data, x, y, format, xAxis, yAxis) {
      const svg = d3.select(DOM.svg(width, height));
      
      svg
        .append("g")
          .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
          .attr("x", x(0))
          .attr("y", d => y(d.name))
          .attr("width", d => x(d.value) - x(0))
          .attr("height", y.bandwidth());
      
      svg
        .append("g")
          .attr("fill", "white")
          .attr("text-anchor", "end")
        .style("font", "12px sans-serif")
        .selectAll("text")
        .data(data)
        .join("text")
          .attr("x", d => x(d.value) - 4)
          .attr("y", d => y(d.name) + y.bandwidth() / 2)
          .attr("dy", "0.35em")
        .text(d => format(d.value));
      
      svg
        .append("g")
        .call(xAxis);
      
      svg
        .append("g")
        .call(yAxis);
      
      return svg.node();
    });

  main
    .variable(observer("data"))
    .define("data", ["d3"], async function(d3) {
      return(
        (await d3.csv(AgeCount, ({age, count}) => ({
          name: age,
          value: +count
        }))).sort((a, b) => b.value - a.value)
      )
    });

  main
    .variable(observer("format"))
    .define("format", ["x"], function(x) {
      return(
        x.tickFormat(20)
      )
    });

  main
    .variable(observer("x"))
    .define("x", ["d3","data","margin","width"], function(d3,data,margin,width) {
      return(
        d3
          .scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .range([margin.left, width - margin.right])
      )
    });

  main
    .variable(observer("y"))
    .define("y", ["d3","data","margin","height"], function(d3,data,margin,height) {
      return(
        d3
          .scaleBand()
          .domain(data.map(d => d.name))
          .range([margin.top, height - margin.bottom])
          .padding(0.1)
      )
    });

  main
    .variable(observer("xAxis"))
    .define("xAxis", ["margin","d3","x","width"], function(margin,d3,x,width) {
      return(
        g => g
            .attr("transform", `translate(0,${margin.top})`)
            .call(d3.axisTop(x).ticks(width / 80))
            .call(g => g.select(".domain").remove())
      )
    });
    
  main
    .variable(observer("yAxis"))
    .define("yAxis", ["margin","d3","y"], function(margin,d3,y) {
      return(
        g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickSizeOuter(0))
      )
    });

  main
    .variable(observer("height"))
    .define("height", ["data","margin"], function(data,margin) {
      return(
        data.length * 25 + margin.top + margin.bottom
      )
    });
    
  main
    .variable(observer("margin"))
    .define("margin", function() {
      return(
        {top: 30, right: 0, bottom: 10, left: 30}
      )
    });
    
  main
    .variable(observer("d3"))
    .define("d3", ["require"], function(require) {
      return(
        require("d3@5")
      )
    });

  return main;
}