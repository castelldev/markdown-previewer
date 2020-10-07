//Default Text
let defaultText = `Examples of what your can do in my previewer! 
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Emphasis
**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Links
[link text](http://onecastell.github.io)

[link with title](http://onecastell.github.io "My Portfolio!")

## Code
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

## Images
![React Logo with Text](https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png)

## Horizontal Rules
___
---
***

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

  
## Lists

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
`;
//Editor Component
class Editor extends React.Component {
  render() {
    return (
      React.createElement("textarea", {
        style: this.props.styles,
        id: "editor",
        placeholder: defaultText,
        onChange: this.props.handler,
        value: this.props.value }));


  }}

//Preview Component
class Preview extends React.Component {
  render() {
    return (
      React.createElement("div", {
        id: "preview",
        style: this.props.styles,
        dangerouslySetInnerHTML: { __html: this.props.markdown } }));


  }}

//Main App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: defaultText,
      styles: { background: "#fff", color: "#000" } };

  }
  //Input Handler
  captureInput(event) {
    //Ensure empty text if editor is empty
    if (event.target.value == "") this.setState({ markdown: "" });else

      //Assign user input to markdown state
      this.setState({ markdown: event.target.value });
  }
  //Toggle Dark/Light Mode
  darkModeToggle() {
    if (this.state.styles.color == "#000")
    this.setState({ styles: { background: "#000", color: "#fff" } });else
    this.setState({ styles: { background: "#fff", color: "#000" } });
  }
  //Clear all Text in Editor and Preview
  clearAll() {
    this.setState({ markdown: "" });
  }
  render() {
    //Converts plaintext to markdown via 'marked' function
    let parsedText = marked(this.state.markdown);
    //Interprets carriage returns as line breaks
    marked.setOptions({
      breaks: true });


    return (
      React.createElement("div", { id: "container" },
      React.createElement("div", { id: "action-bar-header" },
      React.createElement("span", null,
      React.createElement("span", null, "Markdown"), " Previewer")),


      React.createElement("div", { id: "action-bar-settings" },
      React.createElement("img", {
        src: "https://image.flaticon.com/icons/svg/9/9153.svg",
        alt: "Settings",
        title: "Settings" }),

      React.createElement("button", { id: "dark-mode", onClick: this.darkModeToggle.bind(this) },
      React.createElement("img", {
        src: "https://image.flaticon.com/icons/svg/61/61091.svg",
        alt: "Night Mode",
        title: "Night Mode" })),


      React.createElement("button", { id: "clear-all", onClick: this.clearAll.bind(this) },
      React.createElement("img", {
        src: "https://image.flaticon.com/icons/svg/95/95068.svg",
        alt: "Clear All",
        title: "Clear All" }))),




      React.createElement(Editor, {
        styles: this.state.styles,
        handler: this.captureInput.bind(this),
        value: this.state.markdown }),

      React.createElement(Preview, { styles: this.state.styles, markdown: parsedText })));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));