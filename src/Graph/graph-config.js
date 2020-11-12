import * as React from 'react';
export const NODE_KEY = 'id';
export const POLY_TYPE = 'poly';
export const SPECIAL_TYPE = 'special';
export const SPECIAL_EDGE_TYPE = 'specialEdge';
export const nodeTypes = [POLY_TYPE, SPECIAL_TYPE];
export const edgeTypes = [SPECIAL_EDGE_TYPE];

const SpecialShape = (
    <symbol viewBox="0 0 200 200" id="special">
        <circle cx="100" cy="100" r="50" fill="rgb(255, 250, 129)" color="black"/>
    </symbol>
);

const PolyShape = (
  <symbol viewBox="0 0 88 72" id="poly" width="88" height="88">
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge"/>
);

export default {
  EdgeTypes: {
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: '#specialEdge',
    },
  },
  NodeSubtypes: {
  },
  NodeTypes: {
    special: {
      shape: SpecialShape,
      shapeId: '#special',
      typeText: 'Special',
    },
    poly: {
      shape: PolyShape,
      shapeId: '#poly',
      typeText: 'Poly',
    }
  },
};