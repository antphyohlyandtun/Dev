# Advanced mermaid usage

## mermaid configuration options

Often, using mermaid is as easy as just writing the diagram code.

But sometimes we need to tweak how the diagram is rendered. This is done using the configuration options of the [mermaidAPI](mermaidAPI.md).

- A simple example could be to define a theme, maybe we want the diagram to display in `dark` mode? Then we would set the `theme` configuration option to `dark`.

- Or, maybe we want clickable html links inside the mermaid diagram? Then we would set the `securityLevel` to `loose`, changing it from the default of `strict`, and use the `click` keyword inside the diagram.

- Or, maybe the area of the diagram is too narrow to contain our flowchart? Then we could set the `diagramMarginY` to a value greater than the default of `50`.

The different configuration options are documented on the [mermaidAPI](mermaidAPI.md) page together with their default vaules.

## config options - example 1
To call the mermaid API, we expand on the content of the `<script>` tag used to initialize the mermaid renderer in the html `<body>`.

Building on the previous example, we now want to diagram only the first of the diagrams. But we want one of the boxes, the load balancer, to be a clickable html link.

To achieve this we:
- set the `securityLevel` to `loose` using the mermaid API
- use the `click` keyword to define an html link for the desired object - in this example `B`, the load balancer:

```
<html>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>
      var config = {
        startOnLoad:true,
        securityLevel:'loose',
      };
      mermaid.initialize(config);
    </script>

    Here is one mermaid diagram:
    <div class="mermaid">
      graph TD
      A[Client] --> B[Load Balancer]
      B --> C[Server1]
      B --> D[Server2]
      click B "http://www.github.com" "This is a tooltip for a link"
    </div>

    The second diagram was removed in this example.
  </body>
</html>

```
The new setting was defined in a variable `config`, which we referenced as we initialized the mermaid renderer. The variable could have any permissible name.

*Note* In this example, no mermaid version is referenced in the path to the mermaid renderer. We automatically get the latest version.

## config options - example 2
Some configuration options have their own attributes, i.e. specific configuration values are set through hiearchical levels.

An example of this could be the flowchart diagram:
```
<script>
  var config = {
    startOnLoad:true,
    flowchart:{
      useMaxWidth:true,
      htmlLabels:true,
      curve:'cardinal',
    },
    securityLevel:'loose',
  };
  mermaid.initialize(config);
</script>
```
Here the flowchart options were defined using a json list.

The same options could equally be expressed like this:
```
<script>
  var config = {
    startOnLoad:true,
    flowchart.useMaxWidth:true,
    flowchart.htmlLabels:true,
    flowchart.curve:'cardinal',
    securityLevel:'loose',
  };
  mermaid.initialize(config);
</script>
```
Which to use is a matter of personal preference.

## Mermaid CLI
[Mermaid CLI](mermaidCLI.md) is a command line interface for mermaid.

The mermaid CLI does not render a web page from html as shown in the previous examples. Instead, the tool takes a mermaid definition file as input and generates svg/png/pdf file as output.

Using mermaid CLI requires local installation of `node.js` and either of the `yarn` or `npm` package managers. Procedures for installing these environments are beyond the scope of this manual, but instructions may be found [here](https://www.w3schools.com/nodejs/nodejs_get_started.asp) and in a number of other places.

With a working node environment, the mermaid CLI is installed using one of the commands `yarn add mermaid.cli` or `npm install mermaid.cli`.

The CLI is invoked using `mmdc`, for example like so:
`mmdc -i input.mmd -o output.pdf`

Configuration options may be set with the mermaid CLI but the syntax is different. Current options are displayed with `mmdc -h`.

For example, setting the diagram size can be done like so:
`mmdc -i input.mmd -o output.svg -w 1024 -H 768`

Further documentation of the Mermaid CLI can be found [here](https://github.com/mermaidjs/mermaid.cli).

