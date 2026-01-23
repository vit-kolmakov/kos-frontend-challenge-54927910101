# Kinexon Frontend

A short summary of the app

For instructions to setup please refer SETUP.md file

### Technologies used

This section lists out all the technologies that was used in order to acheive this task detailed reasoning about the each library will be listed in further sections

- React 19
- Redux ToolKit 2.11
- React Material UI 7.3
- Tanstack Query 5.90
- konva 10.2

The entire app was scaffolded using Vite and unit tests are written with vitest.

### What does the app do?

This app connects to the backend apis to simulate the movement of objects in a 2D map. There are 3 main sections in the app.

- The first section is the Map Canvas which shows the movement of 250 objects via the SSE feed.
- The second section is the details block which is shown once an object is clicked.
- The third section is a error overlay which is shown if there is an error in SSE events api or if the objects, positions api throws error.

The canvas provided by konva renders the postions of the objects with smooth transition of the objects movements.

### Decisions behind choosing libraries

- Redux Toolkit is generally considered overkill for a small app. However, this app is a special case due to the large number of objects it handles. Triggering re-renders for such a high volume of data can put significant strain on memory and performance. Therefore, using a state management solution here makes perfect sense, as it ensures that only the necessary components re-render when needed.

- React Material UI provides a powerful theming system, consistent design standards, and a rich set of reusable components. This enables scalable UI development and ensures maintainability as the scope of the project grows.

- TanStack Query handles caching, retries, and error management for API calls, significantly reducing unnecessary network requests from the frontend. It fetches new data only when the existing data becomes stale and also provides built-in support for automatic refetching at configurable intervals.

- Konva was chosen after evaluating whether to build a custom solution from the ground up or adopt an established library. Using AI-assisted research, various available tools were compared based on integration complexity, performance overhead, and community support, with long-term maintainability in mind. Rather than reinventing the wheel, Konva was selected for its ease of integration and lightweight footprint, ensuring smooth performance even on client machines with lower hardware specifications.

### Design Decisions

- Decision to use HTML5 Canvas- Updating dom nodes frequently and also when we scale this to 1000 nodes the browser cannot handle it hence the best way forward is to use HTML5 Canvas. Which lead to the decision of using a library which can cater to our needs.

- All the components, functions which can be optimized are wrapped using `react.memo` or `useCallback` to improve the performance of the app.

- Instead of using state variables, i used react's `useRef` to update the nodes in the canvas so there is no re-renders.

- It may seem like i have used a lot of libraries but i have choosen them keeping the bigger picture in mind, In future when we extend this app to handle multiple things,we have then already have right tools integrated into the project so extending this will be much faster.

- This decision involved a trade-off between minimizing re-renders and optimizing user experience. I faced a crossroads in deciding whether to control label visibility through state (showing labels by default) or display them only when users zoom in. Using state to manage label visibility would trigger re-renders, causing the canvas to reload, whereas displaying labels by default avoids unnecessary re-renders and improves performance.

- I ultimately chose the “show labels on zoom” approach, prioritizing user experience over minor performance costs. In this case, providing a cleaner and more intuitive interface was more important than avoiding a lightweight re-render, especially since the current application load makes such re-renders relatively inexpensive.

- To get objects details i have reused the information i already have when i get the inital positions of the objects, since object information is not a frequently changing api, i have decided to re-use the data we already have inorder to save resources.

### Use of AI

I have used AI mostly in places where i could speed up my development process but making sure i went back and forth and refining the response. In many places i went against AIs and implemented my approach as the suggestions provided only complicated the flow (in case of live data).

- Used AI to generate some the static pages like details UI.
- Map background
- Objects design
- Improving the performance of the renders (Found this while using AI as my code reviwer)
- Scaffolding the project
- Helper function to transform the co-ordinates (`utils/coordinates.ts`)
- Rephrase some the sentences in this document.

### Performance

- Currently, the app runs smoothly with 250 objects and an SSE update rate of 10 Hz.

- Since the end goal is 1,000 objects, I manually tested this locally by changing the backend configuration. The current implementation was able to handle a load of up to 600 objects, after which noticeable lag was observed. When increased to 1,000 objects, movement was still visible, but it was no longer smooth.

### How to Improve this

Since this was my first time working with canvas, I did some research on best practices and possible improvements for my current implementation. These are my findings:

- One possible solution is to reduce the workload of the event listener. In the current implementation, it transforms data, handles node changes, and performs other processing, which can keep the listener busy. This work can be offloaded to a cache that stores incoming messages and processes updates in batches.

- A possible improvement is to limit the number of components and let Konva handle the entire drawing process instead of relying on React to communicate with Konva.

- Adding multiple layers so that the most active layers can be updated frequently, while less active ones reside in lower layers that require fewer updates.

- Introducing a concept similar to virtualization (viewport culling in canvas terms), where only the content visible to the user is rendered. This reduces the number of nodes that need to be drawn and improves performance.

### Improvements

Just like every other app, this application has scope for improvement, and these are listed below:

- Live update of the object details page: In the current implementation, we update the position, battery, and other information every 10 minutes instead of directly using the SSE feed. This, however, requires additional configuration and work in state management to properly handle the load. Since the scope of the task is limited, I have used the approach of periodic updates.

- Better object designs: I liked the current object shapes, but they could be closer to the actual context of the objects. Since this was new for me, I took help from AI to design them. As a frontend developer, I have mixed feelings about the output of the object design.

- Refactoring the event message listener and implementing a caching system to process updates in batches.

- Splitting the object details API to fetch the latest object details by ID and getting live position data from the SSE.

- Visual indicators for urgent orders

### Time Spent

I spent a total of **15 hours** on this task, most of which was dedicated to learning and becoming familiar with the canvas. Around 2 hours were spent investigating a teleportation issue that appeared after integrating the SSE API. Initially, I suspected that my message queue was full and that the frontend was too slow in processing incoming messages, so I tried to optimize it. However, AI was not helpful at that stage.

After further investigation, I noticed that only objects with IDs above 100 were teleporting, which became a key clue. This led me to add detailed logs to analyze how frequently updates were being sent from the backend. After exhausting all frontend-related possibilities, I finally used AI’s help to identify the issue in the backend code.
