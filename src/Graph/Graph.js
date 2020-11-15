import * as React from 'react';

import {
  GraphView,
  type IEdgeType as IEdge,
  type INodeType as INode,
  type LayoutEngineType,
} from 'react-digraph';
import GraphConfig, {
  NODE_KEY,
  TASK_TYPE,
  PAST_WEEK_TYPE,
  FUTURE_WEEK_TYPE,
  ACTUAL_WEEK_TYPE,
  EDGE_TYPE,
} from './graph-config.js';

type IGraph = {
  nodes: INode[],
  edges: IEdge[],
};

var nodesLen;
var lastWeek;

function createNodes(projectData, actualWeek) {
    let nodes = [];
    lastWeek = 0;
    projectData.tasks.forEach(t => {
        lastWeek = Math.max(lastWeek, t.start + t.duration - 1);
        nodes.push({
            id: t.id.toString(),
            title: t.name,
            type: TASK_TYPE
        })
    });
    for (let i = 1; i <= lastWeek; i++) {
        nodes.push({
            id: 'week' + i.toString(),
            title: i.toString(),
            type: actualWeek === i ? ACTUAL_WEEK_TYPE : (actualWeek > i ? PAST_WEEK_TYPE : FUTURE_WEEK_TYPE)
        });
    }
    return nodes;
}

function createEdges(projectData) {
    let edges = [];
    projectData.tasks.forEach(t => {
        for (let i = 0; i < t.duration; i++) {
            edges.push({
                source: 'week' + (t.start + i).toString(),
                target: t.id.toString(),
                type: EDGE_TYPE,
            });    
        }
    });
    for (let i = 1; i < lastWeek; i++) {
        edges.push({
            source: 'week' + i.toString(),
            target: 'week' + (i + 1).toString(),
            type: EDGE_TYPE,
        }); 
    }
    return edges;
}

function getGraphObject(projectData, actualWeek) {
    let nodes = createNodes(projectData, actualWeek);
    let edges = createEdges(projectData);
    console.log(nodes);
    let graphObject: IGraph = {
        edges: edges,
        nodes: nodes,
    };
    nodesLen = graphObject.nodes.length;
    return graphObject;
}

type IGraphState = {
    graph: any,
    selected: any,
    totalNodes: number,
    copiedNode: any,
    layoutEngineType?: LayoutEngineType,
};

class Graph extends React.Component<IGraphProps, IGraphState> {
    GraphView;
    constructor(props: IGraphProps) {
        super(props);
        this.state = {
            copiedNode: null,
            graph: getGraphObject(this.props.projectData, this.props.actualWeek),
            layoutEngineType: undefined,
            selected: null,
            totalNodes: nodesLen,
        };
        this.GraphView = React.createRef();
    }

    getNodeIndex(searchNode: INode) {
        return this.state.graph.nodes.findIndex(node => {
        return node[NODE_KEY] === searchNode[NODE_KEY];
        });
    }

    getEdgeIndex(searchEdge: IEdge) {
        return this.state.graph.edges.findIndex(edge => {
            return (
                edge.source === searchEdge.source && edge.target === searchEdge.target
            );
        });
    }

    handleChange = (event: any) => {
        this.setState(
            {
                totalNodes: parseInt(event.target.value || '0', 10),
            },
            this.makeItLarge
        );
    };

    onUpdateNode = (viewNode: INode) => {
        const graph = this.state.graph;
        const i = this.getNodeIndex(viewNode);
        graph.nodes[i] = viewNode;
        this.setState({ graph });
    };

    render() {
        const { nodes, edges } = this.state.graph;
        const selected = this.state.selected;
        const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

        return (
        <>
            <div id="graph" style={{ height: '100%', width:'100%'}}>
                <GraphView
                    ref={el => (this.GraphView = el)}
                    nodeKey={NODE_KEY}
                    nodes={nodes}
                    edges={edges}
                    selected={selected}
                    nodeTypes={NodeTypes}
                    nodeSubtypes={NodeSubtypes}
                    edgeTypes={EdgeTypes}
                    onUpdateNode={this.onUpdateNode}
                />
            </div>
        </>
        );
    }
}

export default Graph;