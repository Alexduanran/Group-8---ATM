import React from "react";
import Graph from "vis-react";


export class NNetwork extends React.Component {

    constructor(props) {
        super(props);

        let nodeList = [];
        let edgeList = []
        let count = 1;
        for (let i = 1; i <= this.props.numInputNodes; i++) {
            nodeList.push({id: count, level: 1});
            count++;
            for (let j = this.props.numInputNodes + 1; j <= this.props.numInputNodes + this.props.nodesLayer1; j++) {
                edgeList.push({ from: i, to: j })
            }
        }
        for (let i = 2; i <= this.props.numLayer+1; i++) {
            var temp;
            if (i === 2) {
                temp = this.props.nodesLayer1;
                if (i === this.props.numLayer+1) {
                    for (let y = this.props.numInputNodes+1; y <= this.props.numInputNodes+temp; y++) {
                        edgeList.push({ from: y, to: this.props.numInputNodes+temp+1})
                    }
                }
            }
            else if (i === 3) {
                temp = this.props.nodesLayer2;
                const layOne = this.props.numInputNodes+this.props.nodesLayer1
                for (let x = this.props.numInputNodes+1; x <= layOne; x++) {
                    for (let y = layOne+1; y <= layOne+temp; y++) {
                        edgeList.push({ from: x, to: y })
                    }
                }
                if (i === this.props.numLayer+1) {
                    for (let y = layOne+1; y <= layOne+temp; y++) {
                        edgeList.push({ from: y, to: layOne+temp+1})
                    }
                }
            }
            else {
                temp = this.props.nodesLayer3;
                const layTwo = this.props.numInputNodes+this.props.nodesLayer1+this.props.nodesLayer2
                for (let x = this.props.numInputNodes+this.props.nodesLayer1+1; x <= layTwo; x++) {
                    for (let y = layTwo+1; y <= layTwo+temp; y++) {
                        edgeList.push({ from: x, to: y })
                    }
                }
                for (let y = layTwo+1; y <= layTwo+temp; y++) {
                    edgeList.push({ from: y, to: layTwo+temp+1})
                }
            }
            for (let j = 1; j <= temp; j++) {
                nodeList.push({ id: count, level: i});
                count++;
            }
        }
        nodeList.push({id: count, level: this.props.numLayer+2})
        this.state = {
            graph : {
                nodes: nodeList,
                edges: edgeList
            },
            options : {
                layout: {
                    hierarchical: {direction : 'LR',
                                   levelSeparation: 300},
                },
                edges: {
                    color: '#000000'
                },
                interaction: { hoverEdges: true,
                               zoomView: true,
                               dragView: true }
            }
        }
        
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.numInputNodes !== this.props.numInputNodes ||
            previousProps.nodesLayer1 !== this.props.nodesLayer1 ||
            previousProps.nodesLayer2 !== this.props.nodesLayer2 ||
            previousProps.nodesLayer3 !== this.props.nodesLayer3) {
            let nodeList = [];
            let edgeList = [];
            let count = 1;
            for (let i = 1; i <= this.props.numInputNodes; i++) {
                nodeList.push({id: count, level: 1});
                count++;
                for (let j = this.props.numInputNodes + 1; j <= this.props.numInputNodes + this.props.nodesLayer1; j++) {
                    edgeList.push({ from: i, to: j })
                }
            }
            for (let i = 2; i <= this.props.numLayer+1; i++) {
                var temp;
                if (i === 2) {
                    temp = this.props.nodesLayer1;
                    if (i === this.props.numLayer+1) {
                        for (let y = this.props.numInputNodes+1; y <= this.props.numInputNodes+temp; y++) {
                            edgeList.push({ from: y, to: this.props.numInputNodes+temp+1})
                        }
                    }
                }
                else if (i === 3) {
                    temp = this.props.nodesLayer2;
                    const layOne = this.props.numInputNodes+this.props.nodesLayer1
                    for (let x = this.props.numInputNodes+1; x <= layOne; x++) {
                        for (let y = layOne+1; y <= layOne+temp; y++) {
                            edgeList.push({ from: x, to: y })
                        }
                    }
                    if (i === this.props.numLayer+1) {
                        for (let y = layOne+1; y <= layOne+temp; y++) {
                            edgeList.push({ from: y, to: layOne+temp+1})
                        }
                    }
                }
                else {
                    temp = this.props.nodesLayer3;
                    const layTwo = this.props.numInputNodes+this.props.nodesLayer1+this.props.nodesLayer2
                    for (let x = this.props.numInputNodes+this.props.nodesLayer1+1; x <= layTwo; x++) {
                        for (let y = layTwo+1; y <= layTwo+temp; y++) {
                            edgeList.push({ from: x, to: y })
                        }
                    }
                    for (let y = layTwo+1; y <= layTwo+temp; y++) {
                        edgeList.push({ from: y, to: layTwo+temp+1})
                    }
                }
                for (let j = 1; j <= temp; j++) {
                    nodeList.push({ id: count, level: i});
                    count++;
                }
            }
            nodeList.push({id: count, level: this.props.numLayer+2})
            this.setState(() => {
                return ({
                    graph: {
                        nodes: nodeList,
                        edges: edgeList
                    }
                })
            }
            );
        }
        
    }

    render() {
        return (
            <Graph
            key={this.state.graph.edges.length}
            graph={this.state.graph}
            options={this.state.options}
            />
        )
    }
    
}