# Document Concept

Below are a collection of Nolan Allen's comments following his research and development for the Sauti Databank
project.

## Initial Impressions & Charting Library Research

  The task delegated to me is to research, test, and determine the validity of finding a new charting library
  to replace [nivo](https://nivo.rocks/about) as **Sauti Databanks**'s sole visual and reactive library.

### 09-17-19 | 10:36pm CST

  After some hiccups with my permissions, I've smoothed out functionality and am able to fully manipulate
  the project.

  I've been over the frontend a few times to familiarize myself with what was put together, but through this
  branch, I'll make notations on previously-implemented code and possible methods on how to better-achieve
  **Sauti**'s end-goal through React/Redux.

  First thoughts: the code is easy enough to read, easy enough to follow. It's fairly straight forward, but
  we can probably make it even more straight forward while running faster. I'll be looking through chart
  libraries after my first commit; I'm certain we can find something better.

### 09-19-19 | 05:35pm CST

  Thought it is true Google Charts proved to be a poor fit for our project's needs, Azra pointed me to
  another charting library called [D3 (Data-Driven Documents)](https://github.com/d3/d3). It looks as if we may be able to modify
  provided functions to act as both charting object and mathematical function.

  There is something I've noticed as I look over the files, again – particularly the AgeChart. There has
  to be a way to condense the methods so that objects may be injected into them rather than requiring
  their very own, fully-written equation.
  
  Must look into better methods if we are able to refactor the codebase. I have a feeling that these files'
  heavily repetitious processes are what slow down chart rendering.

### 09-23-19 | 06:32pm CST

  Movement to test D3's chart is still slow. I may have found a new lead with [d3-request](https://github.com/d3/d3-request), which appears to allow API axios calls to be done directly in the chart.

  In honesty, it seems that the entire concept would be better conducted by allowing axios inputs to be
  fed directly to backend databases which then would be connected into the frontend charts. The major work
  required looks like refactoring. I know that hope is really holding out for a charting library that'll
  do the work for us, but I don't think that's an option – even with D3.

  That's my personal and limited professional opinion. But, I will try to keep putting this together over
  the next few hours.
