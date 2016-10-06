# Dark Cloud 2 Invention Tracker

*Probably the worst written web app I've ever seen*

This app, while absolute overkill with the amount of dependencies was an interesting experiment of using an existing React boilerplate ([react-slingshot](https://github.com/coryhouse/react-slingshot)). All in all, very feature complete, but I'd be probably better off using the official Facebook Boilerplate since there was a lot of things in this project that I do not use.

Is the app heavy? Yes. Does the application perform like absolute dirt? Yes. Could I have spent more time optimizing and improving the app? Yes. **But I really wanted to start playing Dark Cloud 2.**

### Postmortem

- Start smaller instead of dumping more stuff. Redux is there but not used. Incrementally adding things and making even smaller components would be good to ease me into unit testing and understanding how the React eco system works.
- Explore Webpack a bit more to create a config to properly split vendors and user files. 300kb for an app having so little features is not acceptable. Could most likely shave off half of that if the DB was not embedded in the app.
- Explore React Storybook or something in order to create my own set of commonly used components. If I ever make another lister, chances are I'll reuse the same things.
- Javascript Map's index to track your data is not a good idea. Instead of dynamically adding/removing DOM elements, I just shoved "don't show" classes. This pollutes the DOM, so totally not cool.
- Tachyons is great. No seriously, it's a very competent css toolset. 5/7 would recommend.
