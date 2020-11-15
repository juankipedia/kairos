import * as React from 'react';

import {
  GraphView,
  type IEdgeType as IEdge,
  type INodeType as INode,
  type LayoutEngineType,
} from 'react-digraph';
import GraphConfig, {
  NODE_KEY,
  POLY_TYPE,
  SPECIAL_TYPE,
  SPECIAL_EDGE_TYPE,
} from './graph-config.js'; // Configures node/edge types

type IGraph = {
  nodes: INode[],
  edges: IEdge[],
};

function getLastWeek() {
    
}

function getGraphObject() {
    let graphObject: IGraph = {
        edges: [
            {
                handleTooltipText: '5',
                source: 'start1',
                target: 'a1',
                type: SPECIAL_EDGE_TYPE,
            }
        ],
        nodes: [
            {
                id: 'start1',
                title: 'Start (0)',
                type: SPECIAL_TYPE,
            },
            {
                id: 'a1',
                title: 'Node A (1)',
                type: POLY_TYPE,
                x: 258.3976135253906,
                y: 331.9783248901367,
            }
        ],
      };
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
            graph: getGraphObject(),
            layoutEngineType: undefined,
            selected: null,
            totalNodes: getGraphObject().nodes.length,
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