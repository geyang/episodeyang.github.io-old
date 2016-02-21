---
title: Math Typesetting done beautifully, in your browser
mathJax: true
snippet: /projects/escherpad/escherpad-home-page-screen-shot.png
snippetHeight: 200px
snippetPosition: top
excerpt: <p>My story of building a real-time collaborative notebook for developers and data analysts. Escherpad is a large project.</p>
postLayout: "layout-3-column offset-1-column"
---

{% include full-width-image.html position="top" height="450px" border-bottom="solid 1px #ccc" src="/projects/escherpad/escherpad-home-page-screen-shot.png" %}

{: .float .float-left .float-1-column }
Project
: Escherpad

Challenge
: User Experience, Marketing, Dev and DevOps

Live
: [www.escherpad.com](http://www.escherpad.com)

Escherpad is a real-time collaborative notebook for developers, scientists and data analysts. It is similar to Evernote meeting Google Docs, plus in-browser LaTeX WYSIWYG editing, and IPython/Jupyter and R computation notebooks. 

Escherpad is a large project. The client is an Angular1 project with more than 200 files, and the back-end is a conflict-resolving real-time collaborative API written in node.js. All of the API end points come with behavioral specifications. At the end of the project, I had roughly 200 tests for the API server. These tests allowed me to iterate quickly, and not worry about breaking code that is already there.

## Design

### Make Looking Through Notes Easier

From the very beginning of Escherpad, I wanted to make it super easy to search for and look through notes you have taken. So as part of the design process, I studied existing typesetting/note talking apps on the market in great details. One of the problem with Google Docs was that every time you click open a document, it opens up a new tab for the document. This is fine if you want to delve into the work, but if you are just skimming through some notes you took for a class, the new tab forces you to constantly create new mental context, making it challenging to stay focused. 

### Iterating Based on User's Feedback

During the pre-Beta and private Beta, I iterated like crazy based on what the users' feedbacks. In one case, I asked Shaan for comments on the app. He mentioned that the text excerpt in the list view are not very useful and he never pays any attention to them. 

{% include full-width-image.html position="top" height="450px" border-bottom="solid 1px #ccc" src="/projects/escherpad/escherpad-design-v1-Screenshot_2014-11-09.png" %}

<!--<div markdown="span" class="float float-left float-2-column">-->
<!--![escherpad real-time server architecture](/projects/escherpad/escherpad-design-v1-Screenshot_2014-11-09.png)-->
<!--</div>-->

Above is how the second UI design of Escherpad looked like at that time. It turned out that when users search for a particular note, the amount of time they spend on looking at each note is very limited. Since they only have time to process a small piece of information, the heading inside each note entry gets all of the attention. In this context the content excerpt is not only useless, but it takes up valuable space that can use used to show other higher priority information, such as the tags and the containing folders for that particular note. 

As a result, I ended up re-designing the list view removing the content excerpt. A few other considerations were put into the design of a new overall structure for the view that you can see below:

{% include full-width-image.html position="top" height="450px" border-bottom="solid 1px #ccc" src="/projects/escherpad/escherpad-design-v3-Screenshot_2016-02-20.png" %}

<!--### Hide Your Inner Librarian-->

<!--One of the interesting design decisions I made with Escherpad, was to hide away the directory tree that user uses to organize their notes in to an `ARCHIVE` modal. -->

<!--Typically when we work off line, documents are stored in deeply nested directories. Although it is useful to use folders, usually the flatter the directory structure is, the easier it is to find documents. In addition -->

## Development

### A Schema-Agnostic, Conflict Resolving Real-time Collaborative Backend

The real-time collaborative backend is written in node.js. I implemented the core conflict-resolving synchronization engine based on a modified version of Google Neil Fraser’s diff­match­patch algorithm. To allow playback of the entire editing history of a document, I modified the original algorithm so that the shadow copies are not exclusive to each client-server session but instead shared in a global rebase graph.

<iframe class="float float-left" width="560" height="315" src="https://www.youtube.com/embed/si0QFaDStoo" frameborder="0" allowfullscreen></iframe>

I was fascinated by real-time collaboration from the very beginning. I studied all of the existing RTC schemes in detail, and in the end decided to implement Fraser's differential synchronization algorithm instead of the popular Operational Transform. The first reason is that despite being the most popular RTC scheme, OT alone does not work well in a realistic network environment with network delay and package loss. Google Wave and Google docs’ have a layer on top of OT that handles these realistic problems. 

The second reason to go with diff-sync is that it can handle arbitrary JSON data independent of available operations, whereas implementation of OT is highly application specific, requiring one to implement transformation between all permutations of available operations.
 
In the end, my effort was successful, and the final version has been in production for 12 month. The flexibility of this API allowed me to quickly implement a RTC IPython notebook despite of the fact that the IPython Notebook format is a nested json­document with many complicated operations.

### Designing a Scalable RTC Server Architecture

Being a naive graduate student I wanted to make sure that when Escherpad make it to HackerNews, my server(s) can handle the heavy load. What makes real-time collaborative server hard to scale is that the algorithms are stateful. Each session have to be saved somewhere in memory.

<div markdown="span" class="float float-left float-2-column">
![escherpad real-time server architecture](/projects/escherpad/escherpad-real-time-server-architecture-Screenshot_2016-02-20.png)
</div>

At this point and time I was already using RabbitMQ for the LaTeX compiling and some of the folder sharing operations that requires walking down a deep tree. RabbitMQ's performance in handling messages is extremely impressive as shown by multiple benchmarking experiments. So it was a no-brainer that I was going to build the scalable architecture on RabbitMQ. Long story short, my library roomify creates a stateful chat room abstraction for each document. Messages are then routed inside the cluster by RabbitMQ using a direct exchange. 

Since this is the first iteration, room membership is not cached locally but requested on each message from the database. A mongo index is created to make sure that these requests are in-memory and never hit the hard drive. A benchmark test on a EC2 instance shows that even with a sub optimal network configuration where the database is not co-located with the api server with a large delay of 100 ms, a single EC2 instance is able to handle up to 4000 requests per second. 

This made me very happy:)

## Launch, Rinse, Repeat

There is a lot more to be said about Escherpad. Since it is getting late and this post is getting long, I will leave those stories to another post. 

See you next time!


{% include post-footer.html %}
